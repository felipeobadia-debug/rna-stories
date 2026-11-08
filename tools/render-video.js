// Uso: node tools/render-video.js AAAA-MM-DD
// Lê stories/AAAA-MM-DD.json ({frase, apoio, tema: bordo|branco|preto, destaque?, autor?, obra?, tag?}) e gera stories/AAAA-MM-DD.mp4
// (story animado de 8 s, 1080x1920, 30 fps, H.264 + faixa de áudio silenciosa).
// Usa o modelo templates/rna-story-video.html e o HyperFrames (versão fixa, sem telemetria).
// Precisa de: playwright (NODE_PATH=$(npm root -g)), npx e ffmpeg.
const fs = require('fs'), path = require('path'), os = require('os');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');

const HF_VERSION = '0.9.19';
const root = path.join(__dirname, '..');
const d = process.argv[2];
if (!/^\d{4}-\d{2}-\d{2}$/.test(d || '')) { console.error('data inválida'); process.exit(1); }
const j = JSON.parse(fs.readFileSync(path.join(root, 'stories', d + '.json'), 'utf8'));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const TEMA = ['preto', 'branco'].includes(j.tema) ? j.tema : 'bordo';
const norm = s => String(s || '').toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}-]/gu, '');

// Frase palavra por palavra; a palavra "destaque" (opcional) acende em dourado.
const alvo = norm(j.destaque);
let marcou = false;
const fraseHtml = String(j.frase).trim().split(/\s+/).map(w => {
  const hl = !marcou && alvo && norm(w) === alvo;
  if (hl) marcou = true;
  return `<span class="w${hl ? ' hl' : ''}">${esc(w)}</span>`;
}).join(' ');
if (alvo && !marcou) console.warn('aviso: destaque "' + j.destaque + '" não encontrado na frase; seguindo sem destaque');

// Projeto temporário do HyperFrames.
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rna-video-' + d + '-'));
fs.mkdirSync(path.join(dir, 'assets', 'fonts'), { recursive: true });
fs.copyFileSync(path.join(root, 'templates', 'video', 'gsap.min.js'), path.join(dir, 'assets', 'gsap.min.js'));
fs.copyFileSync(path.join(root, 'templates', 'video', 'logo-rna.png'), path.join(dir, 'assets', 'logo-rna.png'));
fs.copyFileSync(path.join(root, 'templates', 'fraunces-latin-600-normal.woff2'), path.join(dir, 'assets', 'fonts', 'fraunces-latin-600-normal.woff2'));
fs.writeFileSync(path.join(dir, 'hyperframes.json'), JSON.stringify({ paths: { assets: 'assets' }, authoringSkill: 'hyperframes' }, null, 2));
fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify({ id: 'rna-story-' + d, name: 'rna-story-' + d }, null, 2));

const tpl = fs.readFileSync(path.join(root, 'templates', 'rna-story-video.html'), 'utf8');
const build = fs_ => tpl
  .replaceAll('{{TEMA}}', TEMA)
  .replaceAll('{{TAG}}', esc(j.tag || 'Bom dia'))
  .replaceAll('{{TAGFS}}', String(Math.min(34, Math.floor(640 / (String(j.tag || 'Bom dia').length * 0.95)))))
  .replaceAll('{{AUTOR}}', j.autor ? esc('— ' + j.autor + (j.obra ? ', ' + j.obra : '')) : '')
  .replaceAll('{{FRASE_HTML}}', fraseHtml)
  .replaceAll('{{APOIO}}', esc(j.apoio))
  .replaceAll('{{FS}}', String(fs_));
const index = path.join(dir, 'index.html');

(async () => {
  // 1) Ajusta o tamanho da frase para caber (mesma regra da lâmina estática), com a fonte já carregada.
  fs.writeFileSync(index, build(84));
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + index);
  const size = await p.evaluate(async () => {
    await document.fonts.ready;
    const q = document.getElementById('q'), txt = document.getElementById('txt');
    let s = 84;
    // O bloco de texto vai de 560 px até a linha dourada em 1238 px.
    while (txt.getBoundingClientRect().height > 640 && s > 50) { s -= 2; q.style.fontSize = s + 'px'; }
    return s;
  });
  await b.close();
  fs.writeFileSync(index, build(size));

  // 2) Renderiza com o HyperFrames (sem telemetria, sem checagem de atualização).
  const env = { ...process.env, HYPERFRAMES_NO_TELEMETRY: '1', DO_NOT_TRACK: '1', HYPERFRAMES_NO_UPDATE_CHECK: '1' };
  const mudo = path.join(dir, 'video-mudo.mp4');
  // Sem acesso ao storage.googleapis.com o HyperFrames não baixa o Chrome; usa o Chrome já instalado.
  if (!env.HYPERFRAMES_BROWSER_PATH && fs.existsSync('/usr/bin/google-chrome')) env.HYPERFRAMES_BROWSER_PATH = '/usr/bin/google-chrome';
  execFileSync('npx', ['-y', 'hyperframes@' + HF_VERSION, 'render', '-q', 'delivery', '-o', mudo], { cwd: dir, env, stdio: 'inherit' });

  // 3) Acrescenta faixa de áudio silenciosa (AAC), que a API do Instagram prefere.
  const out = path.join(root, 'stories', d + '.mp4');
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', mudo, '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=48000',
    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '128k', '-shortest', '-movflags', '+faststart', out]);
  fs.rmSync(dir, { recursive: true, force: true });
  console.log('ok stories/' + d + '.mp4 (frase ' + size + 'px, tema ' + TEMA + (marcou ? ', destaque "' + j.destaque + '"' : '') + ')');
})().catch(e => { console.error(e); process.exit(1); });

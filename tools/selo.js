// Selo temático das datas comemorativas: anel dourado com o nome da data e um ícone em traço fino no centro.
// Usado por render.js e render-video.js quando o JSON tem "icone" (nome em templates/icones.json).
const fs = require('fs'), path = require('path');
const MESES = ['JANEIRO','FEVEREIRO','MARÇO','ABRIL','MAIO','JUNHO','JULHO','AGOSTO','SETEMBRO','OUTUBRO','NOVEMBRO','DEZEMBRO'];
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
module.exports = function selo(j, d, tema) {
  if (!j.icone) return '';
  const icones = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'templates', 'icones.json'), 'utf8'));
  const ic = icones[j.icone];
  if (!ic) throw new Error('ícone "' + j.icone + '" não existe em templates/icones.json');
  const [, m, dd] = d.split('-');
  const anel = j.selo || ((j.tag || '').toUpperCase() + ' • ' + (/^20\d\d$/.test(d.slice(0, 4)) ? Number(dd) + ' DE ' + MESES[Number(m) - 1] + ' • ' : '') + 'RNA MANIPULAÇÃO FARMACÊUTICA •');
  const g = tema === 'branco' ? ['#7E5E05', '#B58A0A', '#C9A227'] : ['#B58A0A', '#D9B23A', '#F8E57A'];
  const ink = tema === 'branco' ? '#8C6A08' : '#D9B23A';
  const iconeHtml = ic.replace(/<(path|circle|rect)\b/g, '<$1 class="tr" pathLength="1"');
  return `<svg viewBox="0 0 420 420" width="420" height="420" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${g[0]}"/><stop offset=".5" stop-color="${g[1]}"/><stop offset="1" stop-color="${g[2]}"/></linearGradient>
  <path id="sarc" d="M210,32 a178,178 0 1,1 -0.01,0"/></defs>
  <circle class="anel tr" pathLength="1" cx="210" cy="210" r="204" fill="none" stroke="url(#sg)" stroke-width="2"/>
  <circle class="anel tr" pathLength="1" cx="210" cy="210" r="152" fill="none" stroke="url(#sg)" stroke-width="1.5"/>
  <g id="sgira"><text font-family="Inter, -apple-system, Segoe UI, sans-serif" font-size="19" font-weight="600" fill="${ink}" letter-spacing="4"><textPath href="#sarc" textLength="1105" lengthAdjust="spacing">${esc(anel)}</textPath></text></g>
  <g id="sicone" transform="translate(84 84) scale(1.26)" fill="none" stroke="url(#sg)" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round">${iconeHtml}</g>
</svg>`;
};

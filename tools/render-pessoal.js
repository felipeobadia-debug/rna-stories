// Uso: node tools/render-pessoal.js AAAA-MM-DD
// Lê stories/pessoal-AAAA-MM-DD.json ({frase, autor, obra, legenda}) e gera stories/pessoal-AAAA-MM-DD.jpg (1080x1920).
const fs=require('fs'),path=require('path');
const {chromium}=require('playwright');
const root=path.join(__dirname,'..'); const d=process.argv[2];
if(!/^\d{4}-\d{2}-\d{2}$/.test(d||'')){console.error('data inválida');process.exit(1);}
const j=JSON.parse(fs.readFileSync(path.join(root,'stories','pessoal-'+d+'.json'),'utf8'));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const font=fs.readFileSync(path.join(root,'templates','fraunces-latin-600-normal.woff2')).toString('base64');
let h=fs.readFileSync(path.join(root,'templates','pessoal-story.html'),'utf8')
 .replaceAll('__FONT__',font).replaceAll('{{FRASE}}',esc(j.frase)).replaceAll('{{AUTOR}}',esc(j.autor)).replaceAll('{{OBRA}}',esc(j.obra));
const tmp=path.join(require('os').tmpdir(),'pessoal-story-'+d+'.html'); fs.writeFileSync(tmp,h);
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p=await b.newPage({viewport:{width:1080,height:1920}});await p.goto('file://'+tmp);await p.waitForTimeout(600);
await (await p.$('#card')).screenshot({path:path.join(root,'stories','pessoal-'+d+'.jpg'),type:'jpeg',quality:88});
await b.close();console.log('ok stories/pessoal-'+d+'.jpg');})().catch(e=>{console.error(e);process.exit(1);});

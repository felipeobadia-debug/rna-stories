// Uso: node tools/render.js AAAA-MM-DD
// Lê stories/AAAA-MM-DD.json ({frase, apoio, tema: bordo|branco|preto, autor?, obra?, tag?, hana?: caminho da imagem no repo, icone?: nome em templates/icones.json, selo?: texto do anel}) e gera stories/AAAA-MM-DD.jpg (1080x1920).
const fs=require('fs'),path=require('path');
const {chromium}=require('playwright');
const root=path.join(__dirname,'..'); const d=process.argv[2];
if(!/^\d{4}-\d{2}-\d{2}$/.test(d||'')){console.error('data inválida');process.exit(1);}
const j=JSON.parse(fs.readFileSync(path.join(root,'stories',d+'.json'),'utf8'));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const font=fs.readFileSync(path.join(root,'templates','fraunces-latin-600-normal.woff2')).toString('base64');
let h=fs.readFileSync(path.join(root,'templates','rna-story.html'),'utf8')
 .replaceAll('__FONT__',font).replaceAll('{{FRASE}}',esc(j.frase)).replaceAll('{{APOIO}}',esc(j.apoio)).replaceAll('{{TEMA}}',['preto','branco'].includes(j.tema)?j.tema:'bordo').replaceAll('{{TAG}}',esc(j.tag||'Bom dia')).replaceAll('{{TAGFS}}',String(Math.min(30,Math.floor(620/(String(j.tag||'Bom dia').length*0.95))))).replaceAll('{{AUTOR}}',j.autor?esc('— '+j.autor+(j.obra?', '+j.obra:'')):'');
const hanaPath=j.hana?path.join(root,j.hana):null;
if(hanaPath&&!fs.existsSync(hanaPath)){console.error('imagem da Hana não encontrada: '+j.hana);process.exit(1);}
const hanaSrc=hanaPath?('data:image/'+(/\.png$/i.test(hanaPath)?'png':'jpeg')+';base64,'+fs.readFileSync(hanaPath).toString('base64')):'';
h=h.replaceAll('{{COMHANA}}',hanaPath?' comhana':'').replaceAll('{{HANA_SRC}}',hanaSrc);
const seloSvg=(j.hana?'':require('./selo')(j,d,['preto','branco'].includes(j.tema)?j.tema:'bordo'));
h=h.replaceAll('{{COMSELO}}',seloSvg?' comselo':'').replaceAll('{{SELO}}',seloSvg);
const tmp=path.join(require('os').tmpdir(),'rna-story-'+d+'.html'); fs.writeFileSync(tmp,h);
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p=await b.newPage({viewport:{width:1080,height:1920}});await p.goto('file://'+tmp);await p.waitForTimeout(600);
await (await p.$('#card')).screenshot({path:path.join(root,'stories',d+'.jpg'),type:'jpeg',quality:88});
await b.close();console.log('ok stories/'+d+'.jpg');})().catch(e=>{console.error(e);process.exit(1);});

// Verifica la base de repertorio lírico contra fuentes públicas y guarda la caché.
// Uso: node scripts/verificar_repertorio.js   (salida: biblioteca/verificacion_cache.json)
const fs=require('fs'),path=require('path');
const {OBRAS,METODOS}=require('../biblioteca/fuente_repertorio.js');
const CACHE=path.join(__dirname,'../biblioteca/verificacion_cache.json');
const cache=fs.existsSync(CACHE)?JSON.parse(fs.readFileSync(CACHE,'utf8')):{comp:{},imslp:{}};
const UA={'User-Agent':'OctaviaRepertorio/1.0 (herramienta educativa)'};
const guardar=()=>fs.writeFileSync(CACHE,JSON.stringify(cache,null,1));
const espera=ms=>new Promise(r=>setTimeout(r,ms));
async function json(u){for(let i=0;i<6;i++){try{const r=await fetch(u,{headers:UA});if(r.ok)return await r.json();if(r.status===404)return null}catch(e){}await espera(4000*(i+1))}return null}
const anio=c=>{const v=c&&c[0]&&c[0].mainsnak&&c[0].mainsnak.datavalue&&c[0].mainsnak.datavalue.value&&c[0].mainsnak.datavalue.value.time;return v?parseInt(v.slice(1,5),10):null};
async function compositor(nombre){
  if(cache.comp[nombre]&&cache.comp[nombre].ok)return cache.comp[nombre];
  const s=await json('https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(nombre.replace(/ /g,'_')));
  let out={ok:false};
  if(s&&s.wikibase_item){const w=await json('https://www.wikidata.org/wiki/Special:EntityData/'+s.wikibase_item+'.json');
    const e=w&&w.entities&&w.entities[s.wikibase_item];
    out={ok:true,titulo:s.title,desc:s.description||'',url:s.content_urls&&s.content_urls.desktop.page,qid:s.wikibase_item,nace:e?anio(e.claims.P569):null,muere:e?anio(e.claims.P570):null}}
  cache.comp[nombre]=out;guardar();await espera(1500);return out}
async function imslp(q){
  if(cache.imslp[q])return cache.imslp[q];
  const r=await json('https://imslp.org/api.php?action=query&list=search&srnamespace=0&srlimit=5&format=json&srsearch='+encodeURIComponent(q));
  const hits=(r&&r.query&&r.query.search||[]).map(h=>h.title);
  cache.imslp[q]=hits;guardar();await espera(600);return hits}
(async()=>{
  const nombres=[...new Set(OBRAS.map(o=>o.cw).concat(METODOS.map(m=>m.cw)))];
  for(const n of nombres){const c=await compositor(n);console.log('C',n,c.ok?c.nace+'-'+c.muere:'SIN DATOS')}
  for(const o of OBRAS.concat(METODOS)){const h=await imslp(o.q);console.log('I',o.t,'→',h[0]||'—')}
  fs.writeFileSync(CACHE,JSON.stringify(cache,null,1));console.log('Caché guardada');
})();

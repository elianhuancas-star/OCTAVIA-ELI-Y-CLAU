// Verifica la base de piano (compositores, IMSLP) y busca videos de referencia para piano y acompañamiento.
// Uso: node scripts/verificar_piano.js   (caché: biblioteca/verificacion_cache.json)
const fs=require('fs'),path=require('path');
const P=require('../biblioteca/fuente_piano.js');const L=require('../biblioteca/fuente_repertorio.js');
const CACHE=path.join(__dirname,'../biblioteca/verificacion_cache.json');
const cache=JSON.parse(fs.readFileSync(CACHE,'utf8'));cache.yt=cache.yt||{};
const guardar=()=>fs.writeFileSync(CACHE,JSON.stringify(cache,null,1));
const espera=ms=>new Promise(r=>setTimeout(r,ms));
const UA={'User-Agent':'OctaviaRepertorio/1.0 (herramienta educativa)'};
const sin=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
async function get(u,h,tipo){for(let i=0;i<6;i++){try{const r=await fetch(u,{headers:h});if(r.ok)return tipo==='t'?await r.text():await r.json();if(r.status===404||r.status===401||r.status===400)return null}catch(e){}await espera(4000*(i+1))}return null}
const anio=c=>{const v=c&&c[0]&&c[0].mainsnak&&c[0].mainsnak.datavalue&&c[0].mainsnak.datavalue.value&&c[0].mainsnak.datavalue.value.time;return v?parseInt(v.slice(1,5),10):null};
async function compositor(n){
  if(cache.comp[n]&&cache.comp[n].nace)return cache.comp[n];
  const s=await get('https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(n.replace(/ /g,'_')),UA);
  let out={ok:false};
  if(s&&s.wikibase_item&&s.type!=='disambiguation'){const w=await get('https://www.wikidata.org/wiki/Special:EntityData/'+s.wikibase_item+'.json',UA);const e=w&&w.entities&&w.entities[s.wikibase_item];
    out={ok:true,titulo:s.title,desc:s.description||'',url:s.content_urls&&s.content_urls.desktop.page,qid:s.wikibase_item,nace:e?anio(e.claims.P569):null,muere:e?anio(e.claims.P570):null}}
  cache.comp[n]=out;guardar();await espera(1500);return out}
async function imslp(q){if(!q||cache.imslp[q])return cache.imslp[q]||[];
  const r=await get('https://imslp.org/api.php?action=query&list=search&srnamespace=0&srlimit=5&format=json&srsearch='+encodeURIComponent(q),UA);
  const hits=(r&&r.query&&r.query.search||[]).map(h=>h.title);cache.imslp[q]=hits;guardar();await espera(600);return hits}
// Canales de confianza: discográficas, instituciones, intérpretes reconocidos y canales «- Topic» (subidas oficiales de las discográficas)
const FIABLE=/ - Topic$|Deutsche Grammophon|Decca|Warner Classics|Sony Classical|Erato|Naxos|Hyperion|Chandos|harmonia mundi|Chopin Institute|Narodowy Instytut|medici|Henle|Royal Opera|Metropolitan Opera|Met Opera|Wigmore|Carnegie|BBC|Alpha Classics|Onyx|Pentatone|BIS Records|Brilliant Classics|Netherlands Bach Society|Verbier|Philharmoni|Konzerthaus|Mozarteum|Glyndebourne|Opéra|Opera de|Teatro|Staatsoper|Wiener|Lang Lang|LangLang|VEVO$|Yuja Wang|Trifonov|Kissin|Igor Levit|Seong-Jin Cho|Víkingur|Khatia|Lisitsa|Hamelin|tiffany poon|Kate Liu|Bruce Liu|Eric Lu|Rafał Blechacz|Jan Lisiecki|ABRSM|Royal Conservatory|RCM|Juilliard|Curtis Institute|Leeds International|Van Cliburn|Cliburn|Queen Elisabeth|Tchaikovsky Competition|Fundación Juan March|Palau de la Música|Teatro Real|Teatro Colón|Bayerische|Salzburg|Berliner|Concertgebouw|Renée Fleming|Cecilia Bartoli|Jonas Kaufmann|Anna Netrebko|Diana Damrau|Juan Diego Flórez|Plácido Domingo|Bryn Terfel|Joyce DiDonato|Elīna Garanča|Philippe Jaroussky/i;
const MALO=/synthesia|tutorial|lesson|how to play|midi|cover|karaoke|slow|easy piano|sheet music|partitura/i;
async function youtube(q,kw,ap){
  if(cache.yt[q]!==undefined)return cache.yt[q];
  const html=await get('https://www.youtube.com/results?search_query='+encodeURIComponent(q),{'User-Agent':'Mozilla/5.0','Accept-Language':'en'},'t');
  let elegido=null;
  if(html){const m=html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
    if(m){const d=JSON.parse(m[1]);const vs=[];(function w(o){if(!o||typeof o!=='object')return;if(o.videoRenderer){const v=o.videoRenderer;vs.push({id:v.videoId,titulo:(v.title.runs||[]).map(r=>r.text).join(''),canal:(v.ownerText&&v.ownerText.runs||[]).map(r=>r.text).join(''),dur:v.lengthText&&v.lengthText.simpleText});return}for(const k in o)w(o[k])})(d);
      for(const v of vs.slice(0,15)){if(!FIABLE.test(v.canal)||MALO.test(v.titulo))continue;const t=sin(v.titulo+' '+v.canal);
        const hits=kw.filter(k=>t.includes(sin(k))).length;const conAutor=ap&&t.includes(sin(ap));
        if(hits>=Math.min(2,kw.length)||(hits>=1&&conAutor)){elegido=v;break}}}}
  if(elegido){const o=await get('https://www.youtube.com/oembed?format=json&url='+encodeURIComponent('https://www.youtube.com/watch?v='+elegido.id),UA);
    elegido=o?{id:elegido.id,titulo:o.title,canal:o.author_name,dur:elegido.dur}:null}
  cache.yt[q]=elegido;guardar();await espera(1500);return elegido}
const palabras=t=>sin(t).replace(/[«»"'’!?¿¡.,:;()…]/g,' ').split(/\s+/).filter(w=>w.length>3&&!/^(para|with|your|dans|della|nach|dem|des|der|die|das|une|est|que|una|the|mio|mia|non|più)$/.test(w)).slice(0,2);
(async()=>{
  const nombres=[...new Set(P.OBRAS.map(o=>o.cw).concat(P.METODOS.map(m=>m.cw)))];
  for(const n of nombres){const c=await compositor(n);console.log('C',n,c.nace?c.nace+'-'+c.muere:'SIN DATOS')}
  for(const o of P.OBRAS.concat(P.METODOS))if(o.q){const h=await imslp(o.q);console.log('I',o.t,'→',h[0]||'—')}
  for(const o of P.OBRAS){const ap=(o.cw||'').split(' ').pop();const v=await youtube(o.yq,o.kw,ap);console.log('Y',o.t,'→',v?v.canal+' | '+v.titulo:'—')}
  for(const o of L.OBRAS){const ap=(o.cw||'').split(' ').pop();const q=o.t.replace(/\(.*?\)|«|»/g,'')+' '+ap;const v=await youtube(q,palabras(o.t),ap);console.log('Y',o.t,'→',v?v.canal+' | '+v.titulo:'—')}
  guardar();console.log('FIN');
})();

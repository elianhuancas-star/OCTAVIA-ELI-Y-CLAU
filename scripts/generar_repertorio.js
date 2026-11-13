// Genera biblioteca/repertorio_lirico.json a partir de la fuente y de la caché de verificación.
// Uso: node scripts/generar_repertorio.js
const fs=require('fs'),path=require('path');
const {OBRAS,METODOS}=require('../biblioteca/fuente_repertorio.js');
const cache=JSON.parse(fs.readFileSync(path.join(__dirname,'../biblioteca/verificacion_cache.json'),'utf8'));
const PV='por verificar';
const sinAcento=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const slug=s=>sinAcento(s).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,48);
const DUDOSOS_MET=['Heinrich Panofka','Franz Abt','Ferdinand Sieber','Marco Bordogni','Bernhard Lütgen'];
function derechos(muere,arreglo){
  if(arreglo)return {txt:'Arreglo protegido por derechos de autor: usa una edición comprada.',libre:false};
  if(!muere)return {txt:'Estado de derechos '+PV+'.',libre:false};
  if(muere<1926)return {txt:'Dominio público (el compositor murió en '+muere+').',libre:true};
  if(muere<=1955)return {txt:'Dominio público en los países con vida + 70 años (murió en '+muere+'); en otros países puede estar protegida: '+PV+' según tu país.',libre:true};
  return {txt:'Protegida por derechos de autor (el compositor murió en '+muere+'): usa una edición comprada.',libre:false};
}
function epoca(o,comp){
  if(o.gen==='latinoamericana')return 'Peruana y latinoamericana';
  if(/Debussy/.test(o.c))return 'Impresionismo';
  const m=String(o.o||'').match(/1[5-9]\d\d/);const y=m?+m[0]:(comp&&comp.muere?comp.muere-15:null);
  if(!y)return '';return y<1600?'Renacimiento':y<1750?'Barroco':y<1820?'Clásico':y<1900?'Romántico':'Siglos XX y XXI';
}
function catalogo(o){const m=String(o.o||'').match(/\b(K\.\s?\d+|D\s\d+|BWV\s\d+|HWV\s\d+|RV\s\d+|WoO\s\d+|Z\.\s\d+|op\.\s\d+)/i);return m?m[1]:''}
function partitura(o,comp,libre){
  if(!libre)return '';
  const hits=cache.imslp[o.q]||[];const ap=sinAcento((o.cw||'').split(' ').pop());
  const h=hits.find(t=>sinAcento(t).includes(ap));
  return h?'https://imslp.org/wiki/'+encodeURIComponent(h.replace(/ /g,'_')).replace(/%2C/g,',').replace(/%28/g,'(').replace(/%29/g,')'):'';
}
const items=[];const pend={};
const marca=(k,v)=>{pend[k]=(pend[k]||0)+1;return v};
for(const o of OBRAS){
  const comp=cache.comp[o.cw]||{};const vida=comp.ok&&comp.nace?comp.nace+'–'+(comp.muere||''):'';
  const arreglo=/arreglo/i.test(o.c);const der=derechos(comp.muere,arreglo);
  const enl=partitura(o,comp,der.libre);
  const pv=[];
  if(!vida)pv.push(marca('años del compositor','años del compositor'));
  if(/atrib/i.test(o.c))pv.push(marca('atribución','atribución de la autoría'));
  pv.push(marca('rango','rango exacto'));
  pv.push(marca('tonalidad','tonalidad original'));
  pv.push(marca('duración','duración'));
  if(der.libre&&!enl)pv.push(marca('partitura','enlace de partitura'));
  if(!comp.muere||(comp.muere>=1926&&comp.muere<=1955))pv.push(marca('derechos','derechos según país'));
  pv.push(marca('texto','enlace de texto y traducción'));
  const rango=/–/.test(o.rango)?o.rango+' (aprox., '+PV+')':(o.rango?'Ámbito aprox.: '+o.rango+' ('+PV+')':PV);
  items.push({id:'lir-'+slug(o.t+'-'+o.cw),tipo:'obra',titulo:o.t,autor:o.c,nivel:o.dp<=2?'basico':o.dp===3?'intermedio':'avanzado',enlace:enl,notas:'Para el pianista: '+o.reto,
    catalogo:catalogo(o),epoca:epoca(o,comp),tonalidad:'',compases:'',compas:'',
    canto:{nivelVocal:o.niv,primerVerso:o.v,obraOrigen:o.o,vidaCompositor:vida,idioma:o.lang,genero:o.gen,justificacion:o.just,cuerdas:o.cue,
      rango,tonalidadOriginal:o.ton?o.ton+' ('+PV+')':PV,duracion:o.dur+' (aprox.)',difVocal:o.dv,difPiano:o.dp,retoPiano:o.reto,objetivos:o.obj,
      enlacePartitura:enl,enlaceTexto:'',derechos:der.txt,fuentes:[comp.url,enl].filter(Boolean),porVerificar:pv}});
}
for(const m of (process.env.CON_METODOS_CANTO?METODOS:[])){
  const comp=cache.comp[m.cw]||{};const vida=comp.ok&&comp.nace?comp.nace+'–'+(comp.muere||''):'';
  const der=derechos(comp.muere,false);const enl=partitura(m,comp,der.libre);const pv=[];
  if(!vida)pv.push(marca('años del compositor','años del autor'));
  if(DUDOSOS_MET.includes(m.c))pv.push(marca('edición','título y edición exactos'));
  if(!enl)pv.push(marca('partitura','enlace del libro'));
  items.push({id:'lir-met-'+slug(m.t+'-'+m.c),tipo:'metodo',titulo:m.t,autor:m.c,nivel:m.niv,enlace:enl,notas:m.trabaja,area:'Técnica',
    canto:{genero:'metodo',vidaCompositor:vida,cuerdas:m.cue,trabaja:m.trabaja,enlacePartitura:enl,derechos:der.txt,fuentes:[comp.url,enl].filter(Boolean),porVerificar:pv}});
}
const out={nombre:'Octavia · Acompañamiento de canto lírico (para pianistas)',version:1,generado:new Date().toISOString().slice(0,10),
  nota:'Rango, tonalidad y duración son aproximaciones pedagógicas marcadas «por verificar». Los años de los compositores vienen de Wikidata y los enlaces de partitura de IMSLP (solo obras en dominio público).',items};
fs.writeFileSync(path.join(__dirname,'../biblioteca/repertorio_lirico.json'),JSON.stringify(out,null,1));
const cnt=(f)=>items.reduce((a,x)=>{const k=f(x);[].concat(k).forEach(z=>a[z]=(a[z]||0)+1);return a},{});
console.log(JSON.stringify({total:items.length,nivel:cnt(x=>x.tipo+':'+x.nivel),genero:cnt(x=>x.canto.genero),cuerdas:cnt(x=>x.tipo==='obra'?x.canto.cuerdas:[]),
  conPartitura:items.filter(x=>x.enlace).length,protegidas:items.filter(x=>/Protegida|Arreglo/.test(x.canto.derechos)).length,pendientes:pend},null,1));
console.log('Sin años:',items.filter(x=>!x.canto.vidaCompositor).map(x=>x.autor).filter((v,i,a)=>a.indexOf(v)===i).join('; '));
console.log('Sin partitura (libres):',items.filter(x=>!x.enlace&&!/Protegida|Arreglo|verificar/.test(x.canto.derechos)).map(x=>x.titulo).join('; '));

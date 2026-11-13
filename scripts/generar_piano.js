// Genera biblioteca/repertorio_piano.json (repertorio de piano solo y métodos) desde la fuente y la caché de verificación.
// Uso: node scripts/generar_piano.js
const fs=require('fs'),path=require('path');
const {OBRAS,METODOS}=require('../biblioteca/fuente_piano.js');
const cache=JSON.parse(fs.readFileSync(path.join(__dirname,'../biblioteca/verificacion_cache.json'),'utf8'));
const PV='por verificar';
const sin=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const slug=s=>sin(s).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,48);
const FUENTE_NIVEL='Propuesta pedagógica de Octavia; '+PV+' con los niveles de Henle y los programas de ABRSM y RCM.';
const EDAD={basico:['6-9 años','7-10 años','8-11 años'],intermedio:['9-12 años','10-13 años','11-14 años'],avanzado:['13 años o más','14 años o más','15 años o más']};
const LATINOS=/Ginastera|Villa-Lobos|Guastavino|Nazareth|Ponce|Lecuona|Carreño/;
const DUDOSOS=['Marcha en Re mayor, BWV Anh. 122','Bourrée en mi menor (Cuaderno de Nannerl)','Sonatina en Sol mayor, Anh. 5 n.º 1','Álbum de niños, op. 98, selección','Sonatina, op. 168 n.º 1','12 estudios brillantes, op. 105','25 estudios, op. 100','50 estudios infantiles, op. 37'];
function derechos(muere,prot){
  if(prot)return {txt:'Protegido por derechos de autor: se incluye solo como referencia. Usa una edición comprada.',libre:false};
  if(!muere)return {txt:'Estado de derechos '+PV+'.',libre:false};
  if(muere<1926)return {txt:'Dominio público (el autor murió en '+muere+').',libre:true};
  if(muere<=1955)return {txt:'Dominio público en los países con vida + 70 años (el autor murió en '+muere+'); en otros países puede estar protegida: '+PV+' según tu país.',libre:true};
  return {txt:'Protegida por derechos de autor (el autor murió en '+muere+'): usa una edición comprada.',libre:false};
}
function epoca(o,comp){
  if(LATINOS.test(o.c))return 'Peruana y latinoamericana';
  if(/Debussy|Ravel|Satie/.test(o.c))return 'Impresionismo';
  if(/Field/.test(o.c))return 'Romántico';
  const m=String(o.col||'').match(/1[5-9]\d\d/);const y=m?+m[0]:(comp&&comp.muere?comp.muere-15:null);
  if(!y)return '';return y<1600?'Renacimiento':y<1750?'Barroco':y<1820?'Clásico':y<1900?'Romántico':'Siglos XX y XXI';
}
const catalogo=t=>{const m=String(t).match(/\b(BWV(?: Anh\.)? \d+(?:-\d+)?|K\. \d+|Hob\. XVI:\w+|D \d+(?: n\.º \d)?|WoO \d+|Sz\. \d+|S\. \d+|B\. \d+|Anh\. 5 n\.º 1|op\. \d+[a-z]?(?: n\.º \d+)?)/);return m?m[1]:''};
const durMin=d=>{const n=String(d||'').match(/\d+/g);if(!n)return 0;const v=n.map(Number);return Math.round(v.reduce((a,b)=>a+b,0)/v.length)};
function partitura(o,libre){if(!libre||!o.q)return '';
  const hits=cache.imslp[o.q]||[];const ap=sin((o.cw||'').split(' ').pop());
  const h=hits.find(t=>sin(t).includes(ap)||(/Notebook/.test(o.q)&&/Notebook/.test(t)));
  return h?'https://imslp.org/wiki/'+encodeURIComponent(h.replace(/ /g,'_')).replace(/%2C/g,',').replace(/%28/g,'(').replace(/%29/g,')'):''}
// Solo se aceptan datos de Wikipedia si la descripción corresponde a un músico (evita homónimos)
const MUSICO=/compos|music|pian|organ|harpsichord|pedagog|teacher|violin|singer|conductor|cellist/i;
for(const k in cache.comp){const c=cache.comp[k];if(c&&c.ok&&!MUSICO.test(c.desc||'')&&!/Notebook|Suzuki/.test(k))cache.comp[k]={ok:false,rechazado:c.desc}}
// Contenido de los libros Suzuki (New International Edition), según listados de tiendas especializadas (Sheet Music Plus, Groth Music, Johnson String, etc.).
const SUZ_FUENTE='Contenido según listados de tiendas (New International Edition); cambia entre ediciones, confírmalo con el índice del libro.';
const PIEZAS={
 1:{ok:true,t:'Twinkle, Twinkle, Little Star (variaciones), Lightly Row, The Honeybee, Cuckoo, French Children\'s Song, London Bridge, Mary Had a Little Lamb, Go Tell Aunt Rhody, Au Clair de la Lune, Long, Long Ago, Little Playmates, Chant Arabe, Allegretto 1, Goodbye to Winter, Allegretto 2, Christmas-Day Secrets, Allegro, Musette',f:'https://www.sheetmusicplus.com/en/product/suzuki-piano-school-volume-1-18128218.html'},
 2:{ok:true,t:'Écossaise (Hummel), A Short Story (Lichner), El alegre campesino op. 68 n.º 10 (Schumann), Minueto en Sol mayor (Cuaderno de Ana Magdalena), Minueto en sol menor BWV 822 (Bach), Canción de cuna op. 13 n.º 2 (Weber), Arietta (Mozart), Canción popular húngara y Niños jugando de Para niños Sz. 42 (Bartók), Melodía op. 68 (Schumann)',f:'https://www.sheetmusicplus.com/en/product/suzuki-piano-school-volume-2-18128193.html'},
 3:{ok:false,t:'Parcial: Sonatina op. 36 n.º 3 (Clementi), Canción burlona de Para niños Sz. 42 (Bartók), Minueto en sol menor del Cuaderno de Ana Magdalena (Bach), una pieza de Gurlitt y otras',f:'https://www.sheetmusicplus.com/en/product/suzuki-piano-school-volume-3-18128302.html'},
 4:{ok:true,t:'Rondó del Divertimento K. 334 y Minueto I de 8 Minuetos K. 315g (Mozart), Arabesque y Junto al arroyo de op. 100 n.º 2 y 7 (Burgmüller), Bagatela op. 5 n.º 9 (Tcherepnin), Gavota de la Suite en sol menor (Bach), Minuetos I y II y Giga de la Partita BWV 825 (Bach)',f:'https://www.sheetmusicplus.com/en/product/suzuki-piano-school-volume-4-19466271.html'},
 5:{ok:true,t:'Para Elisa WoO 59 (Beethoven), Canción antigua francesa op. 39 n.º 16 (Chaikovski), Invención n.º 1 BWV 772 (Bach), Sonatina en Fa mayor Anh. 5 n.º 2 (Beethoven), De países lejanos op. 15 n.º 1 (Schumann), Sonata Hob. XVI:35 (Haydn), Vals en la menor póstumo (Chopin), El cuco (Daquin)',f:'https://www.johnsonstring.com/sheet-music/suzuki-piano-school-volume-5-international'},
 6:{ok:false,t:'Parcial: Barcarola veneciana (Mendelssohn), Invención n.º 8 (Bach), Notturno (Grieg), Danza española n.º 5 «Andaluza» (Granados), O Polichinelo (Villa-Lobos) y otras',f:'https://www.sheetmusicplus.com/en/product/suzuki-piano-school-volume-6-19466279.html'},
 7:{ok:true,t:'Sonata en La mayor K. 331 (Mozart), Preludio y fuga en Re mayor BWV 850 (Bach), Nocturno en do sostenido menor póstumo (Chopin), El herrero armonioso (Händel), La fille aux cheveux de lin (Debussy), Danzas populares rumanas Sz. 56 (Bartók)',f:'https://www.sheetmusicplus.com/en/product/suzuki-piano-school-volume-7-19466274.html'}};
for(const m of METODOS){const n=(m.t.match(/Suzuki Piano School, Libro (\d)/)||[])[1];if(n){const p=PIEZAS[n];m.piezas=p.t+(p.ok?'':' ('+PV+')')+'. '+SUZ_FUENTE;m.fuenteExtra=p.f;m.piezasOk=p.ok}}
const items=[],pend={};const marca=k=>{pend[k]=(pend[k]||0)+1;return k};
for(const o of OBRAS){
  const comp=cache.comp[o.cw]||{};const vida=comp.nace?comp.nace+'–'+(comp.muere||''):'';
  const prot=!comp.muere||comp.muere>1955;const der=derechos(comp.muere,false);const enl=partitura(o,der.libre);
  const v=cache.yt[o.yq]||null;const pv=[];
  if(!vida)pv.push(marca('años del compositor'));
  if(/atrib|Anónimo/i.test(o.c)||DUDOSOS.includes(o.t))pv.push(marca('autoría o catálogo'));
  pv.push(marca('nivel según Henle, ABRSM y RCM'));
  if(!o.ton)pv.push(marca('tonalidad'));
  pv.push(marca('duración'));
  if(der.libre&&!enl)pv.push(marca('enlace de partitura'));
  if(comp.muere>=1926&&comp.muere<=1955)pv.push(marca('derechos según país'));
  if(!v)pv.push(marca('video de referencia'));
  items.push({id:'pno-'+slug(o.t+'-'+o.cw),tipo:'obra',titulo:o.t,autor:o.c,nivel:o.niv,sub:o.sub,enlace:enl,notas:o.just,catalogo:catalogo(o.t),epoca:epoca(o,comp),tonalidad:o.ton||'',
    caracter:o.car,objetivos:o.obj,durMin:durMin(o.dur),video:v?{id:v.id,titulo:v.titulo,canal:v.canal}:null,
    piano:{coleccion:o.col,vida,justificacion:o.just,fuenteNivel:FUENTE_NIVEL,duracion:o.dur+' (aprox.)',edad:EDAD[o.niv][o.sub-1]+' (orientativa)',derechos:der.txt,fuentes:[comp.url,enl,v?'https://www.youtube.com/watch?v='+v.id:''].filter(Boolean),porVerificar:pv}});
}
for(const m of METODOS){
  const comp=cache.comp[m.cw]||{};const persona=!/Suzuki method/.test(m.cw);const vida=persona&&comp.nace?comp.nace+'–'+(comp.muere||''):'';
  const der=derechos(comp.muere,m.prot);const enl=partitura(m,der.libre);const pv=[];
  if(persona&&!vida)pv.push(marca('años del autor'));
  if(DUDOSOS.includes(m.t))pv.push(marca('título y edición exactos'));
  if(m.piezas===PV||m.piezasOk===false)pv.push(marca('piezas del libro'));
  if(/verificar/.test(m.edad))pv.push(marca('edad recomendada'));
  if(der.libre&&!enl)pv.push(marca('enlace del libro'));
  items.push({id:'pno-met-'+slug(m.t+'-'+m.c),tipo:'metodo',titulo:m.t,autor:m.c,nivel:m.niv,sub:m.sub,enlace:enl,notas:m.trabaja,area:/estudios|Gradus|op\. (599|849|299|740|100|109|105|47|37|176|72)|Cramer/i.test(m.t)?'Estudios':'Técnica',
    objetivos:[],piano:{trabaja:m.trabaja,vida,edad:m.edad,siguiente:m.siguiente,piezas:m.piezas||'',justificacion:'Nivel '+m.niv+' '+m.sub,derechos:der.txt,fuentes:[comp.url,enl,m.fuenteExtra].filter(Boolean),porVerificar:pv}});
}
const out={nombre:'Octavia · Repertorio de piano solo y métodos',version:1,generado:new Date().toISOString().slice(0,10),
  nota:'Años de los autores: Wikidata. Partituras: IMSLP (solo dominio público). Videos: canales oficiales o de confianza, comprobados con oEmbed de YouTube. El nivel es una propuesta pedagógica marcada «por verificar».',items};
fs.writeFileSync(path.join(__dirname,'../biblioteca/repertorio_piano.json'),JSON.stringify(out,null,1));
const cnt=f=>items.reduce((a,x)=>{[].concat(f(x)).forEach(z=>a[z]=(a[z]||0)+1);return a},{});
const ob=items.filter(x=>x.tipo==='obra');
console.log(JSON.stringify({obras:ob.length,metodos:items.length-ob.length,nivel:cnt(x=>x.tipo+':'+x.nivel+x.sub),epoca:cnt(x=>x.tipo==='obra'?x.epoca||'—':[]),
  conPartitura:items.filter(x=>x.enlace).length,conVideo:ob.filter(x=>x.video).length,pendientes:pend},null,1));
console.log('Sin video:',ob.filter(x=>!x.video).map(x=>x.titulo).join('; '));
console.log('Sin años:',items.filter(x=>!x.piano.vida&&!/Suzuki/.test(x.autor)).map(x=>x.autor).filter((v,i,a)=>a.indexOf(v)===i).join('; '));

// Marca en la caché como «sin video» los resultados revisados a mano que no corresponden (homónimos, arreglos, versiones cantadas).
const fs=require('fs');const f=process.argv[2];const c=JSON.parse(fs.readFileSync(f,'utf8'));
const MAL=['Release - Topic','Marcus Viana','sings Liszt','María Ostiz','Milan Turkovic','FriarAlessandro','Mindru Katz'];
let n=0;for(const k in c.yt){const v=c.yt[k];if(v&&MAL.some(m=>(v.canal+' | '+v.titulo).includes(m))){console.log('fuera:',v.canal,'|',v.titulo);c.yt[k]=null;n++}}
fs.writeFileSync(f,JSON.stringify(c,null,1));console.log(n);

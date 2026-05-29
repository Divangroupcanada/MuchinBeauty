import fs from 'node:fs';
import path from 'node:path';
const manifest = JSON.parse(fs.readFileSync('scripts/ig-photos.json','utf8'));
const outDir = 'MuchinBeauty-files-for-github-upload/ig';
fs.mkdirSync(outDir,{recursive:true});
let ok=0,fail=0,skip=0;
for (const item of manifest){
  const dest = path.join(outDir, item.id + '.jpg');
  if (fs.existsSync(dest)){ skip++; continue; }
  try{
    const res = await fetch(item.url,{headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}});
    if(!res.ok){ console.log('FAIL',item.id,res.status); fail++; continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    if(buf.length < 1000){ console.log('TINY',item.id,buf.length); fail++; continue; }
    fs.writeFileSync(dest,buf); ok++;
  }catch(e){ console.log('ERR',item.id,e.message); fail++; }
}
console.log('DONE ok='+ok+' skip='+skip+' fail='+fail);

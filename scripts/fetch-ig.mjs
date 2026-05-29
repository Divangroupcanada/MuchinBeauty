import fs from 'node:fs';
import path from 'node:path';
const UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'};
const igDir='MuchinBeauty-files-for-github-upload/ig';
const vidDir=path.join(igDir,'vid');
fs.mkdirSync(vidDir,{recursive:true});

async function dl(url,dest,cap){
  if(fs.existsSync(dest)) return 'skip';
  try{
    const res=await fetch(url,{headers:UA});
    if(!res.ok){console.log('FAIL',path.basename(dest),res.status);return 'fail';}
    const buf=Buffer.from(await res.arrayBuffer());
    if(buf.length<800){console.log('TINY',path.basename(dest),buf.length);return 'fail';}
    if(cap && buf.length>cap){console.log('TOOBIG',path.basename(dest),(buf.length/1048576).toFixed(1)+'MB');return 'big';}
    fs.writeFileSync(dest,buf);return buf.length;
  }catch(e){console.log('ERR',path.basename(dest),e.message);return 'fail';}
}
function load(f){return fs.existsSync('scripts/'+f)?JSON.parse(fs.readFileSync('scripts/'+f,'utf8')):[];}

let stats={photo:{n:0,b:0},thumb:{n:0,b:0},video:{n:0,b:0},skip:0,fail:0,big:0};
// photos (already present, will skip) + thumbnails -> /ig/<id>.jpg
for(const it of [...load('ig-photos.json'),...load('ig-thumbs.json')]){
  const r=await dl(it.url,path.join(igDir,it.id+'.jpg'));
  if(r==='skip')stats.skip++;else if(r==='fail')stats.fail++;else{stats.thumb.n++;stats.thumb.b+=r;}
}
// videos -> /ig/vid/<id>.mp4  (cap 25MB each)
for(const it of load('ig-videos.json')){
  const r=await dl(it.url,path.join(vidDir,it.id+'.mp4'),25*1048576);
  if(r==='skip')stats.skip++;else if(r==='fail')stats.fail++;else if(r==='big')stats.big++;else{stats.video.n++;stats.video.b+=r;}
}
console.log('DONE images='+stats.thumb.n+' ('+(stats.thumb.b/1048576).toFixed(1)+'MB) videos='+stats.video.n+' ('+(stats.video.b/1048576).toFixed(1)+'MB) skip='+stats.skip+' fail='+stats.fail+' toobig='+stats.big);

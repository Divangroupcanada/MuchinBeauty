document.addEventListener('DOMContentLoaded',function(){
  var vids=document.querySelectorAll('video[data-lazy]');
  if(!('IntersectionObserver' in window)){vids.forEach(function(v){try{v.play();}catch(e){}});return;}
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      var v=e.target;
      if(e.isIntersecting){ var pr=v.play(); if(pr&&pr.catch)pr.catch(function(){}); }
      else { try{v.pause();}catch(err){} }
    });
  },{threshold:0.2});
  vids.forEach(function(v){io.observe(v);});
});

const pawURL = new URL('./assets/paw.webp', import.meta.url).href;
const stamps = new Set();
export function pawStamp(anchor, reduced) {
 if(reduced || !anchor || typeof anchor.animate !== 'function') return;
 const rect=anchor.getBoundingClientRect();
 stamp(rect.right-5,rect.top-8,600);
}
function stamp(x,y,duration=450){
 const root=document.querySelector('#paw-effects');
 if(!root || stamps.size>=6) return;
 const img=new Image();img.src=pawURL;img.alt='';img.className='paw-stamp';
 img.style.left=`${x}px`;img.style.top=`${y}px`;root.append(img);stamps.add(img);
 const animation=img.animate([
  {opacity:0,transform:'translate(-50%,-50%) scale(.7) rotate(-12deg)'},
  {opacity:.65,offset:.2,transform:'translate(-50%,-50%) scale(1) rotate(-12deg)'},
  {opacity:0,transform:'translate(-50%,-65%) scale(1) rotate(-12deg)'}
 ],{duration,easing:'ease-out'});
 animation.finished.catch(()=>{}).finally(()=>{img.remove();stamps.delete(img);});
}
export function initPawEffects(reduced,finePointer){
 const cursor=new Image();
 cursor.onload=()=>document.documentElement.classList.add('paw-ready');
 cursor.src=new URL('./assets/paw-cursor.png',import.meta.url).href;
 function clear(){stamps.forEach(img=>{img.getAnimations().forEach(a=>a.cancel());img.remove();});stamps.clear();}
 window.addEventListener('pointerdown',event=>{
  if(reduced.matches || !finePointer.matches || event.pointerType!=='mouse' || event.target.closest('video,dialog') || typeof Element.prototype.animate!=='function')return;
  stamp(event.clientX,event.clientY);
 },{passive:true});
 window.addEventListener('blur',clear);
 window.addEventListener('resize',clear,{passive:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)clear();});
 reduced.addEventListener('change',()=>{if(reduced.matches)clear();});
 finePointer.addEventListener('change',clear);
}

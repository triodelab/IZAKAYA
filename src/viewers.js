const menuDialog = document.querySelector('#menu-dialog');
const mapDialog = document.querySelector('#map-dialog');
const viewport = document.querySelector('.menu-viewport');
const pages = document.querySelector('#menu-pages');
const zoom = document.querySelector('#menu-zoom');
const menuData = {
 food: { key: 'foodTitle', pages: ['/images/menus/food-1.jpg'] },
 drinks: { key: 'drinksTitle', pages: ['/images/menus/drinks-1.jpg', '/images/menus/drinks-2.jpg'] }
};
let selected = 'food';
let zoomed = false;
const isEnglish = () => document.documentElement.lang === 'en';
const title = () => selected === 'food' ? (isEnglish() ? 'Food menu' : 'Matmeny') : (isEnglish() ? 'Drinks' : 'Drikke');
function updateZoom() {
 pages.classList.toggle('is-zoomed', zoomed);
 zoom.setAttribute('aria-pressed', String(zoomed));
 zoom.dataset.i18n = zoomed ? 'zoomOut' : 'zoomIn';
 zoom.textContent = zoomed ? (isEnglish() ? 'Fit to screen' : 'Tilpass') : (isEnglish() ? 'Zoom in' : 'Zoom inn');
 requestAnimationFrame(() => viewport.scrollTo({left: Math.max(0,(viewport.scrollWidth - viewport.clientWidth)/2), top:0}));
}
function renderMenu() {
 document.querySelector('#menu-title').textContent = title();
 document.querySelector('#menu-count').textContent = `${selected === 'food' ? '01' : '02'} / 02`;
 document.querySelectorAll('[data-select-menu]').forEach(tab => {
  const active = tab.dataset.selectMenu === selected;
  tab.setAttribute('aria-selected',String(active));
  tab.tabIndex = active ? 0 : -1;
 });
 pages.setAttribute('aria-labelledby',`${selected}-tab`);
 pages.replaceChildren(...menuData[selected].pages.map((src,index) => {
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = src;
  img.alt = `${title()} — ${isEnglish() ? 'page' : 'side'} ${index+1}`;
  img.width=1158;img.height=1638;
  figure.append(img);
  if(menuData[selected].pages.length>1){
   const caption=document.createElement('figcaption');
   caption.textContent=`${isEnglish()?'Page':'Side'} ${index+1} / ${menuData[selected].pages.length}`;
   figure.append(caption);
  }
  return figure;
 }));
 updateZoom();
}
function selectMenu(value) {selected=value;zoomed=false;renderMenu();}
document.querySelectorAll('[data-menu]').forEach(button=>button.addEventListener('click',()=>{
 selectMenu(button.dataset.menu);
 menuDialog.showModal();
}));
document.querySelectorAll('[data-select-menu]').forEach(tab=>{
 tab.addEventListener('click',()=>selectMenu(tab.dataset.selectMenu));
 tab.addEventListener('keydown',event=>{
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  event.preventDefault();
  selectMenu(event.key==='Home'?'food':event.key==='End'?'drinks':selected==='food'?'drinks':'food');
  document.querySelector(`#${selected}-tab`).focus();
 });
});
for(const id of ['previous-menu','next-menu']) document.getElementById(id).addEventListener('click',()=>selectMenu(selected==='food'?'drinks':'food'));
zoom.addEventListener('click',()=>{zoomed=!zoomed;updateZoom()});
document.querySelectorAll('[data-map]').forEach(button=>button.addEventListener('click',()=>{
 if(!mapDialog.querySelector('iframe')){
  const frame=document.createElement('iframe');
  frame.title=isEnglish()?'Izakaya Oslo on Google Maps':'Izakaya Oslo på Google Maps';
  frame.src='https://www.google.com/maps?q=Izakaya%20St.%20Olavs%20gate%207%20Oslo&output=embed';
  frame.referrerPolicy='no-referrer-when-downgrade';
  frame.allowFullscreen=true;
  mapDialog.querySelector('.map-frame').append(frame);
 }
 mapDialog.showModal();
}));
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
mapDialog.addEventListener('click',event=>{
 if(event.target!==mapDialog)return;
 const bounds=mapDialog.getBoundingClientRect();
 if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)mapDialog.close();
});
document.addEventListener('languagechange',()=>{if(menuDialog.open)renderMenu()});

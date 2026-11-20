import {statuses,icons,validateCatalog,filterTools} from './catalog.js';
const $=id=>document.getElementById(id);
let tools=[],status='all';
const theme=$('theme');
function updateTheme(){const dark=document.documentElement.dataset.theme==='dark';theme.setAttribute('aria-pressed',String(dark));theme.setAttribute('aria-label',dark?'Увімкнути світлу тему':'Увімкнути темну тему');}
theme.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;try{localStorage.setItem('rk-theme',next);}catch{}updateTheme();});updateTheme();
function element(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;}
function card(t){
  const available=['ready','beta'].includes(t.status);
  const c=element(available?'a':'article',available?'card card-link':'card'),top=element('div','card-top'),icon=element('div','tool-icon');icon.setAttribute('aria-hidden','true');
  if(available){c.href=t.url;c.setAttribute('aria-label',`Відкрити ${t.name}`);}
  // SVG strings come only from the fixed local allowlist, never from JSON.
  icon.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icons[t.icon]}</svg>`;
  top.append(icon,element('span',`badge ${t.status}`,statuses[t.status]));
  c.append(top,element('h3','',t.name),element('p','description',t.description));
  const bottom=element('div','card-bottom');bottom.append(element('span','',t.version?`Версія ${t.version}`:'Версію ще не випущено'));
  if(!available)bottom.append(element('span','',t.status==='planned'?'Незабаром':'Готується до публікації'));
  c.append(bottom);return c;
}
function render(){const visible=filterTools(tools,'','',status);$('tools').replaceChildren(...visible.map(card));$('result-count').textContent=`Показано ${visible.length} з ${tools.length}`;$('message').hidden=visible.length>0;$('message').textContent=tools.length?'Інструментів із цим статусом поки немає.':'Каталог поки порожній.';}
async function load(){
  $('retry').hidden=true;$('message').hidden=false;$('message').textContent='Завантаження каталогу…';
  try{const response=await fetch(new URL('../tools.json',import.meta.url),{cache:'no-cache'});if(!response.ok)throw Error(`HTTP ${response.status}`);tools=validateCatalog(await response.json());
    $('total').textContent=String(tools.length);render();
  }catch(error){tools=[];$('tools').replaceChildren();$('total').textContent='–';$('result-count').textContent='';$('message').textContent='Не вдалося завантажити каталог. Перевірте з’єднання та спробуйте ще раз.';$('message').hidden=false;$('retry').hidden=false;console.error('Catalog:',error);}
}
$('filters').addEventListener('click',e=>{const b=e.target.closest('button[data-filter]');if(!b)return;status=b.dataset.filter;for(const item of $('filters').querySelectorAll('button'))item.setAttribute('aria-pressed',String(item===b));render();});
$('retry').addEventListener('click',load);
load();

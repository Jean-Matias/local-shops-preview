const categories={
  'milk-teas':{title:'Milk teas',kicker:'A few to try',items:['Taro Milk Green Tea','Jasmine Milk Tea','Coffee Milk Tea with Sea Salt Cream and Coffee Jelly']},
  'classic-teas':{title:'Classic teas',kicker:'A few to try',items:['Thai Tea']},
  'fruit-teas':{title:'Fruit teas',kicker:'Take a look at the full menu',items:[]},
  coffee:{title:'Espresso & cold brew',kicker:'A cafe favorite',items:['Blush Latte']},
  'ice-cream':{title:'In-house ice cream',kicker:'Take a look at the full menu',items:[]}
};
const buttons=[...document.querySelectorAll('.category-button')];
const featuredList=document.querySelector('#featured-list');
const heading=document.querySelector('#menu-current-title');
const kicker=document.querySelector('#menu-kicker');
function showCategory(key){const data=categories[key];if(!data)return;buttons.forEach((button)=>{const active=button.dataset.category===key;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active))});heading.textContent=data.title;kicker.textContent=data.kicker;featuredList.replaceChildren(...data.items.map((name)=>{const item=document.createElement('li');item.textContent=name;return item}));if(!data.items.length){const item=document.createElement('li');item.textContent='Check the current menu for today’s selection.';featuredList.append(item)}}
buttons.forEach((button)=>button.addEventListener('click',()=>showCategory(button.dataset.category)));showCategory('milk-teas');
const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.site-nav');
function closeNav(restoreFocus=false){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');nav.classList.remove('is-open');if(restoreFocus)toggle.focus()}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'Open navigation':'Close navigation');nav.classList.toggle('is-open',!open)});
nav.querySelectorAll('a').forEach((link)=>link.addEventListener('click',()=>closeNav()));document.addEventListener('keydown',(event)=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true')closeNav(true)});document.addEventListener('click',(event)=>{if(toggle.getAttribute('aria-expanded')==='true'&&!nav.contains(event.target)&&!toggle.contains(event.target))closeNav()});

// Shared catalog store for devlinks — used by the public site and the admin panel.
// Single source of truth, persisted to localStorage so admin edits show up on the site.

export const CATALOG_KEY = 'devlinks_catalog_v1';
export const PROJECTS_KEY = 'devlinks_projects_v1';

export const PLANS = ['free', 'paid'];

// A small library of icon paths (Lucide-style, single <path d>) the admin can pick from.
export const ICONS = [
  {id:'globe', d:'M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10zM2 12h20M12 2c2.6 2.8 2.6 17.2 0 20M12 2c-2.6 2.8-2.6 17.2 0 20'},
  {id:'server', d:'M4 4h16v6H4zM4 14h16v6H4zM7 7h.01M7 17h.01'},
  {id:'droplet', d:'M12 2.7C12 2.7 5 9 5 14a7 7 0 0 0 14 0c0-5-7-11.3-7-11.3z'},
  {id:'type', d:'M4 6V4h16v2M12 4v16M8 20h8'},
  {id:'code', d:'M8 6l-6 6 6 6M16 6l6 6-6 6'},
  {id:'terminal', d:'M2 4h20v12H2zM7 20h10M9 9l-2 2 2 2M15 9l2 2-2 2'},
  {id:'grid', d:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z'},
  {id:'image', d:'M3 3h18v18H3zM3 16l5-5 4 4 3-3 6 6M8.5 8.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'},
  {id:'layers', d:'M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5'},
  {id:'box', d:'M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v9'},
  {id:'frame', d:'M3 3h13v9M3 3v15h15M3 14l4-4 3 3M19 3v6M16 6h6'},
  {id:'monitor', d:'M2 5h14v9H2zM6 18h6M14 9h7v11h-7zM17 17h.01'},
  {id:'book', d:'M4 4h12a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2V4zM4 18a2 2 0 0 1 2-2h12'},
  {id:'layout', d:'M3 4h18v16H3zM3 9h18M9 9v11'},
  {id:'check-circle', d:'M22 11.5V12a10 10 0 1 1-5.9-9.1M22 4 12 14.5l-3-3'},
  {id:'graduation', d:'M22 10 12 5 2 10l10 5 10-5zM6 12v5c0 1 3 3 6 3s6-2 6-3v-5'},
  {id:'star', d:'M12 17.3l-5.5 3.3 1.5-6.3-4.9-4.2 6.4-.5L12 4l2.5 5.9 6.4.5-4.9 4.2 1.5 6.3z'},
  {id:'zap', d:'M13 2 3 14h7l-1 8 10-12h-7l1-8z'},
  {id:'package', d:'M21 16V8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v9'},
  {id:'database', d:'M12 8c5 0 9-1.3 9-3s-4-3-9-3-9 1.3-9 3 4 3 9 3zM3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3'},
  {id:'cpu', d:'M5 5h14v14H5zM9 9h6v6H9M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3'},
];

export const DEFAULT_CATEGORIES = [
  {id:'domains', ru:'Домены', en:'Domains', icon:'M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10zM2 12h20M12 2c2.6 2.8 2.6 17.2 0 20M12 2c-2.6 2.8-2.6 17.2 0 20', links:[
    {name:'Reg.ru', url:'https://reg.ru', ru:'Регистратор доменов №1 в России', en:'Russia\u2019s #1 domain registrar', plan:'paid'},
    {name:'2domains', url:'https://2domains.ru', ru:'Дешёвый регистратор, партнёр reg.ru', en:'Cheap registrar, reg.ru partner', plan:'paid'},
    {name:'Webnames', url:'https://www.webnames.ru', ru:'Ещё один надёжный регистратор доменов', en:'Another reliable domain registrar', plan:'paid'},
  ]},
  {id:'hosting', ru:'Хостинги', en:'Hosting', icon:'M4 4h16v6H4zM4 14h16v6H4zM7 7h.01M7 17h.01', links:[
    {name:'Макхост', url:'https://mchost.ru', ru:'Один из лидеров среди хостингов', en:'A leading hosting provider', plan:'paid'},
    {name:'Джино', url:'https://jino.ru', ru:'Хостинг-конструктор, платите за нужное', en:'Hosting builder, pay only for what you use', plan:'paid'},
    {name:'Timeweb', url:'https://timeweb.com', ru:'Популярный хостинг и облачные серверы', en:'Popular hosting & cloud servers', plan:'paid'},
    {name:'Vercel', url:'https://vercel.com', ru:'Хостинг для фронтенда и Next.js', en:'Front-end & Next.js hosting', plan:'free'},
  ]},
  {id:'design', ru:'Дизайн', en:'Design', icon:'M12 2.7C12 2.7 5 9 5 14a7 7 0 0 0 14 0c0-5-7-11.3-7-11.3z', links:[
    {name:'Figma', url:'https://figma.com', ru:'Онлайн-редактор интерфейсов', en:'Online interface design tool', plan:'free'},
    {name:'Photopea', url:'https://photopea.com', ru:'Бесплатный аналог Photoshop в браузере', en:'Free Photoshop alternative in the browser', plan:'free'},
    {name:'Photoshop', url:'https://www.adobe.com/products/photoshop.html', ru:'Стандарт индустрии графических редакторов', en:'The industry-standard image editor', plan:'paid'},
    {name:'Sketch', url:'https://www.sketch.com', ru:'Векторный редактор для macOS', en:'Vector design tool for macOS', plan:'paid'},
    {name:'Adobe XD', url:'https://www.adobe.com/products/xd.html', ru:'Платный конкурент Figma', en:'Paid Figma competitor', plan:'paid'},
    {name:'Zeplin', url:'https://zeplin.io', ru:'Передача макетов разработчикам', en:'Design handoff for developers', plan:'free'},
    {name:'Moqups', url:'https://moqups.com', ru:'Онлайн-сервис для мокапов и схем', en:'Online mockups & wireframes', plan:'free'},
  ]},
  {id:'fonts', ru:'Шрифты', en:'Fonts', icon:'M4 6V4h16v2M12 4v16M8 20h8', links:[
    {name:'Google Fonts', url:'https://fonts.google.com', ru:'Бесплатные веб-шрифты от Google', en:'Free web fonts by Google', plan:'free'},
    {name:'Adobe Fonts', url:'https://fonts.adobe.com', ru:'Веб-шрифты от Adobe', en:'Web fonts by Adobe', plan:'paid'},
    {name:'AnyConv', url:'https://anyconv.com/ru/konverter-shriftov/', ru:'Онлайн-конвертер веб-шрифтов', en:'Online web font converter', plan:'free'},
  ]},
  {id:'editors', ru:'Редакторы кода', en:'Code editors', icon:'M8 6l-6 6 6 6M16 6l6 6-6 6', links:[
    {name:'VS Code', url:'https://code.visualstudio.com', ru:'Мощный бесплатный редактор от Microsoft', en:'Powerful free editor by Microsoft', plan:'free'},
    {name:'Cursor', url:'https://cursor.com', ru:'ИИ-редактор кода на базе VS Code', en:'AI-powered code editor', plan:'free'},
    {name:'Sublime Text', url:'https://www.sublimetext.com', ru:'Быстрый и лёгкий редактор кода', en:'Fast, lightweight code editor', plan:'free'},
    {name:'WebStorm', url:'https://www.jetbrains.com/webstorm/', ru:'IDE для JavaScript от JetBrains', en:'JavaScript IDE by JetBrains', plan:'paid'},
    {name:'Notepad++', url:'https://notepad-plus-plus.org', ru:'Лёгкий текстовый редактор', en:'Lightweight text editor', plan:'free'},
  ]},
  {id:'online', ru:'Онлайн-редакторы', en:'Online editors', icon:'M2 4h20v12H2zM7 20h10M9 9l-2 2 2 2M15 9l2 2-2 2', links:[
    {name:'CodePen', url:'https://codepen.io', ru:'Песочница для фронтенда', en:'Front-end playground', plan:'free'},
    {name:'CodeSandbox', url:'https://codesandbox.io', ru:'Онлайн-IDE для веб-приложений', en:'Online IDE for web apps', plan:'free'},
    {name:'StackBlitz', url:'https://stackblitz.com', ru:'Мгновенные дев-среды в браузере', en:'Instant dev environments', plan:'free'},
    {name:'JSFiddle', url:'https://jsfiddle.net', ru:'Простой онлайн-редактор кода', en:'Simple online code playground', plan:'free'},
    {name:'Replit', url:'https://replit.com', ru:'Облачная среда разработки', en:'Cloud IDE', plan:'free'},
  ]},
  {id:'icons', ru:'Иконки', en:'Icons', icon:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z', links:[
    {name:'Lucide', url:'https://lucide.dev', ru:'Открытый набор аккуратных иконок', en:'Open-source icon set', plan:'free'},
    {name:'Heroicons', url:'https://heroicons.com', ru:'Иконки от создателей Tailwind', en:'Icons by the Tailwind team', plan:'free'},
    {name:'Flaticon', url:'https://www.flaticon.com', ru:'Огромная база векторных иконок', en:'Huge vector icon library', plan:'free'},
    {name:'Iconfinder', url:'https://www.iconfinder.com', ru:'Высококачественные иконки', en:'High-quality icons', plan:'free'},
    {name:'Favicon.io', url:'https://favicon.io', ru:'Онлайн-генератор фавиконок', en:'Online favicon generator', plan:'free'},
  ]},
  {id:'graphics', ru:'Графика и фото', en:'Graphics & photos', icon:'M3 3h18v18H3zM3 16l5-5 4 4 3-3 6 6M8.5 8.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z', links:[
    {name:'Unsplash', url:'https://unsplash.com', ru:'Бесплатные фото высокого качества', en:'Free high-res photos', plan:'free'},
    {name:'Pexels', url:'https://www.pexels.com', ru:'Бесплатные фото и видео', en:'Free stock photos & videos', plan:'free'},
    {name:'Squoosh', url:'https://squoosh.app', ru:'Онлайн-сжатие изображений', en:'Online image compression', plan:'free'},
    {name:'Shutterstock', url:'https://www.shutterstock.com', ru:'Стоковые изображения и фото', en:'Stock images & photos', plan:'paid'},
    {name:'Depositphotos', url:'https://depositphotos.com', ru:'Фотобанк с премиум-коллекцией', en:'Premium stock photo bank', plan:'paid'},
    {name:'iStock', url:'https://www.istockphoto.com', ru:'Стоковые фото и векторы', en:'Stock photos & vectors', plan:'paid'},
  ]},
  {id:'preproc', ru:'Препроцессоры', en:'Preprocessors', icon:'M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5', links:[
    {name:'Sass / SCSS', url:'https://sass-lang.com', ru:'Самый зрелый CSS-препроцессор', en:'The most mature CSS preprocessor', plan:'free'},
    {name:'Less', url:'https://lesscss.org', ru:'CSS-препроцессор', en:'CSS preprocessor', plan:'free'},
    {name:'PostCSS', url:'https://postcss.org', ru:'Трансформация CSS плагинами', en:'Transform CSS with plugins', plan:'free'},
    {name:'Pug', url:'https://pugjs.org', ru:'HTML-препроцессор и шаблонизатор', en:'HTML template engine', plan:'free'},
    {name:'Haml', url:'https://haml.info', ru:'Лаконичный HTML-препроцессор', en:'Concise HTML preprocessor', plan:'free'},
  ]},
  {id:'frameworks', ru:'Фреймворки', en:'Frameworks', icon:'M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v9', links:[
    {name:'Tailwind CSS', url:'https://tailwindcss.com', ru:'Utility-first CSS-фреймворк', en:'Utility-first CSS framework', plan:'free'},
    {name:'Bootstrap', url:'https://getbootstrap.com', ru:'HTML, CSS и JS фреймворк', en:'HTML, CSS & JS framework', plan:'free'},
    {name:'React', url:'https://react.dev', ru:'Библиотека для интерфейсов от Meta', en:'UI library by Meta', plan:'free'},
    {name:'Vue', url:'https://vuejs.org', ru:'Прогрессивный JS-фреймворк', en:'The progressive JS framework', plan:'free'},
  ]},
  {id:'imggen', ru:'Заглушки изображений', en:'Image placeholders', icon:'M3 3h13v9M3 3v15h15M3 14l4-4 3 3M19 3v6M16 6h6', links:[
    {name:'Lorem Picsum', url:'https://picsum.photos', ru:'Случайные изображения-заглушки', en:'Random placeholder images', plan:'free'},
    {name:'Placeholder.com', url:'https://placeholder.com', ru:'Генератор заглушек изображений', en:'Image placeholder generator', plan:'free'},
    {name:'UI Avatars', url:'https://ui-avatars.com', ru:'Аватары-заглушки по инициалам', en:'Initials-based avatar placeholders', plan:'free'},
  ]},
  {id:'responsive', ru:'Адаптивность', en:'Responsive testing', icon:'M2 5h14v9H2zM6 18h6M14 9h7v11h-7zM17 17h.01', links:[
    {name:'Responsively', url:'https://responsively.app', ru:'Просмотр сайта на многих экранах', en:'Preview site across many screens', plan:'free'},
    {name:'Am I Responsive', url:'https://ui.dev/amiresponsive', ru:'Быстрый предпросмотр адаптивности', en:'Quick responsive preview', plan:'free'},
  ]},
  {id:'guides', ru:'Справочники', en:'References', icon:'M4 4h12a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2V4zM4 18a2 2 0 0 1 2-2h12', links:[
    {name:'MDN Web Docs', url:'https://developer.mozilla.org', ru:'Документация по веб-технологиям', en:'The web platform documentation', plan:'free'},
    {name:'Can I use', url:'https://caniuse.com', ru:'Поддержка фич браузерами', en:'Browser feature support tables', plan:'free'},
    {name:'БЭМ', url:'https://ru.bem.info', ru:'Методология веб-разработки', en:'BEM web development methodology', plan:'free'},
    {name:'htmlreference.io', url:'https://htmlreference.io', ru:'Бесплатный справочник по HTML', en:'Free HTML reference', plan:'free'},
    {name:'HTML5 Boilerplate', url:'https://html5boilerplate.com', ru:'Популярный стартовый шаблон', en:'Popular front-end template', plan:'free'},
  ]},
  {id:'builders', ru:'Конструкторы сайтов', en:'Website builders', icon:'M3 4h18v16H3zM3 9h18M9 9v11', links:[
    {name:'Tilda', url:'https://tilda.cc', ru:'Блочный конструктор сайтов', en:'Block-based website builder', plan:'free'},
    {name:'Webflow', url:'https://webflow.com', ru:'Визуальный конструктор сайтов', en:'Visual website builder', plan:'free'},
    {name:'Framer', url:'https://framer.com', ru:'Сайты и прототипы без кода', en:'No-code sites & prototypes', plan:'free'},
  ]},
  {id:'validation', ru:'Валидация кода', en:'Code validation', icon:'M22 11.5V12a10 10 0 1 1-5.9-9.1M22 4 12 14.5l-3-3', links:[
    {name:'W3C Markup Validator', url:'https://validator.w3.org', ru:'Валидация HTML-кода', en:'HTML markup validation', plan:'free'},
    {name:'W3C CSS Validator', url:'https://jigsaw.w3.org/css-validator/', ru:'Валидация CSS-кода', en:'CSS validation', plan:'free'},
  ]},
  {id:'learn', ru:'Курсы и статьи', en:'Courses & articles', icon:'M22 10 12 5 2 10l10 5 10-5zM6 12v5c0 1 3 3 6 3s6-2 6-3v-5', links:[
    {name:'JavaScript.info', url:'https://javascript.info', ru:'Современный учебник JavaScript', en:'The modern JavaScript tutorial', plan:'free'},
    {name:'web.dev', url:'https://web.dev', ru:'Гайды по современному вебу от Google', en:'Modern web guides by Google', plan:'free'},
    {name:'CSS Grid Guide', url:'https://css-tricks.com/snippets/css/complete-guide-grid/', ru:'Полное руководство по CSS Grid', en:'Complete guide to CSS Grid', plan:'free'},
    {name:'Flexbox Guide', url:'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', ru:'Полное руководство по Flexbox', en:'Complete guide to Flexbox', plan:'free'},
    {name:'Git How To', url:'https://githowto.com', ru:'Интерактивный тур по основам Git', en:'Interactive guided Git tour', plan:'free'},
  ]},
];

export const DEFAULT_PROJECTS = [
  {name:'Портфолио — Азат Мурсиев', url:'https://azatmursiev.com', status:'online', stack:['HTML','CSS','JS'], year:2026, noteRu:'Личный сайт-портфолио, системный аналитик', noteEn:'Personal portfolio site, systems analyst'},
  {name:'Полезные ссылки', url:'https://azatmursiev.com/links', status:'online', stack:['React','HTML','CSS'], year:2026, noteRu:'Подборка сервисов для веб-разработчиков', noteEn:'A curated toolbox for web developers'},
  {name:'Генератор паролей', url:'https://azatmursiev.com/pass', status:'online', stack:['HTML','CSS','JS'], year:2026, noteRu:'Генерация надёжных паролей в браузере', noteEn:'Strong password generator in the browser'},
  {name:'Капсула — обмен файлами', url:'https://azatmursiev.com/files', status:'online', stack:['PHP','JS'], year:2026, noteRu:'Обмен файлами по временной ссылке', noteEn:'Share files via a temporary link'},
  {name:'Конвертер валют', url:'https://azatmursiev.com/exchange', status:'online', stack:['JS','API'], year:2026, noteRu:'Конвертер валют по актуальному курсу', noteEn:'Currency converter with live rates'},
  {name:'Snag — загрузчик видео', url:'https://azatmursiev.com/snag', status:'online', stack:['Python','FastAPI'], year:2026, noteRu:'Загрузка видео с YouTube', noteEn:'Download videos from YouTube'},
  {name:'Калькуляторы', url:'https://azatmursiev.com/china', status:'online', stack:['HTML','CSS','JS'], year:2026, noteRu:'Набор полезных калькуляторов', noteEn:'A set of handy calculators'},
];

export function uid(prefix){ return (prefix||'id') + '-' + Math.random().toString(36).slice(2,9); }

export function slug(s){ return String(s||'').toLowerCase().replace(/[^a-z0-9а-яё]+/gi,'-').replace(/(^-|-$)/g,''); }

export function favicon(url){
  try{ const h=new URL(url).hostname.replace(/^www\./,''); return 'https://www.google.com/s/favicons?sz=64&domain='+h; }
  catch(e){ return ''; }
}

function clone(x){ return JSON.parse(JSON.stringify(x)); }

// Ensure every category/link has a stable internal _id for the admin to reference.
function ensureIds(cats){
  cats.forEach(c=>{
    if(!c._id) c._id = uid('cat');
    (c.links||[]).forEach(l=>{ if(!l._id) l._id = uid('lnk'); });
  });
  return cats;
}

export function loadCatalog(){
  try{
    const raw = localStorage.getItem(CATALOG_KEY);
    if(raw){ const v = JSON.parse(raw); if(Array.isArray(v) && v.length) return ensureIds(v); }
  }catch(e){}
  return ensureIds(clone(DEFAULT_CATEGORIES));
}

export function saveCatalog(cats){
  try{ localStorage.setItem(CATALOG_KEY, JSON.stringify(cats)); }catch(e){}
}

export function loadProjects(){
  try{
    const raw = localStorage.getItem(PROJECTS_KEY);
    if(raw){ const v = JSON.parse(raw); if(Array.isArray(v)) return v.map(p=>({_id:p._id||uid('prj'),...p})); }
  }catch(e){}
  return clone(DEFAULT_PROJECTS).map(p=>({_id:uid('prj'),...p}));
}

export function saveProjects(list){
  try{ localStorage.setItem(PROJECTS_KEY, JSON.stringify(list)); }catch(e){}
}

// Tycho Research home: language and theme toggles.
// Uses the same storage keys as the PolyPerf site (pp-lang, pp-theme), so a choice made on one carries to the other.
(function(){
  const root=document.documentElement;
  const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
  const qs=new URLSearchParams(location.search);   // ?theme=dark|light&lang=en|zh (also remembered)
  if(qs.get('lang'))store.set('pp-lang',qs.get('lang')); if(qs.get('theme'))store.set('pp-theme',qs.get('theme'));
  root.dataset.lang=store.get('pp-lang')||'en';   // English first; 中文 via the toggle
  const th=store.get('pp-theme'); if(th)root.dataset.theme=th;
  const isDark=()=>root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;

  const svg=p=>`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
  const SUN=svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>');
  const MOON=svg('<path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z"/>');
  const langBtn=document.getElementById('langbtn'), themeBtn=document.getElementById('themebtn');
  const paint=()=>{root.lang=root.dataset.lang==='zh'?'zh-CN':'en';themeBtn.innerHTML=isDark()?SUN:MOON};
  paint();
  langBtn.onclick=()=>{root.dataset.lang=root.dataset.lang==='zh'?'en':'zh';store.set('pp-lang',root.dataset.lang);paint()};
  themeBtn.onclick=()=>{root.dataset.theme=isDark()?'light':'dark';store.set('pp-theme',root.dataset.theme);paint()};
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change',paint);

  // ?check=1 : layout self-check for headless runs; writes "scrollWidth/clientWidth offenders" to <body data-overflow>
  if(qs.get('check'))setTimeout(()=>{const w=root.scrollWidth,c=root.clientWidth;
    const wide=[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>c+1).slice(0,5).map(e=>e.tagName+'.'+e.className).join(',');
    document.body.setAttribute('data-overflow',w+'/'+c+' '+wide)},2500);
})();

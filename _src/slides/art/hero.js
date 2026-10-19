// Render a module's guidebook hero art (no text) at 16:9 for the title slide.
// usage: node hero.js <module-number> <out.png> [variant]
const {chromium}=require('playwright');
const [n,out,variant]=process.argv.slice(2);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:900},deviceScaleFactor:1.5});
await p.goto(`file://${require('path').resolve(__dirname,'../../..')}/chapters/ch${String(n).padStart(2,'0')}/index.html`);
await p.addStyleTag({content:`.bookbar,header,.skip-link{display:none!important}
 .banner{height:900px!important;min-height:900px!important} .banner .inner{visibility:hidden!important}`});
await p.evaluate((variant)=>{
  const NS='http://www.w3.org/2000/svg';
  const tree=document.querySelector('.hero-tree');
  const add=(markup)=>{const g=document.createElementNS(NS,'g');g.innerHTML=markup;tree.appendChild(g);};
  if(variant==='map'){ // owl holding a folded trail map
    add(`<g transform="translate(193 521)">
      <polygon points="0,4 13,0 26,4 39,0 39,22 26,26 13,22 0,26" fill="#f6e7c1"/>
      <polygon points="13,0 26,4 26,26 13,22" fill="#e6cf98"/>
      <path d="M4 20 C 10 12, 16 18, 21 11 S 31 8, 34 6" fill="none" stroke="#c0392b" stroke-width="1.6" stroke-dasharray="2.5 2" stroke-linecap="round"/>
      <path d="M31.5 3.5 l5 5 M36.5 3.5 l-5 5" stroke="#011d41" stroke-width="1.6" stroke-linecap="round"/>
    </g>`);
  }
  if(variant==='crew'){ // a second, smaller owl beside the first on the branch
    const g=document.querySelector('.hero-tree g[transform]'); const c=g.cloneNode(true);
    c.setAttribute('transform','translate(272 546) scale(.15) translate(-250 -442)'); g.parentNode.appendChild(c);
  }
},variant||'');
await new Promise(r=>setTimeout(r,300));
const h=await p.$(".banner"); await h.screenshot({path:out}); await b.close();})();

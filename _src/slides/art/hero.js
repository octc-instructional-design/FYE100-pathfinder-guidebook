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
  if(variant==='watch'){ // owl holding a pocket watch on a chain
    add(`<g transform="translate(212 530)">
      <path d="M-14 -16 C -10 -6, -4 -10, 0 -12" fill="none" stroke="#f2a71b" stroke-width="1.4" stroke-dasharray="1.6 1.4"/>
      <rect x="-2" y="-15" width="4" height="4" rx="1" fill="#f2a71b"/>
      <circle cx="0" cy="0" r="12" fill="#f2a71b" stroke="#011d41" stroke-width="1.6"/>
      <circle cx="0" cy="0" r="8.6" fill="#fff8e6"/>
      <path d="M0 0 V-6 M0 0 L4.5 2.5" stroke="#011d41" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="1.2" fill="#011d41"/>
    </g>`);
  }
  if(variant==='book'){ // owl with an open book and a magnifying glass
    add(`<g transform="translate(193 524)">
      <path d="M0 4 Q 10 0 19 4 L19 22 Q 10 18 0 22 Z" fill="#fff8e6"/>
      <path d="M19 4 Q 28 0 38 4 L38 22 Q 28 18 19 22 Z" fill="#f1e3c0"/>
      <path d="M4 9 h11 M4 13 h11 M23 9 h11 M23 13 h8" stroke="#3d7fb8" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="35" cy="-2" r="7" fill="rgba(191,227,247,.55)" stroke="#f2a71b" stroke-width="2.2"/>
      <path d="M40 3 l6 6" stroke="#f2a71b" stroke-width="3" stroke-linecap="round"/>
    </g>`);
  }
  if(variant==='jar'){ // owl beside a coin jar
    add(`<g transform="translate(238 518)">
      <rect x="-1" y="-3" width="20" height="4" rx="1.5" fill="#0a4c86"/>
      <path d="M0 1 h18 v18 q0 3 -3 3 h-12 q-3 0 -3 -3 Z" fill="rgba(191,227,247,.45)" stroke="#bfe3f7" stroke-width="1.2"/>
      <circle cx="6" cy="17" r="3.4" fill="#f2a71b" stroke="#b98200" stroke-width=".8"/>
      <circle cx="12.5" cy="17.5" r="3.4" fill="#f2a71b" stroke="#b98200" stroke-width=".8"/>
      <circle cx="9" cy="12" r="3.4" fill="#f2a71b" stroke="#b98200" stroke-width=".8"/>
      <circle cx="9" cy="-9" r="3.6" fill="#f2a71b" stroke="#b98200" stroke-width=".8"/>
    </g>`);
  }
  if(variant==='mic'){ // owl telling its story: a microphone and a few stars
    add(`<g transform="translate(225 523) scale(1.5)">
      <rect x="-1.6" y="0" width="3.2" height="16" rx="1.4" fill="#011d41"/>
      <circle cx="0" cy="-3" r="6" fill="#f2a71b" stroke="#011d41" stroke-width="1.4"/>
      <path d="M-3.5 -5 h7 M-4.5 -2 h9 M-3.5 1 h7" stroke="#b98200" stroke-width="1"/>
    </g>
    <g fill="#ffc94a">
      <path d="M248 498 l2.2 4.6 5 .7 -3.6 3.5 .9 5 -4.5 -2.4 -4.5 2.4 .9 -5 -3.6 -3.5 5 -.7z"/>
      <path d="M262 515 l1.5 3 3.3 .5 -2.4 2.3 .6 3.3 -3 -1.6 -3 1.6 .6 -3.3 -2.4 -2.3 3.3 -.5z"/>
      <path d="M176 504 l1.3 2.7 3 .4 -2.2 2.1 .5 3 -2.6 -1.4 -2.6 1.4 .5 -3 -2.2 -2.1 3 -.4z"/>
    </g>`);
    const t=document.querySelector('.banner-art g[transform] text'); if(t){t.textContent='STAR(T)'; const r=t.parentNode.querySelector('rect[rx]'); r.setAttribute('width','92'); r.setAttribute('x','-46');}
  }
  if(variant==='crew'){ // a second, smaller owl beside the first on the branch
    const g=document.querySelector('.hero-tree g[transform]'); const c=g.cloneNode(true);
    c.setAttribute('transform','translate(272 546) scale(.15) translate(-250 -442)'); g.parentNode.appendChild(c);
  }
},variant||'');
await new Promise(r=>setTimeout(r,300));
const h=await p.$(".banner"); await h.screenshot({path:out}); await b.close();})();

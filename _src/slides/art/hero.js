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
  if(variant==='mic'){ // capstone: the owl waves a checkered start flag (variant name kept for history)
    add(`<defs><pattern id="chk" patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(-8)">
        <rect width="7" height="7" fill="#ffffff"/><rect width="3.5" height="3.5" fill="#111"/><rect x="3.5" y="3.5" width="3.5" height="3.5" fill="#111"/></pattern></defs>
      <line x1="243" y1="522" x2="256" y2="460" stroke="#e8eef5" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="256.2" cy="459" r="1.8" fill="#e8eef5"/>
      <path d="M255.5 462 C 264 456, 272 466, 288 458 L 292 481 C 278 489, 268 478, 259.5 484 Z" fill="url(#chk)" stroke="#e8eef5" stroke-width="1"/>
      <polygon points="236,521 244,500 251,503 243,526" fill="#0a4c86"/>
      <ellipse cx="248.5" cy="501" rx="4" ry="3.2" fill="#3d7fb8"/>`);
    // a starry sky, kept out of the band where the slide text sits
    const sky=document.createElement('div');
    sky.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:0';
    const pts=[[330,40,7],[520,38,4],[700,30,5],[880,42,3.5],[1010,28,6],[1190,48,4],[1350,38,5],[1500,44,3.5],[1570,30,4.5],
               [1555,190,5],[1530,300,3.5],[1575,410,4],[1545,520,3],[1440,640,3.5],[1270,700,3],
               [230,170,4],[360,250,3],[300,360,5],[440,140,3.5],[420,450,3],[190,560,3.5],[860,720,3],[620,730,3.5]];
    const star=(x,y,r)=>`<path transform="translate(${x} ${y}) scale(${r/3})" d="M0 -5 L1.2 -1.2 5 0 1.2 1.2 0 5 -1.2 1.2 -5 0 -1.2 -1.2Z"/>`;
    const dots=[[600,18],[770,28],[960,30],[1110,16],[1290,22],[1420,18],[1470,250],[1585,600],[270,90],[350,520],[480,300],[1150,690],[760,690]];
    sky.innerHTML=`<svg viewBox="0 0 1600 900" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
      <g fill="#ffe08a" opacity=".9">${pts.map(p=>star(...p)).join('')}</g>
      <g fill="#ffffff" opacity=".7">${dots.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.4"/>`).join('')}</g></svg>`;
    const ban=document.querySelector('.banner'); ban.style.position='relative'; ban.insertBefore(sky, ban.firstChild);
    const t=document.querySelector('.banner-art g[transform] text'); if(t){t.textContent='STAR(T)'; const r=t.parentNode.querySelector('rect[rx]'); r.setAttribute('width','92'); r.setAttribute('x','-46');}
  }
  if(variant==='crew'){ // a second, smaller owl beside the first on the branch
    const g=document.querySelector('.hero-tree g[transform]'); const c=g.cloneNode(true);
    c.setAttribute('transform','translate(272 546) scale(.15) translate(-250 -442)'); g.parentNode.appendChild(c);
  }
},variant||'');
await new Promise(r=>setTimeout(r,300));
const h=await p.$(".banner"); await h.screenshot({path:out}); await b.close();})();

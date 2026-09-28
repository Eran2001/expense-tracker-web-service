(function(){
if(window.__lxKit)return;window.__lxKit=1;
const I={
star:'<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
filter:'<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
sliders:'<path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>',
'chevron-left':'<path d="m15 18-6-6 6-6"/>','chevron-right':'<path d="m9 18 6-6-6-6"/>','chevron-down':'<path d="m6 9 6 6 6-6"/>','chevron-up':'<path d="m18 15-6-6-6 6"/>',
plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',minus:'<path d="M5 12h14"/>',x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',check:'<path d="M20 6 9 17l-5-5"/>',
'arrow-right-left':'<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>',
'arrow-right':'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>','arrow-left':'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
'arrow-down-left':'<path d="M17 7 7 17"/><path d="M17 17H7V7"/>','arrow-up-right':'<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
receipt:'<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
'chart-pie':'<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>',
wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
ellipsis:'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
'more-v':'<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
landmark:'<path d="M10 18v-7"/><path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/>',
'credit-card':'<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>',
banknote:'<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
backspace:'<path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6"/><path d="m18 9-6 6"/>',
trash:'<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
copy:'<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
pencil:'<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>',
calendar:'<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
camera:'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
image:'<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
'scan-face':'<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/>',
lock:'<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
key:'<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/>',
repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
alert:'<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
tag:'<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
grip:'<circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>',
'wifi-off':'<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>',
moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
'trending-up':'<path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/>',
sheet:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h2"/><path d="M14 13h2"/><path d="M8 17h2"/><path d="M14 17h2"/>',
note:'<path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M15 3v4a2 2 0 0 0 2 2h4"/>',
refresh:'<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
history:'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
grid:'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
eye:'<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
'eye-off':'<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>',
bell:'<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
user:'<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
archive:'<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
undo:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',
loader:'<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',
list:'<path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M3 6h.01"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M8 6h13"/>',
'circle-check':'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
smartphone:'<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
palette:'<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
calculator:'<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M8 6h8"/><path d="M16 14v4"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',
'panel-left':'<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>',
cloud:'<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>'
};
const svg=(n,s,sw)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="display:block">${I[n]||''}</svg>`;
window.lxIcon=svg;
const def=(n,c)=>{if(!customElements.get(n))customElements.define(n,c)};
const nums=s=>(s||'').split(',').filter(x=>x!=='').map(Number);
const fk=v=>{const a=Math.abs(v),s=v<0?'−':'';return a>=1e6?s+(a/1e6).toFixed(1)+'M':a>=1e3?s+Math.round(a/1e3)+'k':s+Math.round(a)};
class B extends HTMLElement{constructor(){super();this.attachShadow({mode:'open'})}get sr(){return this.shadowRoot}connectedCallback(){this.r()}attributeChangedCallback(){if(this.isConnected)this.r()}a(k,d){const v=this.getAttribute(k);return v==null?d:v}}

def('lx-icon',class extends B{static get observedAttributes(){return['name','size','stroke']}
r(){if(!this.style.display)this.style.display='inline-flex';this.style.flexShrink='0';this.shadowRoot.innerHTML=svg(this.a('name',''),this.a('size',20),this.a('stroke',1.5))}});

const sig='<svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>';
const wifi='<svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.6c2.2 0 4.2.8 5.7 2.2l1.2-1.2C13.1 1.9 10.7.9 8 .9S2.9 1.9 1.1 3.6l1.2 1.2C3.8 3.4 5.8 2.6 8 2.6zm0 3.4c1.3 0 2.5.5 3.4 1.3l1.2-1.2C11.4 5 9.8 4.3 8 4.3S4.6 5 3.4 6.1l1.2 1.2C5.5 6.5 6.7 6 8 6zm0 3.3c.5 0 .9.2 1.2.5L8 11 6.8 9.8c.3-.3.7-.5 1.2-.5z"/></svg>';
const bat='<svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="17" height="9" rx="2" fill="currentColor"/><path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2z" fill="currentColor" opacity=".5"/></svg>';

def('lx-phone',class extends B{static get observedAttributes(){return['theme','height']}
r(){const L=this.a('theme','dark')==='light',bg=L?'#ffffff':'#0b0b0c',fg=L?'#0b0b0c':'#f4f4f5',h=+this.a('height',844);
this.shadowRoot.innerHTML=`<style>:host{display:block;width:390px;height:${h}px;flex:none;position:relative}
.f{position:absolute;inset:0;border-radius:55px;overflow:hidden;background:${bg};color:${fg};box-shadow:0 0 0 10px ${L?'#d4d4d8':'#050506'},0 0 0 11px ${L?'#a1a1aa':'#2e2e33'},0 40px 80px -24px rgba(0,0,0,.6)}
.c{position:absolute;inset:0;display:flex;flex-direction:column;overflow:hidden}
.sb{position:absolute;top:0;left:0;right:0;height:54px;display:flex;align-items:center;justify-content:space-between;padding:4px 30px 0 46px;box-sizing:border-box;font-weight:600;font-size:16px;z-index:60;pointer-events:none;color:${fg}}
.di{position:absolute;top:11px;left:50%;margin-left:-62px;width:124px;height:36px;border-radius:20px;background:#000;z-index:61}
.hi{position:absolute;bottom:8px;left:50%;margin-left:-68px;width:136px;height:5px;border-radius:3px;background:${fg};z-index:60;pointer-events:none}
.r{display:flex;gap:6px;align-items:center}</style>
<div class="f"><div class="c"><slot></slot></div><div class="sb"><span>9:41</span><span class="r">${sig}${wifi}${bat}</span></div><div class="di"></div><div class="hi"></div></div>`}});

def('lx-tabbar',class extends B{static get observedAttributes(){return['active','theme']}
r(){const L=this.a('theme')==='light',act=this.a('active','tx'),bg=L?'#ffffff':'#0b0b0c',dv=L?'#e5e5e5':'#26262a';
const it=[['tx','receipt','Transactions'],['stats','chart-pie','Stats'],['acc','wallet','Accounts'],['more','ellipsis','More']];
if(!this.style.display)this.style.display='block';this.style.flex='none';
this.shadowRoot.innerHTML=`<div style="display:flex;background:${bg};border-top:1px solid ${dv};padding:7px 8px 30px">${it.map(([k,ic,l])=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;color:${k===act?'#ff5a5f':'#71717a'};font-size:10.5px;font-weight:${k===act?600:500}">${svg(ic,22,1.5)}<span>${l}</span></div>`).join('')}</div>`}});

def('lx-donut',class extends B{static get observedAttributes(){return['values','colors','size','thickness','track','gap','labels','pad','fg','text','min']}
r(){const v=nums(this.a('values')),c=this.a('colors','#a1a1aa').split(','),S=+this.a('size',200),T=+this.a('thickness',24),tr=this.a('track','#1d1d20'),R=(S-T)/2,C=2*Math.PI*R,tot=v.reduce((a,b)=>a+b,0)||1,g=v.length>1?+this.a('gap',2):0,lab=this.a('labels','').split(',').filter(x=>x!==''),P=+this.a('pad',lab.length?70:0),fg=this.a('fg','#f4f4f5'),tx=this.a('text','#a1a1aa'),W=S+2*P,cx=W/2;let off=0,lb='';
const segs=v.map((x,i)=>{const len=Math.max(C*x/tot-g,1);const s=`<circle cx="${cx}" cy="${cx}" r="${R}" fill="none" stroke="${c[i%c.length]}" stroke-width="${T}" stroke-dasharray="${len} ${C}" stroke-dashoffset="${-off}" transform="rotate(-90 ${cx} ${cx})"/>`;
const pct=x/tot*100;if(lab[i]&&pct>=+this.a('min',4)){const a=(off+C*x/tot/2)/C*2*Math.PI-Math.PI/2,ca=Math.cos(a),sa=Math.sin(a),r1=R+T/2+4,r2=R+T/2+16,x1=cx+r1*ca,y1=cx+r1*sa,x2=cx+r2*ca,y2=cx+r2*sa,an=ca>.2?'start':ca<-.2?'end':'middle',lx=x2+(an==='start'?4:an==='end'?-4:0),ly=y2+(sa>.2?10:sa<-.2?-10:0);
lb+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c[i%c.length]}" stroke-width="1.2"/><text x="${lx}" y="${ly-2}" text-anchor="${an}" font-size="11.5" fill="${fg}">${lab[i]}</text><text x="${lx}" y="${ly+12}" text-anchor="${an}" font-size="11" fill="${tx}">${Math.round(pct)}%</text>`}
off+=C*x/tot;return s}).join('');
if(!this.style.display)this.style.display='block';this.shadowRoot.innerHTML=`<svg width="${W}" height="${W}" viewBox="0 0 ${W} ${W}" style="display:block;overflow:visible;font-family:inherit"><circle cx="${cx}" cy="${cx}" r="${R}" fill="none" stroke="${tr}" stroke-width="${T}"/>${segs}${lb}</svg>`}});

def('lx-bars',class extends B{static get observedAttributes(){return['values','labels','vlabels','color','dim','hi','width','height','text','avg','grid']}
r(){const v=nums(this.a('values')),l=this.a('labels','').split(','),vl=this.a('vlabels','').split(','),W=+this.a('width',340),H=+this.a('height',160),col=this.a('color','#ff5a5f'),dim=this.a('dim','#26262a'),hi=+this.a('hi',-1),tx=this.a('text','#71717a'),fg=this.a('fg','#f4f4f5'),avg=+this.a('avg',0),gd=this.a('grid','#3a3a40');
const top=22,bot=24,ch=H-top-bot,mx=Math.max(...v,avg,1)*1.08,n=v.length||1,step=W/n,bw=Math.min(30,step*.52);
let o=v.map((x,i)=>{const h=Math.max(ch*x/mx,3),X=step*i+step/2-bw/2,Y=top+ch-h,on=i===hi||hi<0;return `<rect x="${X}" y="${Y}" width="${bw}" height="${h}" rx="6" fill="${on?col:dim}"/><text x="${X+bw/2}" y="${H-6}" text-anchor="middle" font-size="11" fill="${i===hi?fg:tx}" font-weight="${i===hi?600:400}">${l[i]||''}</text>${vl[i]?`<text x="${X+bw/2}" y="${Y-6}" text-anchor="middle" font-size="10.5" fill="${i===hi?fg:tx}">${vl[i]}</text>`:''}`}).join('');
if(avg){const y=top+ch-ch*avg/mx;o=`<line x1="0" x2="${W}" y1="${y}" y2="${y}" stroke="${gd}" stroke-dasharray="3 4"/>`+o}
if(!this.style.display)this.style.display='block';this.shadowRoot.innerHTML=`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="display:block;overflow:visible;font-family:inherit">${o}</svg>`}});

def('lx-line',class extends B{static get observedAttributes(){return['series','colors','labels','width','height','grid','text','fill','yticks','dots','bg','dash']}
r(){const S=this.a('series','').split(';').map(s=>s.split(',').map(x=>x===''?null:+x)),cols=this.a('colors','#4c8dff,#ff5a5f').split(','),lab=this.a('labels','').split(',').filter(x=>x!==''),W=+this.a('width',340),H=+this.a('height',160),gd=this.a('grid','#26262a'),tx=this.a('text','#71717a'),fi=this.a('fill',''),yt=this.a('yticks','1')!=='0',dots=this.a('dots','1')!=='0',bg=this.a('bg','#151517'),dash=this.a('dash','').split(',');
const all=S.flat().filter(x=>x!=null);if(!all.length)return;let mn=Math.min(...all),mx=Math.max(...all);const p=(mx-mn)*.12||1;mn-=p;mx+=p;
const pl=yt?34:4,pr=8,pt=8,pb=lab.length?22:6,n=Math.max(...S.map(s=>s.length)),X=i=>pl+(W-pl-pr)*(n<2?0:i/(n-1)),Y=v=>pt+(H-pt-pb)*(1-(v-mn)/(mx-mn));
let o='';for(let k=0;k<4;k++){const v=mn+(mx-mn)*(k+.5)/4,y=Y(v);o+=`<line x1="${pl}" x2="${W-pr}" y1="${y}" y2="${y}" stroke="${gd}"/>`;if(yt)o+=`<text x="0" y="${y+3.5}" font-size="10" fill="${tx}">${fk(v)}</text>`}
S.forEach((s,si)=>{const pts=s.map((v,i)=>v==null?null:[X(i),Y(v)]).filter(Boolean);if(!pts.length)return;const d='M'+pts.map(q=>q[0].toFixed(1)+','+q[1].toFixed(1)).join('L');const c=cols[si%cols.length];
if(fi!==''&&+fi===si)o+=`<path d="${d}L${pts[pts.length-1][0]},${H-pb}L${pts[0][0]},${H-pb}Z" fill="${c}" opacity=".1"/>`;
o+=`<path d="${d}" fill="none" stroke="${c}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" ${dash.includes(''+si)?'stroke-dasharray="4 4"':''}/>`;
if(dots){const q=pts[pts.length-1];o+=`<circle cx="${q[0]}" cy="${q[1]}" r="4" fill="${c}" stroke="${bg}" stroke-width="2"/>`}});
lab.forEach((t,i)=>{o+=`<text x="${X(i)}" y="${H-5}" text-anchor="middle" font-size="10.5" fill="${tx}">${t}</text>`});
if(!this.style.display)this.style.display='block';this.shadowRoot.innerHTML=`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="display:block;overflow:visible;font-family:inherit">${o}</svg>`}});
})();

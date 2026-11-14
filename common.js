
const col=f=>`var(--${f})`;
const L='CDEFGAB', NAT=[0,2,4,5,7,9,11];
const RMAJ=['C','D♭','D','E♭','E','F','F♯','G','A♭','A','B♭','B'], RMIN=['C','C♯','D','E♭','E','F','F♯','G','G♯','A','B♭','B'];
const ACC={'-2':'♭♭','-1':'♭','0':'','1':'♯','2':'♯♯'};
const FAM=['root','minor','major','minor','major','perfect','tritone','perfect','minor','major','minor','major'];
function pcOf(n){let p=NAT[L.indexOf(n[0])];for(const c of n.slice(1))p+=c==='♯'?1:-1;return (p%12+12)%12}
function spell(root,lo,semi){const li=(L.indexOf(root[0])+lo)%7;const t=(pcOf(root)+semi)%12;let d=((t-NAT[li])%12+12)%12;if(d>6)d-=12;return L[li]+(ACC[d]??'')}
const OPENM=[64,59,55,50,45,40],LOWM=[40,45,50,55,59,64];
const PB=(spec,label)=>`<button type="button" class="pbtn" data-play="${spec}" aria-label="${label||'Play'}">▶</button>`;
const BOTH=ns=>`mc:${ns.join(',')}|${ns.join(',')}`;
const CQ={m:[[0,3,7],'m'],M:[[0,4,7],''],'°':[[0,3,6],'°'],'7':[[0,4,7,10],'7'],m7:[[0,3,7,10],'m7'],'ø':[[0,3,6,10],'m7♭5'],maj7:[[0,4,7,11],'maj7'],'°7':[[0,3,6,9],'°7']};
function chordOf(key,lo,semi,q){const root=spell(key,lo,semi),[iv,suf]=CQ[q],b=48+(pcOf(key)+semi)%12;return{name:root+suf,notes:iv.map((x,i)=>spell(root,i*2,x)).join(' '),midi:iv.map(x=>b+x)}}
function dot(x,y,txt,fam,r=13,midi){return `<g${midi!=null?` class="snd" data-play="m:${midi}"`:''}><circle cx="${x}" cy="${y}" r="${r}" fill="${col(fam)}"/><text x="${x}" y="${y+4}" text-anchor="middle" font-size="${txt.length>2?9:11.5}" font-weight="700" fill="${fam==='root'?'var(--root-ink)':'#fff'}">${txt}</text></g>`}
function drawFret(id,rp,map,label){const x0=60,fw=66,y0=28,sh=32;
 let s=`<svg viewBox="0 0 880 230" role="img" aria-label="${label} on the guitar fretboard"><rect x="${x0}" y="${y0-12}" width="${fw*12}" height="${sh*5+24}" rx="4" fill="var(--wood)"/>`;
 [3,5,7,9].forEach(f=>s+=`<circle cx="${x0+(f-.5)*fw}" cy="${y0+sh*2.5}" r="6" fill="var(--line)"/>`);
 s+=`<circle cx="${x0+11.5*fw}" cy="${y0+sh*1.5}" r="6" fill="var(--line)"/><circle cx="${x0+11.5*fw}" cy="${y0+sh*3.5}" r="6" fill="var(--line)"/>`;
 for(let f=0;f<=12;f++){s+=`<line x1="${x0+f*fw}" y1="${y0-12}" x2="${x0+f*fw}" y2="${y0+sh*5+12}" stroke="${f?'var(--string)':'var(--ink)'}" stroke-width="${f?1.5:5}"/>`;
  if(f)s+=`<text x="${x0+(f-.5)*fw}" y="222" text-anchor="middle" font-size="12" font-weight="600" fill="var(--muted)">${f}</text>`}
 OPENM.forEach((o,i)=>s+=`<line x1="${x0}" y1="${y0+i*sh}" x2="${x0+12*fw}" y2="${y0+i*sh}" stroke="var(--string)" stroke-width="${1+i*.45}"/>`);
 OPENM.forEach((o,i)=>{for(let f=0;f<=12;f++){const m=map[((o+f-rp)%12+12)%12];if(m)s+=dot(f?x0+(f-.5)*fw:x0-28,y0+i*sh,m[0],m[1],13,o+f)}});
 document.getElementById(id).innerHTML=s+'</svg>'}
function drawPiano(id,rp,map,label){const ww=36,h=120,base=48;
 let s=`<svg viewBox="0 0 ${ww*14+2} ${h+6}" role="img" aria-label="${label} on the piano">`,tops='';
 for(let o=0;o<2;o++){NAT.forEach((p,k)=>{const x=1+(o*7+k)*ww,mi=base+o*12+p;s+=`<rect class="snd" data-play="m:${mi}" x="${x}" y="1" width="${ww}" height="${h}" rx="4" fill="var(--key-white)" stroke="var(--string)"/>`;
   const m=map[((p-rp)%12+12)%12];if(m)tops+=dot(x+ww/2,h-18,m[0],m[1],12,mi)});
  [[0,1],[1,3],[3,6],[4,8],[5,10]].forEach(([k,p])=>{const x=1+(o*7+k+1)*ww-11,mi=base+o*12+p;tops+=`<rect class="snd" data-play="m:${mi}" x="${x}" y="1" width="22" height="${h*.62}" rx="3" fill="var(--key-black)"/>`;
   const m=map[((p-rp)%12+12)%12];if(m)tops+=dot(x+11,h*.62-16,m[0],m[1],10.5,mi)})}
 document.getElementById(id).innerHTML=s+tops+'</svg>'}
function btns(id,items,cur,on){const el=document.getElementById(id);el.innerHTML='';items.forEach((t,i)=>{const b=document.createElement('button');b.type='button';b.textContent=t;b.setAttribute('aria-pressed',String(cur===i));b.onclick=()=>on(i);el.appendChild(b)})}

const MAJ=[0,2,4,5,7,9,11];
// ---------- sound ----------
let ac;
function tone(m,when,dur){try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume();
  const t=ac.currentTime+.03+when,f=440*Math.pow(2,(m-69)/12),o=ac.createOscillator(),o2=ac.createOscillator(),g=ac.createGain(),g2=ac.createGain(),lp=ac.createBiquadFilter();
  o.type='triangle';o2.type='sawtooth';o.frequency.value=f;o2.frequency.value=f;g2.gain.value=.22;lp.type='lowpass';
  lp.frequency.setValueAtTime(3400,t);lp.frequency.exponentialRampToValueAtTime(650,t+dur);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.2,t+.01);g.gain.exponentialRampToValueAtTime(.0008,t+dur);
  o.connect(lp);o2.connect(g2);g2.connect(lp);lp.connect(g);g.connect(ac.destination);o.start(t);o2.start(t);o.stop(t+dur+.05);o2.stop(t+dur+.05)}catch(e){}}
function play(spec){const [mode,list]=spec.split(':'),groups=list.split('|').map(g=>g.split(',').map(Number));let t=0;
 groups.forEach((ns,gi)=>{const m=mode.length>1?mode[gi%mode.length]:mode;
  if(m==='m'){ns.forEach(n=>{tone(n,t,1.1);t+=.42})}else{ns.forEach((n,i)=>tone(n,t+i*.025,1.9));t+=1.2}
  t+=.15})}
document.addEventListener('click',e=>{const p=e.target.closest&&e.target.closest('[data-play]');if(p)play(p.dataset.play)});

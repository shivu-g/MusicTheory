// shared helpers for chapters 5 to 7 (needs common.js)
const $=id=>document.getElementById(id);
const IVL=['R','♭2','2','♭3','3','4','♭5','5','♭6','6','♭7','7'],SNM=['E','A','D','G','B','e'];
const mod12=x=>((x%12)+12)%12;
const famOf=iv=>iv===0?'root':FAM[iv];
// full neck. dots: {s:lowIndex 0-5, f:fret, txt, fam, dim}
function neck(id,dots,label,o={}){const n=o.frets||15,x0=60,fw=792/n,y0=28,sh=32;
 let s=`<svg viewBox="0 0 880 230" role="img" aria-label="${label}"><rect x="${x0}" y="${y0-12}" width="${fw*n}" height="${sh*5+24}" rx="4" fill="var(--wood)"/>`;
 if(o.win){const a=Math.max(o.win[0],1);s+=`<rect x="${x0+(a-1)*fw}" y="${y0-12}" width="${(o.win[1]-a+1)*fw}" height="${sh*5+24}" fill="var(--go)" opacity=".2"/>`}
 [3,5,7,9,15,17].filter(f=>f<=n).forEach(f=>s+=`<circle cx="${x0+(f-.5)*fw}" cy="${y0+sh*2.5}" r="5" fill="var(--line)"/>`);
 if(n>=12)s+=`<circle cx="${x0+11.5*fw}" cy="${y0+sh*1.5}" r="5" fill="var(--line)"/><circle cx="${x0+11.5*fw}" cy="${y0+sh*3.5}" r="5" fill="var(--line)"/>`;
 for(let f=0;f<=n;f++){s+=`<line x1="${x0+f*fw}" y1="${y0-12}" x2="${x0+f*fw}" y2="${y0+sh*5+12}" stroke="${f?'var(--string)':'var(--ink)'}" stroke-width="${f?1.5:5}"/>`;
  if(f)s+=`<text x="${x0+(f-.5)*fw}" y="222" text-anchor="middle" font-size="12" font-weight="600" fill="var(--muted)">${f}</text>`}
 for(let i=0;i<6;i++)s+=`<line x1="${x0}" y1="${y0+i*sh}" x2="${x0+n*fw}" y2="${y0+i*sh}" stroke="var(--string)" stroke-width="${1+i*.45}"/>`;
 dots.slice().sort((a,b)=>(b.dim?1:0)-(a.dim?1:0)).forEach(d=>{const x=d.f?x0+(d.f-.5)*fw:x0-28,y=y0+(5-d.s)*sh,g=dot(x,y,d.txt,d.fam,d.dim?9.5:13,LOWM[d.s]+d.f);s+=d.dim?`<g opacity=".32">${g}</g>`:g});
 $(id).innerHTML=s+'</svg>'}
// chord box, nut to the left, low E at the bottom. dots: {s,f,txt,fam}; unused strings are marked x
function box(dots,label){const fr=dots.map(d=>d.f),fretted=fr.filter(f=>f>0),mx=Math.max(...fr),start=mx<=4?1:Math.min(...fretted),cols=Math.max(4,mx-start+1),fw=26,sy=15,x0=34,y0=10,W=x0+cols*fw+8;
 const ms=dots.slice().sort((a,b)=>a.s-b.s).map(d=>LOWM[d.s]+d.f);
 let s=`<svg class="snd" data-play="${BOTH(ms)}" viewBox="0 0 ${W} ${y0+5*sy+26}" role="img" aria-label="${label||'Chord shape'}. Click to hear.">`;
 for(let i=0;i<=cols;i++)s+=`<line x1="${x0+i*fw}" y1="${y0}" x2="${x0+i*fw}" y2="${y0+5*sy}" stroke="${i===0&&start===1?'var(--ink)':'var(--string)'}" stroke-width="${i===0&&start===1?4:1.2}"/>`;
 for(let i=0;i<6;i++){const y=y0+(5-i)*sy,d=dots.find(q=>q.s===i);s+=`<line x1="${x0}" y1="${y}" x2="${x0+cols*fw}" y2="${y}" stroke="var(--string)" stroke-width="${2.4-i*.3}"/><text x="7" y="${y+4}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--muted)">${SNM[i]}</text>`;
  if(!d)s+=`<text x="22" y="${y+4}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--tritone)">×</text>`}
 dots.forEach(d=>{const x=d.f===0?22:x0+(d.f-start+.5)*fw,y=y0+(5-d.s)*sy;s+=`<circle cx="${x}" cy="${y}" r="${d.f===0?6.5:8.5}" fill="${col(d.fam)}"/><text x="${x}" y="${y+3.5}" text-anchor="middle" font-size="${d.f===0?7:d.txt.length>1?8:10}" font-weight="700" fill="${d.fam==='root'?'var(--root-ink)':'#fff'}">${d.txt}</text>`});
 s+=`<text x="${x0+fw/2}" y="${y0+5*sy+19}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--muted)">${start>1?'fret '+start:'fret 1'}</text>`;
 return s+'</svg>'}
// the five open-chord shapes (frets low E to high e, null = not played)
const CAGED=[{n:'C',pc:0,M:[null,3,2,0,1,0],m:[null,3,1,0,1,null],w:[0,3]},{n:'A',pc:9,M:[null,0,2,2,2,0],m:[null,0,2,2,1,0],w:[-1,3]},{n:'G',pc:7,M:[3,2,0,0,0,3],m:[3,1,0,0,3,3],w:[-1,3]},{n:'E',pc:4,M:[0,2,2,1,0,0],m:[0,2,2,0,0,0],w:[-1,2]},{n:'D',pc:2,M:[null,null,0,2,3,2],m:[null,null,0,2,3,1],w:[-1,3]}];
const shapeShift=(sh,rootPc)=>mod12(rootPc-sh.pc);
function shapeDots(frets,shift,rootPc){const out=[];frets.forEach((f,i)=>{if(f==null)return;const fr=f+shift,iv=mod12(LOWM[i]+fr-rootPc);out.push({s:i,f:fr,txt:IVL[iv],fam:famOf(iv)})});return out}
// fret window of the scale position that belongs to a CAGED shape of the given major root
function posWin(sh,majPc){const b=shapeShift(sh,majPc);let lo=b+sh.w[0],hi=b+sh.w[1];if(lo<0){lo+=12;hi+=12}return[lo,hi]}
// scale dots. map: interval -> [txt,fam]. win optional; notes outside it are dimmed. Duplicated pitches inside a window are dimmed on the lower string.
function scaleDots(rootPc,map,win,n=15){const out=[];for(let i=0;i<6;i++)for(let f=0;f<=n;f++){const m=map[mod12(LOWM[i]+f-rootPc)];if(!m)continue;let dim=false;
  if(win){dim=f<win[0]||f>win[1];if(!dim&&i<5){const g=LOWM[i]+f-LOWM[i+1];if(g>=win[0]&&g<=win[1])dim=true}}
  out.push({s:i,f,txt:m[0],fam:m[1],dim})}return out}
// ---- helpers added for chapters 11 to 13 ----
const TENS=['R','♭9','9','♯9','3','11','♯11','5','♭13','13','♭7','7'];
// pitch classes ord (low to high, indexes into iv) placed on the given strings, as low on the neck as possible
function voiceOn(pc,iv,ord,set){let prev=0;const ms=ord.map((t,j)=>{let m=j?prev+1:LOWM[set[0]];while(mod12(m)!==mod12(pc+iv[t]))m++;prev=m;return m});let fr=ms.map((m,j)=>m-LOWM[set[j]]);if(Math.min(...fr)<0)fr=fr.map(f=>f+12);if(Math.min(...fr)>=12)fr=fr.map(f=>f-12);return fr}
// note name for a half-step offset from a key note, using scale spelling where possible
function nameIn(key,off,minor){const x=mod12(off),M=minor?{0:0,2:1,3:2,5:3,7:4,8:5,10:6,11:6,1:1,4:2,6:3,9:5}:{0:0,2:1,4:2,5:3,7:4,9:5,11:6,1:0,6:3,3:2,8:5,10:6};return spell(key,M[x],x)}
// simple tablature. bars: array of arrays of midi notes. Stays near one position where it can.
function tab(bars,low){const all=bars.flat();let best=1,bs=1e9;for(let p=(low?0:1);p<=12;p++){let sc=0;all.forEach(m=>{let ok=false;for(let s=0;s<(low?4:6);s++){const f=m-LOWM[s];if(f>=Math.max(0,p-1)&&f<=p+4)ok=true}if(!ok)sc+=10});sc+=p*.1;if(sc<bs){bs=sc;best=p}}
 const pick=m=>{let c=null;for(let s=0;s<(low?4:6);s++){const f=m-LOWM[s];if(f<0||f>22)continue;const d=(f>=Math.max(0,best-1)&&f<=best+4)?Math.abs(f-best-1)*.1:10+Math.abs(f-best);if(!c||d<c.d)c={s,f,d}}return c};
 const lines=SNM.map(n=>n+'|');bars.forEach(bar=>{bar.forEach(m=>{const c=pick(m);for(let s=0;s<6;s++)lines[s]+=(c&&c.s===s?String(c.f).padStart(2,'-'):'--')+'-'});for(let s=0;s<6;s++)lines[s]+='|'});
 return `<pre class="tab" aria-label="Tablature">${lines.slice().reverse().join('\n')}</pre>`}
// tension label that respects the chord: a minor 3rd is ♭3, a chord's own ♭5 is ♭5
const tens=(x,ct)=>x===3&&ct.includes(3)?'♭3':x===6&&ct.includes(6)?'♭5':TENS[x];

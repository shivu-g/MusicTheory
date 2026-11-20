/* keys.js - shared piano strip for the keyboard lessons. Needs common.js loaded first (uses nothing else).
   KB.draw(id, lo, hi, {w, h, marks}) draws MIDI notes lo..hi (lo and hi must be white keys).
   marks = { midi: [text, family, size?] } puts a labelled dot on a key. Keys carry data-midi and play on click. */
const KB=(function(){
 const BLK={1:1,3:1,6:1,8:1,10:1};
 const NAMES=['C','C♯/D♭','D','D♯/E♭','E','F','F♯/G♭','G','G♯/A♭','A','A♯/B♭','B'];
 const info=m=>({name:NAMES[m%12],oct:Math.floor(m/12)-1,key:m-20,hz:440*Math.pow(2,(m-69)/12)});
 function draw(id,lo,hi,o){o=o||{};const ww=o.w||34,h=o.h||120,marks=o.marks||{},bw=ww*.62;
  const whites=[],idx={};for(let m=lo;m<=hi;m++)if(!BLK[m%12]){idx[m]=whites.length;whites.push(m)}
  const W=whites.length*ww+2;let s=`<svg viewBox="0 0 ${W} ${h+6}" style="width:100%;height:auto;min-width:${o.min||0}px" role="img" aria-label="${o.label||'Piano keys'}">`,tops='';
  const dotf=(x,y,mk)=>{const r=mk[2]||Math.min(12,ww/2-2),fam=mk[1]||'minor';return `<g pointer-events="none"><circle cx="${x}" cy="${y}" r="${r}" fill="${col(fam)}"/><text x="${x}" y="${y+3.5}" text-anchor="middle" font-size="${r<10?8.5:11}" font-weight="700" fill="${fam==='root'||fam==='major'?'var(--root-ink)':'#fff'}">${mk[0]}</text></g>`};
  whites.forEach((m,i)=>{const x=1+i*ww;s+=`<rect class="snd" data-midi="${m}" data-play="m:${m}" x="${x}" y="1" width="${ww}" height="${h}" rx="3" fill="var(--key-white)" stroke="var(--string)"/>`;
   if(marks[m])tops+=dotf(x+ww/2,h-16,marks[m])});
  for(let m=lo;m<=hi;m++){if(!BLK[m%12]||idx[m-1]==null)continue;const x=1+(idx[m-1]+1)*ww-bw/2;
   s+=`<rect class="snd" data-midi="${m}" data-play="m:${m}" x="${x}" y="1" width="${bw}" height="${h*.62}" rx="2.5" fill="var(--key-black)"/>`;
   if(marks[m])tops+=dotf(x+bw/2,h*.62-14,marks[m])}
  document.getElementById(id).innerHTML=s+tops+'</svg>'}
 return{draw,info,NAMES}})();

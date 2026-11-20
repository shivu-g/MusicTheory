// metronome widget: fills every element with class "metro".
// Pages can reshape the click with window.GTMetro.set({n,sub,level,freq,audible,onTick,onState}).
//  n        ticks per bar (default 4)       sub   ticks per bpm-beat (1 to 4, default 1)
//  level(i) 2 = bar start, 1 = group start, 0 = plain (default: 2 on tick 0)
//  freq(i)  optional pitch override         audible(i) false mutes a tick (still counted)
//  GTMetro.hit(name,vol) plays a synthesised drum sound (kick snare hat ohat tom1 tom2 floor crash rim).
//  onTick(i) called as each tick sounds     onState(running) called on start and stop
(function(){
let ctx,bpm=80,timer=null,tick=0;try{bpm=+localStorage.getItem('gtm-bpm')||80}catch(e){}
const DEF={n:4,sub:1,level:i=>i===0?2:0,freq:null,audible:null,onTick:null,onState:null};
let cfg=Object.assign({},DEF);
const slots=()=>document.querySelectorAll('.metro');
slots().forEach(s=>{s.innerHTML='<span class="lab">Metronome</span><button type="button" class="pbtn mt" aria-label="Start or stop the metronome">▶</button><button type="button" class="pbtn md" aria-label="Slower by 5">−</button><b class="mb"></b><button type="button" class="pbtn mu" aria-label="Faster by 5">+</button><i class="mdot" aria-hidden="true"></i>'});
function show(){slots().forEach(s=>{s.querySelector('.mb').textContent=bpm+' bpm';s.querySelector('.mt').textContent=timer?'■':'▶'})}
function ac(){ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();if(ctx.state==='suspended')ctx.resume();return ctx}
let nbuf;
// small drum synth: name is kick, snare, hat, ohat, tom1, tom2, floor, crash or rim; vol 0 to 1
function hit(name,vol){try{const c=ac(),t=c.currentTime+.005,v=Math.max(.02,vol==null?1:vol);
 const env=(g,pk,d)=>{g.gain.setValueAtTime(pk*v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);g.connect(c.destination)};
 const tone=(f0,f1,pk,d,ty)=>{const o=c.createOscillator(),g=c.createGain();o.type=ty||'sine';o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+d);o.connect(g);env(g,pk,d);o.start(t);o.stop(t+d+.02)};
 const nz=(hp,pk,d)=>{if(!nbuf){nbuf=c.createBuffer(1,c.sampleRate,c.sampleRate);const a=nbuf.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1}
  const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=nbuf;f.type='highpass';f.frequency.value=hp;s.connect(f);f.connect(g);env(g,pk,d);s.start(t);s.stop(t+d+.02)};
 if(name==='kick')tone(140,45,.9,.18);
 else if(name==='snare'){tone(200,120,.3,.1,'triangle');nz(1500,.45,.14)}
 else if(name==='hat')nz(7000,.22,.04);
 else if(name==='ohat')nz(7000,.22,.25);
 else if(name==='tom1')tone(190,115,.6,.2);
 else if(name==='tom2')tone(145,88,.6,.22);
 else if(name==='floor')tone(108,66,.7,.28);
 else if(name==='crash')nz(3500,.35,.9);
 else if(name==='rim')tone(1800,1700,.35,.05)}catch(e){}}
function click(lv,freq){try{ac();const t=ctx.currentTime+.01,o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=freq||(lv>1?1600:lv===1?1250:1050);g.gain.setValueAtTime(lv===0?.2:.3,t);g.gain.exponentialRampToValueAtTime(.001,t+.05);o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+.07)}catch(e){}}
function flash(lv){document.querySelectorAll('.mdot').forEach(d=>{d.style.background=lv>1?'var(--tritone)':'var(--go)';setTimeout(()=>d.style.background='',90)})}
function step(){const i=tick%cfg.n,lv=cfg.level(i);
 if(!cfg.audible||cfg.audible(i))click(lv,cfg.freq&&cfg.freq(i));
 flash(lv);if(cfg.onTick)cfg.onTick(i);tick++}
function stop(){clearInterval(timer);timer=null;show();if(cfg.onState)cfg.onState(false)}
function start(){tick=0;step();timer=setInterval(step,60000/bpm/cfg.sub);show();if(cfg.onState)cfg.onState(true)}
function setBpm(v){bpm=Math.max(40,Math.min(220,v));try{localStorage.setItem('gtm-bpm',bpm)}catch(e){}if(timer){stop();start()}else show()}
document.addEventListener('click',e=>{const t=e.target;if(!t.closest||!t.closest('.metro'))return;if(t.closest('.mt'))timer?stop():start();else if(t.closest('.md'))setBpm(bpm-5);else if(t.closest('.mu'))setBpm(bpm+5)});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&timer)stop()});
window.GTMetro={
 set(c){const was=!!timer;if(was){clearInterval(timer);timer=null}cfg=Object.assign({},DEF,c);if(was)start();else show()},
 hit,running:()=>!!timer,start:()=>{if(!timer)start()},stop:()=>{if(timer)stop()},bpm:()=>bpm};
show();
})();

// metronome widget: fills every element with class "metro"
(function(){
let ctx,bpm=80,timer=null,beat=0;try{bpm=+localStorage.getItem('gtm-bpm')||80}catch(e){}
const slots=()=>document.querySelectorAll('.metro');
slots().forEach(s=>{s.innerHTML='<span class="lab">Metronome</span><button type="button" class="pbtn mt" aria-label="Start or stop the metronome">▶</button><button type="button" class="pbtn md" aria-label="Slower by 5">−</button><b class="mb"></b><button type="button" class="pbtn mu" aria-label="Faster by 5">+</button><i class="mdot" aria-hidden="true"></i>'});
function show(){slots().forEach(s=>{s.querySelector('.mb').textContent=bpm+' bpm';s.querySelector('.mt').textContent=timer?'■':'▶'})}
function click(acc){try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();if(ctx.state==='suspended')ctx.resume();const t=ctx.currentTime+.01,o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=acc?1600:1050;g.gain.setValueAtTime(.3,t);g.gain.exponentialRampToValueAtTime(.001,t+.05);o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+.07)}catch(e){}
 document.querySelectorAll('.mdot').forEach(d=>{d.style.background=acc?'var(--tritone)':'var(--go)';setTimeout(()=>d.style.background='',90)})}
function stop(){clearInterval(timer);timer=null;show()}
function start(){beat=1;click(true);timer=setInterval(()=>{click(beat%4===0);beat++},60000/bpm);show()}
function set(v){bpm=Math.max(40,Math.min(220,v));try{localStorage.setItem('gtm-bpm',bpm)}catch(e){}if(timer){stop();start()}else show()}
document.addEventListener('click',e=>{const t=e.target;if(!t.closest||!t.closest('.metro'))return;if(t.closest('.mt'))timer?stop():start();else if(t.closest('.md'))set(bpm-5);else if(t.closest('.mu'))set(bpm+5)});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&timer)stop()});
show();
})();

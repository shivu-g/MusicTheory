/* Guitar Theory Maps - index page behaviour.
   1. chord explorer (guitar + piano light up together, with sound)
   2. lesson progress, saved in this browser, with a "continue" button
   3. lesson search
   4. chapter accordion
   Everything is progressive: without JS the page is a plain list of links. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------------------------------------------------------------- audio */
  var ac = null;
  function audio() {
    try {
      if (!ac) { var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null; ac = new AC(); }
      if (ac.state === 'suspended') ac.resume();
      return ac;
    } catch (e) { return null; }
  }
  function pluck(m, t, vol) {
    var a = audio(); if (!a) return;
    var o = a.createOscillator(), g = a.createGain(), f = a.createBiquadFilter();
    o.type = 'triangle';
    o.frequency.value = 440 * Math.pow(2, (m - 69) / 12);
    f.type = 'lowpass'; f.frequency.value = 2600;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol || 0.2, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);
    o.connect(f); f.connect(g); g.connect(a.destination);
    o.start(t); o.stop(t + 1.6);
  }
  function now() { var a = audio(); return a ? a.currentTime + 0.03 : 0; }

  /* --------------------------------------------------------- chord explorer */
  var OPEN = [64, 59, 55, 50, 45, 40]; // e B G D A E (high to low)
  var COL = { root: '#f6f1e7', perfect: '#8fb4ff', major: '#F2C14E', minor: '#b9a6d0', tritone: '#ff8f8f' };
  var ROLE = { 0: ['R', 'root'], 3: ['♭3', 'minor'], 4: ['3', 'major'], 7: ['5', 'perfect'], 10: ['♭7', 'minor'] };
  var FORM = { 0: 'root', 3: 'minor third', 4: 'major third', 7: 'fifth', 10: 'minor seventh' };
  var NAMES = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];
  var STR = ['high E', 'B', 'G', 'D', 'A', 'low E'];
  var CHORDS = {
    C:  { name: 'C major', root: 0, frets: [0, 1, 0, 2, 3, -1] },
    Am: { name: 'A minor', root: 9, frets: [0, 1, 2, 2, 0, -1] },
    G:  { name: 'G major', root: 7, frets: [3, 0, 0, 0, 2, 3] },
    Em: { name: 'E minor', root: 4, frets: [0, 0, 0, 2, 2, 0] },
    G7: { name: 'G seven', root: 7, frets: [1, 0, 0, 0, 2, 3] }
  };
  var cur = null, notes = [], pcKey = {};
  var fbdots = $('#fbdots'), kb = $('#kb');

  function buildPiano() {
    if (!kb) return;
    var WH = [0, 2, 4, 5, 7, 9, 11], BL = [[1, 1], [2, 3], [4, 6], [5, 8], [6, 10]];
    var frag = document.createDocumentFragment();
    WH.forEach(function (pc) { frag.appendChild(key(pc, 'wk')); });
    BL.forEach(function (b) { var k = key(b[1], 'bk'); k.style.left = (b[0] / 7 * 100) + '%'; frag.appendChild(k); });
    kb.appendChild(frag);
    function key(pc, cls) {
      var k = document.createElement('button');
      k.type = 'button'; k.className = 'pk ' + cls; k.setAttribute('data-pc', pc);
      k.setAttribute('aria-label', 'Play ' + NAMES[pc]);
      k.addEventListener('click', function () { pluck(60 + pc, now(), 0.24); flashKey(pc); });
      pcKey[pc] = k;
      return k;
    }
  }

  function setChord(id) {
    var c = CHORDS[id]; if (!c) return;
    cur = id;
    notes = [];
    c.frets.forEach(function (f, i) {
      if (f < 0) return;
      var midi = OPEN[i] + f, pc = midi % 12, iv = (pc - c.root + 12) % 12, r = ROLE[iv];
      notes.push({ i: i, fret: f, midi: midi, pc: pc, iv: iv, lab: r[0], fam: r[1], color: COL[r[1]] });
    });

    // fretboard
    fbdots.textContent = '';
    c.frets.forEach(function (f, i) {
      var y = (30 + 48 * i) / 300 * 100;
      if (f < 0) {
        var m = document.createElement('span');
        m.className = 'mute'; m.textContent = '×';
        m.style.left = (20 / 660 * 100) + '%'; m.style.top = y + '%';
        m.setAttribute('aria-hidden', 'true');
        fbdots.appendChild(m);
      }
    });
    notes.forEach(function (n) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'nd'; b.textContent = n.lab;
      b.setAttribute('data-i', n.i);
      b.style.setProperty('--nc', n.color);
      var x = n.fret === 0 ? 20 : 40 + 48 * (n.fret - 0.5);
      b.style.left = (x / 660 * 100) + '%';
      b.style.top = ((30 + 48 * n.i) / 300 * 100) + '%';
      b.setAttribute('aria-label', NAMES[n.pc] + ', ' + FORM[n.iv] + ', ' + STR[n.i] + ' string' + (n.fret ? ', fret ' + n.fret : ', open'));
      b.addEventListener('click', function () { pluck(n.midi, now(), 0.26); flash(n); });
      fbdots.appendChild(b);
    });

    // piano
    $$('.pk', kb).forEach(function (k) {
      k.classList.remove('hl'); k.style.removeProperty('--nc'); k.textContent = '';
    });
    var seen = {};
    notes.forEach(function (n) {
      if (seen[n.pc]) return; seen[n.pc] = 1;
      var k = pcKey[n.pc]; if (!k) return;
      k.classList.add('hl'); k.style.setProperty('--nc', n.color); k.textContent = NAMES[n.pc];
      k.setAttribute('aria-label', 'Play ' + NAMES[n.pc] + ', ' + FORM[n.iv]);
    });

    // text + chips
    var forms = [], used = {};
    notes.slice().sort(function (a, b) { return a.iv - b.iv; }).forEach(function (n) { if (!used[n.iv]) { used[n.iv] = 1; forms.push(FORM[n.iv]); } });
    $('#cname').textContent = c.name;
    $('#csub').textContent = 'Open position · ' + forms.join(', ');
    $('#play').setAttribute('aria-label', 'Play ' + c.name);
    $$('.chip').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-chord') === id ? 'true' : 'false'); });
  }

  function flash(n) {
    var d = $('.nd[data-i="' + n.i + '"]', fbdots);
    if (d) { d.classList.add('on'); setTimeout(function () { d.classList.remove('on'); }, 420); }
    flashKey(n.pc);
  }
  function flashKey(pc) {
    var k = pcKey[pc];
    if (k) { k.classList.add('on'); setTimeout(function () { k.classList.remove('on'); }, 420); }
  }
  function strum() {
    var t0 = now();
    notes.slice().sort(function (a, b) { return a.midi - b.midi; }).forEach(function (n, k) {
      pluck(n.midi, t0 + k * 0.09, 0.2);
      setTimeout(function () { flash(n); }, k * 90 + 30);
    });
  }

  if (fbdots && kb) {
    buildPiano();
    setChord('C');
    $$('.chip').forEach(function (b) {
      b.addEventListener('click', function () { setChord(b.getAttribute('data-chord')); strum(); });
    });
    var pb = $('#play'); if (pb) pb.addEventListener('click', strum);
  }

  /* --------------------------------------------------------------- progress */
  var KEY = 'gtm-lessons-v2', done = {};
  try { JSON.parse(localStorage.getItem(KEY) || '[]').forEach(function (k) { done[k] = 1; }); } catch (e) { done = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(Object.keys(done))); } catch (e) {} }

  var lessons = $$('.lesson');
  var chapters = $$('.chap');
  var TOTAL = lessons.length;

  function nextLesson() {
    for (var i = 0; i < lessons.length; i++) if (!done[lessons[i].getAttribute('data-key')]) return lessons[i];
    return null;
  }
  function paint() {
    var n = 0;
    lessons.forEach(function (li) {
      var on = !!done[li.getAttribute('data-key')];
      if (on) n++;
      li.classList.toggle('done', on);
      li.querySelector('.tick').setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    chapters.forEach(function (ch) {
      var total = +ch.getAttribute('data-total'), c = 0;
      $$('.lesson', ch).forEach(function (li) { if (done[li.getAttribute('data-key')]) c++; });
      $('.orbnum', ch).style.setProperty('--p', (c / total * 100).toFixed(1));
      $('.donecount', ch).textContent = c ? ' · ' + c + ' done' : '';
    });
    var nx = nextLesson();
    var cta = $$('.js-cta'), line = $('#next'), reset = $('#reset');
    if (n === 0) {
      cta.forEach(function (a) { a.textContent = 'Start chapter 1'; a.setAttribute('href', 'chapter-1.html'); });
      line.hidden = true; reset.hidden = true;
    } else if (nx) {
      var ch = nx.getAttribute('data-ch');
      cta.forEach(function (a) { a.textContent = 'Continue chapter ' + ch; a.setAttribute('href', nx.querySelector('a').getAttribute('href')); });
      line.textContent = 'Next up: ' + nx.querySelector('a span').textContent + '. ' + n + ' of ' + TOTAL + ' lessons done.';
      line.hidden = false; reset.hidden = false;
    } else {
      cta.forEach(function (a) { a.textContent = 'Review chapter 1'; a.setAttribute('href', 'chapter-1.html'); });
      line.textContent = 'All ' + TOTAL + ' lessons done. Well played.';
      line.hidden = false; reset.hidden = false;
    }
  }
  lessons.forEach(function (li) {
    li.querySelector('.tick').addEventListener('click', function () {
      var k = li.getAttribute('data-key');
      if (done[k]) delete done[k]; else done[k] = 1;
      save(); paint();
    });
  });
  var rs = $('#reset');
  if (rs) rs.addEventListener('click', function () {
    if (window.confirm('Clear all your ticked lessons on this device?')) { done = {}; save(); paint(); }
  });

  /* ------------------------------------------------------------- part totals */
  var basePaint = paint;
  paint = function () {
    basePaint();
    $$('.group').forEach(function (g) {
      var gc = $('.gcount b', g); if (gc) gc.textContent = $$('.lesson.done', g).length;
    });
    paintChecks();
  };

  /* ------------------------------------------------ checkpoint progress */
  // ticks made inside each chapter page are stored under gtm_progress_v2 as { 'ch3-0': true, ... }
  function readChecks() {
    try { return JSON.parse(localStorage.getItem('gtm_progress_v2') || '{}') || {}; } catch (e) { return {}; }
  }
  function paintChecks() {
    var st = readChecks();
    chapters.forEach(function (ch) {
      var n = ch.getAttribute('data-ch'), total = +ch.getAttribute('data-chk'), c = 0, el = $('.chkcount', ch);
      if (!el || !total) return;
      for (var i = 0; i < total; i++) if (st['ch' + n + '-' + i]) c++;
      el.textContent = ' · checkpoint ' + c + '/' + total;
      el.classList.toggle('all', c === total);
    });
  }
  window.addEventListener('pageshow', paintChecks);
  window.addEventListener('storage', paintChecks);

  /* ------------------------------------------------------------- tools menu */
  var dd = $('#ddbtn'), menu = $('#ddmenu');
  function ddOpen(open) { if (!dd) return; menu.hidden = !open; dd.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  if (dd) {
    dd.addEventListener('click', function (e) { e.stopPropagation(); ddOpen(menu.hidden); });
    document.addEventListener('click', function (e) { if (!menu.hidden && !e.target.closest('.dd')) ddOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { ddOpen(false); dd.focus(); } });
    menu.addEventListener('focusout', function (e) { if (!menu.contains(e.relatedTarget) && e.relatedTarget !== dd) ddOpen(false); });
  }

  /* ------------------------------------------------------------- accordion */
  function setOpen(ch, open) {
    var btn = $('.toggle', ch), panel = $('.lessons', ch);
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    $('.tl', btn).textContent = open ? 'Hide lessons' : 'Show lessons';
  }
  chapters.forEach(function (ch) {
    $('.toggle', ch).addEventListener('click', function () {
      var open = $('.toggle', ch).getAttribute('aria-expanded') !== 'true';
      if (open) chapters.forEach(function (o) { if (o !== ch) setOpen(o, false); });
      setOpen(ch, open);
    });
  });
  function openFor(ch) { chapters.forEach(function (o) { setOpen(o, o === ch); }); }

  paint();
  var start = nextLesson();
  var startCh = start ? $('#ch-' + start.getAttribute('data-ch')) : chapters[0];
  openFor(startCh || chapters[0]);

  /* ---------------------------------------------------------------- search */
  var q = $('#q'), box = $('#results'), msg = $('#resultsmsg');
  var index = lessons.map(function (li) {
    var ch = li.closest('.chap'), a = li.querySelector('a');
    var title = a.querySelector('span').textContent;
    return {
      title: title, href: a.getAttribute('href'), where: 'Chapter ' + ch.getAttribute('data-ch') + ' · ' + ch.getAttribute('data-title'),
      hay: (title + ' ' + ch.getAttribute('data-title') + ' ' + ch.getAttribute('data-stage')).toLowerCase()
    };
  });
  $$('.toolchip').forEach(function (a) {
    var title = $('b', a).textContent;
    index.push({ title: title, href: a.getAttribute('href'), where: 'Toolkit · ' + $('span', a).textContent, hay: (title + ' tool toolkit reference calculator ' + $('span', a).textContent).toLowerCase() });
  });
  [["find a song's key", 'chapter-7.html#lesson-4', 'key finder'], ['capo and transpose', 'chapter-7.html#lesson-5', 'capo transposing'], ['metronome', 'chapter-2.html#lesson-1', 'metronome click tempo bpm'], ['chord fingerings', 'chapter-4.html#lesson-1', 'chord shapes fingering open chords']].forEach(function (t) {
    index.push({ title: t[0], href: t[1], where: 'Tool', hay: (t[0] + ' ' + t[2] + ' tool').toLowerCase() });
  });
  function runSearch() {
    var v = q.value.trim().toLowerCase();
    box.textContent = '';
    if (!v) { box.hidden = true; msg.textContent = ''; return; }
    var words = v.split(/\s+/);
    var hits = index.filter(function (it) { return words.every(function (w) { return it.hay.indexOf(w) !== -1; }); });
    box.hidden = false;
    if (!hits.length) {
      var none = document.createElement('p'); none.className = 'rnone';
      none.textContent = 'No lesson matches “' + q.value.trim() + '”.';
      box.appendChild(none); msg.textContent = 'No lessons found'; return;
    }
    hits.slice(0, 8).forEach(function (it) {
      var a = document.createElement('a'); a.href = it.href;
      var t = document.createElement('span'); t.className = 'rt'; t.textContent = it.title;
      var c = document.createElement('span'); c.className = 'rc'; c.textContent = it.where;
      a.appendChild(t); a.appendChild(c); box.appendChild(a);
    });
    if (hits.length > 8) {
      var more = document.createElement('p'); more.className = 'rnone';
      more.textContent = (hits.length - 8) + ' more. Keep typing to narrow it down.';
      box.appendChild(more);
    }
    msg.textContent = hits.length + (hits.length === 1 ? ' lesson found' : ' lessons found');
  }
  if (q) {
    q.addEventListener('input', runSearch);
    q.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { var f = $('a', box); if (f) { e.preventDefault(); window.location.href = f.getAttribute('href'); } }
      if (e.key === 'Escape') { q.value = ''; runSearch(); }
    });
  }
})();

/* Guitar Theory Maps - index page behaviour.
   1. chord explorer (guitar + piano light up together, with sound)
   2. course: a learning path built from the lesson list in the HTML, plus a Path / List toggle
   3. lesson progress (localStorage "gtm-progress"), "you are here", checkpoint chests
   4. lesson search and chapter jump
   Everything is progressive: without JS the page is the plain list view of links. */
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
  var COL = { root: '#ffb27a', perfect: '#8fb4ff', major: '#6ee7a8', minor: '#c4a8ff', tritone: '#ff8f8f' };
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
      k.tabIndex = pc === 0 ? 0 : -1;
      k.addEventListener('keydown', function (e) {
        var to = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? (pc + 1) % 12 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? (pc + 11) % 12 : e.key === 'Home' ? 0 : e.key === 'End' ? 11 : -1;
        if (to < 0) return;
        e.preventDefault();
        Object.keys(pcKey).forEach(function (p) { pcKey[p].tabIndex = -1; });
        pcKey[to].tabIndex = 0; pcKey[to].focus();
      });
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
      b.setAttribute('aria-label', n.lab + ' (' + FORM[n.iv] + '): ' + NAMES[n.pc] + ', ' + STR[n.i] + ' string' + (n.fret ? ', fret ' + n.fret : ', open'));
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
    var by = notes.slice().sort(function (x, y) { return x.midi - y.midi; }), nm = [];
    by.forEach(function (n) { if (nm.indexOf(NAMES[n.pc]) < 0) nm.push(NAMES[n.pc]); });
    var cd = $('#cdesc'); if (cd) cd.textContent = c.name + ': notes ' + nm.join(', ') + '. Played on the guitar as an open chord and shown on a one-octave piano.';
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

  /* ---------------------------------------------------------------- course data
     The list view in the HTML is the one copy of the lesson data. Everything
     below (path, tool cards, search, counts) is built from it. */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CH = $$('#listview .lchap').map(function (ch) {
    var n = +ch.getAttribute('data-ch');
    return {
      n: n, el: ch, band: +ch.getAttribute('data-band'), title: ch.getAttribute('data-title'),
      stage: ch.getAttribute('data-stage'), blurb: ch.getAttribute('data-blurb'), color: ch.getAttribute('data-color'),
      total: +ch.getAttribute('data-total'), core: +ch.getAttribute('data-core'), time: ch.getAttribute('data-time'),
      items: $$('.lesson', ch).map(function (li, i) {
        return {
          key: li.getAttribute('data-key'), i: i + 1, type: li.getAttribute('data-type'), label: li.getAttribute('data-typelabel'),
          title: $('.lt', li).textContent, href: $('a', li).getAttribute('href'), n: n
        };
      })
    };
  });
  CH.sort(function (a, b) { return a.n - b.n; });
  var ALL = []; CH.forEach(function (c) { c.items.forEach(function (it) { ALL.push(it); }); });
  var TOTAL = ALL.length;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  var SVGNS = 'http://www.w3.org/2000/svg';
  function svg(tag, attrs) {
    var e = document.createElementNS(SVGNS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  var CHECK = '<svg class="ck" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><use href="#i-check"/></svg>';
  var CHEST = '<svg class="chestsvg" viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
    '<defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd27a"/><stop offset="1" stop-color="#e58a14"/></linearGradient>' +
    '<radialGradient id="cglow"><stop offset="0" stop-color="#fff3c9" stop-opacity=".95"/><stop offset="1" stop-color="#ffc255" stop-opacity="0"/></radialGradient></defs>' +
    '<circle class="rays" cx="32" cy="30" r="30" fill="url(#cglow)"/>' +
    '<g class="star s1"><path d="M10 18l1.6 3.4L15 23l-3.4 1.6L10 28l-1.6-3.4L5 23l3.4-1.6z" fill="#fff3c9"/></g>' +
    '<g class="star s2"><path d="M54 12l1.4 3 3 1.4-3 1.4L54 21l-1.4-3.2-3-1.4 3-1.4z" fill="#fff3c9"/></g>' +
    '<g class="star s3"><path d="M32 4l1.2 2.6 2.6 1.2-2.6 1.2L32 11.6l-1.2-2.6-2.6-1.2 2.6-1.2z" fill="#fff3c9"/></g>' +
    '<rect x="7" y="31" width="50" height="26" rx="5" fill="url(#cg)" stroke="#7a4a0e" stroke-width="2"/>' +
    '<rect x="17" y="31" width="5" height="26" fill="#9a5f12" opacity=".55"/><rect x="42" y="31" width="5" height="26" fill="#9a5f12" opacity=".55"/>' +
    '<path d="M32 38c-5 0-8 3-8 7 0 6 6 10 8 12 2-2 8-6 8-12 0-4-3-7-8-7z" fill="#3a2410"/>' +
    '<g class="lid"><path d="M7 31c0-11 11-17 25-17s25 6 25 17z" fill="url(#cg)" stroke="#7a4a0e" stroke-width="2"/>' +
    '<rect x="17" y="17" width="5" height="14" fill="#9a5f12" opacity=".55"/><rect x="42" y="17" width="5" height="14" fill="#9a5f12" opacity=".55"/>' +
    '<rect x="26" y="9" width="12" height="6" rx="3" fill="none" stroke="#7a4a0e" stroke-width="2.4"/>' +
    '<rect x="28" y="27" width="8" height="8" rx="2" fill="#3a2410"/></g></svg>';

  /* ---------------------------------------------------------------- progress */
  var KEY = 'gtm-progress', VKEY = 'gtm-view', done = {};
  try { JSON.parse(localStorage.getItem(KEY) || '[]').forEach(function (k) { done[k] = 1; }); } catch (e) { done = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(Object.keys(done))); } catch (e) {} }

  function firstUnfinished(coreOnly) {
    for (var i = 0; i < ALL.length; i++) {
      var it = ALL[i];
      if (done[it.key]) continue;
      if (!coreOnly || it.type === 'core') return it;
    }
    return null;
  }
  var FIRST_CORE = ALL.filter(function (it) { return it.type === 'core'; })[0];

  /* ---------------------------------------------------------------- path view */
  var W = 420, ROW = { core: 116, deep: 112, check: 150 }, XS = [210, 256, 282, 256, 210, 164, 138, 164];
  var pathEl = $('#pathview'), listEl = $('#listview');
  var BANDS = [
    { n: 1, h: 'Foundations', p: 'Chapters 1 to 3. Notes, intervals, chords and how they fit together in a key.' },
    { n: 2, h: 'On the fretboard', p: 'Chapters 4 to 10. Moving chords and scales around the neck, making lines, and training your ear.' },
    { n: 3, h: 'Reference and practice', p: 'Chapters 11 to 13. Tools and playable material you dip into, in any order.' }
  ];

  function tickBtn(it, cls) {
    var b = el('button', cls); b.type = 'button';
    b.setAttribute('data-tick', it.key); b.setAttribute('aria-pressed', 'false');
    b.setAttribute('aria-label', 'Mark as done: ' + it.title);
    b.innerHTML = '<i>' + CHECK + '</i>' + (cls === 'ptick' ? '<span>Done</span>' : '');
    return b;
  }
  function chapterHead(c, tag) {
    var h = el('div', 'pban glass');
    var num = el('span', 'pnum'); num.setAttribute('aria-hidden', 'true'); num.appendChild(el('span', null, String(c.n)));
    var txt = el('div', 'pbt');
    var hd = el(tag, 'pbh', c.title); hd.id = 'p-h-' + c.n;
    txt.appendChild(hd);
    txt.appendChild(el('p', 'pbm', c.total + ' lessons · ' + c.core + ' core · ' + c.time));
    txt.appendChild(el('p', 'pbr', 'Ends with a checkpoint and a ten-minute routine.'));
    var side = el('div', 'pbs');
    var cnt = el('p', 'pcount'); cnt.innerHTML = '<b data-count="' + c.n + '">0</b>/' + c.total + '<span class="sr"> lessons done</span>';
    var open = el('a', 'popen'); open.href = 'chapter-' + c.n + '.html';
    open.appendChild(document.createTextNode('Open chapter ' + c.n));
    open.appendChild(el('span', 'sr', ': ' + c.title));
    side.appendChild(cnt); side.appendChild(open);
    h.appendChild(num); h.appendChild(txt); h.appendChild(side);
    return h;
  }

  function buildTrail(c) {
    var y = 18, ci = 0, nodes = [], pts = [];
    c.items.forEach(function (it) {
      var h = ROW[it.type], nd = { it: it, y: y + h / 2 };
      if (it.type !== 'deep') { nd.x = it.type === 'check' ? 210 : XS[ci % XS.length]; ci++; pts.push(nd); }
      nodes.push(nd); y += h;
    });
    var H = y + 6;
    // go-deeper nodes sit out on the side away from the trail
    nodes.forEach(function (nd, i) {
      if (nd.it.type !== 'deep') return;
      var a = null, b = null, j;
      for (j = i - 1; j >= 0; j--) if (nodes[j].it.type !== 'deep') { a = nodes[j]; break; }
      for (j = i + 1; j < nodes.length; j++) if (nodes[j].it.type !== 'deep') { b = nodes[j]; break; }
      var ax = a ? a.x : 210, bx = b ? b.x : 210, ay = a ? a.y : nd.y - 50, by = b ? b.y : nd.y + 50;
      var t = by === ay ? 0 : (nd.y - ay) / (by - ay);
      nd.tx = ax + (bx - ax) * Math.max(0, Math.min(1, t));
      nd.x = nd.tx >= 210 ? 62 : 358;
    });

    var wrap = el('div', 'ptrail'); wrap.style.height = H + 'px';
    var s = svg('svg', { 'class': 'trail', viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: 'none', 'aria-hidden': 'true', focusable: 'false' });
    for (var i = 1; i < pts.length; i++) {
      var p0 = pts[i - 1], p1 = pts[i], my = (p0.y + p1.y) / 2;
      s.appendChild(svg('path', { 'class': 'seg', 'data-to': p1.it.key,
        d: 'M' + p0.x + ' ' + p0.y + 'C' + p0.x + ' ' + my + ' ' + p1.x + ' ' + my + ' ' + p1.x + ' ' + p1.y }));
    }
    nodes.forEach(function (nd) {
      if (nd.it.type === 'deep') s.appendChild(svg('path', { 'class': 'branch', d: 'M' + (nd.x + (nd.tx > nd.x ? 28 : -28)) + ' ' + nd.y + 'L' + nd.tx + ' ' + nd.y }));
    });
    wrap.appendChild(s);

    nodes.forEach(function (nd) {
      var it = nd.it, left = nd.x > 210;
      var pn = el('div', 'pn ' + it.type + (left ? ' l' : ' r'));
      pn.setAttribute('data-key', it.key);
      pn.style.left = (nd.x / W * 100) + '%'; pn.style.top = nd.y + 'px';
      pn.style.setProperty('--room', (left ? nd.x / W * 100 : (1 - nd.x / W) * 100).toFixed(1) + 'cqw');
      var sym = el('span', 'sym'); sym.setAttribute('aria-hidden', 'true');
      if (it.type === 'check') sym.innerHTML = CHEST;
      else if (it.type === 'core') sym.innerHTML = '<span class="num">' + it.i + '</span>' + CHECK;
      else sym.innerHTML = '<span class="ring"></span>' + CHECK;
      pn.appendChild(sym);
      var side = el('div', 'pside');
      var a = el('a', 'plink'); a.href = it.href;
      a.appendChild(el('span', 'sr', 'Open lesson: '));
      a.appendChild(document.createTextNode(it.title));
      a.appendChild(el('span', 'sr st', ''));
      side.appendChild(a); side.appendChild(tickBtn(it, 'ptick'));
      pn.appendChild(side);
      pn.appendChild(el('span', 'here-chip', 'You are here')).setAttribute('aria-hidden', 'true');
      wrap.appendChild(pn);
    });
    return wrap;
  }

  function buildPathChapter(c) {
    var sec = el('section', 'pchap'); sec.id = 'p-ch-' + c.n; sec.setAttribute('data-ch', c.n);
    sec.style.setProperty('--c', c.color); sec.setAttribute('aria-labelledby', 'p-h-' + c.n);
    sec.appendChild(chapterHead(c, 'h4'));
    sec.appendChild(buildTrail(c));
    return sec;
  }

  function buildToolChapter(c) {
    var sec = el('section', 'tchap'); sec.id = 'p-ch-' + c.n; sec.setAttribute('data-ch', c.n);
    sec.style.setProperty('--c', c.color); sec.setAttribute('aria-labelledby', 'p-h-' + c.n);
    sec.appendChild(chapterHead(c, 'h4'));
    sec.appendChild(el('p', 'tblurb', c.blurb));
    var ul = el('ul', 'tgrid');
    c.items.forEach(function (it) {
      var li = el('li', 'tcard glass ' + it.type); li.setAttribute('data-key', it.key);
      var a = el('a', 'tlink'); a.href = it.href;
      var ic = el('span', 'tic'); ic.setAttribute('aria-hidden', 'true');
      ic.innerHTML = it.type === 'check' ? '<svg class="mini"><use href="#i-chest"/></svg>' : '<i class="dot ' + it.type + '"></i>';
      a.appendChild(ic);
      a.appendChild(el('span', 'sr', 'Open lesson: '));
      a.appendChild(el('span', 'tt', it.title));
      a.appendChild(el('span', 'sr st', ''));
      var kind = el('span', 'tkind', it.type === 'check' ? 'Checkpoint' : it.type === 'deep' ? 'Go deeper' : 'Core'); kind.setAttribute('aria-hidden', 'true');
      li.appendChild(kind);
      li.appendChild(el('span', 'here-chip', 'Next up')).setAttribute('aria-hidden', 'true');
      li.appendChild(a); li.appendChild(tickBtn(it, 'ptick'));
      ul.appendChild(li);
    });
    sec.appendChild(ul);
    return sec;
  }

  function buildPath() {
    BANDS.forEach(function (b) {
      var band = el('div', 'band'); band.setAttribute('data-band', b.n);
      var h = el('h3', 'bandh', b.h); h.id = 'p-band-' + b.n;
      band.appendChild(h); band.appendChild(el('p', 'bandp', b.p));
      CH.filter(function (c) { return c.band === b.n; }).forEach(function (c) {
        band.appendChild(b.n === 3 ? buildToolChapter(c) : buildPathChapter(c));
      });
      pathEl.appendChild(band);
    });
  }

  /* ---------------------------------------------------------------- paint */
  function paint() {
    var total = 0, here = firstUnfinished(true);
    ALL.forEach(function (it) { if (done[it.key]) total++; });

    $$('[data-tick]').forEach(function (b) { b.setAttribute('aria-pressed', done[b.getAttribute('data-tick')] ? 'true' : 'false'); });
    $$('.tick').forEach(function (b) {
      var li = b.closest('.lesson'); b.setAttribute('aria-pressed', done[li.getAttribute('data-key')] ? 'true' : 'false');
    });

    // everything that stands for one lesson: list rows, path nodes, tool cards
    $$('[data-key]').forEach(function (e) {
      if (e.hasAttribute('data-tick')) return;
      var k = e.getAttribute('data-key'), on = !!done[k], isHere = !!here && here.key === k;
      e.classList.toggle('done', on); e.classList.toggle('here', isHere);
      var st = $('.st', e); if (!st) return;
      var type = e.getAttribute('data-typelabel');
      if (!type) type = e.classList.contains('check') ? 'Chapter checkpoint' : e.classList.contains('deep') ? 'Go-deeper lesson, optional' : 'Core lesson';
      st.textContent = type + ', ' + (on ? 'completed' : 'not completed') + (isHere ? ', you are here' : '') + '.';
    });
    $$('.seg').forEach(function (p) { p.classList.toggle('on', !!done[p.getAttribute('data-to')]); });

    CH.forEach(function (c) {
      var n = 0; c.items.forEach(function (it) { if (done[it.key]) n++; });
      $$('[data-count="' + c.n + '"]').forEach(function (b) { b.textContent = n; });
      $$('.lcount b', c.el).forEach(function (b) { b.textContent = n; });
      var pct = (n / c.total * 100).toFixed(1), ps = $('#p-ch-' + c.n);
      c.el.style.setProperty('--p', pct); c.el.classList.toggle('complete', n === c.total);
      if (ps) { ps.style.setProperty('--p', pct); ps.classList.toggle('complete', n === c.total); }
    });

    // banner, hero button, hero line
    var nx = here || firstUnfinished(false);
    var cta = $$('.js-cta'), line = $('#next'), reset = $('#reset');
    var bt = $('#bannertext'), bl = $('#bannerlink'), lead, tail, href;
    if (total === 0) {
      cta.forEach(function (a) { a.textContent = 'Start chapter 1'; a.setAttribute('href', 'chapter-1.html'); });
      line.hidden = true; reset.hidden = true;
      lead = 'New here? '; href = FIRST_CORE.href; tail = 'Start with lesson 1: ' + FIRST_CORE.title + ' ';
    } else if (nx) {
      cta.forEach(function (a) { a.textContent = 'Continue chapter ' + nx.n; a.setAttribute('href', nx.href); });
      line.textContent = total + ' of ' + TOTAL + ' lessons done.'; line.hidden = false; reset.hidden = false;
      lead = 'Welcome back. '; href = nx.href; tail = 'Continue where you left off: ' + nx.title + ' ';
    } else {
      cta.forEach(function (a) { a.textContent = 'Review chapter 1'; a.setAttribute('href', 'chapter-1.html'); });
      line.textContent = 'All ' + TOTAL + ' lessons done. Well played.'; line.hidden = false; reset.hidden = false;
      lead = 'All done. '; href = 'chapter-1.html'; tail = 'Review from chapter 1 ';
    }
    bt.firstChild.textContent = lead;
    bl.setAttribute('href', href); bl.textContent = tail;
    bl.appendChild(el('span', null, '→')).setAttribute('aria-hidden', 'true');
  }

  /* checkpoint chest: a short opening animation and a V to I chord */
  function resolve() {
    var t = now(); if (!t) return;
    [43, 50, 55, 59, 65].forEach(function (m, k) { pluck(m, t + k * 0.05, 0.13); });
    [48, 55, 60, 64, 67, 72].forEach(function (m, k) { pluck(m, t + 0.62 + k * 0.05, 0.15); });
  }
  function celebrate(key) {
    resolve();
    var pn = $('#pathview .pn.check[data-key="' + key + '"]');
    if (!pn || reduce) return;
    pn.classList.remove('pop'); void pn.offsetWidth; pn.classList.add('pop');
    setTimeout(function () { pn.classList.remove('pop'); }, 1500);
  }
  function toggle(key) {
    var it = ALL.filter(function (x) { return x.key === key; })[0];
    if (done[key]) delete done[key]; else done[key] = 1;
    save(); paint();
    if (done[key] && it && it.type === 'check') celebrate(key);
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.tick, .ptick') : null;
    if (!b) return;
    toggle(b.getAttribute('data-tick') || b.closest('.lesson').getAttribute('data-key'));
  });
  var rs = $('#reset');
  if (rs) rs.addEventListener('click', function () {
    if (window.confirm('Clear all your ticked lessons on this device?')) { done = {}; save(); paint(); }
  });

  /* ---------------------------------------------------------------- views */
  var view = 'path';
  try { var sv = localStorage.getItem(VKEY); if (sv === 'list' || sv === 'path') view = sv; } catch (e) {}
  var vt = $('#viewtoggle'), io = null;
  function watch() {
    if (!('IntersectionObserver' in window)) return;
    if (io) io.disconnect();
    var seen = {};
    io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { seen[en.target.getAttribute('data-ch')] = en.isIntersecting ? en.boundingClientRect.top : null; });
      var best = null;
      Object.keys(seen).forEach(function (k) { if (seen[k] != null && (best === null || seen[k] < seen[best])) best = k; });
      $$('#rail a').forEach(function (a) {
        if (a.getAttribute('data-ch') === best) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-20% 0px -60% 0px' });
    $$(view === 'path' ? '#pathview .pchap, #pathview .tchap' : '#listview .lchap').forEach(function (s) { io.observe(s); });
  }
  function setView(v, persist) {
    view = v;
    pathEl.hidden = v !== 'path'; listEl.hidden = v !== 'list';
    $$('.vt', vt).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-view') === v ? 'true' : 'false'); });
    if (persist) { try { localStorage.setItem(VKEY, v); } catch (e) {} }
    watch();
  }
  buildPath();
  vt.hidden = false;
  $$('.vt', vt).forEach(function (b) { b.addEventListener('click', function () { setView(b.getAttribute('data-view'), true); }); });
  paint();
  setView(view, false);

  /* ---------------------------------------------------------------- chapter rail + jump */
  function goChapter(n) {
    var t = document.getElementById((view === 'path' ? 'p-ch-' : 'l-ch-') + n); if (!t) return;
    t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    var h = $('h4', t); if (h) { h.tabIndex = -1; try { h.focus({ preventScroll: true }); } catch (e) { h.focus(); } }
  }
  $$('#rail a').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); goChapter(a.getAttribute('data-ch')); });
  });
  var jump = $('#jump');
  if (jump) jump.addEventListener('change', function () { if (jump.value) goChapter(jump.value); });

  /* ---------------------------------------------------------------- search */
  var q = $('#q'), box = $('#results'), msg = $('#resultsmsg');
  var index = ALL.map(function (it) {
    var c = CH[it.n - 1];
    return { title: it.title, href: it.href, ch: c.n, chTitle: c.title, hay: (it.title + ' ' + c.title + ' ' + c.stage).toLowerCase() };
  });
  function runSearch() {
    var v = q.value.trim().toLowerCase();
    box.textContent = '';
    if (!v) { box.hidden = true; msg.textContent = ''; return; }
    var words = v.split(/\s+/);
    var hits = index.filter(function (it) { return words.every(function (w) { return it.hay.indexOf(w) !== -1; }); });
    box.hidden = false;
    if (!hits.length) {
      box.appendChild(el('p', 'rnone', 'No lesson matches “' + q.value.trim() + '”.')); msg.textContent = 'No lessons found'; return;
    }
    hits.slice(0, 8).forEach(function (it) {
      var a = el('a'); a.href = it.href;
      a.appendChild(el('span', 'rt', it.title));
      a.appendChild(el('span', 'rc', 'Chapter ' + it.ch + ' · ' + it.chTitle));
      box.appendChild(a);
    });
    if (hits.length > 8) box.appendChild(el('p', 'rnone', (hits.length - 8) + ' more. Keep typing to narrow it down.'));
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

#!/usr/bin/env node
/* Verifies all pages (index, hubs, chapter-1..13, tools) in headless Chrome.
   Usage:  npm i puppeteer-core   (once, anywhere on NODE_PATH)
           CHROME=/usr/bin/google-chrome node scripts/verify.js
   Checks per page:
   - no uncaught exceptions or console errors on load, and after clicking every button / note / play control twice
   - every document.getElementById lookup the page's own scripts make (this covers $('id'), btns('id'), drawFret('id'), ...) finds an element
   - no duplicate element ids
   - every table-of-contents link points at a section on the same page; sections and numbers run 1..N in order
   - the pager and the top-bar Prev/Next links go to the right neighbouring file
   - every checkpoint turns into tick boxes with a progress pill */
const http = require('http'), fs = require('fs'), path = require('path');
const puppeteer = require('puppeteer-core');
const ROOT = path.resolve(__dirname, '..');
const HUBS = ['core', 'guitar', 'keyboard', 'drums'];
const KLESSONS = [1, 2, 3, 4, 5, 6].map(n => 'keyboard-' + n);
const DLESSONS = [1, 2, 3].map(n => 'drums-' + n);
const PAGES = ['index', ...HUBS, ...KLESSONS, ...DLESSONS, ...Array.from({ length: 13 }, (_, i) => 'chapter-' + (i + 1)), 'tools'];
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg' };
const srv = http.createServer((q, r) => {
  const p = path.join(ROOT, decodeURIComponent(q.url.split('?')[0]));
  fs.readFile(p, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); r.end(d); });
}).listen(0);
const LOOP_IDS = ['pPlay', 'diaPlay', 'mkPlay', 'sfPlay', 'mvPlay', 'vlPlay', 'slPlay', 'pdPlay'];
(async () => {
  const port = srv.address().port;
  const browser = await puppeteer.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--no-sandbox'], headless: 'new' });
  let failures = 0;
  for (const name of PAGES) {
    const pg = await browser.newPage(), problems = [];
    pg.on('pageerror', e => problems.push('exception: ' + e.message));
    pg.on('console', m => { if (m.type() === 'error' && !/fonts\.g|ERR_|Failed to load resource/.test(m.text())) problems.push('console error: ' + m.text()); });
    await pg.evaluateOnNewDocument(() => {
      window.__nulls = [];
      const g = document.getElementById.bind(document);
      document.getElementById = id => { const el = g(id); if (!el) window.__nulls.push(id); return el; };
    });
    await pg.goto(`http://localhost:${port}/${name}.html`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 500));
    await pg.evaluate(() => {
      const sel = 'main button,main .snd,main [data-play],.loop-btn';
      for (let pass = 0; pass < 2; pass++) {
        const n = document.querySelectorAll(sel).length;
        for (let i = 0; i < Math.min(n, 700); i++) { const el = document.querySelectorAll(sel)[i]; if (el) el.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
      }
    });
    await new Promise(r => setTimeout(r, 300));
    const r = await pg.evaluate((name, LOOP_IDS, HUBS) => {
      const KL = /^(keyboard|drums)-\d$/.test(name), DR = /^drums-\d$/.test(name);
      const out = [];
      const nulls = [...new Set(window.__nulls)].filter(id => !LOOP_IDS.includes(id));
      if (nulls.length) out.push('getElementById found nothing for: ' + nulls.join(', '));
      const seen = {}, dups = [];
      document.querySelectorAll('[id]').forEach(e => { if (seen[e.id]) dups.push(e.id); seen[e.id] = 1; });
      if (dups.length) out.push('duplicate ids: ' + [...new Set(dups)].join(', '));
      if (KL) {
        if (!document.querySelector('.chap')) out.push('no header');
        if (DR ? !document.querySelector('.cells .cell') : !document.querySelector('svg .snd, svg [data-play]')) out.push(DR ? 'no counting cells' : 'no interactive piano');
        const nv = [...document.querySelectorAll('nav[aria-label="Guide"] a')].map(a => a.getAttribute('href'));
        const hub = DR ? 'drums.html' : 'keyboard.html';
        if (!nv.includes(hub)) out.push('top bar is missing hub link ' + hub);
      } else if (name !== 'index' && !HUBS.includes(name)) {
        const secs = [...document.querySelectorAll('section[id^="lesson-"]')];
        secs.forEach((s, i) => {
          if (s.id !== 'lesson-' + (i + 1)) out.push(`section ${i + 1} has id ${s.id}`);
          const num = s.querySelector('.num'); if (!num || num.textContent !== String(i + 1)) out.push(`section ${s.id} shows number ${num && num.textContent}`);
        });
        const links = [...document.querySelectorAll('ol.toc a')];
        if (links.length !== secs.length) out.push(`toc has ${links.length} links for ${secs.length} sections`);
        links.forEach((a, i) => { const h = a.getAttribute('href'); if (!document.querySelector(h) || h !== '#lesson-' + (i + 1)) out.push('toc link ' + h + ' is wrong'); });
        [...document.querySelectorAll('ol.toc .n')].forEach((n, i) => { if (n.textContent !== String(i + 1)) out.push('toc number ' + n.textContent + ' at position ' + (i + 1)); });
        const m = name.match(/chapter-(\d+)/), n = m ? +m[1] : 14;
        const prev = n === 1 ? 'index.html' : n === 14 ? 'chapter-13.html' : `chapter-${n - 1}.html`;
        const next = n === 13 ? 'tools.html' : n === 14 ? 'index.html' : `chapter-${n + 1}.html`;
        const pg = [...document.querySelectorAll('.pager a')].map(a => a.getAttribute('href'));
        if (pg[0] !== prev || pg[1] !== next) out.push(`pager goes to ${pg.join(', ')} but should go to ${prev}, ${next}`);
        const nav = [...document.querySelectorAll('nav[aria-label="Guide"] a')].map(a => a.getAttribute('href'));
        if (!nav.includes('index.html') || !nav.includes('tools.html')) out.push('top bar is missing All chapters or Tools');
        if (n > 1 && n < 14 && !nav.includes(prev)) out.push('top bar is missing Prev');
        if (n < 14 && !nav.includes(next)) out.push('top bar is missing Next');
        if (n < 14) {
          const ck = document.querySelector('section .badge.check');
          if (!ck) out.push('no checkpoint'); else {
            const cs = ck.closest('section'), boxes = cs.querySelectorAll('input[data-chk]'), pill = cs.querySelector('.chk-pill');
            if (!boxes.length) out.push('checkpoint has no tick boxes');
            if (!pill || !/^\d+ \/ \d+ completed$/.test(pill.textContent)) out.push('checkpoint has no progress pill');
            if (secs[secs.length - 1] !== cs) out.push('checkpoint is not the last lesson');
          }
        }
      } else if (HUBS.includes(name)) {
        if (!document.querySelector('.hubcard')) out.push('hub has no cards');
      } else {
        document.querySelectorAll('.lesson a').forEach(a => { const [f, h] = a.getAttribute('href').split('#'); if (!/^chapter-\d+\.html$/.test(f) || !/^lesson-\d+$/.test(h)) out.push('bad lesson link ' + a.getAttribute('href')); });
        if (document.querySelectorAll('.chap').length !== 13) out.push('index should list 13 chapters, has ' + document.querySelectorAll('.chap').length);
        if (document.querySelectorAll('.group').length !== 5) out.push('index should show 4 modules + Module V');
      }
      return out;
    }, name, LOOP_IDS, HUBS);
    problems.push(...r);
    if (HUBS.includes(name) || /^(keyboard|drums)-\d$/.test(name)) {
      const hs = await pg.evaluate(() => [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).filter(h => !/^(https?:|#|mailto:)/.test(h)));
      for (const h of [...new Set(hs)]) { const [f, id] = h.split('#'); if (!fs.existsSync(path.join(ROOT, f)) || (id && !fs.readFileSync(path.join(ROOT, f), 'utf8').includes(`id="${id}"`))) problems.push('hub link goes nowhere: ' + h); }
    }
    // index links must point at real lessons in the target files
    if (name === 'index') {
      const hrefs = await pg.evaluate(() => [...document.querySelectorAll('a[href*=".html#lesson-"]')].map(a => a.getAttribute('href')));
      for (const h of [...new Set(hrefs)]) { const [f, id] = h.split('#'); if (!fs.readFileSync(path.join(ROOT, f), 'utf8').includes(`<section id="${id}"`)) problems.push('index link goes nowhere: ' + h); }
      const miss = await pg.evaluate(() => [...document.querySelectorAll('.dd a, .toolnote a')].map(a => a.getAttribute('href')));
      for (const h of miss) { const [f, id] = h.split('#'); if (!fs.existsSync(path.join(ROOT, f)) || (id && !fs.readFileSync(path.join(ROOT, f), 'utf8').includes(`id="${id}"`))) problems.push('menu link goes nowhere: ' + h); }
    }
    console.log((problems.length ? 'FAIL ' : 'ok   ') + name + (problems.length ? '\n      ' + problems.join('\n      ') : ''));
    if (problems.length) failures++;
    await pg.close();
  }
  await browser.close(); srv.close();
  console.log(failures ? `\n${failures} page(s) failed` : '\nAll ' + PAGES.length + ' pages pass');
  process.exit(failures ? 1 : 0);
})();

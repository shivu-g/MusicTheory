# Changelog

## Tracks and four new tools

- New hub pages `core.html`, `guitar.html`, `keyboard.html`, `drums.html`. Chapter 1 is the shared core; guitar keeps chapters 2-13; keyboard and drums list live shared chapters plus planned lessons. The landing page has a "Choose your instrument" section.
- Toolkit is now fifteen tools: Chord Finder (notes or a typed fingering in, chord names and slash chords out), Scale Finder (notes in, every matching scale and mode out), Chord Transposer with capo helper and Roman numerals, and Inversions and String-Set Voicings (triads, close 7ths, drop 2, drop 3 by string set).
- `scripts/verify.js` now also checks the four hub pages and their links.
- `agents/` holds the three-agent loop (Scout, Placer, Publisher), its backlog, inbox and log; agent definitions are in `.claude/agents/`.

## ChordLab tools added to the Toolkit
Three tools ported from the ChordLab app, bringing the Toolkit (`tools.html`, Module V) to eleven tools.

- **Chord Library (tool 9):** any root and 16 chord types, correctly spelled; up to five movable CAGED shapes per chord with an Easy/Medium/Hard guide, notes or interval labels, piano inversions, formula, relative and parallel keys, and a short note on each chord's sound and use. Everything is clickable and plays.
- **Scale-Degree Ear Trainer (tool 10):** a workout for naming the degree you hear. 40 scales and modes (pentatonic, the major, melodic minor, harmonic minor and harmonic major modes, blues, whole tone, diminished, chromatic), ascending, descending or random runs, a choice of start degree, and a root that stays put or moves by a half step each round. Each round opens with the tonic and a wrong answer plays the note you picked.
- **Circle of Fifths (tool 11):** major keys on the outer ring and relative minors on the inner ring. Pick a key to see its signature, relative key and diatonic chords with Roman numerals, with each chord playable.
- Sounds use the site's built-in synth, so the app's piano and guitar samples were not carried over.
- Landing page, Tools menu and search now list eleven tools. Style additions are at the end of `style.css`; a global `[hidden]` rule was added so hidden panels stay hidden.

## Modular curriculum v2 (branch `feat/modular-curriculum-v2`)

The 13 chapters are regrouped into four Modules plus an interactive Toolkit, with new lessons, persistent checkpoints, a backing-track looper and a calculators page. The site is still plain static HTML/CSS/JS with no build step.

### Structure
| Module | Chapters |
|---|---|
| I. Foundations & Rhythm | 1 Notes, Tuning and Intervals; 2 Rhythm, Time and Feel; 3 The Major Scale, Keys and Triads; 4 Chords Across the Neck: Open, CAGED and Barres |
| II. Functional Harmony & The Blues | 5 Chord Function, Progressions and Minor Keys; 6 Pentatonics, Scale Positions and The Blues; 7 Ear Training and Real Songs |
| III. Jazz, Voicings & Modal Harmony | 8 Seventh Chords, Shells and Voice Leading; 9 Substitution and Borrowed Chords; 10 Modal Harmony and Chord Scales; 11 Altered Harmony, Melodic Minor and Symmetrical Scales |
| IV. Improvisation & Line Workshop | 12 Making Music: Target Tones, Phrasing and Practice; 13 The Jazz Line Workshop |
| V. Interactive Reference Toolkit | `tools.html`: 8 calculators |

102 lessons across the 13 chapters (59 core) plus 8 tools (now 11, see above). Lessons are renumbered within each chapter; every migrated interactive keeps its own script scope (one IIFE per original chapter block), so nothing leaks between lessons.

### New
- **Lessons:** open chords (chapter 4) and rhythm by ear (chapter 2).
- **Checkpoints:** every chapter ends with a checkpoint list of tick boxes with an "X / Y completed" pill. Ticks persist in `localStorage` key `gtm_progress_v2` (`{"ch3-0": true}`) and drive the per-chapter counts on the landing page.
- **Backing-track looper:** chord progressions now have a loop button. Playback is scheduled ahead on the audio clock for steady timing; any other play button stops the loop.
- **Tools:** `tools.html` with eight calculators, linked from every page's nav. The landing nav is now Course + a Tools menu (find a song's key, capo/transpose, intervals by ear, rhythm by ear, chord fingerings, open-string finder, metronome).
- **Landing page:** Modules I–IV as grouped sections and a Module V banner, each chapter showing checkpoint progress.
- **`scripts/verify.js`:** headless-Chrome check of all 15 pages (JS errors after clicking every control, missing element ids, duplicate ids, TOC and pager links, checkpoint structure, index links). Run `node scripts/verify.js` (needs `puppeteer-core` and Chrome).

### Changed
- Chapter 1 now uses the shared `common.js` / `neck.js` helpers instead of its own copies.
- Lesson ticks on the landing page use a new key (`gtm-lessons-v2`), because lesson numbers changed. Earlier ticks under `gtm-progress` are not carried over.
- Chapter pages: top bar shows module and position, pager links run in course order (chapter 1 back to the index, chapter 13 on to the Toolkit).

### Known
- Some colours in the original palette (white text on the brand blue/green/red/orange chips, the green "core" badge) are below WCAG AA contrast. Pre-existing and unchanged here.

## Landing page v2 (branch `landing-page-v2`)

Only the landing page and its own files changed. The chapter pages, `style.css`, `common.js`, `neck.js` and `metro.js` are untouched, so lesson content, audio and diagram logic are exactly as before. The site is still fully static with no build step, and `gtm-progress` in localStorage keeps its format, so existing progress carries over.

Files: `index.html`, `index.css`, `index.js` (changed); `favicon.svg`, `apple-touch-icon.png`, `img/*` (new); `docs/screenshots/*` (before and after, 375 px and 1440 px); `README.md` (lesson count 112 → 108, which is what the chapters actually contain).

### What changed, by section

**Hero**
- Added a "Who it's for" line: single notes and a few basic chords, no reading of music.
- The chord explorer has a text alternative ("C major: notes C, E, G ...") that updates with the chord, labelled fretboard and piano groups, and note buttons whose names include their visible label.
- The piano uses one tab stop with arrow keys, Home and End.
- Fretboard dots have a 24 px minimum with an enlarged hit area. On phones the board and piano sit in their own scroll box so dots and keys stay tappable.

**Beginner banner (new)**
- Visitors with no saved progress see "New here? Start with lesson 1: The twelve notes".
- Returning visitors see "Continue where you left off: <next core lesson>", linking straight to it.

**How it works / Inside the lessons (new strip)**
- Four real widgets from the chapters (interval map, progression player, strumming editor, tab line), each linking to its lesson.
- They are lazy-loaded WebP screenshots (15 to 33 KB each) with descriptive alt text. No audio code runs until the first click.

**Course: learning path**
- The 13 uniform cards are gone. Chapters 1 to 10 are a winding path of round nodes joined by a trail, grouped under three band headings: Foundations (1-3), On the fretboard (4-10), Reference and practice (11-13).
- Each chapter has a title banner (number, name, "N lessons · M core · about X hours", "ends with a checkpoint and a ten-minute routine", done count such as 4/12, and an "Open chapter" button).
- Node types differ by shape, icon and text, not colour alone: core is a filled green circle with its lesson number, go-deeper is a ringed purple node on a short side branch, checkpoint is an original guitar-case chest with a pick emblem.
- Completed nodes show a check and the trail turns green up to them. The first unfinished core lesson gets a glowing, pulsing "You are here" node.
- Ticking a checkpoint opens the chest (lid, glow, sparkles) and plays a short G7 → C chord. Reduced motion gets a static open chest and the sound only.
- Each node is one link with a specific name ("Open lesson: The major scale. Core lesson, not completed.") whose clickable area covers the whole node. A "Done" button sits next to every node.
- Chapters 11 to 13 are a plain grid of tool cards under "Reference and practice".
- A sticky chapter rail (desktop) or a "Jump to chapter" menu (phone) moves between chapters.
- Path / List toggle. List is a compact grouped list of all 108 lessons. The choice is stored in `gtm-view`. Search works in both views. The old Show/Hide toggles became the List view.
- The lesson data exists once, in the HTML list. The path, tool cards, search and counts are all built from it by `index.js`. Without JavaScript, the page is the plain list view with every link working.

**Accessibility**
- Contrast was measured from rendered pixels (text colour against the worst background pixel behind each text box): 0 failures across about 1,700 text samples in four states. axe-core reports 0 violations.
- Muted labels (eyebrows, OPEN POSITION, GUITAR, PIANO, legend) were already raised to at least 7:1 in the last round. The label chips on the path were made opaque after the check found a bright ring showing through.
- Visible focus rings (3 px, light on dark) everywhere, including the search field. Buttons work with Enter and Space.
- Landmarks are header, nav ×2, main and footer, with one h1 and an h2, h3, h4 order. The skip link goes to `#main`. The search has a visible "Search lessons" label.
- No horizontal page scroll at 320, 375, 768, 1024, 1440 and 1920 px, in both views.

**Performance and meta**
- Lighthouse (local server, mobile preset): Performance 98, Accessibility 100, Best Practices 100, SEO 100. Desktop preset: 100 across the board. LCP 1.8 s mobile, CLS 0.
- `font-display: swap` via the Google Fonts URL, preconnects, deferred script, lazy images with width and height set.
- Added favicon (SVG), apple-touch-icon, 1200×630 Open Graph and Twitter card image, meta description, theme-color and a canonical link.

**Footer**
- Source on GitHub link, "Last updated" date, and a note that progress is stored only in this browser. The reset button now lives here.

### Checklist

| # | Item | Status |
|---|------|--------|
| 1 | Winding path of round nodes, data taken from the existing list | Done |
| 1 | Chapter banners with name, "N lessons · M core", nodes in a zig-zag with a connecting trail | Done |
| 1 | Node types match the legend (core / go deeper on a side branch / checkpoint at the end) | Done |
| 1 | Original chest artwork, opening animation, resolving-chord sound | Done. I could only confirm the sound code runs without errors in a headless browser; I have not heard it, so please listen once. |
| 1 | Completed check, "You are here" with pulsing ring | Done |
| 1 | Path / List toggle, remembered; search in both views | Done |
| 1 | Chapters 11-13 as a tool-card grid | Done |
| 1 | Three band headings, chapter order and numbers unchanged | Done. Band 2 covers chapters 4 to 10, which is how I read "plus 9-10 as appropriate". |
| 1 | Sticky chapter rail / mini-nav | Done |
| 1 | Whole node/card clickable, specific link labels, per-chapter count | Done |
| 1 | Light gamification only | Done. No streaks, gems, leaderboards or pop-ups. |
| 2 | Start / Continue banner | Done |
| 2 | "Who it's for" line | Done |
| 2 | Estimated time per chapter, ten-minute routine mentioned | Done. Times are my estimate (10 min per core lesson, 6 per go-deeper, 12 for the checkpoint and routine); adjust if your own pace differs. |
| 3 | "Inside the lessons" strip, lazy-loaded, no audio before first click | Done, as screenshots rather than live mini-widgets. Live widgets would need the chapter-page scripts on the landing page. |
| 4 | Contrast check and fixes | Done |
| 4 | Keyboard only, focus rings, Enter/Space | Done |
| 4 | Accessible names, text alternative for hero diagrams | Done |
| 4 | Never colour alone | Done (shape, icon, label and hidden text) |
| 4 | Reduced motion | Done |
| 4 | Landmarks, one h1, heading order, skip link, visible search label | Done |
| 4 | Touch targets at least 44×44 px | Mostly done. Everything is at least 44 px except the black piano keys (30 px wide) and the fretboard dots (32 px visible, 44 px hit area on phones). On desktop the dots are 24 px with a 36 px hit area. That meets WCAG 2.2 AA (24 px) but not your 44 px goal. Making them bigger would break the one-octave diagram. |
| 4 | No horizontal scrolling at 320 px | Done for the page. The fretboard and piano scroll sideways inside their own box on phones, which WCAG treats as acceptable for diagrams. |
| 5 | Tested at 320 / 375 / 768 / 1024 / 1440 / 1920 | Done, using Chrome only |
| 5 | Phone path is a single narrow column | Done |
| 5 | Fonts with swap, lazy images, Lighthouse targets | Done. Scores were measured against a local server, not the live Pages site, so real numbers may differ slightly. |
| 6 | Favicon, Open Graph, Twitter, description, theme-color | Done. The canonical and OG URLs assume the site is at `https://shivu-g.github.io/MusicTheory/`; change them if it lives elsewhere. |
| 6 | Footer with GitHub, last updated, progress note | Done |
| 6 | Nothing breaks: progress, search, show/hide, links to all 13 chapters | Done. Verified by script: ticks, sync between views, persistence across reload, reset, search, jump and all 121 links. |

### Not tested
- Safari and Firefox, real phones, and screen readers (NVDA, VoiceOver). All checks were automated in headless Chrome.
- The checkpoint sound by ear.
- The tab order is long (13 chapter-rail links come before the path). Tell me if you want the rail collapsed to one tab stop.

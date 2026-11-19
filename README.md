# Guitar Theory Maps

An interactive visual study guide to music theory for guitar, with a piano reference beside every fretboard and clickable sound throughout.

Thirteen chapters (102 lessons) in four Modules, plus an interactive Toolkit of eight calculators. One page per chapter.

**Module I. Foundations & Rhythm**
1. Notes, Tuning and Intervals
2. Rhythm, Time and Feel
3. The Major Scale, Keys and Triads
4. Chords Across the Neck: Open, CAGED and Barres

**Module II. Functional Harmony & The Blues**
5. Chord Function, Progressions and Minor Keys
6. Pentatonics, Scale Positions and The Blues
7. Ear Training and Real Songs

**Module III. Jazz, Voicings & Modal Harmony**
8. Seventh Chords, Shells and Voice Leading
9. Substitution and Borrowed Chords
10. Modal Harmony and Chord Scales
11. Altered Harmony, Melodic Minor and Symmetrical Scales

**Module IV. Improvisation & Line Workshop**
12. Making Music: Target Tones, Phrasing and Practice
13. The Jazz Line Workshop

**Module V. Interactive Reference Toolkit** (`tools.html`)

Each chapter ends with a checkpoint; ticks are saved in your browser (`localStorage`, key `gtm_progress_v2`). Chord progressions can be looped as a backing track.

Open `index.html` in any browser, or host the folder with GitHub Pages. Keep all the files together in one folder. No build step.

## Checking the site
`node scripts/verify.js` serves the folder locally and tests all 15 pages in headless Chrome (needs `puppeteer-core` and Chrome; set `CHROME` to the browser path if not at a standard location).

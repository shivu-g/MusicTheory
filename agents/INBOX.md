# Inbox (Scout writes, Placer clears). Entry format is in `.claude/agents/scout.md`.

## [keyboard] Triad inversions and right-hand fingering            status: placed -> keyboard-3.html (RH fingerings only; LH inversion fingering left out as unconfirmed)
- Fact(s): Root position triad: right hand fingers 1-3-5 (thumb, middle, pinky). First inversion (3rd in bass): 1-2-5, because the gap between the lower two notes is a minor or major third and the upper gap is a fourth, so the index finger fits the middle note. Second inversion (5th in bass): back to 1-3-5. Name logic: the inversion number equals the chord tone's position counted from the root that now sits in the bass (root is 2nd note in second inversion, 3rd note is bottom in first).
- Fact(s): Left hand root position is typically 5-3-1 (first-inversion left-hand fingering not confirmed in my sources). Fingerings are conventions, not rules: 1-2-5 on root position forces an unnecessary thumb stretch.
- Sources: https://www.pianote.com/blog/how-to-practice-chord-inversions/ ; https://music.stackexchange.com/questions/67135/what-are-the-correct-fingerings-for-piano-chords-and-inversions
- Suggested placement: new lesson K3 "Triads and inversions" in keyboard track; also tool: Inversions and Voicings (piano view, show finger numbers under keys)
- Interactive idea: click a triad, cycle root / 1st / 2nd inversion on a piano with finger numbers shown and the common-tone movement between chords highlighted.

## [guitar] Drop 2 voicings: the four types and string sets            status: placed -> tools.html#lesson-15 (construction rule used; the four type labels and the one-fret quality edit are still open)
- Fact(s): Drop 2 = take a close-position (all four notes within one octave) seventh chord and move the second-highest note down an octave. Works from any inversion of the close chord, not only root position.
- Fact(s): Sits on adjacent string sets 6-5-4-3, 5-4-3-2 and 4-3-2-1. Four types by bass-to-treble order, shown for a 7th chord (1 3 5 7): 1-5-7-3 (from 2nd inversion), 3-7-1-5 (from 3rd inversion), 5-1-3-7 (from root position), 7-3-5-1 (from 1st inversion). In every type 1 and 5 sit next to each other, as do 3 and 7.
- Fact(s): Quick chord-quality edits from maj7 drop 2: lower the 7th a fret for dominant 7, lower 3rd for minor-major 7, lower 3rd and 7th for m7, lower 3rd, 5th and 7th for m7b5, raise 5th for maj7#5, lower 5th a fret on the shape gives maj7#11 as written on that page.
- Sources: https://www.jazzguitar.be/blog/drop-2-chords/ ; https://www.guitarlayers.com/drop_voicings/
- Suggested placement: tool: Inversions and Voicings (guitar view, label each shape with its interval order and string set). Chapter 8 already explains the construction, so only add the four-type interval labels and the quality-edit trick there.
- Interactive idea: pick maj7, then click "lower the 7th" / "lower the 3rd" and watch the same shape morph through dom7, m7, m7b5.

## [guitar] Drop 3 string sets (needs second confirmation)            status: unsure
- Fact(s): Drop 3 = drop the third-highest note of a close seventh chord by an octave. This leaves a gap (one skipped string) between the bass and the upper three notes.
- Fact(s): Usual string sets, from general teaching practice: 6-4-3-2 and 5-3-2-1 (skipping the 5th and 4th string respectively). Both sources I opened confirm drop 3 is among the two most common guitar voicings, but the string-set table on guitarlayers is an image I could not read and the jazzguitar drop 3 page gave no text for it, so the set list is not double-checked from text.
- Sources: https://www.jazzguitar.be/blog/drop-3-chords-and-inversions/ ; https://www.guitarlayers.com/drop_voicings/
- Suggested placement: tool: Inversions and Voicings (drop 3 selector); verify against chapter-8.html before changing anything.
- Interactive idea: toggle drop 2 vs drop 3 on the same chord and see the skipped string highlighted.

## [core] Chord symbol component order for the Chord Finder            status: placed -> tools.html#lesson-12 (name = root, quality, extension, slash bass; convention not confirmed twice)
- Fact(s): A widely used writing order: root, then non-major triad quality (m, dim, aug), then the 7th or the highest extension (7, maj7, 9, 11, 13), then triad alterations (sus2, sus4, b5, #5), then added or tension notes (add9, #9, b13...), then the slash bass note last. Example format: Cmaj7#5sus4/F.
- Fact(s): Alterations are conventionally listed in numerical order. A slash chord names the full chord first and the bass note after the slash, and the bass can be a chord tone (C/E, an inversion) or not (C/D).
- Fact(s): Only one source (a Stack Exchange answer) states the ordering; it is a convention with variants, so the finder should output one canonical name and optionally show alternates.
- Sources: https://music.stackexchange.com/questions/139046/are-there-rules-to-the-order-of-components-in-chord-notation
- Suggested placement: tool: Chord Finder (naming function); note convention in the tool help text.
- Interactive idea: show the chosen name split into labelled parts (root, quality, extension, alteration, bass).

## [drums] Core rudiment stickings and the PAS list            status: placed -> drums-3.html (singles, doubles, triples, single paradiddle; other variants left out as unsourced)
- Fact(s): The Percussive Arts Society international list has 40 rudiments grouped as roll, diddle, flam and drag families. The roll family includes single stroke roll, multiple bounce, triple stroke, double stroke open roll, and the five, six, seven, nine, ten, eleven, thirteen, fifteen and seventeen stroke rolls.
- Fact(s): Stickings: single stroke roll R L R L; double stroke roll R R L L; triple stroke roll R R R L L L; single paradiddle R L R R then L R L L (accent the first note of each group of four).
- Fact(s): Diddle family on the PAS list: single, double and triple paradiddle plus single paradiddle-diddle. Flam family begins with flam, flam tap, flamacue, flam paradiddle. I did not source the sticking for the double, triple and paradiddle-diddle variants, leave those for a later pass.
- Sources: https://pas.org/wp-content/uploads/2024/04/pas-rudiments.pdf ; https://londondruminstitute.co.uk/the-40-pas-international-drum-rudiments-explained/ ; https://ae.vicfirth.com/education/40-essential-rudiments/
- Suggested placement: new lesson D3 "Rudiments" in drums track
- Interactive idea: stick-sticking player that lights up R and L hands in time with metro.js, tempo slider.

## [drums] Time signatures: simple, compound, duple, triple, quadruple            status: placed -> drums-2.html (metro.js accent groups)
- Fact(s): Meters are described by beats per bar and how each beat divides. Duple: 2/4, 2/2, 6/8 (two beats). Triple: 3/4, 3/2, 9/8 (three beats). Quadruple: 4/4, 4/2, 12/8 (four beats).
- Fact(s): Simple meters (2/4, 3/4, 4/4) divide each beat in two; compound meters (6/8, 9/8, 12/8) divide each beat in three, so 6/8 is felt as two big beats of three eighth notes, not six equal beats.
- Fact(s): Odd meters such as 5/4 or 7/8 are usually counted as grouped pulses, for example 7/8 as 2+2+3 or 3+2+2. I have only a general teaching source for the grouping idea.
- Sources: https://www.libertyparkmusic.com/musical-time-signatures/ ; https://us.humankinetics.com/blogs/excerpt/learn-four-types-of-time-signatures ; https://www.tunelark.com/blog/odd-time-signatures-drums/
- Suggested placement: new lesson D2 "Time signatures" in drums track; extend metro.js with accent groupings.
- Interactive idea: choose a meter and a grouping and hear the accent pattern, with beat dots clustered by group.

## [keyboard] Keyboard layout, 88 keys and octave numbers            status: placed -> keyboard-1.html
- Fact(s): A full piano has 88 keys: 52 white and 36 black, running A0 to C8 (seven octaves plus a minor third). Middle C is C4, the fourth C from the left, key number 40, about 261.6 Hz.
- Fact(s): In scientific pitch notation the octave number increases at each C, not at A, so B3 is followed by C4. The 2-black-key group marks C (the white key just left of it) and the 3-black-key group marks F.
- Sources: https://piano.org/theory/piano-notes/ ; https://www.musicandtheory.com/an-easy-guide-to-scientific-pitch-notation/
- Suggested placement: new lesson K1 "Keys and layout" in keyboard.html (no 88-key or C4 content exists there now)
- Interactive idea: hover any key of a full 88-key strip to see its name, octave number and key number; a "find C" game using the 2-black-key anchor.

## [keyboard] C major scale fingering, both hands            status: placed -> keyboard-2.html
- Fact(s): Right hand ascending C to C: 1-2-3-1-2-3-4-5. The thumb tucks under finger 3 to play F. Descending uses the same fingers, with finger 3 crossing over the thumb.
- Fact(s): Left hand ascending C to C: 5-4-3-2-1-3-2-1. Finger 3 crosses over the thumb to play A. Both hands play the same notes with mirrored fingerings.
- Fact(s): Practice tips given: start one octave then extend to two, three, four; metronome around 100 BPM then raise a few BPM at a time; work through keys by adding one sharp or flat (circle of fifths order).
- Sources: https://www.anselmoacademy.org/piano-technique-playing-the-c-major-scale/ ; https://www.pianoscales.org/major.html (LH pattern 5-4-3-2-1-3-2-1 for F and G)
- Suggested placement: new lesson K2 "Major scale fingering" in keyboard track
- Interactive idea: animated hand over a piano strip showing which finger plays each note, with thumb-tuck points highlighted, tempo from metro.js.

## [keyboard] Major scale fingering exceptions (F, B, F#/Gb)            status: unsure
- Fact(s): F major: right hand 1-2-3-4-1-2-3-4 (four fingers first, then thumb on C); left hand 5-4-3-2-1-3-2-1. G major left hand uses the same 5-4-3-2-1-3-2-1 as C and F.
- Fact(s): B major left hand 4-3-2-1-4-3-2-1. F#/Gb major left hand 4-3-2-1-3-2-1-4, right hand 2-3-4-1-2-3-1-2. Db, Gb and B (the scales with five black keys) share one pattern per a teaching page.
- Fact(s): Confirmed twice only for F and G; the B and F#/Gb numbers come from a single chart page and the second site gave the grouping idea but its numbers were images.
- Sources: https://www.pianoscales.org/major.html ; https://piano-ology.com/piano-technique/major-scale-fingering/
- Suggested placement: lesson K2, after the C major fingering; add only F and G until the others are verified.
- Interactive idea: pick a key and see the fingering numbers appear under the notes with a note on where the thumb sits (usually on white keys).

## [keyboard] Rootless voicings, Type A and Type B            status: placed -> keyboard-4.html (ii-V-I widget; 5th-dropped variant mentioned in text)
- Fact(s): A rootless voicing is a four-note left-hand chord that leaves out the root (the bass player covers it) and stacks 3, 5, 7, 9. Type A has the 3rd on the bottom: 3-5-7-9. Type B has the 7th on the bottom: 7-9-3-5.
- Fact(s): Minor 9: A = b3-5-b7-9. Dominant 7b9: A = 3-5-b7-b9, B = b7-b9-3-5. Dominant 7b9b13: A = 3-b13-b7-b9. Per one source, the usual dominant voicing drops the 5th for 3-7-9 in some tutorials, so spelling varies by teacher.
- Fact(s): Alternating A and B across a ii-V-I keeps the hand in one small area with minimal movement (stated by the teaching sites; Bill Evans style is the common attribution).
- Sources: https://pianowithjonny.com/piano-lessons/rootless-voicings-for-piano-the-complete-guide/ ; https://www.pianogroove.com/jazz-piano-lessons/rootless-chord-voicings/ ; https://piano.org/theory/rootless-voicings/
- Suggested placement: new lesson K4 "Seventh chords and voicings" in keyboard track; also tool: Inversions and Voicings piano view (left-hand voicings, which is still open in BACKLOG).
- Interactive idea: choose ii-V-I in a key and toggle A-first vs B-first; the piano strip shows the voice leading between chords.

## [drums] Pulse and subdivision counting (quarter, eighth, sixteenth, triplet)            status: placed -> drums-1.html (metro.js subdivision selector)
- Fact(s): In 4/4 the quarter note is the pulse, counted 1 2 3 4. Eighth notes split each beat in two: 1 & 2 & 3 & 4 & (8 per bar). Sixteenths split it in four: 1 e & a 2 e & a ... (16 per bar). Eighth-note triplets split it in three: 1-trip-let 2-trip-let (12 per bar); three triplet eighths fill the same time as one quarter.
- Fact(s): Rests are counted as actively as notes; keep saying the full grid through silences. Dotted note = note plus half its value (dotted quarter = 1.5 beats, dotted eighth = 0.75 beat).
- Fact(s): Practice drill from the sources: say the full 16th grid aloud at slow tempo and clap only on the numbers, then only the "&", then only the "e", to separate the voice from the hands. Notation convention: x noteheads = cymbals, round dots = drums with skins.
- Sources: https://upbeat.studio/free-stuff/blog/how-to-read-drum-sheet-music-like-a-pro/ ; https://drummingtips.com/drum-fills-for-beginners/ (counting of 8ths, 16ths, triplets agrees)
- Suggested placement: new lesson D1 "Pulse and subdivisions" in drums track; extend metro.js with a subdivision selector (1, 2, 3, 4 clicks per beat) and an accented beat.
- Interactive idea: a counting display that lights each syllable (1 e & a / 1 & / 1-trip-let) in time with the click, and a "mute the numbers" toggle to clap only the chosen syllable.

## [drums] Basic rock beat and common variations (groove builder)            status: placed -> drums-4.html (groove builder, 16-step presets)
- Fact(s): Basic rock beat in 4/4: hi-hat plays steady eighths (1 & 2 & 3 & 4 &), snare on 2 and 4 (the backbeat), kick on 1 and 3. Backbeat means beats 2 and 4, usually the snare, though a hi-hat or a clap can carry it.
- Fact(s): Variations listed in two sources: kick on 1, the "and" of 2, and 3; four-on-the-floor (kick on all four beats, snare still 2 and 4); sixteenth-note hi-hat with the same kick and snare. The kick is the flexible voice, the snare backbeat is the stable one.
- Fact(s): In compound quadruple (12/8 feel) the kick stays on 1 and 3 and the snare on 2 and 4, with the hi-hat marking the three-part beat division. A half-time feel puts the snare only on beat 3; a double-time backbeat puts it on the second eighth of every beat.
- Sources: https://viva.pressbooks.pub/openmusictheory/chapter/drumbeats/ ; https://drumbeatsonline.com/blog/rock-drum-beats-essential-patterns-every-drummer-should-know
- Suggested placement: new lesson D4 "Basic grooves" in drums track with a groove builder grid (rows hi-hat, snare, kick; 8 or 16 steps; presets above).
- Interactive idea: step-sequencer grid rows kick, snare, hi-hat on 16 steps, with presets (basic rock, kick variation, four-on-the-floor, half-time) played through metro.js.

## [drums] Fills: what they are and starter shapes            status: placed -> drums-5.html (fill player; hand splits shown as a common choice)
- Fact(s): A fill is a short break from the repeating beat that links sections (for example verse into chorus). It can be half a beat to several bars; knowing where it goes and how long it should be matters more than how busy it is, and leaving space often works better.
- Fact(s): Beginner fill shapes, all after one bar of the basic backbeat: eighths moving snare, tom 1, tom 2, floor tom, two notes each (1 & 2 & ...); the same with four sixteenths per drum (one drum per beat); a crescendo of eighths, quiet to loud over the bar; Bonham-style triplets (first tom on the beat, floor tom on "trip", kick on "let", four beats in a row); and a linear sixteenth pattern R L R K (right, left, right, kick; no two limbs together), repeated.
- Fact(s): Flams in fills: a flam is a light grace note just before the main stroke. Practice every fill slowly with a click, and try leading with the non-dominant hand.
- Sources: https://drummingtips.com/drum-fills-for-beginners/ ; https://www.drumeo.com/beat/beginner-drum-fills/ (page title only confirmed, content not read)
- Suggested placement: new lesson D5 "Fills" in drums track
- Interactive idea: pick a one-bar fill shape and a drum order; the grid plays beat for 3 bars then the fill, with the sticking (R, L, K) shown per note.

## [drums] Syncopation: strong beats, off-beats and four types            status: placed -> drums-6.html (syncopation grid with weak-position meter)
- Fact(s): In 4/4, beat 1 is the strongest, beat 3 next, beats 2 and 4 weaker, and the "&" between beats are off-beats. Syncopation is accenting a weak position at the expense of a strong one while the pulse still runs underneath. "Off-beat" names a place; syncopation is the effect.
- Fact(s): Four recurring devices: off-beat accents (notes on the "&"s), a missed downbeat (rest on a strong beat), anticipation (a note an eighth or sixteenth early, often held through the beat), and a tie across the beat. A common recipe is a straight foundation (four-on-the-floor kick) with a syncopated layer on top, e.g. snare on 1, 2, 3 and the "and" of 3.
- Fact(s): Method: write the rhythm straight first, displace one or two notes, remove a strong-beat note, keep one voice playing straight as an anchor, loop it and check you can still feel the pulse. Count the full grid (1 & 2 & 3 & 4 &) and mark the syllables that carry notes.
- Sources: https://www.masterthescore.com/article/syncopation ; https://viva.pressbooks.pub/openmusictheory/chapter/drumbeats/ (backbeat and anticipation examples)
- Suggested placement: new lesson D6 "Syncopation and polyrhythm" in drums track, first half
- Interactive idea: grid with a locked straight kick, user drags notes between on-beat and "&" slots and a meter shows how many accents sit on weak positions.

## [drums] Polyrhythm 3:2 and 4:3 (hemiola)            status: unsure
- Fact(s): A polyrhythm is two different rhythmic divisions sounding at once. 3:2 means three equal notes in the time of two (called a hemiola in the PAS blog). Over a 6-step cycle, one hand plays steps 0, 2, 4 and the other plays steps 0 and 3; the combined attack order is both, three-hand, two-hand, three-hand, which is the spoken mnemonic "nice cup of tea" (one syllable per attack).
- Fact(s): 4:3 means four notes against three over a 12-step cycle (hands on 0,3,6,9 and 0,4,8). One source suggests practicing at 60 BPM with a metronome and learning by ear first, then adding counting. I derived the step lists myself from the ratio; only the 3:2 mnemonic appears in the sources, the exact 4:3 spoken count text could not be read cleanly, so confirm before writing the 4:3 words.
- Sources: https://pas.org/pas-blog/hot-licks-32-polyrhythmic-fill-combinations/ ; https://www.musical-u.com/learn/introduction-to-polyrhythms/
- Suggested placement: new lesson D6 "Syncopation and polyrhythm" in drums track, second half; tool idea for metro.js: two-ratio click (high and low pitch) with common-cycle length shown.
- Interactive idea: choose a ratio (3:2, 4:3, 5:4), hear each layer in a different pitch, with dots on a shared 6- or 12-step timeline.

## [keyboard] Comping: what it is and the Charleston family            status: placed -> keyboard-5.html (rhythm grid; sources disagree on reverse Charleston so named variants offered)
- Fact(s): Comping means accompanying: chords plus rhythmic punctuation behind a soloist, with two jobs (feed the groove, support the harmony without crowding the soloist). Do not copy the soloist's rhythm note for note, keep to the middle of the keyboard, and let silence do work. Beginner error number one is playing too much; the fix is subtraction.
- Fact(s): Standard Charleston: chord on beat 1 and a second shorter chord on the "and" of 2 (count "1 . . . 2 &"). Reverse Charleston: the "and" of 1 plus beat 3 (one source gives a different shift, beat 2 plus "and" of 4; sources disagree on the exact displacement, so offer "shifted by an eighth" and "mirrored" as separate named variants). A mirrored version puts the offbeat on the "and" of 3, pushing into the next bar. Shifting the whole Charleston one eighth earlier adds forward drive and suits intros.
- Fact(s): Other starter rhythms: half-note pulse (chords on 1 and 3, calm, good for ballads or busy soloists), four-to-the-floor (chord on every beat, sparingly, slow tempos or gospel feel), two-eighth pickup before beat 1 or 3. Think of each pattern as a word and chain them into phrases (for example two bars Charleston, one bar half notes, a pickup).
- Fact(s): Practice routine from the sources: one pattern on a single shell voicing (root-3-7), metronome 70-80 BPM with clicks on beats 2 and 4 only, then over a ii-V-I (Dm7, G7, Cmaj7), then speed up gradually (one source suggests up to about 160 BPM). Voice-leading habits: keep common tones, move by step where possible. Swing uses swung eighths; Latin and bossa use straight eighths and lean on the half-note pulse.
- Sources: https://www.danpianostudio.com/post/piano-comping-patterns ; https://jazz-library.com/articles/comping/ ; https://jenslarsen.nl/jazz-chords-the-7-comping-rhythms-that-really-matter/
- Suggested placement: new lesson K5 "Comping patterns" in keyboard track (keyboard-5.html). chapter-2.html already has a guitar strum pattern named "Charleston" (the 1 and "&" of 2 idea, different grid), so cross-link rather than duplicate.
- Interactive idea: an 8-slot eighth-note grid where the reader picks a rhythm preset (Charleston, reverse, half-note pulse, four-to-the-floor) and a chord (Dm7 / G7 / Cmaj7 shell from keys.js), hears it on the keyboard strip with the click on 2 and 4 via metro.js.

## [keyboard] Comping voicings: shell vs rootless vs drop 2 for the left and right hand      status: placed -> keyboard-5.html#voicings (shell, rootless, drop 2 toggle; octave-of-middle-C advice marked as rule of thumb)
- Fact(s): Three voicing families for comping. Shell: root, 3rd, 7th only (leanest, quickest to learn). Rootless: drop the root and use 3rd, 7th plus one or two colour tones (9th, 13th), sitting in the middle register while the bass player covers the root. Drop 2 / open: the same four notes spread by lowering the second-highest note an octave, fuller for ballads and half-note comping.
- Fact(s): Left-hand options named by one source: root plus 3rd for a light touch, 3rd plus 7th shell for the leanest sound, octave plus 3rd for drive on up-tempo tunes; in a 2-feel (bass plays two notes a bar) use sparse bass hits on 1 and 3. Practical test for voice leading: Dm7 to G7 shell should need only a tiny finger move; leaps larger than a third mean the wrong inversion.
- Fact(s): Single-source guidance (mark as unconfirmed for the Placer): stay roughly an octave either side of middle C. Already in keyboard-4.html: rootless Type A and B, so link to it.
- Sources: https://www.danpianostudio.com/post/piano-comping-patterns ; https://jenslarsen.nl/jazz-chords-the-7-comping-rhythms-that-really-matter/ (shell voicings as the base for the rhythms)
- Suggested placement: lesson K5, second section "Which chords to play", linking to keyboard-4.html and the guitar drop 2 material in tools.html#lesson-15.
- Interactive idea: toggle shell / rootless / drop 2 on the same chord and see which keys light up, with an indicator of how far the hand moves to the next chord.

## [keyboard] Reading repeats and jumps on a chord chart or lead sheet         status: placed -> keyboard-6.html (road map walker)
- Fact(s): A bar line splits the music into bars and is never played. A double bar line marks a section end (often before a key, time or tempo change). A thin plus thick line is the final bar; with two dots in front it becomes an end-repeat sign. An end-repeat jumps back to the matching start-repeat (dots facing the repeated music), or to the top if there is no start sign.
- Fact(s): First and second endings (volta brackets): play bracket 1 on the first pass, go back, and on the second pass skip bracket 1 and play bracket 2. D.C. (da capo) returns to the very start; D.S. (dal segno) returns to the segno sign; "al Fine" means play until the word Fine; "al Coda" means play until "To Coda", then jump to the coda sign. On the first pass "To Coda" is ignored. Whether repeats are taken again after a D.C. or D.S. is convention (usually skipped), so follow the chart or the bandleader.
- Fact(s): A D.S. al Coda uses three markers in order: segno (where you restart), To Coda (where you leave) and coda sign (where you land).
- Sources: https://tomus.app/music-symbols/repeats ; https://www.songtive.com/blog/mastering-musical-notation-d-c-d-s-al-coda-al-fine-explained/ (search excerpt agrees on D.C. and D.S. meanings)
- Suggested placement: new lesson K6 "Reading chord charts", first section "Road map" in keyboard track. Also usable as a Core note for any instrument.
- Interactive idea: a small chart with 8 bars and a D.S. al Coda; press play and a cursor walks the real playback order, highlighting each bar in turn, with a toggle for "first time" versus "second time".

## [keyboard] Nashville number system for charts (and how it differs from Roman numerals)   status: placed -> keyboard-6.html (converter; Transposer Nashville toggle still open; diamonds and arrows left out as single-source)
- Fact(s): Nashville numbers name a chord by the scale degree of its root, tonic = 1. In C major, 1-4-5 is C-F-G, in B major the same numbers mean B-E-F#, so one chart works in every key (useful when a singer changes key). Everything is major until marked: minor is written with a minus sign (-6) or "6m"; one source says minor in the key's minor mode is the same idea with number choices varying by teacher. Seventh chords add a 7 (G7 in C is 5 with a 7).
- Fact(s): Slash and inversion notation use numbers on both sides: 1/3 is C with E in the bass, 5/3 is G with E in the bass (number before the slash = chord, number after = bass scale degree). A diamond around a chord means let it ring through the bar, an arrow ("push") means play the chord an eighth early or late depending on the direction, and an underline joins two chords that share one bar.
- Fact(s): Roman numerals differ: uppercase for major, lowercase for minor (I ii iii IV V vi vii-diminished in major), so they carry chord quality in the case of the letters. Figured bass writes inversions as I6 and I6/4 in Roman numeral analysis. Symbol meanings vary by writer, so ask whoever wrote the chart.
- Fact(s): Wikipedia agrees on scale-degree logic and the transposable-chart point; the Pianote page gives the symbols. Chart-reading conventions beyond these (diamonds, arrows) come from one teaching page only.
- Sources: https://www.pianote.com/blog/the-number-system/ ; https://en.wikipedia.org/wiki/Nashville_Number_System
- Suggested placement: lesson K6 "Reading chord charts", second section. The Chord Transposer in tools.html already has a Roman numeral view, so add a Nashville numbers toggle there too (minus sign for minor).
- Interactive idea: pick a key and a number chart (1 5 -6 4); the chart switches between Nashville, Roman and letter names and the keyboard strip shows each chord.

## [keyboard] Chart-reading workflow: a chord chart to a first play-through       status: unsure
- Fact(s): A chord chart gives chord symbols per bar (a symbol per bar by default, two symbols in a bar share it, underline or slash marks in the Nashville style show the split) but not the rhythm or voicing; the reader supplies a comping pattern and a voicing. A sensible read order that fits the sources: key and time signature, then roadmap signs (repeats, endings, D.S. or D.C., coda), then chord symbols bar by bar, then pick rhythm from the style.
- Fact(s): Not confirmed by a second source, so mark unsure: the specific "read order" is my synthesis of the repeat-sign page and the comping and Nashville pages, not a quoted method.
- Sources: https://tomus.app/music-symbols/repeats ; https://www.pianote.com/blog/the-number-system/ ; https://www.danpianostudio.com/post/piano-comping-patterns
- Suggested placement: closing checklist of lesson K6; low priority until a second source on lead-sheet conventions is found.
- Interactive idea: a six-step checklist the reader ticks while playing along to a short 8-bar chart with a metronome.

## [drums] Shuffle feel: triplet skip, half-time shuffle, ghost-note shuffle            status: placed -> drums-4.html (12-step triplet presets; swing slider left out)
- Fact(s): A shuffle is a triplet-based "long-short" skipping feel. It is written either as triplets in 4/4 or as 12/8, the two being nearly equivalent. Count 1 & ah 2 & ah ...; the cymbal or hi-hat plays beat and "ah" (first and third triplet partial) and skips the middle one: "1 - ah 2 - ah".
- Fact(s): Variations named in the Drum! Magazine article: the half-time shuffle puts the snare accent on count 3 only and feels more laid back; the Purdie shuffle is a half-time shuffle with soft ghosted snare notes filling the gaps and the hi-hat closed on the beats and open on every "ah"; the jazz/swing version replaces the shuffle hi-hat with a ride pattern; a rock shuffle is played heavier with kick and snare implying the triplet feel.
- Fact(s): Dynamics make the feel: unaccented snare notes are played very softly and accents clearly louder; weak dynamic contrast is a common reason a shuffle sounds stiff. Delaying the "ah" slightly gives a harder, driving feel; straightening it slightly gives a lazier, rounder feel (very fast tempos do this naturally).
- Fact(s): Cross-check: the 12/8 / compound-quadruple equivalence agrees with the existing inbox entry from Open Music Theory on compound meters. Only one detailed source for the variation names.
- Sources: https://drummagazine.com/how-to-play-shuffles-and-shuffle-variations/ ; https://viva.pressbooks.pub/openmusictheory/chapter/drumbeats/
- Suggested placement: lesson D4 "Basic grooves", a second preset group "Triplet grooves" (12-step grid, 4 beats x 3 triplet partials) after the 16-step rock presets.
- Interactive idea: 12-step grid with presets "shuffle" (hi-hat on steps 1, 3 of each triplet), "half-time shuffle" (snare on beat 3 only), and a swing slider that moves the "ah" step later or earlier.

## [drums] Ghost notes: very soft snare notes around the backbeat            status: placed -> drums-4.html#ghost (snare ghost state; placement marked typical, not a rule)
- Fact(s): A ghost note is a very soft note, usually on the snare, with little attack, played quietly between the main accented hits. It adds texture and momentum and should not compete with the backbeat; if every snare hit has the same weight the groove sounds flat, so create dynamic contrast.
- Fact(s): Practical points: ghosting after the backbeat feels easier than ghosting into it (the stick has to be low before the next accent). Keep the stick low for ghosts and raise it for accents. Ghosts typically sit on the off-beat sixteenths ("e" and "a") around the snare on 2 and 4.
- Fact(s): Confirmed only by general teaching sources and a forum definition, and the stick-height advice by an excerpt; the specific "e and a" placement is my reading of common funk and shuffle patterns, so state it as typical, not as a rule.
- Sources: https://drummagazine.com/how-to-play-shuffles-and-shuffle-variations/ ; https://www.reddit.com/r/drums/comments/20ngs7/can_someone_explain_to_me_what_ghost_notes_are_on/ ; https://www.youtube.com/watch?v=k0yQRZYXq3s (title and excerpt only)
- Suggested placement: lesson D4 (variation row for the snare, with a per-step velocity: ghost, normal, accent) or the start of D5 as a dynamics note for fills.
- Interactive idea: snare row where each step cycles off, ghost (quiet), normal, accent; presets add ghosts on the "e" and "a" before the backbeat; metro.js needs per-note volume.

## [drums] Tresillo (3+3+2) and the Bo Diddley / dembow family            status: placed -> drums-6.html (tresillo preset)
- Fact(s): Tresillo is the rhythm 3+3+2 over eight sixteenth steps (hits on steps 0, 3, 6 of 8, or 0, 3, 6 and then a rest to the next beat). Played as eighths it is 3+3+2 over four beats; it is one of the most common syncopated cells in popular music and is the first bar of the 3-2 son clave.
- Fact(s): It is heard in the Bo Diddley beat, the reggaeton/dembow kick-snare pattern (compared with the habanera bass line in the Puget Sound text), second-line drumming, and rock riffs; doubled it gives 3+3+3+3+2+2 (16 steps), and 3+3+4+3+3 is another named variant. The pattern is felt as a triple grouping pulling against the duple meter.
- Fact(s): Two independent sources (a university open textbook and a music-theory blog on Toussaint's work) agree on the 3+3+2 structure and the Bo Diddley link.
- Sources: https://musictheory.pugetsound.edu/mt21c/ThreeTwoClave.html ; https://www.ethanhein.com/wp/2013/why-is-son-clave-so-awesome/
- Suggested placement: lesson D6, syncopation section: a "3+3+2" preset on the grid, with the kick on 0, 3, 6 (and 8, 11, 14 for the doubled form) and the snare on 2 and 4.
- Interactive idea: 16-step grid where the reader switches between 4+4+4+4 (straight) and 3+3+3+3+2+2 groupings and sees the accents fall off the beat.

## [drums] Son clave 3-2 and 2-3 (five hits in a 16-step cycle)            status: placed -> drums-6.html (3-2 and 2-3 presets)
- Fact(s): The 3-2 son clave is a two-bar timeline: three hits in the first bar, two in the second. Counted over 16 sixteenth steps in one 4/4 bar the hits fall on steps 0, 3, 6, 10, 12 (gaps 3-3-4-2-4). The 2-3 clave starts with the two-hit half instead (same pattern rotated by half the cycle). Which side you start on is a chart convention; the rhythm is the same one.
- Fact(s): The three-side builds tension by crossing the beat; the two-side lands on the pulse and resolves it. Toussaint's analysis: it is not maximally even, but it has no pairs of hits opposite each other (rhythmic oddity), so it does not split into two halves. The Bo Diddley beat is the same pattern.
- Fact(s): Note: the step list is derived from the 3-3-4-2-4 gaps in the Ethan Hein / Toussaint post and the 3+3+2 first bar in the Puget Sound text; an in-text commenter on the blog gives the same grid (0, 3, 6, 10, 12 steps counting from 0). Terminology 3-2 / 2-3 is described there as a North American usage, not Cuban.
- Sources: https://www.ethanhein.com/wp/2013/why-is-son-clave-so-awesome/ ; https://musictheory.pugetsound.edu/mt21c/ThreeTwoClave.html
- Suggested placement: lesson D6, polyrhythm half, as an example of a 3-against-2 feel built from one pattern; also a preset in a 16-step grid.
- Interactive idea: a circular or linear 16-step clave with a toggle between 3-2 and 2-3 that rotates the cycle by 8 steps, with the click on the main beats so the reader hears where the pattern crosses and resolves.

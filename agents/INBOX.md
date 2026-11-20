# Inbox (Scout writes, Placer clears). Entry format is in `.claude/agents/scout.md`.

## [keyboard] Triad inversions and right-hand fingering            status: new
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

## [drums] Core rudiment stickings and the PAS list            status: new
- Fact(s): The Percussive Arts Society international list has 40 rudiments grouped as roll, diddle, flam and drag families. The roll family includes single stroke roll, multiple bounce, triple stroke, double stroke open roll, and the five, six, seven, nine, ten, eleven, thirteen, fifteen and seventeen stroke rolls.
- Fact(s): Stickings: single stroke roll R L R L; double stroke roll R R L L; triple stroke roll R R R L L L; single paradiddle R L R R then L R L L (accent the first note of each group of four).
- Fact(s): Diddle family on the PAS list: single, double and triple paradiddle plus single paradiddle-diddle. Flam family begins with flam, flam tap, flamacue, flam paradiddle. I did not source the sticking for the double, triple and paradiddle-diddle variants, leave those for a later pass.
- Sources: https://pas.org/wp-content/uploads/2024/04/pas-rudiments.pdf ; https://londondruminstitute.co.uk/the-40-pas-international-drum-rudiments-explained/ ; https://ae.vicfirth.com/education/40-essential-rudiments/
- Suggested placement: new lesson D3 "Rudiments" in drums track
- Interactive idea: stick-sticking player that lights up R and L hands in time with metro.js, tempo slider.

## [drums] Time signatures: simple, compound, duple, triple, quadruple            status: new
- Fact(s): Meters are described by beats per bar and how each beat divides. Duple: 2/4, 2/2, 6/8 (two beats). Triple: 3/4, 3/2, 9/8 (three beats). Quadruple: 4/4, 4/2, 12/8 (four beats).
- Fact(s): Simple meters (2/4, 3/4, 4/4) divide each beat in two; compound meters (6/8, 9/8, 12/8) divide each beat in three, so 6/8 is felt as two big beats of three eighth notes, not six equal beats.
- Fact(s): Odd meters such as 5/4 or 7/8 are usually counted as grouped pulses, for example 7/8 as 2+2+3 or 3+2+2. I have only a general teaching source for the grouping idea.
- Sources: https://www.libertyparkmusic.com/musical-time-signatures/ ; https://us.humankinetics.com/blogs/excerpt/learn-four-types-of-time-signatures ; https://www.tunelark.com/blog/odd-time-signatures-drums/
- Suggested placement: new lesson D2 "Time signatures" in drums track; extend metro.js with accent groupings.
- Interactive idea: choose a meter and a grouping and hear the accent pattern, with beat dots clustered by group.

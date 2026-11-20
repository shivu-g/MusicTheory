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

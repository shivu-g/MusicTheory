# The three-agent loop

Guitar Theory Maps is improved by three agents that run in a cycle. The repo HTML/JS is the source of truth: edit it directly, there is no build step.

```
Scout  ->  agents/INBOX.md  ->  Placer  ->  working tree  ->  Publisher  ->  GitHub main  ->  live site check
  ^                                                                                 |
  +------------------------ agents/BACKLOG.md, agents/LOG.md <----------------------+
```

| Agent | Definition | Job |
|---|---|---|
| Scout | `.claude/agents/scout.md` | Finds new, relevant, verifiable information and writes it to `INBOX.md`. Never edits site files. |
| Placer | `.claude/agents/placer.md` | Takes inbox items and BACKLOG tasks and puts them where they fit in the site. Never commits. |
| Publisher | `.claude/agents/publisher.md` | Verifies, commits, pushes to `main`, waits for GitHub Pages, checks the live site, rolls back on failure. |

## One cycle
1. Scout: up to 6 inbox items for the track with the thinnest content.
2. Placer: clear the inbox, then take the top BACKLOG task. Keep the change set small enough to verify.
3. Publisher: `node scripts/verify.js`, commit, `git push origin HEAD:main`, fetch the live pages, confirm the new strings are there.
4. Append one line per agent to `LOG.md`. Start the next cycle.

## Site structure being built
- **Core** (shared by every instrument): chapter 1 and the pure theory that does not depend on an instrument.
- **Guitar track**: the existing fretboard chapters.
- **Keyboard track**: keys, hand positions, voicings, scales on the keyboard.
- **Drums track**: pulse, subdivisions, time signatures, rudiments, grooves, fills.
- **Toolkit**: cross-instrument finders and calculators, each tool shows the instrument views it supports.

## House rules (all agents)
- Theme: charcoal `#2B2B2E`, dusty purple `#6B5B7B`, gold `#F2C14E`. Use the CSS variables in `style.css`, never new hard-coded colours.
- Reuse `common.js` and `neck.js` helpers. Each tool script is wrapped in its own IIFE. Unique element ids per page.
- Never copy text from sources. Write facts in your own words and keep the source URL.
- Every change must pass `NODE_PATH=<node_modules> node scripts/verify.js` before it is committed.
- Do not touch `.github`, secrets, or anything outside this repo.
- If a cycle breaks the live site, the Publisher rolls back first and investigates second.

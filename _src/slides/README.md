# Instructor slide decks

Each module's deck is built from two files:

- `_src/slides/mNN.js`: the slides and speaker notes
- `_src/teach/mNN.json`: the shared teaching content (in-class discussion, coaching notes, active learning ideas). The discussion slide reads from here, and so does the module's Teaching page in the Instructor Guide.

Build a deck (writes to `downloads/slides/`):

```
cd _src/slides
NODE_PATH=$(npm root -g) node m02.js
```

Then rebuild the site (`python3 _src/build2.py`) so the Teaching page picks up the new slide count.

- Needs `pptxgenjs`, `react`, `react-dom`, `react-icons`, and `sharp`, plus the pptx skill's `apply_theme.js`.
- `postfix.py` marks every object named `Decorative: ...` as decorative, so screen readers skip it.
- Title art: `node art/hero.js <module> <out.png> [map|crew]` renders the module's cover scene without text. Convert it to JPG at quality 88 and save it as `art/mNN-title.jpg`.

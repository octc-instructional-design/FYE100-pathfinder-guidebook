// "My STAR(T) Story" walk-through deck: one slide per step of the Student Choice planning form.
// Built to sit beside a recorded video (instructor sample story) and for students to use while drafting.
// Content is centered so it reads well side by side with a webcam video.
// usage: NODE_PATH=$(npm root -g) node story.js
const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { applyTheme } = require('/mnt/skills/public/pptx/scripts/apply_theme.js');
const { HEX, W, H, BOOK } = require('./deck.js');

const FILE = 'FYE100-My-STARt-Story-Slides.pptx';
const THEME = { name: 'FYE 100 Pathfinder', headFontFace: 'Calibri', bodyFontFace: 'Calibri',
  colors: { dk1: HEX.ink, lt1: HEX.white, dk2: HEX.navy, lt2: HEX.softBlue, accent1: HEX.blue, accent2: HEX.gold,
    accent3: HEX.sky, accent4: HEX.accentInk, accent5: HEX.softGold, accent6: HEX.muted, hlink: HEX.blue, folHlink: HEX.accentInk } };

// 10 Essential Skills (coins live in the guidebook)
const SKILLS = { 1: 'Communication', 2: 'Critical & Creative Thinking', 3: 'Quantitative Reasoning', 4: 'Interpersonal Relations',
  5: 'Adaptability & Leadership', 6: 'Professionalism', 7: 'Civic Engagement', 8: 'Collaboration & Teamwork',
  9: 'Knowledge Application', 10: 'Information Literacy' };
const coin = (n) => `${BOOK}images/shared/10es/10es-${String(n).padStart(2, '0')}.png`;

// STAR(T) step colors, same as the guidebook (--ss-s ... --ss-tr); white text on each passes WCAG AA
const STEPS = [
  { key: 'S', letter: 'S', name: 'Situation', sub: 'Set the scene', color: '1565C0', tint: 'D6E6F8',
    q: 'What was going on? Where were you?',
    help: 'Just enough context for someone who wasn\'t there. Two or three sentences.',
    watch: 'The Situation is the setup, not the story. Keep it brief.',
    notes: `SITUATION: Set the scene.
      What was going on, and where were you? Work, school, community, or family?
      Give just enough context for someone who wasn't there to follow along. Two or three sentences is usually enough.
      Watch out: the Situation is the setup, not the story. Keep it brief and get to the Task.` },
  { key: 'T', letter: 'T', name: 'Task', sub: 'Define your role', color: '00796B', tint: 'D2ECE8',
    q: 'What specifically was your responsibility?',
    help: 'Not the group\'s goal. Your part of it.',
    watch: '"We needed to figure it out" is a group goal.',
    notes: `TASK: Define your role.
      What were you trying to accomplish or solve? What was specifically yours to handle? Not the group's general goal, but your particular role or challenge.
      Watch out: "We needed to figure it out" is a group goal. Your Task is what you were responsible for.` },
  { key: 'A', letter: 'A', name: 'Action', sub: 'Show what you did', color: '4A7C22', tint: 'E0ECD5',
    q: 'What did YOU specifically do?',
    help: 'Use "I." I decided, I reached out, I applied. This is where your skill lives.',
    watch: '"We worked through it together" hides what you did.',
    notes: `ACTION: Show what you did. This is the most important step.
      Use "I": I decided, I communicated, I applied, I reached out. Describe the specific things you did and the choices you made.
      This is where your skill lives. Show it; don't just claim it.
      Watch out: "We worked through it together" hides your contribution. Even in a group effort, describe what you did.` },
  { key: 'R', letter: 'R', name: 'Result', sub: 'Name the outcome', color: '6A3FB5', tint: 'E6DEF4',
    q: 'What happened because of what you did?',
    help: 'What changed, improved, or resolved? Honest and imperfect beats vague and positive.',
    watch: '"It went well" is not a result.',
    notes: `RESULT: Name the outcome.
      What changed, improved, or resolved because of what you did?
      Results don't have to be perfect. An honest, imperfect result is more believable than a vague positive one. Name what happened.
      Watch out: "It went well" is not a result.` },
  { key: 'Tr', letter: '(T)', name: 'Transfer', sub: 'Connect it forward', color: 'BF360C', tint: 'F6DDD3',
    q: 'What does this mean for where you are going?',
    help: 'Name where this skill shows up next: a program, a job, a relationship, a responsibility.',
    watch: '"This will help me in the future" is not a Transfer.',
    notes: `TRANSFER: Connect it forward. This step is unique to this course.
      What does this experience mean for your next semester, your career, or your life? This is where your story becomes more than a memory. It becomes evidence of who you're becoming.
      Be specific about where this skill will show up next: a particular program, a type of work, a relationship, or a responsibility.
      Watch out: "This will help me in the future" is not a Transfer. Name the specific context where this skill will matter.` },
];

(async () => {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.theme = { headFontFace: 'Calibri', bodyFontFace: 'Calibri' };
  pres.title = 'My STAR(T) Story';
  pres.subject = 'FYE 100 STAR(T) Stories: step-by-step slides for telling one story';
  pres.author = 'OCTC FYE 100';
  pres.company = 'Owensboro Community &amp; Technical College';
  const notes = (s, t) => s.addNotes(t.trim().replace(/\n {2,}/g, '\n'));
  const txt = (s, t, o) => s.addText(t, Object.assign({ isTextBox: true, margin: 0, valign: 'top', fontFace: 'Calibri' }, o));

  // Title master: branded cover. Step master: centered title placeholder so every slide has a real title.
  pres.defineSlideMaster({ title: 'Story Title', background: { color: HEX.navy },
    objects: [{ placeholder: { options: { name: 'title', type: 'title', align: 'left', x: 4.3, y: 1.75, w: 8.6, h: 1.3, fontSize: 60, bold: true, color: 'FFFFFF', valign: 'top', margin: 0 }, text: '' } }] });
  pres.defineSlideMaster({ title: 'Story Step', background: { color: HEX.white },
    objects: [{ placeholder: { options: { name: 'title', type: 'title', align: 'center', x: 1.5, y: 3.05, w: W - 3, h: 0.95, fontSize: 54, bold: true, color: 'FFFFFF', valign: 'middle', margin: 0, charSpacing: 4 }, text: '' } }] });

  // ---- 1. Title
  {
    const s = pres.addSlide({ masterName: 'Story Title' });
    s.addImage({ path: `${__dirname}/art/start-title.jpg`, x: 0, y: 0, w: W, h: H, objectName: 'Decorative: cover art, owl waving a start flag' });
    s.addText('My STAR(T) Story', { placeholder: 'title' });
    txt(s, 'FYE 100 · STAR(T) STORIES', { x: 4.3, y: 1.2, w: 8.4, h: 0.5, fontSize: 20, bold: true, color: HEX.gold, charSpacing: 3 });
    txt(s, 'Situation · Task · Action · Result · Transfer', { x: 4.3, y: 3.05, w: 8.6, h: 0.6, fontSize: 28, color: 'D6EEFA' });
    // all 10 Essential Skills
    const d = 0.74, gap = 0.12, x0 = 4.3;
    for (let n = 1; n <= 10; n++) {
      s.addImage({ path: coin(n), x: x0 + (n - 1) * (d + gap), y: 4.15, w: d, h: d,
        altText: `Essential Skill ${n}: ${SKILLS[n]}`, objectName: `Skill ${n} coin` });
    }
    txt(s, 'One true story. One skill. Five steps.', { x: 4.3, y: 5.15, w: 8.6, h: 0.6, fontSize: 24, italic: true, color: 'D6EEFA' });
    notes(s, `My STAR(T) Story.
      A STAR(T) Story is one true story that shows one of the 10 Essential Skills. It has five steps: Situation, Task, Action, Result, and Transfer.
      These slides follow the STAR(T) Story planning form one step at a time. Use them while you plan, practice, or record your own story.`);
  }

  // ---- 2a. Setup: the three required skills (hide 2b when telling one of these stories)
  {
    const s = pres.addSlide({ masterName: 'Story Step' });
    s.background = { color: HEX.blue };
    s.addText('Three required skills', { placeholder: 'title' });
    txt(s, 'SETUP · REQUIRED STORIES', { x: 1.5, y: 0.45, w: W - 3, h: 0.5, fontSize: 22, bold: true, color: HEX.gold, charSpacing: 4, align: 'center' });
    const req = [5, 6, 9], d = 1.3, colW = 3.7, x0 = (W - req.length * colW) / 2;
    req.forEach((n, i) => {
      const cx = x0 + i * colW;
      s.addImage({ path: coin(n), x: cx + (colW - d) / 2, y: 0.95, w: d, h: d, altText: `Essential Skill ${n}: ${SKILLS[n]}`, objectName: `Skill ${n} coin` });
      txt(s, SKILLS[n], { x: cx, y: 2.3, w: colW, h: 0.5, fontSize: 24, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
    });
    txt(s, 'Each one gets its own story.', { x: 1.5, y: 4.05, w: W - 3, h: 0.55, fontSize: 28, color: 'D6EEFA', align: 'center' });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 2.4, y: 5.0, w: W - 4.8, h: 1.45, rectRadius: 0.15, fill: { color: 'FFFFFF' }, line: { color: HEX.gold, width: 2.5 },
      objectName: 'Decorative: prompt card' });
    txt(s, [{ text: 'THIS STORY SHOWS…', options: { fontSize: 22, bold: true, color: HEX.accentInk, charSpacing: 2, breakLine: true } },
            { text: 'name the skill, then one real moment that proves it', options: { fontSize: 24, italic: true, color: HEX.muted } }],
      { x: 2.8, y: 5.2, w: W - 5.6, h: 1.1, align: 'center', valign: 'middle', paraSpaceBefore: 4 });
    notes(s, `SETUP: Your three required skills.
      Three of your four stories are assigned: Adaptability & Leadership, Professionalism, and Knowledge Application. Each one gets its own story.
      Name the skill this story is about. Then pick one real moment that shows it, one you can tell in 2 to 4 minutes.
      Telling one of these stories? Hide the next slide (Choose your skill). Telling your choice story? Hide this one.`);
  }

  // ---- 2b. Setup: choose your skill (hide 2a when telling the choice story)
  {
    const s = pres.addSlide({ masterName: 'Story Step' });
    s.background = { color: HEX.blue };
    s.addText('Choose your skill', { placeholder: 'title' });
    txt(s, 'SETUP · YOUR CHOICE', { x: 1.5, y: 0.75, w: W - 3, h: 0.5, fontSize: 22, bold: true, color: HEX.gold, charSpacing: 4, align: 'center' });
    // the seven skills students choose from (#5, #6, and #9 are the assigned stories)
    const pick = [1, 2, 3, 4, 7, 8, 10], d = 1.05, gap = 0.3, row = pick.length * d + (pick.length - 1) * gap, x0 = (W - row) / 2;
    pick.forEach((n, i) => {
      const x = x0 + i * (d + gap);
      s.addImage({ path: coin(n), x, y: 1.5, w: d, h: d, altText: `Essential Skill ${n}: ${SKILLS[n]}`, objectName: `Skill ${n} coin` });
    });
    txt(s, 'Pick the one skill your story shows best.', { x: 1.5, y: 4.05, w: W - 3, h: 0.6, fontSize: 28, color: 'D6EEFA', align: 'center' });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 2.4, y: 5.0, w: W - 4.8, h: 1.45, rectRadius: 0.15, fill: { color: 'FFFFFF' }, line: { color: HEX.gold, width: 2.5 },
      objectName: 'Decorative: prompt card' });
    txt(s, [{ text: 'I CHOSE THIS SKILL BECAUSE…', options: { fontSize: 22, bold: true, color: HEX.accentInk, charSpacing: 2, breakLine: true } },
            { text: 'one sentence, in your own words', options: { fontSize: 24, italic: true, color: HEX.muted } }],
      { x: 2.8, y: 5.2, w: W - 5.6, h: 1.1, align: 'center', valign: 'middle', paraSpaceBefore: 4 });
    notes(s, `SETUP: Choose your skill.
      Your fourth story is your choice, from the seven skills shown here.
      Pick the skill that connects most honestly to a real experience. Then say in one sentence why you chose it.
      Telling your choice story? Hide the previous slide (Three required skills).`);
  }

  // ---- 3-7. The five steps
  for (const st of STEPS) {
    const s = pres.addSlide({ masterName: 'Story Step' });
    s.background = { color: st.color };
    s.addText(st.name.toUpperCase(), { placeholder: 'title' });
    // big letter disc, dead center above the step name
    const d = 2.0, cx = (W - d) / 2;
    s.addShape(pres.shapes.OVAL, { x: cx, y: 0.75, w: d, h: d, fill: { color: 'FFFFFF' }, line: { color: 'FFFFFF' }, objectName: 'Decorative: letter disc' });
    txt(s, st.letter, { x: cx, y: 0.75, w: d, h: d, fontSize: st.letter.length > 1 ? 72 : 110, bold: true, color: st.color, align: 'center', valign: 'middle',
      objectName: `Decorative: letter ${st.letter}` });
    txt(s, st.sub, { x: 1.5, y: 3.95, w: W - 3, h: 0.55, fontSize: 28, italic: true, color: 'FFFFFF', align: 'center' });
    txt(s, st.q, { x: 1.2, y: 4.6, w: W - 2.4, h: 0.75, fontSize: 36, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
    txt(s, st.help, { x: 1.8, y: 5.35, w: W - 3.6, h: 0.75, fontSize: 24, color: 'FFFFFF', align: 'center', valign: 'middle' });
    // watch-out strip
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: H - 0.95, w: W, h: 0.95, fill: { color: '000000', transparency: 72 }, line: { type: 'none' }, objectName: 'Decorative: watch-out band' });
    txt(s, [{ text: 'WATCH OUT  ', options: { bold: true, color: HEX.gold, charSpacing: 2 } }, { text: st.watch, options: { color: 'FFFFFF' } }],
      { x: 0.8, y: H - 0.95, w: W - 1.6, h: 0.95, fontSize: 22, align: 'center', valign: 'middle' });
    notes(s, st.notes);
  }

  const out = `${BOOK}downloads/slides/${FILE}`;
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  execFileSync('python3', [path.join(__dirname, 'postfix.py'), out], { stdio: 'inherit' });
  console.log('wrote', out);
})().catch(e => { console.error(e); process.exit(1); });

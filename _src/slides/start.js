// Capstone overview deck: STAR(T) Stories. Use in Module 9 (introduction), 11 (working time), or 12 (finishing).
const { build } = require('./deck.js');
const { pair, bar, cards, rows } = require('./helpers.js');
const GUIDE = 'https://octc-instructional-design.github.io/FYE100-pathfinder-guidebook/chapters/start/';

build({
  n: 'S', file: 'FYE100-STARTStories-Overview-Slides.pptx',
  kicker: 'CAPSTONE',
  title: 'STAR(T) Stories',
  tagline: 'Anyone can claim a skill. Your stories show it.',
  art: __dirname + '/art/start-title.jpg',

  week: { kicker: 'Capstone · The big picture', title: 'Four true stories, four skills', skillsLabel: 'Your four skills',
    items: [['LuSearch', 'Find a real moment for each skill'], ['LuPencilLine', 'Draft it with a practice guide'],
            ['LuMic', 'Tell it out loud in 2 to 4 minutes'], ['LuSend', 'Submit each one in its own journal']],
    skills: [[5, 'Adaptability & Leadership'], [6, 'Professionalism'], [9, 'Knowledge Application'], [0, 'Your choice']] },

  lessons: [
    { kicker: 'Why STAR(T)', title: 'A claim isn\'t evidence',
      async draw(s, k) {
        const { M, W, HEX, txt, card, C } = k, gap = 0.4, w = (W - 2 * M - gap) / 2;
        card(s, M, 2.05, w, 2.9, HEX.softBlue, 'claim card');
        txt(s, [{ text: 'A CLAIM', options: { fontSize: 20, bold: true, color: C.accent4, charSpacing: 2, breakLine: true } },
                { text: '"I\'m a hard worker."', options: { fontSize: 32, bold: true, color: C.text2, paraSpaceBefore: 10 } }],
          { x: M + 0.35, y: 2.3, w: w - 0.7, h: 2.5 });
        card(s, M + w + gap, 2.05, w, 2.9, HEX.softGold, 'evidence card');
        txt(s, [{ text: 'EVIDENCE', options: { fontSize: 20, bold: true, color: '7A5500', charSpacing: 2, breakLine: true } },
                { text: 'A specific, true story about a time you showed it.', options: { fontSize: 28, bold: true, color: C.text2, paraSpaceBefore: 10 } }],
          { x: M + w + gap + 0.35, y: 2.3, w: w - 0.7, h: 2.5 });
        bar(s, k, '"Tell me about a time when..." is how employers interview. This is the practice.', 5.4);
      },
      notes: `
        Here's the idea behind the capstone. Anyone can claim a skill. "I'm a hard worker" is a claim. A specific, true story about a time you worked hard is evidence.
        STAR comes from behavioral interviewing. When an interviewer says "Tell me about a time when...", they're asking for a STAR story. Many employers interview this way because past actions are the best evidence of what you'll do next.
        This course adds a (T), Transfer, which turns a good story into a reflection on where you're headed.
        Your capstone is four of these stories, for four of the 10 Essential Skills.` },

    { kicker: 'The framework', title: 'Five steps: S, T, A, R, T',
      async draw(s, k) {
        const { M, W, HEX, txt, card, C } = k, gap = 0.22, w = (W - 2 * M - 4 * gap) / 5;
        const st = [['S', 'Situation', 'What was going on?'], ['T', 'Task', 'What was yours to do?'], ['A', 'Action', 'What did you do? Use "I."'],
                    ['R', 'Result', 'What changed?'], ['T', 'Transfer', 'Where does it go next?']];
        st.forEach(([L, head, q], i) => {
          const x = M + i * (w + gap), hi = i === 2 || i === 4;
          card(s, x, 2.0, w, 3.6, hi ? HEX.softGold : HEX.softBlue, 'step card');
          txt(s, L, { x: x + 0.25, y: 2.1, w: 1.0, h: 1.05, fontSize: 64, bold: true, color: hi ? '7A5500' : C.accent1, objectName: `Letter ${L}` });
          txt(s, [{ text: head, options: { bold: true, fontSize: 24, color: C.text2, breakLine: true } }, { text: q, options: { fontSize: 22, paraSpaceBefore: 6 } }],
            { x: x + 0.25, y: 3.2, w: w - 0.45, h: 2.25 });
        });
        bar(s, k, 'The Action is where the skill lives. The Transfer is what sets a strong story apart.', 5.85);
      },
      notes: `
        Five steps, in order.
        Situation: set the scene in two or three sentences. Don't linger; it's setup, not the story.
        Task: your part. What were you responsible for, and why was it yours?
        Action: the most important step. Use "I": I decided, I reached out, I chose. "We" hides your contribution, even in a group.
        Result: what happened because of what you did. Honest and imperfect beats vague and positive. "It went well" isn't a result.
        Transfer: so what? Where does this skill show up next: your next semester, your program, your job? "This will help me in the future" isn't a Transfer. Say where, when, and how.
        The two highlighted steps, Action and Transfer, are where most stories get stronger or weaker.` },

    { kicker: 'The framework', title: 'What one sounds like',
      async draw(s, k) {
        const { M, W, HEX, txt, card, C, b64, BOOK } = k;
        s.addImage({ data: b64(`${BOOK}images/shared/10es/10es-09.png`), x: M, y: 1.95, w: 0.7, h: 0.7, objectName: 'Decorative: skill coin' });
        txt(s, 'Example: Knowledge Application, from the STAR(T) Stories Guide', { x: M + 0.9, y: 1.95, w: 11, h: 0.7, fontSize: 22, italic: true, color: C.accent6, valign: 'middle' });
        const r = [['S', 'A patient at the front desk where I work was upset about a billing error.'],
                   ['T', 'I needed to help without promising anything I couldn\'t keep.'],
                   ['A', 'I used my Medical Billing course to walk her through the codes and the next step.'],
                   ['R', 'She calmed down and agreed to wait for the manager to follow up.'],
                   ['T', 'What I\'m learning is for moments like that, not just tests.']];
        r.forEach(([L, line], i) => {
          const y = 2.85 + i * 0.78;
          card(s, M, y, W - 2 * M, 0.66, i === 2 ? HEX.softGold : HEX.softBlue, 'story row');
          txt(s, [{ text: L + '   ', options: { bold: true, color: i === 2 ? '7A5500' : C.accent1 } }, { text: line }], { x: M + 0.3, y, w: W - 2 * M - 0.6, h: 0.66, fontSize: 22, valign: 'middle' });
        });
      },
      notes: `
        Here's a complete story, shortened from the full example in the STAR(T) Stories Guide. The skill is Knowledge Application.
        Situation: working as a medical receptionist, a patient came in upset about a billing error, and the manager wasn't there.
        Task: help her without making promises they couldn't keep.
        Action: used what they'd learned in Medical Billing about how claims are processed, pulled up the account, and walked her through the codes and the next step, without guessing at the outcome.
        Result: she calmed down and agreed to wait for the manager's follow-up, and thanked them for explaining.
        Transfer: what they're learning in their program isn't just for tests. It's for moments when a real person needs someone who understands the system.
        Point out: it isn't dramatic. A quiet moment at work, in class, or with family is exactly what STAR(T) is built for.` },

    { kicker: 'Find your stories', title: 'Your four skills',
      async draw(s, k) {
        const { M, W, HEX, txt, card, C, b64, BOOK } = k, gap = 0.3, w = (W - 2 * M - 3 * gap) / 4;
        const sk = [[5, 'Adaptability & Leadership', 'You adjusted, or stepped up without being asked.'],
                    [6, 'Professionalism', 'You followed through when it was hard.'],
                    [9, 'Knowledge Application', 'You used something you learned in a real situation.'],
                    [0, 'Your choice', 'Any other skill. Say which, and why.']];
        sk.forEach(([n, head, body], i) => {
          const x = M + i * (w + gap);
          card(s, x, 2.0, w, 4.15, n ? HEX.softBlue : HEX.softGold, 'skill card');
          if (n) s.addImage({ data: b64(`${BOOK}images/shared/10es/10es-${String(n).padStart(2, '0')}.png`), x: x + 0.3, y: 2.3, w: 0.95, h: 0.95, objectName: 'Decorative: skill coin' });
          else {
            s.addShape(k.pres.shapes.OVAL, { x: x + 0.3, y: 2.3, w: 0.95, h: 0.95, fill: { color: HEX.white }, line: { color: HEX.gold, width: 2.5, dashType: 'dash' }, objectName: 'Decorative: choice coin' });
            txt(s, '?', { x: x + 0.3, y: 2.3, w: 0.95, h: 0.95, fontSize: 34, bold: true, color: '7A5500', align: 'center', valign: 'middle', objectName: 'Decorative: choice mark' });
          }
          txt(s, [{ text: head, options: { bold: true, fontSize: 24, color: C.text2, breakLine: true } }, { text: body, options: { fontSize: 22, paraSpaceBefore: 8 } }],
            { x: x + 0.3, y: 3.45, w: w - 0.6, h: 2.6 });
        });
        bar(s, k, 'Real, specific, and yours. It doesn\'t have to be dramatic.', 6.3);
      },
      notes: `
        Three skills are assigned: Adaptability & Leadership, Professionalism, and Knowledge Application. The fourth is your choice from the other seven.
        Adaptability & Leadership: a time you adjusted when something changed, stepped up without being asked, or helped someone keep going. Leadership includes leading your own life.
        Professionalism: a time you followed through when it was hard, owned a mistake, or were someone others could count on.
        Knowledge Application: a time you used something you learned, in class, at work, or through experience, in a real situation.
        Your choice: start the story by naming the skill and saying in a sentence or two why you chose it.
        Stories can come from this course, work, family, or community. Find Your Stories in the guide has prompts for every skill.` },

    { kicker: 'Find your stories', title: 'Where to look',
      async draw(s, k) {
        await cards(s, k, [['LuFlag', 'Mile Markers', 'Stories you already wrote.'],
                           ['LuBriefcase', 'Work', 'A shift, a customer.'],
                           ['LuHouse', 'Home', 'Caregiving, a hard week.'],
                           ['LuUsers', 'Community', 'A team or a group.']], 2.05, 3.1);
        bar(s, k, 'Stuck? The STAR(T) Stories Guide has prompts for every skill.', 5.55);
      },
      notes: `
        For most students, picking the story is harder than telling it.
        Start with your Mile Markers. Module 3 is full of Professionalism and Adaptability. Modules 6 and 8 are full of Knowledge Application. Module 10 is collaboration.
        Then look at work, family, and community. A quiet moment counts: a shift that went sideways, a week you held things together at home, a time you stepped up for a group.
        A good story is real, specific, and yours, and you can say what you did with "I."
        Find Your Stories in the guide has prompts for all 10 skills. If one sparks a real memory, that might be your fourth story.` },

    { kicker: 'Tell it out loud', title: '2 to 4 minutes, mostly Action',
      async draw(s, k) {
        const { M, W, HEX, txt, card, C } = k;
        const seg = [['Situation', '20 to 30 sec', 25], ['Task', '15 to 20 sec', 18], ['Action', '60 to 90 sec', 75], ['Result', '20 to 30 sec', 25], ['Transfer', '30 to 45 sec', 38]];
        const total = seg.reduce((a, b) => a + b[2], 0), span = W - 2 * M; let x = M;
        seg.forEach(([name, time, v], i) => {
          const w = span * v / total - 0.08, hi = i === 2;
          card(s, x, 2.2, w, 1.5, hi ? HEX.gold : (i === 4 ? HEX.softGold : HEX.softBlue), 'timing segment');
          txt(s, [{ text: name, options: { bold: true, breakLine: true } }, { text: time, options: { fontSize: 20 } }],
            { x: x + 0.12, y: 2.2, w: w - 0.24, h: 1.5, fontSize: 22, color: C.text2, align: 'center', valign: 'middle' });
          x += w + 0.08;
        });
        txt(s, 'Running long? Trim the Situation first.', { x: M, y: 3.95, w: W - 2 * M, h: 0.55, fontSize: 24, italic: true, color: C.accent1 });
        bar(s, k, 'Recordings are never scored on delivery. Only the story and its structure count.', 5.2);
      },
      notes: `
        Students can type their stories, but recording is strongly encouraged. In a real interview, you'll be talking, not typing.
        A tight two-minute story that hits all five steps beats a wandering seven-minute one. Here's the shape: Situation 20 to 30 seconds, Task 15 to 20, Action 60 to 90, Result 20 to 30, Transfer 30 to 45. Most of the time goes to the Action.
        The rambling problem: nervous people back up to add context and never reach the Action. The fix is to know your story before you hit record. Read your practice guide out loud once, with a timer.
        And the reassurance: this isn't a public speaking class. Nobody is scoring eye contact, lighting, or voice. Stumble? Keep going.` },

    { kicker: 'Tell it out loud', title: 'Your options, story by story',
      async draw(s, k) {
        await cards(s, k, [['LuVideo', 'Video', 'Closest to a real interview.'],
                           ['LuMic', 'Audio only', 'Your voice. Completely fine.'],
                           ['LuSmartphone', 'Your phone', 'Record, then upload.'],
                           ['LuKeyboard', 'Typed', 'In the box. All five steps.']], 2.05, 3.0, { gold: 0 });
        bar(s, k, 'Blackboard\'s built-in recorder is the camera button in the submission box.', 5.45);
      },
      notes: `
        Students choose, story by story.
        Video, camera on: the closest thing to a real interview. Face a window and look at the camera.
        Audio only: completely fine. A headphone mic often sounds better than the built-in one.
        Record on your phone, then upload: a good backup if the Blackboard recorder gives you trouble.
        Typed: type directly into the submission box. Uploaded documents aren't accepted, and all five steps are still required. The practice guides can copy a draft for you.
        Recording in Blackboard: in the submission box, select the camera button in the editor toolbar, allow the camera or microphone, record, preview, then save and submit. On the app, tap + if the camera button isn't showing.
        Find a quiet spot: a closed room, a parked car, an empty study room.` },

    { kicker: 'Make it strong', title: 'Three fixes that move a story up',
      async draw(s, k) {
        const { M, W, HEX, txt, card, C } = k;
        const fx = [['Swap "we" for "I"', 'We reorganized the schedule.', 'I asked for everyone\'s hours and built a new schedule that night.'],
                    ['Make the Result concrete', 'It went really well.', 'Everyone made the next three meetings.'],
                    ['Name where the Transfer goes', 'This will help in my career.', 'In clinicals, I\'ll ask about everyone\'s shifts before I plan.']];
        const lw = 3.2, gap = 0.25, bw = (W - 2 * M - lw - 2 * gap) / 2;
        txt(s, 'BEFORE', { x: M + lw + gap, y: 1.95, w: bw, h: 0.4, fontSize: 20, bold: true, color: 'C0392B', charSpacing: 2 });
        txt(s, 'AFTER', { x: M + lw + 2 * gap + bw, y: 1.95, w: bw, h: 0.4, fontSize: 20, bold: true, color: '1E7B34', charSpacing: 2 });
        fx.forEach(([fix, before, after], i) => {
          const y = 2.45 + i * 1.35;
          txt(s, fix, { x: M, y, w: lw, h: 1.15, fontSize: 24, bold: true, color: C.text2, valign: 'middle' });
          card(s, M + lw + gap, y, bw, 1.15, 'FDECEA', 'before card');
          txt(s, before, { x: M + lw + gap + 0.25, y, w: bw - 0.5, h: 1.15, fontSize: 22, italic: true, valign: 'middle' });
          card(s, M + lw + 2 * gap + bw, y, bw, 1.15, 'E6F4EA', 'after card');
          txt(s, after, { x: M + lw + 2 * gap + bw + 0.25, y, w: bw - 0.5, h: 1.15, fontSize: 22, valign: 'middle' });
        });
      },
      notes: `
        All four stories are scored the same way, on the story and its structure, whether they're recorded or typed.
        A strong story has all five steps clearly there, an Action in "I" with specific decisions, a concrete Result, and a Transfer that names a real situation ahead. It could only belong to you.
        Three fixes move almost any story up a level.
        Swap "we" for "I": "We reorganized the schedule" becomes "I asked each person for their work hours, built a new schedule around them, and sent it to the group that night."
        Make the Result concrete: "It went really well" becomes "Everyone made the next three meetings, and we turned the project in a day early."
        Name where the Transfer goes: "This will help me in my future career" becomes "In clinicals next year I'll be coordinating with nurses on different shifts, and I now know to ask about everyone's constraints before I plan."
        The full scoring levels are in What Makes a Strong Story in the guide.` },

    { kicker: 'Submit', title: 'Before you submit',
      async draw(s, k) {
        await rows(s, k, [['LuFolderCheck', 'Right journal', 'one for each skill, labeled in Blackboard'],
                          ['LuTimer', 'Right length', 'about 2 to 4 minutes, or typed in the box'],
                          ['LuListOrdered', 'All five steps', 'in order'],
                          ['LuCircleHelp', 'Choice story', 'name your skill and why, up front'],
                          ['LuUserCheck', 'Sounds like you', 'not a template, and not AI']], 2.0, 0.78);
        bar(s, k, 'AI can help you remember details. It can\'t tell your story.', 6.0);
      },
      notes: `
        Each skill has its own labeled journal in Blackboard, so students can pace themselves and submit one story at a time. Because they're journals, students can add context they want their instructor to know.
        The checklist: the journal matches the skill in the story; about 2 to 4 minutes recorded, or typed in the box rather than uploaded; all five steps in order; for the choice story, the skill and why at the start; and it sounds like the student.
        On AI: it can help brainstorm which experience to use, or ask questions that help you remember details. It can't tell your story. The stories have to be in the student's own words and voice.
        All four stories are due with Module 12, on Sunday. Check Blackboard for the date.` },
  ],

  work: { title: 'Due with Module 12, on Sunday',
    items: [['LuStar', 'STAR(T) Story #1: Adaptability & Leadership', ''],
            ['LuStar', 'STAR(T) Story #2: Professionalism', ''],
            ['LuStar', 'STAR(T) Story #3: Knowledge Application', ''],
            ['LuStar', 'STAR(T) Story #4: Your Choice', 'Name your skill and why at the start']],
    qr: { url: GUIDE, label: 'Scan for the STAR(T) Stories Guide', display: 'Practice guides for all four stories' } },

  disc: { kicker: 'TRY IT OUT LOUD · IN CLASS', title: 'Tell me about a time when...',
    prompt: ['Pick one of your four skills and tell your partner the story in 2 minutes.',
             'Partner: which step was the thinnest? Ask one question about the Action.'],
    format: 'Two minutes each, then swap. Use your phone\'s timer.' },

  notes: {
    title: `
      Welcome to the capstone: STAR(T) Stories.
      Anyone can claim a skill. Your stories show it. This deck walks through the framework, how to pick your stories, how to tell them, and how to make them strong.
      The owl has a microphone this time. It's ready to tell its story, and by the end of the semester, so are you.`,
    week: `
      The big picture: four short, true stories, one for each of four Essential Skills.
      Find a real moment for each skill. Draft it with a practice guide; there's one for each story in the STAR(T) Stories Guide. Tell it out loud in 2 to 4 minutes, or type it. Then submit each one in its own labeled journal in Blackboard.
      The skills: Adaptability & Leadership, Professionalism, Knowledge Application, and one of your choice.
      Where this deck fits: introduce it in Module 9, work on it in Module 11, and finish in Module 12.`,
    work: `
      All four stories are due with Module 12, on Sunday, earlier than the usual Monday so instructors can grade before final grades are due.
      Each story has its own labeled journal in Blackboard. They don't have to go in all at once; students can submit them as they finish.
      Scan the code for the STAR(T) Stories Guide. Each practice guide helps students find their story and draft it, and estimates how long the draft runs out loud.`,
    disc: `
      In-class practice. This is the single most useful thing you can do with class time in Modules 11 and 12.
      Pairs. One person tells a story in two minutes; the partner listens for the five steps, names the thinnest one, and asks one question about the Action. Then swap.
      Expect nerves and rambling. That's the point of practicing here instead of in front of the camera. Remind students that the fix is knowing the story before they start, and that delivery isn't scored.
      For online recordings: ask students to say one story out loud to anyone, a friend, a family member, or their phone, before they record.`,
  },
}).catch(e => { console.error(e); process.exit(1); });

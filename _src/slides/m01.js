const { build } = require('./deck.js');
const TERM = require('./term.json');
const { pair, bar, cards } = require('./helpers.js');

build({
  n: 1, file: 'FYE100-Module01-Instructor-Slides.pptx',
  title: 'Your Pathfinder Journey Begins',
  tagline: 'Every journey starts with a single step.',
  art: __dirname + '/art/m01-title.jpg',

  house: { title: 'Base Camp', sub: 'Welcome to FYE 100. Here is how this course works.',
    ahead: 'Module 1 work is due Monday by 11:59 PM Central.' },

  week: { title: 'Getting your bearings',
    items: [['LuMap', 'Know what college expects'], ['LuStar', 'Meet the 10 Essential Skills'],
            ['LuSparkles', 'Use AI thoughtfully'], ['LuLayoutDashboard', 'Find your way around Blackboard']],
    skills: [[1, 'Communication'], [5, 'Adaptability & Leadership'], [6, 'Professionalism'], [10, 'Information Literacy']] },

  lessons: [
    { kicker: 'Lesson 1.1', title: 'Responsibility moves to you',
      async draw(s, k) {
        const { M, W, HEX, txt, card, C } = k, gap = 0.4, w = (W - 2 * M - gap) / 2;
        const rows = [['Your teacher reminded you about the deadline.', 'The due date is in the syllabus. If you\'ll miss it, you reach out first.'],
                      ['Your teacher noticed when you were lost.', 'You start the conversation: office hours, email, or tutoring.']];
        txt(s, 'BEFORE', { x: M, y: 1.95, w, h: 0.4, fontSize: 20, bold: true, color: C.accent4, charSpacing: 2 });
        txt(s, 'NOW', { x: M + w + gap, y: 1.95, w, h: 0.4, fontSize: 20, bold: true, color: '7A5500', charSpacing: 2 });
        rows.forEach(([a, b], i) => {
          const y = 2.45 + i * 2.05;
          card(s, M, y, w, 1.8, HEX.softBlue, 'before card');
          txt(s, a, { x: M + 0.35, y: y + 0.25, w: w - 0.7, h: 1.3, valign: 'middle' });
          card(s, M + w + gap, y, w, 1.8, HEX.softGold, 'now card');
          txt(s, b, { x: M + w + gap + 0.35, y: y + 0.25, w: w - 0.7, h: 1.3, valign: 'middle' });
        });
      },
      notes: `
        Big idea for the week: in high school, the system was built to catch you. In college, the system is built to support you, but only if you engage with it.
        Walk the two shifts. Before, your teacher reminded you about the deadline. Now, the due date is in the syllabus, and if you're going to miss it, you reach out first, before the deadline. Before, your teacher noticed when you were lost. Now, you start the conversation.
        Name both groups in the room: if you're coming from high school, the support is here but you go looking for it. If you're coming back after years of work and family, your professional habits are exactly what college expects. The adjustment is usually the systems, not the ability.
        Lesson 1.1 has four of these shifts. Ask: which one will take the most adjustment for you?` },

    { kicker: 'Lesson 1.1', title: 'Your syllabus is a contract',
      async draw(s, k) {
        await cards(s, k, [['LuCalendarDays', 'Deadlines', 'Put every one in your phone.'],
                           ['LuHourglass', 'Late work', 'Know the rule before it matters.'],
                           ['LuMail', 'Contact', 'How, and how fast?'],
                           ['LuSparkles', 'AI policy', 'It changes course to course.']], 2.05, 3.2);
        bar(s, k, 'If you didn\'t know, the first question will be: was it in the syllabus?', 5.6);
      },
      notes: `
        Most students skim the syllabus once and never look at it again. It's one of the most common first-year mistakes.
        Four things to find in every syllabus, this week: every deadline, the late work policy, how your instructor wants to be contacted and how fast they respond, and the AI policy.
        When something is unclear, ask before you act on your assumption. "I read the syllabus and wasn't sure how this works" is a professional way to ask, and it shows you read it.
        Lesson 1.1 also covers four unspoken expectations: follow all the directions, communicate like a professional, manage your own deadlines, and academic integrity. Pick one to emphasize for your section.
        Option: run the syllabus speed hunt here.` },

    { kicker: 'Lesson 1.2', title: 'The 10 Essential Skills',
      async draw(s, k) {
        const { M, W, HEX, txt, card, C, b64, BOOK } = k;
        const names = ['Communication', 'Critical & Creative Thinking', 'Quantitative Reasoning', 'Interpersonal Relations', 'Adaptability & Leadership',
                       'Professionalism', 'Civic Engagement', 'Collaboration & Teamwork', 'Knowledge Application', 'Information Literacy'];
        const cw = (W - 2 * M) / 5;
        names.forEach((nm, i) => {
          const x = M + (i % 5) * cw, y = 1.95 + Math.floor(i / 5) * 1.75;
          s.addImage({ data: b64(`${BOOK}images/shared/10es/10es-${String(i + 1).padStart(2, '0')}.png`), x: x + cw / 2 - 0.4, y, w: 0.8, h: 0.8, objectName: 'Decorative: skill coin' });
          txt(s, nm, { x: x + 0.05, y: y + 0.85, w: cw - 0.1, h: 0.8, fontSize: 20, align: 'center', bold: true, color: C.text2 });
        });
        card(s, M, 5.6, W - 2 * M, 0.95, HEX.softGold, 'levels callout');
        txt(s, [{ text: 'Benchmark', options: { bold: true } }, { text: '  where most students start   →   ' },
                { text: 'Milestone', options: { bold: true, color: '7A5500' } }, { text: '  your target' }],
          { x: M + 0.35, y: 5.6, w: W - 2 * M - 0.7, h: 0.95, fontSize: 24, valign: 'middle', color: C.text2 });
      },
      notes: `
        Every public college in Kentucky, including OCTC, uses the Kentucky Graduate Profile, and at its center are these 10 Essential Skills. They show up in every job posting and every performance review. FYE 100 is built around them.
        Each module opens with a Skill Spotlight on one of them.
        Kentucky describes three levels. Benchmark is where most students start, about the level of finishing high school. Milestone is the target after two years of college: you can use the skill on your own in real situations. Capstone is the bachelor's degree level.
        This week students rate themselves with the My Skills Snapshot. Encourage honesty over generosity: a realistic starting point makes growth easier to see. They'll take it again at the end.
        Plant the seed: the final project is four STAR(T) Stories showing these skills in action.` },

    { kicker: 'Lesson 1.3', title: 'Sounding right isn\'t being right',
      async draw(s, k) {
        const { M, W, HEX, txt, card, ico, C } = k, gap = 0.4, w = (W - 2 * M - gap) / 2;
        card(s, M, 1.95, w, 2.75, HEX.navy, 'pattern card');
        txt(s, [{ text: 'Name that tune', options: { bold: true, fontSize: 26, color: 'FFC94A', breakLine: true } },
                { text: '"bum, bum, bum, buttabum, bum…"', options: { italic: true, breakLine: true, paraSpaceBefore: 6 } },
                { text: 'Two people, two songs. Neither is wrong.', options: { paraSpaceBefore: 6 } }],
          { x: M + 0.35, y: 2.2, w: w - 0.7, h: 2.3, color: C.background1 });
        card(s, M + w + gap, 1.95, w, 2.75, HEX.softBlue, 'definition card');
        txt(s, [{ text: 'Hallucination', options: { bold: true, fontSize: 26, color: C.text2, breakLine: true } },
                { text: 'When AI fills a gap with something that sounds believable but isn\'t true.', options: { paraSpaceBefore: 6 } }],
          { x: M + w + gap + 0.35, y: 2.2, w: w - 0.7, h: 2.3 });
        txt(s, 'Five ways to show up', { x: M, y: 4.95, w: 8, h: 0.5, fontSize: 24, bold: true, color: C.text2 });
        const be = ['Safe', 'Honest', 'Critical', 'Responsible', 'Reflective'], bw = (W - 2 * M - 4 * 0.25) / 5;
        be.forEach((b, i) => {
          const x = M + i * (bw + 0.25);
          card(s, x, 5.55, bw, 0.85, HEX.softGold, 'BE chip');
          txt(s, 'BE ' + b, { x, y: 5.55, w: bw, h: 0.85, fontSize: 24, bold: true, color: C.text2, align: 'center', valign: 'middle' });
        });
      },
      notes: `
        You already use AI, even if you don't call it that: voice assistants, recommendations, the summary at the top of a search.
        Try the hum from the lesson: bum, bum, bum, buttabum, bum. Ask the room what song it is. Some will say "Under Pressure," some will say "Ice Ice Baby." Nobody is wrong. Each person completed the most familiar pattern.
        That's close to how AI chat tools work. They predict the most likely next words. Usually that's useful. Sometimes the most likely answer isn't the true one. When AI produces something believable but false, that's a hallucination.
        So the question isn't "did it make a mistake?" It's "that sounded right, but is sounding right the same as being right?"
        The five BE behaviors describe thoughtful AI use, and they come back all semester. This week's BE Check has students match each one to a real situation.
        Point out: no one has to love AI or use it. The course asks you to think before you act.` },

    { kicker: 'Lesson 1.4', title: 'Every assignment has an AI use label',
      async draw(s, k) {
        await cards(s, k, [['LuCircleOff', 'No AI', 'You do this work on your own.'],
                           ['LuHandHelping', 'AI-supported', 'AI helps with the parts your instructor names.'],
                           ['LuSparkles', 'AI-integrated', 'Using AI well is part of the assignment.']], 2.05, 3.2, { gold: 1 });
        bar(s, k, 'Not sure? Ask before you use AI, not after.', 5.6);
      },
      notes: `
        There's no single AI rule for college. Each course, and sometimes each assignment, sets its own. Look in two places: the AI Course Policy in the syllabus, then the AI use label on the assignment.
        Three labels, from no AI to AI as part of the work. No AI: the skill itself is what you're practicing. AI-supported: AI can help with the parts your instructor names, like brainstorming, but the thinking and the final work are yours. AI-integrated: using AI well is part of the assignment.
        The same course can have different labels on different assignments, so check every time.
        In this course, the Mile Markers are AI-supported. Point to the label at the top of Mile Marker #1.
        If there's no label or it's unclear, ask first. It's easy to answer before you start, and hard to sort out after you've turned something in.` },

    { kicker: 'Lesson 1.4', title: 'The 3 Qs, and keep a trail',
      async draw(s, k) {
        const { M, W, HEX, txt, card, C } = k;
        const qs = [['Before you ask AI', 'Should I use AI for this part?'],
                    ['Before you use its answer', 'How would I know if it\'s wrong?'],
                    ['Before you turn it in', 'Can I explain my work and how AI helped?']];
        qs.forEach(([when, q], i) => {
          const y = 2.0 + i * 1.15;
          card(s, M, y, 7.9, 1.05, HEX.softBlue, 'question row');
          txt(s, [{ text: when.toUpperCase(), options: { fontSize: 20, bold: true, color: C.accent4, charSpacing: 1, breakLine: true } }, { text: q, options: { bold: true, color: C.text2 } }],
            { x: M + 0.3, y, w: 7.4, h: 1.05, valign: 'middle', fontSize: 24 });
        });
        card(s, 8.85, 2.0, W - 8.85 - M, 3.35, HEX.softGold, 'trail panel');
        txt(s, [{ text: 'Keep a trail', options: { bold: true, fontSize: 26, color: C.text2, breakLine: true } },
                { text: 'Write in Word on OneDrive. Note how you used AI in OneNote.', options: { paraSpaceBefore: 6 } }],
          { x: 9.15, y: 2.25, w: W - 9.15 - M - 0.3, h: 2.9 });
        bar(s, k, 'BE Safe every time: nothing private goes into an AI tool.', 5.75);
      },
      notes: `
        Once you know the rules, the 3 Qs keep you on track. Each one belongs to a moment in your work.
        Before you ask AI: should I use AI for this part? Before you use its answer: how would I know if it's wrong? Before you turn it in: can I explain my work and how AI helped me?
        They're the five BE behaviors turned into a routine. BE Safe applies every time: never paste anyone's personal information or passwords into an AI tool.
        Keep a trail: write in Word saved to OneDrive, so there's a dated history of your draft, and jot down how you used AI in a OneNote notebook. If anyone ever asks how you did your work, you can show them. Tools that try to detect AI writing are sometimes wrong; your trail is real evidence.
        And when AI is optional, choosing not to use it is a good choice too.` },

    { kicker: 'Lesson 1.5', title: 'Find your way around Blackboard',
      async draw(s, k) {
        const { M, HEX, txt, ico, C } = k;
        const rows = [['LuLayoutList', 'Course Content', 'home base, your modules in order'], ['LuCalendar', 'Calendar', "what's due, and when"],
                      ['LuChartColumn', 'Gradebook', 'scores and feedback'], ['LuMessageSquare', 'Messages', 'a quick note to your instructor'],
                      ['LuMegaphone', 'Announcements', 'updates, also sent to your email']];
        for (const [i, [ic, head, body]] of rows.entries()) {
          const y = 1.95 + i * 0.7;
          await ico(s, ic, M, y, 0.58, HEX.white, HEX.blue);
          txt(s, [{ text: head, options: { bold: true, color: C.text2 } }, { text: ': ' + body }], { x: M + 0.8, y, w: 11, h: 0.58, valign: 'middle' });
        }
        bar(s, k, 'Add a profile photo. It turns a username into a person.', 5.6);
      },
      notes: `
        Five places you'll use every week inside a course.
        Course Content is home base: your modules in order, top to bottom. Calendar shows what's due; the calendar on the main Blackboard page, before you open a course, shows all your courses at once. Gradebook has your scores, and select an item to read the feedback. Messages are private notes to your instructor or classmates. Announcements are updates from your instructor, also sent to your KCTCS email.
        Submit work through the assignment, not by email, and don't wait until the last minute.
        Read your feedback. In an online class it's the closest thing to a one-on-one conversation.
        First thing to do: add a profile photo. Lesson 1.5 has the steps.
        Option: demo the course live, or point to the optional Syllabus and Blackboard Scavenger Hunt.` },

    { kicker: 'Trail Tip', title: 'Your free Office 365',
      async draw(s, k) {
        await cards(s, k, [['LuFileText', 'Word', 'Papers and reports.'],
                           ['LuCloud', 'OneDrive', 'Your files, everywhere.'],
                           ['LuNotebookPen', 'OneNote', 'Notes, and your trail.'],
                           ['LuSparkles', 'Copilot', 'AI, with your student login.']], 2.05, 3.0);
        bar(s, k, 'Free on up to five devices while you\'re enrolled at KCTCS.', 5.45);
      },
      notes: `
        Every KCTCS student in at least one class gets the full Office 365 suite free, on up to five devices: PC, Mac, phones, and tablets.
        On a computer: sign in to your KCTCS Office 365 account and select Install Office. On a phone or tablet: install the Microsoft Office app and sign in with your student email.
        Four tools to know this semester: Word for papers, OneDrive so your files follow you, OneNote for notes and your AI trail, and Copilot, the AI assistant that comes with your student account.
        Trouble installing or signing in? OCTC Information Technology Services can help.` },
  ],

  work: { title: 'Due Monday by 11:59 PM Central',
    items: [['LuClipboardCheck', 'Task: My Skills Snapshot, Start of Semester', 'Rate yourself honestly on the 10 skills and AI'],
            ['LuCircleCheck', 'BE Check', 'Match the five BE behaviors to real situations'],
            ['LuFlag', 'Mile Marker #1: My Starting Point', 'Five questions about where you are right now'],
            ['LuMessagesSquare', 'Online sections: Trailhead Introductions', 'First post Friday, replies Monday']],
    // semester-specific form link lives in term.json
    qr: Object.assign({ label: 'Scan for My Skills Snapshot' }, TERM.snapshot_start) },

  mm: { title: 'My Starting Point',
    qs: [['Why college, and why OCTC?'], ['What does success look like for you this semester?'],
         ['What\'s one strength you already bring?'], ['One goal, and two concrete steps to reach it'],
         ['Where does AI show up in your life, and how do you feel about it for school?']],
    side: [{ text: 'AI use: AI-supported', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'Use AI to think it through. Write it in your own words.', options: { breakLine: true } },
           { text: ' ', options: { breakLine: true, fontSize: 10 } },
           { text: 'Honest beats perfect.', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'You\'ll come back to this at the end of the course.' }] },

  notes: {
    title: `
      Welcome to FYE 100 and to Module 1: Your Pathfinder Journey Begins.
      This week is about getting your bearings: what college expects, the skills this course builds, how to think about AI, and how to find your way around Blackboard.
      The owl has a map for a reason. By the end of the week, you'll have one too.`,
    house: `
      INSTRUCTOR SLIDE. Edit the announcements box before class. Hide this slide when recording for online sections (right-click the slide, Hide Slide).
      Ideas for week 1: how to reach you and when you reply, where the Trailhead is in each module, and that the Pathfinder Guidebook is where the readings live.
      Point out that every module follows the same pattern, so once students learn Module 1, the rest will feel familiar.`,
    week: `
      Here's the trail this week. Four things: know what college expects, meet the 10 Essential Skills, start using AI thoughtfully, and find your way around Blackboard.
      The coins on the right are the four Essential Skills this module builds: Communication, Adaptability & Leadership, Professionalism, and Information Literacy.`,
    work: `
      Everything is due Monday by 11:59 PM Central.
      The My Skills Snapshot is your starting point on the 10 skills and on AI. Scan the code on this slide to open it. It's completion only, so be honest, not generous. You'll retake it at the end and compare.
        INSTRUCTOR NOTE: the QR code opens this semester's shared Snapshot form for all FYE 100 sections. It changes each semester.
      The BE Check is a short matching quiz on the five BE behaviors from Lesson 1.3.
      Mile Marker #1 is the main assignment, next slide.
      Online sections also have the Trailhead Introductions discussion: first post by Friday, replies by Monday. In-person sections: today's attendance counts.
      There's also an optional Syllabus and Blackboard Scavenger Hunt for practice.`,
    mm: `
      Mile Marker #1 is five short questions about where you are right now.
      Why college, and why OCTC. What success looks like for you this semester, in your own terms. One strength you already bring. One goal with two concrete steps; the test is whether someone else could tell you reached it, and whether you could put each step on a calendar. And where AI shows up in your life and how you feel about using it for school. Any honest position is a good answer there.
      It's AI-supported: AI can help you think, but the writing is yours. The guidebook has an optional AI thinking partner prompt and a fill-in form that saves a PDF. There's a printable handout in Blackboard too.
      You'll come back to this reflection at the end of the course, so honest beats perfect.`,
    disc: `
      In-person introductions. Model it first with your own answer.
      Pairs for three minutes, then each person introduces their partner to the room. Introducing someone else lowers the stakes on day one.
      Listen for strengths students mention in passing, like work ethic, caring for family, or a trade skill, and name them. Those are Mile Marker #1, Question 3.
      For online recordings: this is the Trailhead Introductions discussion. Ask students to answer the same two questions in their first post.`,
  },
}).catch(e => { console.error(e); process.exit(1); });

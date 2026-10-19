const { build } = require('./deck.js');
const { bar, spotlight, grid4, rows, qrPanel } = require('./helpers.js');

build({
  n: 10, file: 'FYE100-Module10-Instructor-Slides.pptx',
  title: 'Team Up: Collaboration & People Skills',
  tagline: 'Easier on everyone, including you.',
  art: __dirname + '/art/m10-title.jpg',

  house: { title: 'Breaking Camp', sub: 'Pack up Module 9, then look ahead to Module 10.',
    ahead: 'Module 10 work and Merit Activity #3 are due Monday by 11:59 PM Central.' },

  week: { title: 'Team up',
    items: [['LuUsers', 'Find how you show up in a group'], ['LuFingerprint', 'Take 16Personalities'],
            ['LuListChecks', 'Pick three strategies that fit you'], ['LuAward', 'Merit Activity #3 is due']],
    skills: [[1, 'Communication'], [4, 'Interpersonal Relations'], [8, 'Collaboration & Teamwork']] },

  lessons: [
    { kicker: 'Lesson 10.1 · Skill Spotlight', title: 'Collaboration & Teamwork',
      async draw(s, k) {
        await spotlight(s, k, 8, 'Yes, the group work skill. Stay with us. This one\'s worth it.',
          'You take part, respond promptly, and finish your part on time.',
          'You contribute ideas that fit the goal, handle conflict constructively, and adapt in ways that build trust.');
      },
      notes: `
        This week's Skill Spotlight is #8, Collaboration & Teamwork. If you groaned a little, you're not alone; most people have a group project story that still makes them tense up.
        Left: where most students start. You take part in discussions, respond promptly, finish your tasks on time, and know your own strengths and limits on a team. Right: where you're headed. You contribute ideas that fit the actual goal, address conflict constructively, figure out the tasks and your teammates' strengths so roles are fair, and adapt to change in ways that build trust.
        It shows up when a group project forms, when someone goes quiet, and when plans change.` },

    { kicker: 'Lesson 10.2', title: 'Who are you in a group?',
      async draw(s, k) {
        const { M, W, HEX, txt, card, C } = k;
        const r = ['The Starter', 'The Organizer', 'The Analyzer', 'The Doer', 'The Encourager', 'The Quiet Worker', 'The Big-Picture Thinker'], gap = 0.25;
        r.forEach((t, i) => {
          const row = i < 4 ? 0 : 1, n = row ? 3 : 4, w = (W - 2 * M - (n - 1) * gap) / n, x = M + (row ? i - 4 : i) * (w + gap), y = 2.05 + row * 1.25;
          card(s, x, y, w, 1.0, row ? HEX.softGold : HEX.softBlue, 'group role');
          txt(s, t, { x: x + 0.2, y, w: w - 0.4, h: 1.0, fontSize: 24, bold: true, color: C.text2, align: 'center', valign: 'middle' });
        });
        bar(s, k, 'Which ones sound like you? Start your Collaboration Snapshot here.', 4.85);
      },
      notes: `
        Before you can work well with others, you have to understand how you naturally show up.
        Seven common ways people show up in groups: the Starter, the Organizer, the Analyzer, the Doer, the Encourager, the Quiet Worker, and the Big-Picture Thinker. Most people recognize themselves in more than one.
        Collaboration gets messy when those tendencies collide without anyone naming them: two Starters pulling different directions, or a Quiet Worker nobody checks in with.
        Personality tools help by giving people language for those differences. That's next.
        The Collaboration Snapshot Trail Tool collects roles, type, strengths, struggles, and strategies in one place for Mile Marker #10.` },

    { kicker: 'Lesson 10.3', title: 'Explore your personality type',
      async draw(s, k) {
        const { M, txt, C } = k;
        const cw = qrPanel(s, k, 'https://www.16personalities.com/free-personality-test', 'Scan for 16Personalities', '16personalities.com');
        await rows(s, k, [['LuTimer', 'Take the free test', 'about 10 minutes'], ['LuHeart', 'Answer honestly', 'how you usually are'],
                          ['LuFingerprint', 'Get your type', 'like ENFP-T or ISTJ-A']], 2.1, 0.9, cw);
        txt(s, 'The free results are all you need. A map, not a rulebook.', { x: M, y: 5.0, w: cw, h: 0.6, fontSize: 24, italic: true, color: C.accent1 });
      },
      notes: `
        Scan the code to take the free 16Personalities test. It takes about 10 minutes, and the free results are all you need, so skip any paid upgrades.
        Answer honestly, for how you usually are, not how you think you should be.
        Your result is a four-letter type plus a fifth letter after a dash, like ENFP-T or ISTJ-A. The letters describe energy (how you recharge), mind (how you take in information), nature (how you decide), tactics (how you approach plans), and identity (how you handle pressure).
        It uses the four-letter codes made famous by Myers-Briggs, but it isn't the Myers-Briggs. Treat it as a map, not a rulebook.
        In-person sections: students bring their type to class for the discussion.` },

    { kicker: 'Lesson 10.5', title: 'Strategies that actually work',
      async draw(s, k) {
        await grid4(s, k, [['LuClipboardList', 'Clear expectations', 'Task, deadlines, who does what, what "done" means.'],
                           ['LuMessageSquare', 'Say your style', 'Respectfully, early.'],
                           ['LuHandshake', 'Assume good intent', 'Most of the time.'],
                           ['LuTimer', 'The 2-minute reset', 'When tension rises: pause and breathe.']], 1.95, 1.65);
        bar(s, k, 'Nine strategies in the lesson. Choose the three that fit how you work.', 5.75);
      },
      notes: `
        Lesson 10.4 looks at strengths and struggles in collaboration, including how different brains bring different strengths to a team. Lesson 10.5 turns that into strategies.
        Nine in all. Four to highlight: start with clear expectations: what's the task, what are the deadlines, who's doing what, and what does done look like? Communicate your style, respectfully. Assume good intent, most of the time. And use the two-minute reset when tension rises: pause, breathe, and ask what's actually the issue and what matters most.
        The others: play to your strengths, ask clarifying questions, break tasks into pieces, use your tools wisely, and know your stress signals.
        Students choose three that fit them for their Collaboration Snapshot and Mile Marker #10.` },

    { kicker: 'Trail Tip', title: 'Divide and conquer, AI-style',
      async draw(s, k) {
        await rows(s, k, [['LuShieldCheck', 'Check the AI rules first', 'for that assignment'], ['LuClipboardPaste', 'Paste in the instructions', ''],
                          ['LuUsers', 'Add roles and the due date', ''], ['LuCalendarRange', 'Ask for tasks, roles, a timeline, and norms', ''],
                          ['LuRefreshCw', 'Bring it back to your group', 'and adjust it together']], 2.0, 0.75);
        bar(s, k, 'The plan is the easy part. Following through is the teamwork.', 5.9);
      },
      notes: `
        A practical use of AI for group work: turn a group assignment into tasks, roles, a timeline, and group norms.
        First, check the AI rules for that assignment. Then paste in the instructions, add your group's roles and due date, and ask for main tasks, suggested roles, a weekly timeline, and group norms.
        Bring the plan back to your group and adjust it together. AI doesn't know your teammates.
        The plan is the easy part. Following through is the teamwork.` },
  ],

  work: { title: 'Due Monday by 11:59 PM Central',
    items: [['LuFingerprint', 'Task: Take 16Personalities', 'Save your type'],
            ['LuFlag', 'Mile Marker #10: My Collaboration Profile', 'Three questions'],
            ['LuAward', 'Merit Activity #3', 'The last one. Use the Activity #3 link on the Merit platform.'],
            ['LuMessagesSquare', 'Online sections: Group Work Went Sideways', 'First post Friday, replies Monday']] },

  mm: { title: 'My Collaboration Profile',
    qs: [['Your type, two strengths, and one or two challenges', 'In your own words, not the official description.'],
         ['Why one challenge happens, and what helps', 'A tendency, not a flaw.'],
         ['What you need from teammates', 'In one simple, respectful sentence.']],
    side: [{ text: 'AI use: AI-supported', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'AI doesn\'t know how you collaborate. You do.', options: { breakLine: true } },
           { text: ' ', options: { breakLine: true, fontSize: 10 } },
           { text: 'Optional to share:', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'anything about neurodivergence.' }] },

  notes: {
    title: `
      Welcome to Module 10: Team Up.
      This week is about how you work with others, and how to make it easier on everyone, including you.
      The owl brought friends this week.`,
    house: `
      INSTRUCTOR SLIDE. Edit the announcements box before class. Hide this slide when recording for online sections (right-click the slide, Hide Slide).
      Merit Activity #3, the last one, is due with this module. Remind students to use the Activity #3 link.
      Online sections: if you're hosting a virtual meet-up for Merit this week, put the date and time here.`,
    week: `
      This week: find how you show up in a group, take 16Personalities, and pick three strategies that fit you. Merit Activity #3 is also due.
      Three skills, with Collaboration & Teamwork as the Skill Spotlight.`,
    work: `
      Everything is due Monday by 11:59 PM Central.
      16Personalities is an ungraded task, but Mile Marker #10 uses the result.
      Mile Marker #10 is three questions.
      Merit Activity #3 is the last required Merit activity. Use the Activity #3 link on the Merit platform.
      Online sections: That One Time Group Work Went Sideways. First post by Friday, replies by Monday. In-person sections: today's attendance counts; bring a group work story and your type.`,
    mm: `
      Mile Marker #10 has three questions.
      One: your 16Personalities type in your own words, one short phrase, plus two collaboration strengths and one or two challenges that honestly fit.
      Two: pick one challenge and explain why it happens for you, as a tendency, not a flaw. Sharing anything about neurodivergence is always optional.
      Three: in one simple, respectful sentence, what you need from teammates to do your best work.
      It's AI-supported, but AI doesn't know how you collaborate. You do.`,
    disc: `
      In-person discussion. This is the in-class version of the online discussion, That One Time Group Work Went Sideways. The in-person Trailhead asks students to bring a story and their type.
      Ground rule: no names. Describe roles, not people.
      Pairs for three minutes, then collect what would have helped. Most answers map to the strategies in Lesson 10.5, especially clear expectations.
      For online recordings: pose the questions and point students to the discussion.`,
  },
}).catch(e => { console.error(e); process.exit(1); });

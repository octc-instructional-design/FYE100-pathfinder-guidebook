const { build } = require('./deck.js');
const { bar, spotlight, cards, rows, qrPanel } = require('./helpers.js');

build({
  n: 7, file: 'FYE100-Module07-Instructor-Slides.pptx',
  title: 'Knowing Your Strengths & Values',
  tagline: 'Who you are, and what you bring.',
  art: __dirname + '/art/m07-title.jpg',

  house: { title: 'Breaking Camp', sub: 'Pack up Module 6, then look ahead to Module 7.',
    ahead: 'Module 7 work and Merit Activity #2 are due Monday by 11:59 PM Central.' },

  week: { title: 'You at your best',
    items: [['LuListOrdered', 'Sort your Top 5 values'], ['LuStar', 'Find your Top 5 strengths'],
            ['LuEye', 'Name one blind spot'], ['LuAward', 'Merit Activity #2 is due']],
    skills: [[5, 'Adaptability & Leadership'], [9, 'Knowledge Application']] },

  lessons: [
    { kicker: 'Lesson 7.1 · Skill Spotlight', title: 'Adaptability & Leadership',
      async draw(s, k) {
        await spotlight(s, k, 5, 'Not a title. How you show up, especially when things change.',
          'You can describe how people cooperate, and how new situations call for new approaches.',
          'You contribute to a shared goal, adjust with a positive mindset, and help others keep going.');
      },
      notes: `
        This week's Skill Spotlight is #5, Adaptability & Leadership. Leadership is a pattern, not a position.
        Left: where most students start. You can describe how people cooperate and how new situations call for doing things differently. Right: where you're headed. You actually contribute to a shared goal, adjust with a positive mindset, and encourage others when things change.
        The shift is from understanding how it works to doing it, in real situations, with real people, under real pressure.
        This is one of the three assigned STAR(T) Story skills. Starting college is itself a big adjustment; that may be a story.` },

    { kicker: 'Lesson 7.2', title: 'Why your values matter',
      async draw(s, k) {
        const { M, txt, C } = k;
        const cw = qrPanel(s, k, 'https://www.valuescardsort.com/', 'Scan for the Values Card Sort');
        txt(s, 'Interests tell you what you enjoy. Values tell you who you are.', { x: M, y: 2.0, w: cw, h: 0.9, fontSize: 26, bold: true, color: C.accent1 });
        await rows(s, k, [['LuArrowDownWideNarrow', 'Sort', '30 cards into three piles'], ['LuFilter', 'Narrow', 'down to your Top 5'], ['LuSave', 'Save', 'your Top 5 before you close it']], 3.15, 0.85, cw);
        txt(s, 'Two feel equally important? Trust the pull, not the logic.', { x: M, y: 5.75, w: cw, h: 0.6, fontSize: 22, italic: true, color: C.accent6 });
      },
      notes: `
        Behind every real decision sits something deeper than preference: your values. They shape your priorities, your boundaries, your reactions, your relationships, and your career fit.
        Interests can shift. Values tend to stay steadier, which makes them a more reliable compass for big decisions.
        The Values Card Sort finds your Top 5 by making you choose between values that all feel important. Scan the code. Sort 30 cards into three piles, narrow to five, and save your Top 5 before you close the page. Narrowing is the hard part, and it's supposed to be.
        Students use their Top 5 in the My Values Snapshot Trail Tool, the online Values journal, and Mile Marker #7. In-person sections: bring your results to class for the discussion.` },

    { kicker: 'Lesson 7.3', title: 'Strengths: what already works',
      async draw(s, k) {
        const { M, txt, C } = k;
        const cw = qrPanel(s, k, 'https://high5test.com/', 'Scan for HIGH5');
        txt(s, 'Not just what you\'re good at. What feels like you at your best.', { x: M, y: 2.0, w: cw, h: 0.9, fontSize: 26, bold: true, color: C.accent1 });
        await rows(s, k, [['LuPencil', 'Guess first', 'a quick baseline'], ['LuTimer', 'Take HIGH5', 'about 15 to 20 minutes'], ['LuSave', 'Save your Top 5', 'exactly as reported']], 3.15, 0.85, cw);
        txt(s, 'The Top 5 is free. No need to buy the report.', { x: M, y: 5.75, w: cw, h: 0.6, fontSize: 22, italic: true, color: C.accent6 });
      },
      notes: `
        Most of us were taught to fix our weaknesses. Strengths-based thinking flips it: what's already working, and how do I use more of it?
        Strengths are patterns of thinking, behaving, and interacting that come naturally and energize you. What feels easy to you often looks remarkable to someone else.
        Before HIGH5, take two minutes for a baseline: what do people compliment you on, and what makes time disappear? Write it in the My HIGH5 Results Trail Tool. Comparing your guess with your results is often the most interesting part.
        Scan the code for HIGH5. It's 120 short statements, about 15 to 20 minutes. Answer honestly. The Top 5 is free; no need to buy the report. If it asks you to sign up, use your KCTCS email.
        Save your Top 5 exactly as reported. Mile Marker #7, Question 1 asks for them that way.` },

    { kicker: 'Lesson 7.3', title: 'Every strength has a blind spot',
      async draw(s, k) {
        await cards(s, k, [['LuRocket', 'Deliverer', 'May take on too much, or move faster than others are ready.'],
                           ['LuSearch', 'Analyst', 'May get stuck researching when it\'s time to act.'],
                           ['LuHeart', 'Empathizer', 'May struggle with boundaries, or take on others\' stress.']], 2.05, 3.2);
        bar(s, k, 'Name yours, and decide now what you\'ll do when it shows up.', 5.6);
      },
      notes: `
        Every strength has an overuse pattern. Taken too far, or used in the wrong setting, even your best qualities can work against you. That's a blind spot: easy for you to miss, often easy for others to see.
        Three examples from the lesson. A Deliverer may take on too much and burn out, or move faster than others are ready for. An Analyst may overthink or keep researching when it's time to act. An Empathizer may struggle with boundaries or take on other people's stress.
        Mile Marker #7, Question 5 asks students to name one blind spot connected to their strengths and what it looks like when it shows up.
        Ask: what's a blind spot someone has pointed out to you, kindly or not?` },
  ],

  work: { title: 'Due Monday by 11:59 PM Central',
    items: [['LuListOrdered', 'Task: Values Card Sort', 'Save your Top 5 values'],
            ['LuStar', 'Task: HIGH5 Strengths Assessment', 'Save your Top 5 strengths, exactly as reported'],
            ['LuFlag', 'Mile Marker #7: My Strengths Snapshot', 'Six questions'],
            ['LuAward', 'Merit Activity #2', 'Use the Activity #2 link on the Merit platform'],
            ['LuNotebookPen', 'Online sections: Journal: My Top 5 Values', 'Private. Only your instructor reads it.']] },

  mm: { title: 'My Strengths Snapshot',
    qs: [['Your Top 5 strengths, exactly as reported'], ['What they say about how you think and work'], ['Three ways to use them in your learning'],
         ['Where your strengths and values point'], ['One blind spot worth watching'], ['One way you\'ll use a strength soon']],
    side: [{ text: 'AI use: AI-supported', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'Share your strength names with AI, not your name or personal details.', options: { breakLine: true } },
           { text: ' ', options: { breakLine: true, fontSize: 10 } },
           { text: 'Honest beats polished.', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'No strength is good or bad.' }] },

  notes: {
    title: `
      Welcome to Module 7: Knowing Your Strengths & Values.
      The last few modules were about what you do: your time, your money, your plan. This one turns inward, to who you are and what you bring to everything you do.
      The owl is holding up a star this week.`,
    house: `
      INSTRUCTOR SLIDE. Edit the announcements box before class. Hide this slide when recording for online sections (right-click the slide, Hide Slide).
      Merit Activity #2 is due with this module. Remind students to use the Activity #2 link on the Merit platform.
      Online sections: if you're hosting a virtual meet-up for Merit this week, put the date and time here.`,
    week: `
      This week: sort your Top 5 values, find your Top 5 strengths, and name one blind spot. Merit Activity #2 is also due.
      Two short assessments feed everything else. Do them first and keep the results handy. Both are free.`,
    work: `
      Everything is due Monday by 11:59 PM Central.
      The Values Card Sort and HIGH5 are ungraded tasks, but everything else uses their results.
      Mile Marker #7 is the main assignment.
      Merit Activity #2: submit your reflection on the Merit platform, using the Activity #2 link. The Merit Guide covers what counts.
      Online sections: the Top 5 Values journal is private. In-person sections: today's attendance counts, and bring your values results for the discussion.`,
    mm: `
      Mile Marker #7 has six questions.
      One: your Top 5 HIGH5 strengths, exactly as reported, spelling and capitalization included.
      Two: in your own words, what each strength means for how you think and work. Did anything surprise you compared with your baseline?
      Three: three specific ways to use your strengths in your learning this semester, and how one shows up in group work.
      Four: how your strengths and values might connect to a field, a role, or a work environment. Look back at the direction you named in Mile Marker #6.
      Five: one blind spot, and what it looks like when it shows up.
      Six: finish the sentence "One way I will use my strengths in the next few weeks is..."
      There are no good or bad strengths. Honest reflection is what earns full credit.`,
    disc: `
      In-person discussion. This is the in-class version of the online Top 5 Values journal; the in-person Trailhead asks students to bring their Values Card Sort results.
      Pairs for three minutes, then ask for two or three examples of a value showing up in a real choice.
      Watch for the surprise: students often find a value they didn't expect in their Top 5. Ask what it explains about a recent choice.
      For online recordings: pose the questions as a lead-in to the journal.`,
  },
}).catch(e => { console.error(e); process.exit(1); });

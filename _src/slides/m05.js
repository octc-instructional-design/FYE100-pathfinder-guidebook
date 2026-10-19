const { build } = require('./deck.js');
const TERM = require('./term.json');
const { pair, bar, spotlight, cards, rows } = require('./helpers.js');

build({
  n: 5, file: 'FYE100-Module05-Instructor-Slides.pptx',
  title: 'Financial Planning with Purpose',
  tagline: 'See it clearly before you change it.',
  art: __dirname + '/art/m05-title.jpg',

  house: { title: 'Breaking Camp', sub: 'Pack up Module 4, then look ahead to Module 5.',
    ahead: 'Module 5 work is due Monday by 11:59 PM Central.' },

  week: { title: 'Seeing your money clearly',
    items: [['LuReceipt', 'Track where it actually goes'], ['LuPiggyBank', 'Give every dollar a job'],
            ['LuGraduationCap', 'Keep your financial aid'], ['LuShieldCheck', 'Keep your numbers private']],
    skills: [[3, 'Quantitative Reasoning'], [6, 'Professionalism']] },

  lessons: [
    { kicker: 'Lesson 5.1 · Skill Spotlight', title: 'Quantitative Reasoning',
      async draw(s, k) {
        await spotlight(s, k, 3, 'Thinking clearly with numbers, which you already do every day.',
          'You can read a table, figure a percentage, and tell when numbers matter.',
          'You use numbers to reason through real decisions, not just to calculate.');
      },
      notes: `
        This week's Skill Spotlight is #3, Quantitative Reasoning.
        It isn't math for a test. It's thinking clearly with numbers in real life, and you already do it: comparing prices, splitting a bill, figuring out whether you can afford something before payday.
        Left: where most students start, working with numbers. Right: where you're headed, thinking with them, from calculating to reasoning.
        A note on math anxiety, from the lesson: it's real and common, and it usually means something went wrong in how you were taught, not that you can't do this. This level doesn't require algebra. It takes attention, honesty, and a willingness to look at numbers without flinching.` },

    { kicker: 'Trail Tools', title: 'Look back, then look ahead',
      async draw(s, k) {
        await pair(s, k,
          { icon: 'LuReceipt', label: 'Dollar Tracker', body: 'Look back. Where did your money actually go in the last week or two?' },
          { icon: 'LuPiggyBank', label: 'Budget Builder', body: 'Look ahead. Give every dollar coming in a job, until nothing is left without a plan.', fill: k.HEX.softGold, bg: k.HEX.gold, fg: k.HEX.navy }, 2.05, 3.05);
        bar(s, k, 'You don\'t need to share any dollar amounts with your instructor.', 5.55);
      },
      notes: `
        Same pattern as Module 3: look back, then look ahead.
        The Dollar Tracker is looking back: where your money actually went in the last week or two. It feeds Mile Marker #5, Question 1.
        The Budget Builder is looking ahead: a zero-based budget, where every dollar coming in gets a job, including savings, until nothing is left without a plan. It feeds Question 4.
        Privacy matters here. The Mile Marker never asks for dollar amounts, and the tools stay in your browser or on your paper.
        Both are fillable in the guidebook, and there are fillable PDFs in Blackboard.` },

    { kicker: 'Lesson 5.2', title: 'Financial wellness is a direction',
      async draw(s, k) {
        await pair(s, k,
          { icon: 'LuCheck', label: 'It is', body: 'Knowing roughly where your money goes. Handling a small surprise without a crisis.', bg: '1E7B34', fill: 'E6F4EA' },
          { icon: 'LuX', label: 'It isn\'t', body: 'Having a lot of money. Never struggling. A perfect budget every month.', bg: 'C0392B', fill: 'FDECEA' }, 2.05, 3.05);
        bar(s, k, 'Money stress is real mental load. If it\'s getting in the way of school, reach out.', 5.55);
      },
      notes: `
        Financial wellness is feeling steady and in some control of your money because you know where it goes and make choices on purpose. It's a direction, not a dollar amount, and you can work toward it at any income.
        What it is: knowing roughly where your money goes, feeling some control, handling a small unexpected expense without a crisis, and worrying less over time. What it isn't: having a lot of money, never struggling, a perfect budget every month, or having no debt.
        Money stress takes real mental space. It affects focus, memory, and planning. The lesson lists money help at OCTC and beyond. If money is getting in the way of school, reach out to Financial Aid, your Success Coach, or your instructor.` },

    { kicker: 'Lesson 5.3', title: 'Find your money leaks',
      async draw(s, k) {
        await cards(s, k, [['LuTruck', 'Delivery fees', 'When there\'s food at home.'],
                           ['LuRepeat', 'Forgotten subscriptions', 'Still paying, not using.'],
                           ['LuStore', 'Convenience buys', 'Because there was no plan.'],
                           ['LuZap', 'Impulse buys', 'Regretted a day later.']], 2.05, 3.0);
        bar(s, k, 'A leak is spending that doesn\'t match what you value.', 5.45);
      },
      notes: `
        You can't manage what you can't see. Three steps: look at the last week or two, notice what surprises you, and find your money leaks.
        A money leak is spending that doesn't line up with what you value or need. What counts is what you recognize as out of line with your own priorities, not what someone else thinks is unnecessary.
        Common leaks: delivery fees when there's food at home, subscriptions you forgot about, convenience buys because you didn't plan ahead, and impulse buys you regret.
        Then give every dollar a job: list what's coming in this month, list every place it needs to go, assign until you reach zero, and adjust as the month happens.
        If you use AI as a money thinking partner, describe your situation in general terms. Never share real account numbers, income, or debt amounts.` },

    { kicker: 'Trail Tip', title: 'Keep your financial aid',
      async draw(s, k) {
        const { M, W, HEX, txt, card, C } = k, gap = 0.4, w = (W - 2 * M - gap) / 2;
        [['2.0', 'GPA or higher'], ['67%', 'of the credit hours you sign up for, passed']].forEach(([big, lab], i) => {
          const x = M + i * (w + gap);
          card(s, x, 2.05, w, 2.9, HEX.navy, 'stat card');
          txt(s, [{ text: big, options: { fontSize: 80, bold: true, color: 'FFC94A', breakLine: true } }, { text: lab, options: { fontSize: 26, color: C.background1 } }],
            { x: x + 0.4, y: 2.15, w: w - 0.8, h: 2.7, valign: 'middle' });
        });
        bar(s, k, 'Thinking about dropping a class? Ask Financial Aid first.', 5.45);
      },
      notes: `
        Two numbers protect your financial aid. Keep your GPA at 2.0 or higher, and pass at least 67 percent, two-thirds, of the credit hours you sign up for.
        Withdrawing from a class counts as attempted but not completed, so it can pull your completion rate down. That's why the lesson says: ask Financial Aid before you change your schedule.
        The Trail Tip also covers the steps to get and keep aid: your StudentAid.gov account, the FAFSA, scholarships, checking your tasks in Student Self-Service, choosing how you'll get your refund, and checking your bill.
        There's a Financial Aid presentation in Blackboard. If you fall below either number, there's a process, and Financial Aid is the place to start.` },
  ],

  work: { title: 'Due Monday by 11:59 PM Central',
    items: [['LuClipboardCheck', 'Task: Appreciative Advising Inventory', 'A short inventory. Completion only.'],
            ['LuFlag', 'Mile Marker #5: Understanding My Money', 'Five questions. No dollar amounts needed.'],
            ['LuMessagesSquare', 'Online sections: Money Tip discussion', 'First post Friday, replies Monday']],
    // semester-specific form link lives in term.json
    qr: Object.assign({ label: 'Scan for the Inventory' }, TERM.aai) },

  mm: { title: 'Understanding My Money',
    qs: [['What you noticed from your Dollar Tracker'], ['Your financial reality, described honestly'],
         ['One small, realistic next step'], ['Your zero-based budget, without dollar amounts'], ['Keeping it private: what you left out of AI']],
    side: [{ text: 'AI use: AI-supported', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'Never share real account numbers, income, or debt with an AI tool.', options: { breakLine: true } },
           { text: ' ', options: { breakLine: true, fontSize: 10 } },
           { text: 'No numbers required.', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'Describe, don\'t disclose.' }] },

  notes: {
    title: `
      Welcome to Module 5: Financial Planning with Purpose.
      Money touches everything: your stress, your schedule, and whether you can stay in school. This module is about seeing your money clearly before trying to change anything, at any income.
      The owl is saving up this week.`,
    house: `
      INSTRUCTOR SLIDE. Edit the announcements box before class. Hide this slide when recording for online sections (right-click the slide, Hide Slide).
      Look back at Module 4: Merit Activity #1 status, and anything you noticed in the Is This Legit? chats.
      This week is personal for many students. Set the tone early: nobody shares numbers, and nobody is judged.`,
    week: `
      This week: track where your money actually goes, give every dollar a job, learn the two numbers that protect your financial aid, and keep your financial details private when you use AI.
      Two skills: Quantitative Reasoning, this week's Skill Spotlight, and Professionalism.`,
    work: `
      Everything is due Monday by 11:59 PM Central.
      The Appreciative Advising Inventory is a short inventory, completion only. Scan the code on this slide to open it; it's this semester's shared form for all FYE 100 sections. What students say in it shapes the course; the Instructor Guide's Results in Action page shows what changed because of it.
      Mile Marker #5 is the main assignment, with no dollar amounts required.
      Online sections: the money tip discussion. First post by Friday, replies by Monday. In-person sections: today's attendance counts.`,
    mm: `
      Mile Marker #5 has five questions, and none of them needs a dollar amount.
      One: what you noticed from the Dollar Tracker, what surprised you or confirmed a hunch. Two: your financial situation, described honestly for clarity, not judgment. Three: one small, realistic thing you'll do differently, or keep doing. Four: your zero-based budget from the Budget Builder, described without amounts. Five: if you used AI, what you left out to protect your privacy. If you didn't use AI, say so.
      It's AI-supported, with one firm rule: never share real account numbers, income, or debt with an AI tool.`,
    disc: `
      In-person discussion. This mirrors the online Money Tip discussion.
      Pairs for three minutes, then build a class top-ten list on the board.
      Ground rule before you start: no numbers, and no one has to share anything personal. Tips are enough.
      Watch for students who share hardship. Thank them, keep it moving, and follow up privately if needed.
      For online recordings: pose the questions and point students to the discussion.`,
  },
}).catch(e => { console.error(e); process.exit(1); });

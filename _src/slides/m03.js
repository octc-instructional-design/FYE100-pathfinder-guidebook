const { build } = require('./deck.js');
const { pair, bar, spotlight, grid4, cards } = require('./helpers.js');

build({
  n: 3, file: 'FYE100-Module03-Instructor-Slides.pptx',
  title: 'My Time Plan: Managing Time & Energy',
  tagline: 'Same 168 hours. Where are yours going?',
  art: __dirname + '/art/m03-title.jpg',

  house: { title: 'Breaking Camp', sub: 'Pack up Module 2, then look ahead to Module 3.',
    ahead: 'Module 3 work is due Monday by 11:59 PM Central.' },

  week: { title: 'Where does your time go?',
    items: [['LuHistory', 'Look back at your real week'], ['LuListChecks', 'Plan from your priorities'],
            ['LuClock', 'Protect your best hour'], ['LuBatteryMedium', 'Recharge before you run out']],
    skills: [[5, 'Adaptability & Leadership'], [6, 'Professionalism']] },

  lessons: [
    { kicker: 'Lesson 3.1 · Skill Spotlight', title: 'Professionalism',
      async draw(s, k) {
        await spotlight(s, k, 6, 'Being someone people can count on. Not being perfect.',
          'You know deadlines matter, and you follow through on your commitments.',
          'You use time management to finish what matters, and you own it when things go wrong.');
      },
      notes: `
        This week's Skill Spotlight is #6, Professionalism.
        It can sound like something that happens later, in an office, in different clothes. Kentucky's definition is more immediate: acting with honesty and fairness, managing your time and tasks, taking initiative, and being accountable, including for your mistakes.
        It's a pattern, not a performance. Being someone people can count on, not being perfect.
        Left: where most students start. You know deadlines matter and you follow through. Right: where you're headed. You actually use time management to get things done, and you take accountability when things go wrong.
        This module is Professionalism in practice: time management and organization are the content.
        Professionalism is one of the three assigned STAR(T) Story skills, so start noticing moments when you followed through when it wasn't easy.` },

    { kicker: 'Lesson 3.2 · Trail Tools', title: 'Look back, then look ahead',
      async draw(s, k) {
        await pair(s, k,
          { icon: 'LuHistory', label: 'Where My Time Goes', body: 'Look back. Log what actually happened, day by day. No judging, no fixing yet.' },
          { icon: 'LuCalendarRange', label: 'My Week at a Glance', body: 'Look ahead. Map your priorities into next week, around your energy.', fill: k.HEX.softGold, bg: k.HEX.gold, fg: k.HEX.navy }, 2.05, 3.05);
        bar(s, k, 'Must, Should, Could: name your priorities before you touch the calendar.', 5.55);
      },
      notes: `
        Two Trail Tools this week, and they do different jobs.
        Where My Time Goes is looking back: an honest log of where your time and energy actually went. No judging and no fixing yet. Just notice. It feeds Mile Marker #3, Question 1.
        My Week at a Glance is looking ahead: a plan for next week. It feeds Question 3. A plan built on the week you wish you had won't survive the week you actually have, so do the log first.
        Lesson 3.2's three steps: name your priorities before you touch the calendar, sorted into Must, Should, and Could. Know your energy before you block your time. Block broadly and leave white space for real life.
        If everything feels like a Must, it isn't. What actually has a deadline? What actually has consequences?
        Both tools are fillable in the guidebook, and fillable PDFs are with the module in Blackboard. Attaching them to the Mile Marker is optional.` },

    { kicker: 'Lesson 3.3', title: 'Run the day (don\'t let it run you)',
      async draw(s, k) {
        await grid4(s, k, [['LuClock', 'Find your best hour', 'Protect it for your most important work.'],
                           ['LuPlay', 'Start before you\'re ready', 'Five minutes is enough to get moving.'],
                           ['LuCheck', 'Handle small stuff fast', 'When it shows up, so it doesn\'t pile up.'],
                           ['LuRotateCcw', 'Recover, don\'t catastrophize', 'A bad day is one day. Restart.']], 2.0, 1.95);
      },
      notes: `
        The lesson opens with a line worth repeating: "The bad news is time flies. The good news is you're the pilot." Days fill up because we let them.
        Four moves. Find your best hour and protect it: your sharpest window goes to your most important work, with the phone out of reach. Start before you feel ready. Handle the small stuff when it shows up so it doesn't pile up. And recover instead of catastrophizing: a day that goes sideways is one day, not proof you can't do this.
        Name the time-wasters from the lesson: phone scrolling, notifications, fake productivity like color-coding instead of doing, easy tasks in your best hour, and avoidance dressed up as something else.
        Ask: When is your best hour? Most people already know.` },

    { kicker: 'Lesson 3.4', title: 'The multitasking myth',
      async draw(s, k) {
        const { M, W, HEX, txt, card, C } = k;
        card(s, M, 2.05, 4.6, 3.1, HEX.navy, 'stat card');
        txt(s, [{ text: '20+', options: { fontSize: 88, bold: true, color: 'FFC94A', breakLine: true } }, { text: 'minutes to get back on task after an interruption', options: { fontSize: 24, color: C.background1 } }],
          { x: M + 0.35, y: 2.2, w: 3.9, h: 2.8, valign: 'middle' });
        card(s, M + 5.0, 2.05, W - 2 * M - 5.0, 3.1, HEX.softBlue, 'definition card');
        txt(s, [{ text: 'Switching cost', options: { bold: true, fontSize: 28, color: C.text2, breakLine: true } },
                { text: 'You\'re not doing two things at once. You\'re switching fast, and every switch costs time and focus.', options: { paraSpaceBefore: 8 } }],
          { x: M + 5.35, y: 2.35, w: W - 2 * M - 5.7, h: 2.6 });
        bar(s, k, 'One thing at a time. Phone out of reach.', 5.55);
      },
      notes: `
        Most people believe they're good at multitasking. What we call multitasking is really rapid task-switching, and every switch has a cost.
        Research on interruptions has found it can take more than 20 minutes to get back to a task after being pulled away. Every "real quick" check of a notification can cost far more than a few seconds.
        That cost has a name: switching cost. There's also transition friction, the drag of leaving one thing and starting another. For some brains, including those with ADHD, that friction can feel like a wall. Lesson 3.6 picks that up.
        Try the demo from the teaching page if you have time: write "Time is the pilot" and the numbers 1 to 14 straight through, then alternate letter, number, letter, number. Compare times.` },

    { kicker: 'Lesson 3.5', title: 'Your five batteries',
      async draw(s, k) {
        await cards(s, k, [['LuDumbbell', 'Physical'], ['LuBrain', 'Mental'], ['LuHeart', 'Emotional'], ['LuUsers', 'Social'], ['LuSun', 'Spiritual']], 2.1, 2.0, { headSize: 24 });
        bar(s, k, 'Running low is a signal. Running out is burnout.', 4.5);
        k.txt(s, 'Which one is lowest right now, and what is one small way to recharge it?', { x: k.M, y: 5.65, w: k.W - 2 * k.M, h: 0.6, fontSize: 24, italic: true, color: k.C.accent1 });
      },
      notes: `
        Time isn't the only resource. You can have a free afternoon and still get nothing done because something else is empty: your energy.
        Five batteries. Physical: sleep, food, movement. Mental: focus and decisions, which have a daily limit. Emotional: your capacity to handle stress and conflict. Social: connection, which some people refill with people and others refill alone. Spiritual: meaning and purpose, whatever that looks like for you.
        Running low is a signal to act. Running out is burnout, which the lesson describes as exhaustion, cynicism, and feeling ineffective.
        Mile Marker #3, Question 2 asks which battery is most depleted and one small, realistic way to recharge it.
        If a student's batteries are all empty, that's a conversation to have privately, and the Counseling Center is a good next step.` },

    { kicker: 'Lesson 3.6', title: 'Your brain, your way',
      async draw(s, k) {
        await grid4(s, k, [['LuRocket', 'Starting is hard', 'Task initiation takes real effort for some brains.'],
                           ['LuHourglass', 'Time feels different', 'Time blindness: ten minutes can feel like three hours.'],
                           ['LuStickyNote', 'Holding things in mind', 'Working memory: write it down, every time.'],
                           ['LuShuffle', 'Switching gears', 'Transitions take more effort. Build in buffers.']], 2.0, 1.95);
      },
      notes: `
        Most time management advice assumes one kind of brain. If the standard strategies have never worked for you, this lesson is for you. It's also for everyone else, because understanding that brains work differently makes you a better teammate and colleague.
        Neurodivergence is an umbrella term for brains that work differently from what school and work systems were designed around: ADHD, autism, dyslexia, and more. It isn't a measure of intelligence. Many people never had a formal diagnosis, and you don't need one for the strategies to help.
        Four areas from the lesson: starting tasks, time blindness, working memory, and transitions. The lesson has strategies for each, and they help any brain.
        If any of this sounds like you, OCTC Accessibility Services is there to help.
        Note for instructors: some students will recognize themselves here for the first time. Mile Marker #3, Question 4 invites them to notice what resonated without naming a diagnosis. Keep that invitation open and private.` },
  ],

  work: { title: 'Due Monday by 11:59 PM Central',
    items: [['LuFlag', 'Mile Marker #3: Managing My Time & Energy', 'Four questions. Attaching your log or plan is optional.'],
            ['LuMessagesSquare', 'Online sections: Where Does My Time Go?', 'First post Friday, replies Monday'],
            ['LuClipboardList', 'Optional: Student Course Feedback Survey', 'Tell your instructor what is working so far']] },

  mm: { title: 'Managing My Time & Energy',
    qs: [['Your patterns: one time-waster from your log, and what it costs you'], ['Your energy: your lowest battery, and one way to recharge it'],
         ['Your week: your non-negotiables, and where your best work goes'], ['Your self-knowledge: one thing you are learning, and one habit to try']],
    side: [{ text: 'AI use: AI-supported', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'Use AI to think it through. Write it in your own words.', options: { breakLine: true } },
           { text: ' ', options: { breakLine: true, fontSize: 10 } },
           { text: 'Start with your log.', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'Question 1 needs real entries, so start tracking early in the week.' }] },

  notes: {
    title: `
      Welcome to Module 3: My Time Plan.
      You have the same 168 hours as everyone else, but not the same responsibilities, the same brain, or the same energy. This module is about figuring out where your hours actually go, and how to plan around the life you really have.
      The owl brought a pocket watch this week.`,
    house: `
      INSTRUCTOR SLIDE. Edit the announcements box before class. Hide this slide when recording for online sections (right-click the slide, Hide Slide).
      Look back at Module 2: did students find their Success Coach? Merit invitations should be arriving now that add/drop is over.
      Heads up: Merit Activity #1 is due with Module 4. Encourage students to pick their activity this week.`,
    week: `
      This week: look back at how your week really went, plan the next one from your priorities, protect your best hour, and recharge before you run out.
      Two skills: Professionalism, this week's Skill Spotlight, and Adaptability & Leadership.
      Start the Where My Time Goes log today. Mile Marker #3 needs a few days of real entries.`,
    work: `
      Everything is due Monday by 11:59 PM Central.
      Mile Marker #3 is the main assignment. Attaching your time log or week plan is optional.
      Online sections: the Where Does My Time Go? discussion. First post by Friday, replies by Monday. In-person sections: today's attendance counts.
      The Student Course Feedback Survey is optional, and it helps me adjust the course while you're still in it.`,
    mm: `
      Mile Marker #3 has four questions.
      One, your patterns: from your Where My Time Goes log, when were you most focused, where did time slip away, and what does that cost you? Use your real log, not a general statement.
      Two, your energy: which of the five batteries is lowest, what's draining it, and one small, realistic way to recharge it this week.
      Three, your week: from My Week at a Glance, your non-negotiables, where you put your most important work and why, and one part of the plan that reflects what you value.
      Four, your self-knowledge: one thing you're learning about how you work, and one small habit to try. You don't have to name a diagnosis.
      It's AI-supported. The guidebook has a fill-in form, and there's a printable handout in Blackboard.`,
    disc: `
      In-person discussion. This mirrors the online Where Does My Time Go? discussion.
      Pairs for three minutes, then collect the top time-wasters on the board. Tally them: phones usually win.
      Watch for students who name work, kids, or caregiving. Those are commitments, not time-wasters. Name the difference: commitments get planned around; leaks get noticed and plugged.
      Close by connecting to Lesson 3.3: protect your best hour.
      For online recordings: pose the questions and point students to the discussion.`,
  },
}).catch(e => { console.error(e); process.exit(1); });

const { build } = require('./deck.js');
const { pair, bar, spotlight, cards, rows, qrPanel } = require('./helpers.js');

build({
  n: 8, file: 'FYE100-Module08-Instructor-Slides.pptx',
  title: 'Explore Your Career Options',
  tagline: 'The one that actually fits who you are.',
  art: __dirname + '/art/m08-title.jpg',

  house: { title: 'Breaking Camp', sub: 'Pack up Module 7, then look ahead to Module 8.',
    ahead: 'Module 8 work is due Monday by 11:59 PM Central. Spring break comes after this module.' },

  week: { title: 'Find a career that fits your life',
    items: [['LuSunrise', 'Start with the life you want'], ['LuSearch', 'Research one career, well'],
            ['LuScale', 'Check the fit honestly'], ['LuCalendarCheck', 'Set up Handshake, register early']],
    skills: [[1, 'Communication'], [2, 'Critical & Creative Thinking'], [6, 'Professionalism'], [10, 'Information Literacy']] },

  lessons: [
    { kicker: 'Lesson 8.1 · Skill Spotlight', title: 'Communication',
      async draw(s, k) {
        await spotlight(s, k, 1, 'Showing up in the conversation as someone worth listening to.',
          'You ask questions to clarify, and you share ideas one-on-one or in small groups.',
          'You listen closely, write with clear structure, and bring your own ideas to professional conversations.');
      },
      notes: `
        This week's Skill Spotlight is #1, Communication.
        Left: where most students start. You ask questions to clarify, express ideas in writing, and share in one-on-one or small-group conversations. Right: where you're headed. You listen with focused attention and notice nonverbal signals, write with clear structure and correct mechanics, and take part in formal conversations with peers and professionals by offering your own ideas.
        The shift is from reacting to engaging. Come with something; leave with something.
        Career research is Communication in practice: reading sources closely, writing it up clearly, and preparing questions for real people in the field.` },

    { kicker: 'Lesson 8.2', title: 'Start with the life you want',
      async draw(s, k) {
        const { M, W, HEX, txt, card, C } = k;
        const f = ['Interests', 'Strengths', 'Values', 'Work environment', 'Life management', 'Education fit'], gap = 0.3, w = (W - 2 * M - 2 * gap) / 3;
        f.forEach((t, i) => {
          const x = M + (i % 3) * (w + gap), y = 2.05 + Math.floor(i / 3) * 1.2;
          card(s, x, y, w, 0.95, i < 3 ? HEX.softBlue : HEX.softGold, 'fit factor');
          txt(s, t, { x: x + 0.3, y, w: w - 0.6, h: 0.95, fontSize: 26, bold: true, color: C.text2, valign: 'middle', align: 'center' });
        });
        txt(s, 'Career fit: how well a career\'s real demands match who you are and how you want to live.', { x: M, y: 4.6, w: W - 2 * M, h: 0.8, fontSize: 24, color: C.text1 });
        bar(s, k, 'The career is the tool. The life is the point.', 5.6);
      },
      notes: `
        A good fit takes more than something that sounds cool or pays well.
        Career fit is how well a career's real demands match who you are and how you want to live. Six parts. You already have the first three: interests from Module 6, strengths and values from Module 7. The Career Research Guide adds work environment, life management (schedule, pace, physical demands), and education fit.
        Think in directions, not job titles: a career cluster like health care, skilled trades, or human services gives you options and room to change course.
        And start with the life you want: security, time with people you love, where you live, what your mornings look like. That's this week's AI Chat with Coach Pathfinder: What Future Do You Want Your Career to Make Possible?` },

    { kicker: 'Lesson 8.2', title: 'Two research tools',
      async draw(s, k) {
        await pair(s, k,
          { icon: 'LuMapPin', label: 'Career Coach', body: 'The local picture: regional pay, job outlook, and OCTC programs.' },
          { icon: 'LuBriefcase', label: 'O*NET OnLine', body: 'What the work actually involves, day to day.', fill: k.HEX.softGold, bg: k.HEX.gold, fg: k.HEX.navy }, 2.05, 3.0);
        bar(s, k, 'Get your facts from sources, not AI. Check every number against your research.', 5.5);
      },
      notes: `
        Two tools, two jobs.
        Career Coach is the local picture: regional salary, job outlook, and the OCTC programs connected to a career. Start there, with your results from Module 6.
        O*NET OnLine goes deeper on what the work actually involves: tasks, skills, work context.
        Students research one career in depth and fill in all five sections of the Career Research Guide. That guide is Part 1 of Mile Marker #8.
        On AI: use it to question your assumptions about a career, but get the facts, especially numbers, from your research sources.` },

    { kicker: 'Trail Tip', title: 'Set up your Handshake profile',
      async draw(s, k) {
        const { M, txt, C } = k;
        const cw = qrPanel(s, k, 'https://octc.joinhandshake.com/login', 'Scan for Handshake', 'octc.joinhandshake.com');
        await rows(s, k, [['LuLogIn', 'Sign in', 'with your KCTCS login'], ['LuUserPen', 'Fill in the essentials', ''],
                          ['LuHeart', 'Add your interests', ''], ['LuCamera', 'Add a short bio', 'and a photo'],
                          ['LuLink', 'Copy your profile link', 'for the task']], 2.0, 0.8, cw);
        txt(s, 'Jobs, internships, career fairs, and local employers.', { x: M, y: 6.1, w: cw, h: 0.5, fontSize: 22, italic: true, color: C.accent6 });
      },
      notes: `
        Handshake is the career platform OCTC uses to connect students with local and regional employers: part-time and full-time jobs, internships, career fairs, and hiring events.
        Most students wait until they're actively job hunting. The ones who set it up early and look around have a head start.
        Scan the code and sign in with your KCTCS username and password; there's no separate account. Fill in the essentials, add your interests, add a short bio and a photo, and copy your profile link. That's this week's Handshake task.
        Once you're set up, look at jobs and internships, the resume tools, employers, and upcoming events.` },

    { kicker: 'Trail Tip', title: 'Register early for next semester',
      async draw(s, k) {
        await rows(s, k, [['LuCalendarDays', 'Know when it opens', 'look it up on the OCTC academic calendar'],
                          ['LuCompass', 'Meet your Success Coach first', 'bring your Module 6 plan'],
                          ['LuMousePointerClick', 'Register as soon as your window opens', 'not the week before classes']], 2.15, 0.95);
        bar(s, k, 'Early gets the classes you need. Late gets what\'s left.', 5.2);
      },
      notes: `
        Classes fill faster than most first-year students expect, especially general education courses and the ones your program requires.
        Know when registration opens: look it up on the OCTC academic calendar, and put it in your phone with a reminder a week ahead.
        Meet with your Success Coach first. Bring the plan and questions from Module 6.
        Then register as soon as your window opens.
        Tie-in: the course's extra credit is submitting your next-semester schedule after meeting with your Success Coach. Details are in Blackboard.` },
  ],

  work: { title: 'Due Monday by 11:59 PM Central',
    items: [['LuBriefcase', 'Task: Set Up Your Handshake Profile', 'Share your profile link'],
            ['LuBot', 'AI Chat: What Future Do You Want Your Career to Make Possible?', 'A conversation with Coach Pathfinder'],
            ['LuFlag', 'Mile Marker #8: My Career Snapshot', 'Part 1: your Career Research Guide. Part 2: three questions.'],
            ['LuStar', 'Extra credit: Submit your next-semester schedule', 'After you meet with your Success Coach. Details in Blackboard.']] },

  mm: { title: 'My Career Snapshot',
    qs: [['Part 1: Upload your Career Research Guide'], ['What did you find? The headline version'],
         ['Does it fit? Your strengths, values, and style'], ['Your honest take: one fit, one friction, one question']],
    side: [{ text: 'AI use: AI-supported', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'Use AI to question your thinking. Get facts from your sources.', options: { breakLine: true } },
           { text: ' ', options: { breakLine: true, fontSize: 10 } },
           { text: 'One file?', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'A handout with both parts is in Blackboard.' }] },

  notes: {
    title: `
      Welcome to Module 8: Explore Your Career Options.
      Not the career you're supposed to want. The one that actually fits who you are and the life you want. This week you'll research one career in depth and take an honest look at the fit.
      The owl has binoculars: it's scouting what's ahead.`,
    house: `
      INSTRUCTOR SLIDE. Edit the announcements box before class. Hide this slide when recording for online sections (right-click the slide, Hide Slide).
      Spring break follows this module. Remind students that Module 8 is due before break, and that Module 9 picks up after.
      Registration for next semester is coming. If you know the opening date, put it here.`,
    week: `
      This week: start with the life you want, research one career well, check the fit honestly, and get two practical things done: a Handshake profile and an early start on registration.
      Four skills, with Communication as the Skill Spotlight.`,
    work: `
      Everything is due Monday by 11:59 PM Central.
      The Handshake task: set up your profile and share the link.
      The AI Chat with Coach Pathfinder is a short conversation about what you want your career to make possible.
      Mile Marker #8 has two parts: upload your completed Career Research Guide, then answer three questions. A submission without the guide is incomplete.
      Extra credit, the only extra credit in the course: meet with your Success Coach, build your next-semester schedule, and submit a screenshot. Details in Blackboard.
      In-person sections: today's attendance counts.`,
    mm: `
      Mile Marker #8 has two parts.
      Part 1: the Career Research Guide, all five sections, researched with Career Coach and O*NET. Upload it with the Mile Marker.
      Part 2, three questions. One: the headline version of what you found: education, regional salary, outlook, and work environment. Two: does it fit? Connect your research to your strengths, values, and work style from Modules 6 and 7. Three: one clear area of alignment, one area of friction, and the one question you still need answered.
      Honest beats impressive. Naming friction is part of a good fit analysis, not a sign you chose wrong.
      There's a handout with both parts in Blackboard for students who want one file.`,
    disc: `
      In-person discussion. This mirrors the AI Chat question, so it's a good warm-up for it.
      Pairs for three minutes. Encourage specifics: what time they wake up, who's around, where they live.
      Ask a few students to share what their career would need to give them. Common answers: steady hours, enough money to stop worrying, time with family, work that matters.
      Connect it back: the career is the tool; the life is the point.
      For online recordings: pose the questions as a lead-in to the AI Chat.`,
  },
}).catch(e => { console.error(e); process.exit(1); });

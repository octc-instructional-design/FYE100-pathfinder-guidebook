const { build } = require('./deck.js');
const { pair, bar, spotlight, grid4, cards, qrPanel } = require('./helpers.js');

const CAREER_COACH = 'https://owensboro.kctcs.edu/education-training/career-coaching/index.aspx';

build({
  n: 6, file: 'FYE100-Module06-Instructor-Slides.pptx',
  title: 'Map Your Path: Academic Planning',
  tagline: 'Specific enough to start a real conversation.',
  art: __dirname + '/art/m06-title.jpg',

  house: { title: 'Breaking Camp', sub: 'Pack up Module 5, then look ahead to Module 6.',
    ahead: 'Module 6 work is due Monday by 11:59 PM Central. Merit Activity #2 is due with Module 7.' },

  week: { title: 'Map your path',
    items: [['LuCompass', 'Take the Career Coach assessment'], ['LuLayers', 'See how credentials stack'],
            ['LuCalendarRange', 'Sketch your next semester'], ['LuMessageCircleQuestion', 'Bring five questions to your Success Coach']],
    skills: [[1, 'Communication'], [6, 'Professionalism'], [9, 'Knowledge Application'], [10, 'Information Literacy']] },

  lessons: [
    { kicker: 'Lesson 6.1 · Skill Spotlight', title: 'Knowledge Application',
      async draw(s, k) {
        await spotlight(s, k, 9, 'Turning what you know into real decisions.',
          'You can name the kind of work you\'re interested in and what it requires.',
          'You use what you\'ve learned to judge how well a path fits, and you can explain why.');
      },
      notes: `
        This week's Skill Spotlight is #9, Knowledge Application: turning "I know that" into "I did something with it."
        Left: where most students start. You can name the kind of work you're interested in and what it requires. Right: where you're headed. You use what you've learned to solve real problems on your path, and you reflect on your experiences to judge how well a career fits, with reasons.
        This module is Knowledge Application in practice: connecting what you know about yourself to real academic decisions.
        It's also one of the three assigned STAR(T) Story skills. Start noticing moments when something you learned showed up somewhere else.` },

    { kicker: 'Lesson 6.2', title: 'Explore your interests with Career Coach',
      async draw(s, k) {
        const { M, HEX, txt, card, C } = k;
        const cw = qrPanel(s, k, CAREER_COACH, 'Scan for Career Coach', 'OCTC Career Coaching page');
        txt(s, 'Six interest types. Look at your mix, not just the top one.', { x: M, y: 2.0, w: cw, h: 0.55, fontSize: 24, color: C.text1 });
        const types = ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'], gw = (cw - 0.3) / 2;
        types.forEach((t, i) => {
          const x = M + (i % 2) * (gw + 0.3), y = 2.75 + Math.floor(i / 2) * 0.82;
          card(s, x, y, gw, 0.66, HEX.softBlue, 'interest type');
          txt(s, t, { x: x + 0.3, y, w: gw - 0.6, h: 0.66, fontSize: 24, bold: true, color: C.text2, valign: 'middle' });
        });
        txt(s, 'Use the Detailed Assessment, and your KCTCS email so your results are saved for Module 8.', { x: M, y: 5.35, w: cw, h: 0.9, fontSize: 22, italic: true, color: C.accent1 });
      },
      notes: `
        Career Coach is OCTC's career exploration tool, and it connects your results directly to OCTC programs and regional job information.
        Scan the code to get to OCTC's Career Coaching page, then open Career Coach, make an account with your KCTCS email, and choose the Detailed Assessment. Your results get used again in Module 8, so save them.
        The assessment measures six interest types: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional. Look at your mix, not just your top type. Your results are a mirror, not a map.
        Mile Marker #6, Question 1 asks for your top two or three types and whether they feel accurate. Online sections reflect on them in the Career Coach journal.
        If Career Coach gives a student trouble, the lesson offers the free O*NET Interest Profiler as another option.` },

    { kicker: 'Lesson 6.3', title: 'How credentials stack',
      async draw(s, k) {
        await cards(s, k, [['LuAward', 'Certificate', 'Focused job skills. The shortest path.'],
                           ['LuFileBadge', 'Diploma', 'Certificates can build into one.'],
                           ['LuGraduationCap', 'AAS degree', 'A career degree that can build on both.'],
                           ['LuArrowRightLeft', 'AA or AS degree', 'Built to transfer to a university.']], 2.05, 3.15, { gold: 3 });
        bar(s, k, 'Stackable: courses that count toward the next, bigger credential.', 5.55);
      },
      notes: `
        Picking a program means choosing a credential, a timeline, and a direction. Most students never get this explained before their first class.
        At OCTC, many credentials are built to stack. Courses package into certificates, certificates can build into diplomas, and diplomas can build into AAS degrees, which are career degrees. AA and AS degrees are built to transfer to a four-year university.
        You don't always have to start at the bottom, and you don't have to stop at the top.
        Mile Marker #6, Question 2 asks students to name one program or pathway at OCTC worth exploring. Lesson 6.3 shows how to connect interest results to real programs.
        Program requirements change. Students should confirm everything with their Success Coach or the catalog.` },

    { kicker: 'Lesson 6.4', title: 'Plan like a strategist',
      async draw(s, k) {
        await grid4(s, k, [['LuListOrdered', 'What has to happen first', 'Prerequisites and application deadlines.'],
                           ['LuScale', 'A realistic load', 'Classes, work, and life, together.'],
                           ['LuTelescope', 'More than one semester', 'Some courses aren\'t offered every semester.'],
                           ['LuRefreshCw', 'Keep it flexible', 'A map, not a rigid schedule.']], 2.0, 1.95);
      },
      notes: `
        An academic plan is a map, not a rigid schedule. Think like a strategist, not just a scheduler.
        Four moves. Know what has to happen first: prerequisites, and application deadlines for programs like nursing. Be realistic about your load, counting work and family, not just classes. Look more than one semester ahead, since some courses aren't offered every semester. And keep it flexible, because plans change.
        The Academic Planner Trail Tool is where students sketch their next semester and their five questions for their Success Coach. They can fill it in online and save a PDF, or use the fillable or printable planner in the module.
        If students use AI to explore a plan, they keep personal details out and check every requirement with their Success Coach or the catalog.` },

    { kicker: 'Trail Tip', title: 'How is my grade actually calculated?',
      async draw(s, k) {
        await pair(s, k,
          { icon: 'LuCalculator', label: 'Points-based', body: 'Your points earned, divided by the points possible.' },
          { icon: 'LuChartPie', label: 'Weighted', body: 'Each category, like quizzes or projects, counts for a set percent.', fill: k.HEX.softGold, bg: k.HEX.gold, fg: k.HEX.navy }, 2.05, 3.0);
        bar(s, k, 'Your syllabus says which one. Your GPA weighs each grade by its credit hours.', 5.5);
      },
      notes: `
        Most students don't know how their grade is calculated. Now they will.
        Points-based grading: add up the points you earned and divide by the points possible. Weighted grading: each category, like quizzes, projects, or discussions, counts for a set percentage of the grade, no matter how many points it has.
        Which one a course uses is in the syllabus.
        Then GPA: know the grade scale, and remember that each grade is weighted by its credit hours, so a grade in a four-credit class moves your GPA more than the same grade in a one-credit class.
        The Trail Tip has practice problems with answers students can open. If you have time, work one together.` },
  ],

  work: { title: 'Due Monday by 11:59 PM Central',
    items: [['LuCompass', 'Task: Take the Career Coach assessment', 'Your results feed Mile Marker #6'],
            ['LuCalendarRange', 'Trail Tool: Academic Planner', 'Online, or the fillable or printable planner in the module'],
            ['LuFlag', 'Mile Marker #6: My Academic Plan', 'Four questions, then bring it to advising'],
            ['LuNotebookPen', 'Online sections: Career Coach journal', 'Private. Only your instructor reads it.']] },

  mm: { title: 'My Academic Plan',
    qs: [['Your interest results, and whether they fit'], ['One OCTC program or pathway worth exploring'],
         ['Five questions for your Success Coach'], ['A realistic course load for next semester']],
    side: [{ text: 'AI use: AI-supported', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'Keep your student ID, birth date, and other personal details out of AI.', options: { breakLine: true } },
           { text: ' ', options: { breakLine: true, fontSize: 10 } },
           { text: 'Bring it to advising.', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'Your planner and questions make the appointment count.' }] },

  notes: {
    title: `
      Welcome to Module 6: Map Your Path.
      Your plan doesn't have to be final. It has to be specific enough to start a real conversation with your Success Coach. This week: your interests, how programs work at OCTC, and a realistic sketch of next semester.
      The owl found a compass.`,
    house: `
      INSTRUCTOR SLIDE. Edit the announcements box before class. Hide this slide when recording for online sections (right-click the slide, Hide Slide).
      Look back at Module 5: anything from the money discussions worth following up on privately.
      Heads up: Merit Activity #2 is due with Module 7. Registration for next semester is coming; Module 8 has the Trail Tip.`,
    week: `
      This week: take the Career Coach assessment, see how credentials stack at OCTC, sketch your next semester, and bring five real questions to your Success Coach.
      Four skills this module, with Knowledge Application as the Skill Spotlight.`,
    work: `
      Everything is due Monday by 11:59 PM Central.
      Take the Career Coach assessment first; the rest of the module uses your results.
      The Academic Planner is a Trail Tool: fill it in online and save a PDF, or use the fillable or printable planner in the module.
      Mile Marker #6 is the main assignment, and it's built to bring to an advising appointment.
      Online sections: the Career Coach journal is private; only the instructor reads it. In-person sections: today's attendance counts.`,
    mm: `
      Mile Marker #6 has four questions.
      One: your top two or three interest types from Career Coach, and whether they feel accurate.
      Two: one OCTC program or pathway you want to know more about, and why.
      Three: five specific questions for your Success Coach, most important first. About your situation, your program, and your timeline, not questions any student could ask.
      Four: a realistic course load for next semester, with about how many credit hours.
      It's AI-supported, with a privacy rule: no student ID, birth date, or other identifying details. And check anything AI says about programs with your Success Coach.`,
    disc: `
      In-person discussion, and an in-class version of the private online Career Coach journal. Keep sharing optional; some students won't want to share their results.
      Pairs for three minutes, then ask a few students to share the program they named and their question about it.
      Collect the questions on the board. Many will be good Success Coach questions for Mile Marker #6, Question 3.
      For online recordings: pose the questions as a lead-in to the journal.`,
  },
}).catch(e => { console.error(e); process.exit(1); });

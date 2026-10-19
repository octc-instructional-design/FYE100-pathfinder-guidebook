const { build } = require('./deck.js');
const { pair, bar, spotlight, grid4, rows } = require('./helpers.js');

build({
  n: 11, file: 'FYE100-Module11-Instructor-Slides.pptx',
  title: 'Making an Impact',
  tagline: 'Community, values, and your Pathfinder journey.',
  art: __dirname + '/art/m11-title.jpg',

  house: { title: 'Breaking Camp', sub: 'Pack up Module 10, then look ahead to Module 11.',
    ahead: 'Module 11 work is due Monday by 11:59 PM Central. STAR(T) Stories are due with Module 12, on Sunday.' },

  week: { title: 'Where you already show up',
    items: [['LuUsers', 'See the communities you\'re already in'], ['LuHandHeart', 'Name your offer, and your limit'],
            ['LuStar', 'Choose your four STAR(T) skills'], ['LuMic', 'Draft one story, out loud']],
    skills: [[4, 'Interpersonal Relations'], [5, 'Adaptability & Leadership'], [7, 'Civic Engagement'], [9, 'Knowledge Application']] },

  lessons: [
    { kicker: 'Lesson 11.1 · Skill Spotlight', title: 'Civic Engagement',
      async draw(s, k) {
        await spotlight(s, k, 7, 'Starting with the parts of "society" you\'re already standing in.',
          'You discuss ideas about the common good respectfully, and know ways people get involved.',
          'You engage with people who see things differently, and use what you know to help make things better.');
      },
      notes: `
        This week's Skill Spotlight is #7, Civic Engagement.
        It tends to bring certain images to mind: voting, city council meetings, protests, campaigns. Those are real, and they can feel intimidating. This module starts closer to home, with the communities you're already part of: your workplace, your family, your class, your neighborhood.
        Left: where most students start. You discuss ideas about the common good respectfully and know ways people can get involved. Right: where you're headed. You engage with people who see things differently, understand how participation shapes what happens, and make a case based on real reflection.
        It shows up when a group disagrees about direction, when a problem keeps coming back, and when you notice what others miss.` },

    { kicker: 'Lesson 11.2', title: 'Every community runs on a system',
      async draw(s, k) {
        await grid4(s, k, [['LuUsers', 'People', 'Who\'s involved, and the role each plays.'], ['LuBookOpen', 'Rules', 'The official ones, and the unwritten ones.'],
                           ['LuMegaphone', 'Influence', 'Who actually shapes what happens.'], ['LuSlidersHorizontal', 'Leverage points', 'Small things that would change a lot.']], 2.0, 1.65);
        bar(s, k, 'Worked example in the lesson: four roommates and a shared kitchen.', 5.75);
      },
      notes: `
        You're already in more communities than you think, and already shaping how they work.
        Every community runs on a system with four parts. People: who's involved and what role each tends to play. Rules: the official ones and the unwritten ones everyone just knows. Influence: who actually shapes what happens, which isn't always the person with the title. Leverage points: small things that, if they changed, would change a lot.
        The lesson's worked example: four people share a kitchen, the dishes pile up, everyone's annoyed, and nobody's said anything. Walk it through the four parts. Where's the leverage point?
        The Community Snapshot Trail Tool walks students through one community for Mile Marker #11, Questions 1 and 2.` },

    { kicker: 'Lesson 11.3', title: 'Your strengths, your community',
      async draw(s, k) {
        await pair(s, k,
          { icon: 'LuHandHeart', label: 'What I have to offer', body: 'Based on your real strengths, values, and interests. Not what you think you\'re "supposed" to offer.' },
          { icon: 'LuOctagonX', label: 'What I\'m not available for', body: 'A limit, a role you don\'t want, or a task that drains you. At least for now.', fill: k.HEX.softGold, bg: k.HEX.gold, fg: k.HEX.navy }, 2.05, 3.0);
        bar(s, k, '"I don\'t have time" is usually half the story.', 5.5);
      },
      notes: `
        Everything students have figured out this semester, their strengths, values, and energy, comes together here.
        Before saying yes or no to getting more involved in something, know two things. What I have to offer, based on real strengths, values, and interests, not what you think you're supposed to offer. And what I'm not available for, at least for now: a limit, a role you don't want, a kind of task that drains you.
        Naming both up front changes the whole experience, instead of slowly discovering you've said yes to the wrong thing.
        "I don't have time" is usually half the story. The other half is often "I don't know what I'd be signing up for."
        Online sections: this is the Getting the Call journal. In-person: it's today's discussion.` },

    { kicker: 'Trail Tip', title: 'Start your STAR(T) Stories',
      async draw(s, k) {
        await rows(s, k, [['LuFolderOpen', 'Gather your Mile Markers', 'your best stories are already written down'],
                          ['LuStar', 'Choose your four skills', 'three assigned, one your choice'],
                          ['LuMic', 'Draft one story, then say it out loud', 'start with the one you\'re surest about']], 2.15, 0.95);
        bar(s, k, 'Get one story drafted now, and Module 12 is a finishing week, not a starting week.', 5.2);
      },
      notes: `
        This module is working time for the capstone. Three steps.
        Gather your Mile Markers. The best stories are probably already written down. Forms in the guidebook save only in the browser on the device used, so if a student switched devices, their submitted Mile Markers are in Blackboard.
        Choose your four skills: Adaptability & Leadership, Professionalism, Knowledge Application, and one of your choice. Students name all four in Mile Marker #11, Question 4.
        Draft one story, the one you feel surest about, with its practice guide. Then say it out loud once.
        This is a great week to show the STAR(T) Stories overview deck.` },
  ],

  work: { title: 'Due Monday by 11:59 PM Central',
    items: [['LuFlag', 'Mile Marker #11: My Community Impact', 'Part I: your community. Part II: your four STAR(T) skills.'],
            ['LuNotebookPen', 'Online sections: Journal: Getting the Call', 'Private. Only your instructor reads it.'],
            ['LuStar', 'Heads up: STAR(T) Stories', 'Due with Module 12, on Sunday']] },

  mm: { title: 'My Community Impact',
    qs: [['Where you show up, and your role'], ['One way you\'ve made, or could make, a difference'],
         ['One way to show up more intentionally'], ['Your four STAR(T) skills, and the story for each']],
    side: [{ text: 'AI use: AI-supported', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'AI doesn\'t know your community. You do.', options: { breakLine: true } },
           { text: ' ', options: { breakLine: true, fontSize: 10 } },
           { text: 'Small and real', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'is exactly right for Question 2.' }] },

  notes: {
    title: `
      Welcome to Module 11: Making an Impact.
      Civic engagement can sound like something for other people. This module starts with the communities you're already part of, and it's also your working time for your STAR(T) Stories.
      The owl made some friends.`,
    house: `
      INSTRUCTOR SLIDE. Edit the announcements box before class. Hide this slide when recording for online sections (right-click the slide, Hide Slide).
      Two weeks left. STAR(T) Stories are due with Module 12, on Sunday, earlier than usual.
      Consider showing the STAR(T) Stories overview deck this week.`,
    week: `
      This week: see the communities you're already in, name what you have to offer and what you're not available for, choose your four STAR(T) skills, and draft one story out loud.
      Four skills, with Civic Engagement as the Skill Spotlight.`,
    work: `
      Everything is due Monday by 11:59 PM Central.
      Mile Marker #11 has two parts: your community impact, then your four STAR(T) skills with the story you plan for each.
      Online sections: the Getting the Call journal is private. In-person sections: today's attendance counts.
      Heads up: all four STAR(T) Stories are due with Module 12, on Sunday.`,
    mm: `
      Mile Marker #11 has two parts.
      Part I. One: name a community and your role in it, including small, everyday ways you contribute. Two: using people, rules, and influence, one specific way you've made, or could make, a positive difference. Small and real is exactly right. Three: as your circles grow, one way you want to show up more intentionally.
      Part II. Four: for each of your four STAR(T) skills, the experience you plan to tell, in a phrase or sentence.
      It's AI-supported, but AI doesn't know your community. You do.`,
    disc: `
      In-person discussion. This is the in-class version of the private online journal, Getting the Call.
      Pairs for three minutes. Keep it hypothetical and low-stakes; nobody has to commit to anything.
      Listen for limits stated kindly and clearly, and name them as a skill. Saying no well is part of showing up well.
      For online recordings: pose the questions as a lead-in to the journal.`,
  },
}).catch(e => { console.error(e); process.exit(1); });

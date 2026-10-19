const { build } = require('./deck.js');
const TERM = require('./term.json');
const { bar, grid4, cards, rows } = require('./helpers.js');

build({
  n: 12, file: 'FYE100-Module12-Instructor-Slides.pptx',
  title: 'Reflecting Back, Moving Forward',
  tagline: 'The last mile marker on the trail.',
  art: __dirname + '/art/m12-title.jpg',

  house: { title: 'Breaking Camp', sub: 'Pack up Module 11. This is the last stretch of the trail.',
    ahead: 'Module 12 and all four STAR(T) Stories are due Sunday by 11:59 PM Central.' },

  week: { title: 'Finish strong',
    items: [['LuStar', 'Finish your four STAR(T) Stories'], ['LuHistory', 'Look back at your Mile Markers'],
            ['LuClipboardCheck', 'Retake My Skills Snapshot'], ['LuFlag', 'Plan for finals in your other classes']],
    skills: [[1, 'Communication'], [5, 'Adaptability & Leadership'], [6, 'Professionalism'], [9, 'Knowledge Application']] },

  lessons: [
    { kicker: 'Lesson 12.1', title: 'Final review for your STAR(T) Stories',
      async draw(s, k) {
        await rows(s, k, [['LuListOrdered', 'All five steps', 'Situation, Task, Action, Result, Transfer'], ['LuUser', 'The Action is yours', 'say "I," and name what you did'],
                          ['LuEye', 'The skill is evident', 'not just stated'], ['LuMapPin', 'The Transfer is specific', 'where this skill shows up next'],
                          ['LuMic', 'It sounds like you', 'not a template, and not AI'], ['LuCircleHelp', 'Your fourth story explains your choice', 'up front']], 1.95, 0.7);
      },
      notes: `
        Final review before students submit. Run each story through this list.
        All five steps are there. The Action is yours: you say "I," not just "we." The skill is evident, not just stated; someone listening could name it even if you didn't. The Transfer is specific: where and how this skill shows up next, not "this will help me." It sounds like you, not a template and not AI. And the fourth story starts by naming the skill and why you chose it.
        Each story goes in its own labeled journal in Blackboard. Students don't have to submit them all at once.
        If you didn't show the STAR(T) Stories overview deck in Module 11, its fixes and checklist slides work well here.` },

    { kicker: 'Trail Tool', title: 'Look back before you write',
      async draw(s, k) {
        await cards(s, k, [['LuFlag', 'Mile Marker #1', 'Where you started. Compare it with now.'],
                           ['LuHistory', 'Look Back', 'Skim your Mile Markers. Jot what stands out.'],
                           ['LuClipboardCheck', 'My Skills Snapshot', 'Retake it, then compare with Module 1.']], 2.05, 3.2, { gold: 0 });
        bar(s, k, 'Switched devices? Your submitted Mile Markers are in Blackboard.', 5.6);
      },
      notes: `
        Before writing the final reflection, take a quick look back at the trail.
        Mile Marker #1 is the starting line. Mile Marker #12, Question 1 asks students to open it and compare.
        The Look Back Trail Tool lists every Mile Marker with room to jot what stands out. Students don't need to reread everything; skimming is enough.
        And the end-of-semester Skills Snapshot: students rate themselves again and compare with Module 1.
        Guidebook forms save only in the browser on the device a student used. If they switched devices, their submitted Mile Markers are in Blackboard.` },

    { kicker: 'Trail Tip', title: 'Finishing strong',
      async draw(s, k) {
        await grid4(s, k, [['LuFileText', 'Check every syllabus now', 'What each final is, and when.'], ['LuCalendarRange', 'Go back to your time plan', 'Map your week. Watch your batteries.'],
                           ['LuLifeBuoy', 'Use your support team', 'Your Success Coach is still there.'], ['LuCalculator', 'Know your grades', 'What a final can, and can\'t, change.']], 2.0, 1.95);
      },
      notes: `
        FYE 100 may end before students' other classes do. Here's how to finish the semester.
        Check every syllabus now: finals look different across classes, and nothing should catch you off guard.
        Go back to your time plan from Module 3. Map your week, and watch your batteries.
        Use your support team. FYE 100 ends, but your Success Coach and the resources from Module 2 don't. Asking for help at the end of the semester is just as valid as at the beginning.
        Know your grades: where you stand, and what a final can and can't change. The grades Trail Tip from Module 6 shows how. If a final can't raise a grade enough, the Success Coach can help think through options.` },
  ],

  work: { title: 'Due Sunday by 11:59 PM Central',
    items: [['LuClipboardCheck', 'Task: My Skills Snapshot, End of Semester', 'Rate yourself again, then compare'],
            ['LuFlag', 'Mile Marker #12: My Story to Share', 'Four questions'],
            ['LuStar', 'STAR(T) Stories, all four', 'Each in its own labeled journal in Blackboard']],
    // semester-specific form link lives in term.json
    qr: Object.assign({ label: 'Scan for My Skills Snapshot' }, TERM.snapshot_end) },

  mm: { title: 'My Story to Share',
    qs: [['Growth: two or three ways you\'ve grown'], ['Lessons learned, and one habit you\'ll keep'],
         ['Words of wisdom for Week 1 you'], ['Still growing: one area, and a next step']],
    side: [{ text: 'AI use: AI-supported', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'AI wasn\'t there for your semester. You were.', options: { breakLine: true } },
           { text: ' ', options: { breakLine: true, fontSize: 10 } },
           { text: 'Start here:', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'open Mile Marker #1.' }] },

  notes: {
    title: `
      Welcome to Module 12: Reflecting Back, Moving Forward.
      The last mile marker on the trail, and a look at everything you've built along the way. This week you finish your STAR(T) Stories and reflect on how far you've come.
      The owl is ready to graduate.`,
    house: `
      INSTRUCTOR SLIDE. Edit the announcements box before class. Hide this slide when recording for online sections (right-click the slide, Hide Slide).
      Everything this week is due Sunday, not Monday, so you can grade before final grades are due. Say it twice.
      Thank students. Many of them did harder things this semester than the course ever saw.`,
    week: `
      This week: finish your four STAR(T) Stories, look back at your Mile Markers, retake My Skills Snapshot, and plan for finals in your other classes.`,
    work: `
      Everything is due Sunday by 11:59 PM Central, earlier than the usual Monday.
      The end-of-semester Skills Snapshot: scan the code on this slide. It's this semester's shared form for all FYE 100 sections. Rate yourself honestly again, then compare with Module 1.
      Mile Marker #12 is four questions.
      All four STAR(T) Stories, each in its own labeled journal in Blackboard. Students can add context in the journal if they want their instructor to know something.
      In-person sections: today's attendance counts.`,
    mm: `
      Mile Marker #12 is the final reflection, four questions.
      One, growth: open Mile Marker #1 and compare. Two or three specific ways you've grown, academically, personally, or professionally. If your thinking about AI changed, you can include that.
      Two, lessons learned: what you wish you'd known at the start, and one habit, strategy, or tool you'll keep using.
      Three, words of wisdom: a short message to your Week 1 self, or to a future FYE 100 student.
      Four, still growing: one area where you still want to grow, and one concrete next step.
      It's AI-supported: AI can ask questions that help you remember, but it wasn't there for your semester. The guidebook has an optional AI thinking partner interview prompt.`,
    disc: `
      In-person closing discussion, built from Mile Marker #12, Question 3.
      Pairs for three minutes, then invite volunteers to share one piece of advice with the room. Consider collecting them, anonymously and with permission, to share with next semester's students.
      Close the course: thank students, and remind them their Success Coach is still there after FYE 100 ends.
      For online recordings: share a few words of wisdom from past students, if you have them, and invite students to write their own.`,
  },
}).catch(e => { console.error(e); process.exit(1); });

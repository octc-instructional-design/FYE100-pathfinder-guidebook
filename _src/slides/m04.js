const { build } = require('./deck.js');
const { bar, spotlight, grid4, cards, rows } = require('./helpers.js');

build({
  n: 4, file: 'FYE100-Module04-Instructor-Slides.pptx',
  title: 'Your Academic Toolkit',
  tagline: 'The right tools, and how to use them.',
  art: __dirname + '/art/m04-title.jpg',

  house: { title: 'Breaking Camp', sub: 'Pack up Module 3, then look ahead to Module 4.',
    ahead: 'Module 4 work and Merit Activity #1 are due Monday by 11:59 PM Central.' },

  week: { title: 'Study smarter, check everything',
    items: [['LuBrain', 'Study strategies that stick'], ['LuSearch', 'SIFT before you trust'],
            ['LuGauge', 'Watch for AI creep'], ['LuAward', 'Merit Activity #1 is due']],
    skills: [[6, 'Professionalism'], [10, 'Information Literacy']] },

  lessons: [
    { kicker: 'Trail Tip', title: 'Your Office 365 toolkit',
      async draw(s, k) {
        await cards(s, k, [['LuNotebookPen', 'OneNote', 'One notebook per course.'],
                           ['LuCloud', 'OneDrive', 'Saved, and on every device.'],
                           ['LuMessagesSquare', 'Teams', 'Chat, calls, and meet-ups.'],
                           ['LuSparkles', 'Copilot', 'AI with your school login.']], 2.05, 3.0);
        bar(s, k, 'All free with your KCTCS account.', 5.45);
      },
      notes: `
        You already have a toolkit, free with your KCTCS account. This Trail Tip shows how to use it for school.
        OneNote is your digital Trapper Keeper: one notebook per course, with a section per module. OneDrive keeps your files saved and on every device, so a dead laptop isn't a lost paper. Teams is communication that isn't email: chats, calls, and some instructors' office hours or meet-ups. Copilot is AI with your school account; the lesson lists good ways to use it for school.
        Tie back to Module 1: Word on OneDrive and OneNote are also how you keep a trail.` },

    { kicker: 'Lesson 4.1 · Skill Spotlight', title: 'Information Literacy',
      async draw(s, k) {
        await spotlight(s, k, 10, 'Finding, evaluating, and responsibly using information to make good decisions.',
          'You can name a source\'s strengths and weaknesses, and tell where information came from.',
          'You check sources for bias, expertise, and point of view, and use them to make well-informed decisions.');
      },
      notes: `
        This week's Skill Spotlight is #10, Information Literacy.
        We live in the most information-rich moment in history, and one of the most polluted. AI answers sound confident. Social media shows you what's engaging, not what's accurate. News, opinion, and marketing can look identical.
        Information Literacy cuts through that: asking the right questions, finding credible sources, and evaluating what you read, without doubting everything.
        Left: where most students start. Right: where you're headed. The shift is from surface credibility to checking bias, expertise, and point of view.
        It shows up in every class and every job, and it's this week's AI Chat: Is This Legit?` },

    { kicker: 'Lesson 4.2', title: 'Study strategies that actually work',
      async draw(s, k) {
        await grid4(s, k, [['LuCircleHelp', 'Retrieval practice', 'Test yourself before the test tests you.'],
                           ['LuCalendarClock', 'Spaced practice', 'Come back before you forget.'],
                           ['LuMessageCircleQuestion', 'Ask why', 'Keep asking until it makes sense.'],
                           ['LuShuffle', 'Interleaving', 'Mix topics on purpose.']], 1.95, 1.6);
        bar(s, k, 'Rereading, highlighting, and cramming feel productive. They aren\'t.', 5.85);
      },
      notes: `
        Four strategies with strong research behind them.
        Retrieval practice: test yourself before the test does. Close the notes and write what you remember, or use practice questions.
        Spaced practice: come back to material over several days instead of one long session.
        Elaborative interrogation, or simply asking why: keep asking why something is true until it makes sense.
        Interleaving: mix problem types or topics on purpose instead of doing all of one kind.
        The trap: rereading, highlighting, and cramming feel productive because the material feels familiar. Familiar isn't the same as remembered.
        Mile Marker #4 asks students to try one strategy this week and report honestly on what happened, then write a SMART goal to keep it going.` },

    { kicker: 'Lesson 4.3', title: 'SIFT: stop before you scroll',
      async draw(s, k) {
        const { M, W, HEX, txt, card, C } = k, gap = 0.3, w = (W - 2 * M - 3 * gap) / 4;
        const moves = [['S', 'Stop', 'Pause before you react or share.'],
                       ['I', 'Investigate the source', 'Who is behind this?'],
                       ['F', 'Find better coverage', 'What do other sources say?'],
                       ['T', 'Trace it', 'Go back to the original claim, quote, or image.']];
        moves.forEach(([L, head, body], i) => {
          const x = M + i * (w + gap);
          card(s, x, 2.0, w, 3.3, i === 0 ? HEX.softGold : HEX.softBlue, 'SIFT card');
          txt(s, L, { x: x + 0.3, y: 2.15, w: 1.2, h: 1.1, fontSize: 66, bold: true, color: i === 0 ? '7A5500' : C.accent1, objectName: `Letter ${L}` });
          txt(s, [{ text: head, options: { bold: true, fontSize: 26, color: C.text2, breakLine: true } }, { text: body, options: { paraSpaceBefore: 6 } }],
            { x: x + 0.3, y: 3.25, w: w - 0.6, h: 2.0 });
        });
        bar(s, k, 'AI sounds confident because of how it writes, not because it\'s right. SIFT it too.', 5.7);
      },
      notes: `
        SIFT is four moves for evaluating any information, including what AI tells you.
        Stop is the hardest one, because everything is designed to keep you moving: headlines provoke, AI answers feel complete, and social media rewards the fast share. Stopping means pausing before your first reaction becomes your conclusion, not doubting everything.
        Investigate the source: who's behind this, and what's their expertise or agenda? Find better coverage: what do other trusted sources say? Trace claims, quotes, and images back to the original.
        For AI: the confidence comes from how it writes, not from evidence. Pause before you use it.
        This sets up the AI Chat, Is This Legit?, a role-play where students practice SIFT. Remind them to read the source document in Blackboard first.` },

    { kicker: 'Lesson 4.4', title: 'Beware of the creep',
      async draw(s, k) {
        const { M, W, HEX, txt, card, C } = k;
        txt(s, 'AI creep: AI\'s role in your work grows one small, reasonable step at a time.', { x: M, y: 1.95, w: W - 2 * M, h: 0.6, fontSize: 26, color: C.text1 });
        const st = ['Brainstorming', 'Outlining', 'Drafting', 'Revising', 'Rewriting', 'Submitting'];
        const fills = ['EAF4FB', 'D6EAF7', 'FFF5DC', 'FBE7B5', 'F6D27E', 'E7A614'], gap = 0.15, w = (W - 2 * M - 5 * gap) / 6;
        st.forEach((t, i) => {
          const x = M + i * (w + gap);
          card(s, x, 2.85, w, 1.2, fills[i], 'creep meter step');
          txt(s, t, { x, y: 2.85, w, h: 1.2, fontSize: 20, bold: true, color: C.text2, align: 'center', valign: 'middle' });
        });
        txt(s, [{ text: 'Lower stakes', options: {} }], { x: M, y: 4.15, w: 3, h: 0.45, fontSize: 20, color: C.accent6 });
        txt(s, [{ text: 'Higher stakes', options: {} }], { x: W - M - 3, y: 4.15, w: 3, h: 0.45, fontSize: 20, color: C.accent6, align: 'right' });
        bar(s, k, 'Set your boundary before you open the chat.', 5.2);
      },
      notes: `
        This happens to almost everyone. A student asks AI for topic ideas. Then an outline. Then a sample introduction "just to see." Then to polish a paragraph. By the end, they can't say how much of the paper is theirs. They weren't trying to cheat. The line moved one small step at a time.
        That's AI creep. The Creep Meter shows the stages: brainstorming, outlining, drafting, revising, rewriting, submitting. The farther AI moves into creating the work, the higher the stakes, and the more transparency matters.
        The fix: set your boundary before you start, based on the assignment's AI use label, and notice if you drift.
        Mile Marker #4, Question 4 asks where your AI use landed this week, and whether that's where you meant to land. Not using AI is a complete answer. Honesty is what earns the credit, not landing at one stage.` },

    { kicker: 'Trail Tip', title: 'Recording in class: ask first',
      async draw(s, k) {
        await rows(s, k, [['LuBookOpen', 'Respect the course', 'check the syllabus, and ask your instructor'],
                          ['LuUsers', 'Respect the people', 'your classmates and instructor didn\'t sign up to be recorded'],
                          ['LuBrain', 'Respect your learning', 'a recording isn\'t the same as learning it']], 2.1, 0.95);
        bar(s, k, 'AI note-takers record and share too. Ask before you turn one on.', 5.1);
      },
      notes: `
        Technology made recording easy. That doesn't make it automatic.
        Three principles. Respect the course: check the syllabus and ask your instructor first. Respect the people: classmates and instructors share things in class they wouldn't post publicly. Respect your own learning: recording a lecture isn't the same as learning it, and you still have to engage.
        AI note-takers are a separate conversation, because they record, transcribe, and often store or share what they hear. Ask before you use one.
        If you have an accommodation that includes recording, Accessibility Services and your instructor will work that out with you.
        Use this slide to state your own section's recording policy.` },
  ],

  work: { title: 'Due Monday by 11:59 PM Central',
    items: [['LuBot', 'AI Chat: Is This Legit?', 'Read the source document in Blackboard first'],
            ['LuFlag', 'Mile Marker #4: My Academic Toolkit', 'Four questions, including a SMART goal'],
            ['LuAward', 'Merit Activity #1', 'Submit your reflection on the Merit platform, using the Activity #1 link']] },

  mm: { title: 'My Academic Toolkit',
    qs: [['The study strategy or tool you tried, and why'], ['How you used it, and what you noticed'],
         ['One SMART goal to keep it going'], ['Where your AI use landed on the Creep Meter']],
    side: [{ text: 'AI use: AI-supported', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'Use AI to think it through. Write it in your own words.', options: { breakLine: true } },
           { text: ' ', options: { breakLine: true, fontSize: 10 } },
           { text: 'Honest beats impressive.', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'No AI this week? Say so.' }] },

  notes: {
    title: `
      Welcome to Module 4: Your Academic Toolkit.
      This week is about the tools that make college work: study strategies that actually stick, a way to check whether information is legit, and a clear-eyed look at how AI can creep into your work.
      The owl is studying, with a magnifying glass for checking sources.`,
    house: `
      INSTRUCTOR SLIDE. Edit the announcements box before class. Hide this slide when recording for online sections (right-click the slide, Hide Slide).
      Merit Activity #1 is due with this module. Remind students to use the Activity #1 submission link on the Merit platform; there are three.
      Online sections: if you're hosting a virtual meet-up for Merit this week, put the date and time here.`,
    week: `
      This week: study strategies that stick, the SIFT method for checking information, and AI creep. Merit Activity #1 is also due.
      Two skills: Information Literacy, this week's Skill Spotlight, and Professionalism.`,
    work: `
      Everything is due Monday by 11:59 PM Central.
      The AI Chat, Is This Legit?, is a role-play where you practice SIFT. Read the source document in Blackboard before you start.
      Mile Marker #4 is the main assignment.
      Merit Activity #1: submit your reflection on the Merit platform, using the link for Activity #1. The Merit Guide in the back of the guidebook covers what counts and what proof to include.
      In-person sections: today's attendance counts.`,
    mm: `
      Mile Marker #4 has four questions.
      One: the study strategy, habit, or tool you focused on this week, and why. Be specific: "I tried reviewing my notes out loud the night before class," not "I studied more."
      Two: how you actually used it and what you noticed. Honest beats hopeful.
      Three: one SMART goal for keeping it going: specific, measurable, achievable, relevant, and time-bound.
      Four: where your AI use landed on the Creep Meter this week, in any course, and whether that's where you meant to land. Not using AI is a complete answer.
      It's AI-supported, but the answer to Question 4 must be in your own words.`,
    disc: `
      In-person discussion, tied to SIFT and the AI Chat.
      Pairs for three minutes, then ask for two or three examples. Common answers: health claims, celebrity news, AI-generated images.
      For each example, ask which SIFT move would have caught it. Usually it's Stop or Trace.
      For online recordings: pose the questions as a lead-in to the AI Chat.`,
  },
}).catch(e => { console.error(e); process.exit(1); });

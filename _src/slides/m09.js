const { build } = require('./deck.js');
const { bar, spotlight, grid4, cards, rows } = require('./helpers.js');

build({
  n: 9, file: 'FYE100-Module09-Instructor-Slides.pptx',
  title: 'Think It Through: Critical Thinking + STAR(T)',
  tagline: 'Pause on purpose, then tell it well.',
  art: __dirname + '/art/m09-title.jpg',

  house: { title: 'Breaking Camp', sub: 'Welcome back from spring break. Pack up Module 8, then look ahead to Module 9.',
    ahead: 'Module 9 work is due Monday by 11:59 PM Central.' },

  week: { title: 'Think it through',
    items: [['LuBrain', 'Notice your thinking traps'], ['LuListChecks', 'Use the 4C Check'],
            ['LuPencilLine', 'Draft your first STAR(T) story'], ['LuBot', 'Practice in the AI Chat']],
    skills: [[1, 'Communication'], [2, 'Critical & Creative Thinking'], [9, 'Knowledge Application']] },

  lessons: [
    { kicker: 'Lesson 9.1 · Skill Spotlight', title: 'Critical & Creative Thinking',
      async draw(s, k) {
        await spotlight(s, k, 2, 'Pausing on purpose before you react, decide, or assume.',
          'You describe a problem using whatever information you happen to have.',
          'You find what\'s really going on, weigh other perspectives, and reach a clear, informed conclusion.');
      },
      notes: `
        Welcome back. This week's Skill Spotlight is #2, Critical & Creative Thinking.
        It isn't overthinking or arguing. It's pausing on purpose before you react, decide, or assume. Much of the stress in decisions is really confusion about what you're deciding.
        Left: where most students start. You describe a problem using whatever information you happen to have, and don't always notice how your own perspective shapes it. Right: where you're headed. You figure out what's really going on with relevant information, seek out other perspectives, and name what matters to reach a clear conclusion.
        It shows up in everyday decisions, in news and social media, and in your STAR(T) stories.` },

    { kicker: 'Lesson 9.3', title: 'Spot the thought traps',
      async draw(s, k) {
        await rows(s, k, [['LuZap', 'Jumping to conclusions', 'deciding before the facts are in'], ['LuToggleLeft', 'All-or-nothing thinking', 'perfect or a failure, nothing between'],
                          ['LuRepeat', 'Overgeneralizing', 'one bad moment becomes "always"'], ['LuEye', 'Mind reading', 'assuming you know what others think'],
                          ['LuCloudLightning', 'Catastrophizing', 'jumping to the worst case']], 1.95, 0.72);
        bar(s, k, 'Biases color the lens too: confirmation, familiarity, the halo effect, and negativity.', 5.75);
      },
      notes: `
        Lesson 9.2 frames critical thinking as four habits: curiosity, clarity, checking, and calm decisions. Lesson 9.3 is about what gets in the way.
        Assumptions are the invisible fill-in-the-blank. Biases are the lens that colors your thinking: confirmation bias, familiarity bias, the halo effect, and negativity bias.
        And thought traps are the quicksand: jumping to conclusions, all-or-nothing thinking, overgeneralizing, mind reading, and catastrophizing.
        Everyone falls into these. The skill is noticing.
        Mile Marker #9, Question 1 asks which trap or bias feels most like you, with a real example, and a better question to ask yourself next time.
        Ask: which of these did you fall into this week? Model one of your own first.` },

    { kicker: 'Lesson 9.4 · Trail Tool', title: 'The 4C Check',
      async draw(s, k) {
        await grid4(s, k, [['LuFocus', 'Clarity', 'What am I really deciding?'], ['LuTarget', 'Context', 'What matters most here?'],
                           ['LuShieldCheck', 'Credibility', 'What do I know, and what am I assuming?'], ['LuArrowRight', 'Consequences', 'What might happen next?']], 2.0, 1.95);
      },
      notes: `
        The 4C Check is a simple tool for better decisions, and it's a Trail Tool students can fill in.
        Clarity: what am I really deciding? Strong feelings blur the question. "Do I hate this class, or am I just overwhelmed this week?"
        Context: what matters most here?
        Credibility: what do I know, and what am I assuming?
        Consequences: what might happen next, and is that what I want?
        The AI Chat, Think It Through, has students practice the 4C Check on a real decision with Coach Pathfinder.
        Try it live: ask for a low-stakes decision someone in the room is facing and walk it through the four Cs.` },

    { kicker: 'Lesson 9.5', title: 'Think through your STAR(T) story',
      async draw(s, k) {
        await grid4(s, k, [['LuUsers', '"We" instead of "I"', 'Say what you did.'], ['LuToggleLeft', 'All-or-nothing results', 'Honest and imperfect is fine.'],
                           ['LuSparkles', 'Picked to sound impressive', 'Real beats dramatic.'], ['LuMapPin', 'A vague Transfer', 'Name where it goes next.']], 2.0, 1.6);
        bar(s, k, 'Transfer is Consequences, and it\'s your interview answer.', 5.75);
      },
      notes: `
        The thinking behind a good decision also makes a story worth telling. This is the first STAR(T) draft.
        Thought traps sneak into drafts. "We" instead of "I." All-or-nothing results. Picking a story because it sounds impressive instead of because it's true. And a vague Transfer.
        Run the draft through the 4C Check. Clarity: what story am I actually telling? Context: what mattered most? Credibility: is this accurate, or did I round up? Consequences: so what? What does it mean going forward?
        That last one is the Transfer, and it's the part of the story an interviewer cares about most.
        Mile Marker #9 is this draft. Students can use it as one of their four capstone stories.` },
  ],

  work: { title: 'Due Monday by 11:59 PM Central',
    items: [['LuBot', 'AI Chat: Think It Through', 'Practice the 4C Check with Coach Pathfinder'],
            ['LuFlag', 'Mile Marker #9: Think It Through', 'Your thinking pattern, then your first STAR(T) draft']] },

  mm: { title: 'Think It Through',
    qs: [['Name your pattern, and a better question'], ['Tell your story, all five STAR(T) steps'],
         ['Check it with the 4Cs'], ['Name the skill it shows']],
    side: [{ text: 'AI use: AI-supported', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'AI can ask you questions about your draft. It can\'t tell your story.', options: { breakLine: true } },
           { text: ' ', options: { breakLine: true, fontSize: 10 } },
           { text: 'Hold onto this draft.', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'It can become one of your four STAR(T) Stories.' }] },

  notes: {
    title: `
      Welcome back, and welcome to Module 9: Think It Through.
      This week is about pausing on purpose: noticing the thinking traps everyone falls into, using a simple four-question check for decisions, and drafting your first STAR(T) story.
      The owl brought a lantern. Some thinking is easier with a little light on it.`,
    house: `
      INSTRUCTOR SLIDE. Edit the announcements box before class. Hide this slide when recording for online sections (right-click the slide, Hide Slide).
      Welcome back from spring break. Quick check-in: Module 8 submissions, the extra credit schedule, and registration.
      From here on, the STAR(T) Stories are the throughline. Consider showing the capstone overview deck this week.`,
    week: `
      This week: notice your thinking traps, use the 4C Check, draft your first STAR(T) story, and practice in the AI Chat.
      Three skills, with Critical & Creative Thinking as the Skill Spotlight.`,
    work: `
      Everything is due Monday by 11:59 PM Central.
      The AI Chat, Think It Through, is a Socratic conversation with Coach Pathfinder where students apply the 4C Check to a real decision.
      Mile Marker #9 is in two parts: name your thinking pattern, then write and check your first STAR(T) draft.
      In-person sections: today's attendance counts.`,
    mm: `
      Mile Marker #9 has four questions.
      One: which thinking trap or bias feels most like you, a real example, and a better question to ask next time.
      Two: one real experience, written with all five STAR(T) steps.
      Three: reread the draft with the 4C Check and say what you changed.
      Four: which of the 10 Essential Skills the story shows, and why. It's a best guess for now.
      It's AI-supported: AI can ask questions about the draft, but the story has to be the student's own. If a student mentions other people, they don't need names.`,
    disc: `
      In-person discussion, built from the AI Chat. It's a warm-up for the chat.
      Pairs for three minutes. Model it with a low-stakes decision of your own first.
      Ask a few pairs what changed when they separated what they know from what they're assuming. That's Credibility, and it's usually the turning point.
      For online recordings: pose the questions as a lead-in to the AI Chat.`,
  },
}).catch(e => { console.error(e); process.exit(1); });

const { build } = require('./deck.js');

const { pair, bar } = require('./helpers.js');

build({
  n: 2, file: 'FYE100-Module02-Instructor-Slides.pptx',
  title: 'Building Your Support System',
  tagline: 'No one completes a journey alone.',
  art: __dirname + '/art/m02-title.jpg',

  house: { title: 'Breaking Camp', sub: 'Pack up Module 1, then look ahead to Module 2.',
    ahead: 'Module 2 work is due Monday by 11:59 PM Central.' },

  week: { title: "Who's on your trail crew?",
    items: [['LuCompass', 'Find your Success Coach'], ['LuLifeBuoy', 'Ask for help early and clearly'],
            ['LuMail', 'Write emails that get answers'], ['LuAward', 'Set up Merit and your profiles']],
    skills: [[1, 'Communication'], [4, 'Interpersonal Relations'], [9, 'Knowledge Application']] },

  lessons: [
    { kicker: 'Lesson 2.1 · Skill Spotlight', title: 'Interpersonal Relations',
      async draw(s, k) {
        const { M, W, HEX, txt, card, C, b64, BOOK } = k;
        s.addImage({ data: b64(BOOK + 'images/shared/10es/10es-04.png'), x: M, y: 2.1, w: 1.3, h: 1.3, objectName: 'Decorative: skill coin 4' });
        txt(s, 'Understanding yourself well enough to work well with people who see things differently.',
          { x: M + 1.6, y: 2.15, w: 10.5, h: 1.2, fontSize: 26, color: C.text1, valign: 'middle' });
        const w = (W - 2 * M - 1.0) / 2, y = 3.75, h = 2.75;
        card(s, M, y, w, h, HEX.softBlue, 'benchmark card');
        txt(s, [{ text: 'WHERE YOU START', options: { fontSize: 20, bold: true, color: C.accent4, charSpacing: 2, breakLine: true } },
                { text: 'You notice that other people see things differently than you do.' }], { x: M + 0.35, y: y + 0.3, w: w - 0.7, h: h - 0.5 });
        s.addImage({ data: await k.icon('LuArrowRight', HEX.gold), x: M + w + 0.2, y: y + h / 2 - 0.3, w: 0.6, h: 0.6, objectName: 'Decorative: arrow' });
        card(s, M + w + 1.0, y, w, h, HEX.softGold, 'milestone card');
        txt(s, [{ text: "WHERE YOU'RE HEADED", options: { fontSize: 20, bold: true, color: '7A5500', charSpacing: 2, breakLine: true } },
                { text: 'You can explain how your own background shapes your relationships, and you engage with other views.' }],
          { x: M + w + 1.35, y: y + 0.3, w: w - 0.7, h: h - 0.5 });
      },
      notes: `
        Every module starts with one of the 10 Essential Skills from the Kentucky Graduate Profile. This week it's Interpersonal Relations.
        It's more than being friendly. It's knowing how your own background and experience shape the way you show up with people, and being able to work with people who see things differently.
        Left side: where most students start. You notice that people are different. Right side: where this course is headed. You can explain how your own story shapes your relationships, and you engage with other views instead of watching them from a distance.
        Ask: Where does this skill show up in this module? (Everywhere: reaching out to your Success Coach, asking for help, emailing an instructor.)
        Point out: this is a common pick for the fourth STAR(T) Story at the end of the semester, so start noticing moments where how you treated someone changed what happened.` },

    { kicker: 'Lesson 2.2', title: "Who's your Success Coach?",
      async draw(s, k) {
        await pair(s, k,
          { icon: 'LuMonitor', label: 'Student Self-Service', body: 'Student Center, then Advising & Classes. Look for Academic Advisor(s).' },
          { icon: 'LuStar', label: 'Starfish', body: 'Open Starfish from MyPath or Blackboard. Select My Success Network.' }, 2.1, 3.0);
        bar(s, k, 'Check in before you\'re lost, not after.');
      },
      notes: `
        Your Success Coach is one person whose job is to help you succeed: academic planning, connecting you to resources, keeping you on track.
        There are two ways to look them up. Either one works.
        Student Self-Service: log in, go to the Student Center, select the Advising & Classes tile, and look for Academic Advisor(s) on the left.
        Starfish: open it from MyPath or the Blackboard course menu and select My Success Network.
        Once you have the name: save it in your phone, and send a short introduction email this week. Lesson 2.4 shows you how.
        In class: if there's time, have students look their coach up right now on a phone or laptop. It takes two minutes and it's Task #2.` },

    { kicker: 'Lesson 2.3', title: 'Help-seeking is a strength',
      async draw(s, k) {
        const { M, W, HEX, txt, card, ico, C } = k, gap = 0.35, w = (W - 2 * M - gap) / 2, h = 1.7;
        txt(s, 'The students who struggle most are the ones who wait too long to ask.',
          { x: M, y: 1.9, w: W - 2 * M, h: 0.6, fontSize: 26, italic: true, color: C.accent1 });
        const tips = [['LuAlarmClock', 'Ask early', 'A question in week 2 is easier than a crisis in week 11.'],
                      ['LuTarget', 'Be specific', '"I\'m stuck on this part" gets better help than "I don\'t get it."'],
                      ['LuMail', 'Be professional', 'Polite, clear, and sign your name.'],
                      ['LuRepeat', 'Follow through', 'Use the advice, and let them know how it went.']];
        for (const [i, [ic, head, body]] of tips.entries()) {
          const x = M + (i % 2) * (w + gap), y = 2.75 + Math.floor(i / 2) * (h + 0.3);
          card(s, x, y, w, h, HEX.softBlue, 'tip card');
          await ico(s, ic, x + 0.3, y + 0.3, 0.75, HEX.white, HEX.blue);
          txt(s, [{ text: head, options: { bold: true, fontSize: 26, color: C.text2, breakLine: true } }, { text: body }],
            { x: x + 1.3, y: y + 0.22, w: w - 1.55, h: h - 0.35 });
        }
      },
      notes: `
        Big idea: asking for help is something successful students do on purpose. It's initiative, not weakness.
        You already know how to do this. When your car makes a weird noise, you ask somebody. This is the same skill, aimed at college.
        Walk the four tips. Ask early. Be specific. Communicate professionally: instructors and advisors are colleagues, not customer service. Follow through: use the advice and close the loop.
        Name the resources out loud: Teaching & Learning Center for tutoring, Counseling Center, the Library, Accessibility Services, TRIO, IT for logins and email. Lesson 2.3 links to every one of them.
        Ask: What usually gets in the way of asking? (Pride, not wanting to bother anyone, not knowing who to ask.) Those are the same barriers the AI Chat will help them think through.` },

    { kicker: 'Lesson 2.4', title: 'Your subject line does a lot of work',
      async draw(s, k) {
        const { M, W, HEX, txt, card, ico, C } = k, gap = 0.4, w = (W - 2 * M - gap) / 2, y = 2.0, h = 2.2;
        const ex = [['LuX', 'C0392B', 'FDECEA', 'Not this', 'hi can u tell me if the reflection is due friday or monday'],
                    ['LuCheck', '1E7B34', 'E6F4EA', 'This', 'FYE 100 Section 201: Question About Reflection Due Date']];
        for (const [i, [ic, fg, bg, lab, subj]] of ex.entries()) {
          const x = M + i * (w + gap);
          card(s, x, y, w, h, bg, 'example card');
          await ico(s, ic, x + 0.3, y + 0.3, 0.65, HEX.white, fg);
          txt(s, lab, { x: x + 1.1, y: y + 0.3, w: w - 1.4, h: 0.65, fontSize: 26, bold: true, color: fg, valign: 'middle' });
          txt(s, [{ text: 'Subject: ', options: { bold: true } }, { text: subj }], { x: x + 0.35, y: y + 1.1, w: w - 0.7, h: 1.0, fontSize: 24 });
        }
        txt(s, 'Every email has four parts', { x: M, y: 4.55, w: 8, h: 0.5, fontSize: 26, bold: true, color: C.text2 });
        const parts = ['Greeting', 'Who you are', 'Your question', 'Closing'], pw = (W - 2 * M - 3 * 0.3) / 4;
        parts.forEach((p, i) => {
          const x = M + i * (pw + 0.3);
          card(s, x, 5.2, pw, 1.0, HEX.softGold, 'email part');
          txt(s, `${i + 1}. ${p}`, { x: x + 0.2, y: 5.2, w: pw - 0.4, h: 1.0, fontSize: 24, bold: true, color: C.text2, align: 'center', valign: 'middle' });
        });
      },
      notes: `
        Your KCTCS email is how OCTC reaches you: instructors, financial aid, deadlines. Check it at least three times a week.
        The most common mistake: putting the whole message in the subject line. The subject is a short title. The message goes in the body.
        A good subject line is short, specific, and names the course and section. Your instructor knows what you need before opening it, and can find it again later.
        Then the four parts of any professional email: a greeting with the right title (Professor works for anyone), who you are and which section, a clear question, and a polite closing with your full name.
        Ask: Before you email, what should you check first? (The syllabus and announcements. Showing you looked goes a long way.)
        Optional activity: give pairs a bad email and two minutes to rewrite it.` },

    { kicker: 'Trail Tips', title: 'Show up as a real person',
      async draw(s, k) {
        const { M, W, HEX, txt, card, ico, C } = k, gap = 0.35, w = (W - 2 * M - 2 * gap) / 3, y = 2.0, h = 4.5;
        const c = [['LuSmartphone', 'Email on your phone', 'Install Outlook and Microsoft Authenticator. Turn on notifications.'],
                   ['LuCircleUser', 'Add a profile photo', 'In Blackboard and your Microsoft account. A clear, recent photo is plenty.'],
                   ['LuAward', 'Claim your Merit page', 'Look for the invitation email in your KCTCS inbox. That\'s Task #1.']];
        for (const [i, [ic, head, body]] of c.entries()) {
          const x = M + i * (w + gap);
          card(s, x, y, w, h, i === 2 ? HEX.softGold : HEX.softBlue, 'tip card');
          await ico(s, ic, x + 0.35, y + 0.35, 0.9, i === 2 ? HEX.navy : HEX.white, i === 2 ? HEX.gold : HEX.blue);
          txt(s, [{ text: head, options: { bold: true, fontSize: 26, color: C.text2, breakLine: true } }, { text: body, options: { paraSpaceBefore: 8 } }],
            { x: x + 0.35, y: y + 1.5, w: w - 0.7, h: h - 1.8 });
        }
      },
      notes: `
        Two quick Trail Tips this week, both about making a digital course feel less anonymous.
        First, get your KCTCS email on your phone. Set up Microsoft Authenticator first, then the Outlook app, and turn notifications on.
        Second, add a profile photo in Blackboard and in your Microsoft account. It doesn't need to be professional. Instructors really do notice faces.
        Third card is Task #1: claim your Merit page. Look for an email titled "Claim Your Merit Page at Owensboro Community & Technical College." Merit is where your three Merit activities for this course get recorded.
        Heads up: Student Affairs adds students to Merit after add/drop. If the invitation hasn't arrived, wait a day or two, then let me know.` },

    { kicker: 'Trail Tip', title: "What's happening in that AI Chat?",
      async draw(s, k) {
        const { M, W, HEX, txt, card, ico, C } = k;
        txt(s, [{ text: 'Every AI Chat starts with hidden instructions: ', options: {} }, { text: 'a system prompt.', options: { bold: true, color: C.accent1 } }],
          { x: M, y: 1.95, w: W - 2 * M, h: 0.6, fontSize: 26 });
        card(s, M, 2.8, W - 2 * M, 0.85, HEX.navy, 'student message');
        txt(s, 'Same message: "I\'m struggling to ask for help."', { x: M + 0.35, y: 2.8, w: W - 2 * M - 0.7, h: 0.85, fontSize: 24, bold: true, color: C.background1, valign: 'middle' });
        const gap = 0.4, w = (W - 2 * M - gap) / 2, y = 3.95, h = 2.55;
        card(s, M, y, w, h, HEX.softBlue, 'generic answer');
        txt(s, [{ text: 'A generic chatbot', options: { bold: true, fontSize: 26, color: C.text2, breakLine: true } }, { text: 'Five tips, an app, and an emoji.', options: { paraSpaceBefore: 8 } }],
          { x: M + 0.35, y: y + 0.3, w: w - 0.7, h: h - 0.5 });
        card(s, M + w + gap, y, w, h, HEX.softGold, 'course answer');
        txt(s, [{ text: 'Coach Pathfinder', options: { bold: true, fontSize: 26, color: C.text2, breakLine: true } }, { text: '"Tell me more. Is it not knowing who to ask, or that asking feels uncomfortable?"', options: { paraSpaceBefore: 8 } }],
          { x: M + w + gap + 0.35, y: y + 0.3, w: w - 0.7, h: h - 0.5 });
      },
      notes: `
        This sets up this week's AI Chat, and it's one of the most useful AI literacy ideas in the course.
        Before you type anything, the AI has already read instructions you can't see. That's called a system prompt. In our AI Chats, those instructions come from how the chat was set up in Blackboard: the topic, the coach's personality, and rules like "don't write the student's answers for them."
        Same message, two setups. A generic chatbot gives you a list of tips. Coach Pathfinder asks you a question back. It's not broken when it keeps asking questions. That's its job.
        Three things to know: your instructor can see the whole conversation after you submit; it can still be wrong, and the closing reflection is where you say so; and if you have a concern about using AI, talk to me before it's due and we'll find another way.
        Ask: Next time you use any AI tool, what's the question to ask? (What was this told to do before I showed up?)` },
  ],

  work: { title: 'Due Monday by 11:59 PM Central',
    items: [['LuAward', 'Task #1: Set Up Your Merit Page', 'Claim your page and share the link'],
            ['LuCompass', 'Task #2: Identify Your Success Coach', 'Name and contact information'],
            ['LuBot', 'AI Chat: Who Has Your Back?', 'A conversation with Coach Pathfinder'],
            ['LuFlag', 'Mile Marker #2: My Support Team', 'Three questions about your support network']] },

  mm: { title: 'My Support Team',
    qs: [['Who are three people at OCTC who can help you?', 'Start with your Success Coach, by name.'],
         ['How will you use your network on purpose?', 'Two ways: when, how, and for what.'],
         ['What new campus resource will you explore?', 'Name it, say why, and name a next step.']],
    side: [{ text: 'AI use: AI-supported', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'Use AI to think it through. Write it in your own words.', options: { breakLine: true } },
           { text: ' ', options: { breakLine: true, fontSize: 10 } },
           { text: 'Prefer paper?', options: { bold: true, color: '7A5500', breakLine: true } },
           { text: 'A printable handout is with the assignment in Blackboard.' }] },


  notes: {
    title: `
      Welcome to Module 2: Building Your Support System.
      Last week was about getting oriented. This week is about people: who's in your corner at OCTC, how to reach them, and how to ask for help in a way that actually gets you help.
      The two owls on the branch are the idea for the week. Nobody does the trail alone.`,
    house: `
      INSTRUCTOR SLIDE. Edit the announcements box before class. Skip or hide this slide when recording for online sections (right-click the slide, Hide Slide).
      Ideas: Mile Marker #1 feedback is posted, office hours this week, a campus date coming up.
      Quick look back at Module 1: anything students were confused about, and a reminder that the Trailhead in Blackboard is the place to start every week.`,
    week: `
      Here's the trail this week. Four things you'll do: find your Success Coach, practice asking for help, write emails that get answers, and get your Merit page and profiles set up.
      The three skills on the right are the 10 Essential Skills this module builds. The Skill Spotlight is #4, Interpersonal Relations. That's next.`,
    work: `
      Everything is due Monday by 11:59 PM Central.
      Tasks #1 and #2 are quick: claim your Merit page and share the link, and find your Success Coach's name and contact information.
      The AI Chat, Who Has Your Back?, is a conversation with Coach Pathfinder about your support network. Plan for 10 to 15 minutes. It's in the ENGAGE area.
      The Mile Marker is the big one, and it's next.
      In-person sections: today's attendance point counts too.`,
    mm: `
      Mile Marker #2 is three questions.
      One: three people at OCTC who can help you. Start with your Success Coach, by name. At least two should be people who work here. Naming a person, not just an office, is what makes it real.
      Two: two specific ways you'll use that network. Not "I'll reach out when I need help." When, how, and for what.
      Three: one campus resource you haven't used yet, why it matters for you, and one next step.
      AI use is AI-supported: you can use AI to think it through, but the writing is yours. There's an optional AI thinking partner prompt on the Mile Marker page in the guidebook.
      The guidebook has a fill-in form that saves a PDF, and there's a printable handout in Blackboard if you'd rather write by hand.`,
    disc: `
      In-person discussion. This mirrors the AI Chat question, so it's a good warm-up for it.
      Pairs for about three minutes, then ask two or three people to share one idea with the room.
      Listen for: pride, not wanting to be a bother, not knowing who to ask. Name those as normal, then connect them back to Lesson 2.3: ask early, be specific.
      For online recordings: pose the question and ask students to think about it before they open the AI Chat.`,
  },
}).catch(e => { console.error(e); process.exit(1); });

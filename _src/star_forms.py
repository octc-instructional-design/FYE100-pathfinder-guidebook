"""STAR(T) Stories fillable forms: one PDF per story, used for final submissions.

usage: python3 _src/star_forms.py            (writes downloads/printables/STAR-Fillable-Form-*.pdf)
Needs playwright (Chromium), pdfplumber, and pymupdf. Same method as the Mile Marker handouts: every answer
zone is printed with background #fefefe (#fcfcfc for checkboxes), and after printing, a form field is laid
over each zone in reading order. The guidebook's STAR(T) practice pages keep their own wording; these forms
are the submission copies.
"""
import json, os, pathlib, subprocess, html as H

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'downloads' / 'printables'

COMMON = dict(
    S=('Set the scene. What was going on?', "Give just enough context for someone who wasn't there. Two or three sentences is usually plenty.",
       'The Situation is the setup, not the story. Get to the Task quickly.', 3),
    T=('Define your role. What was yours to do?', None, "Your Task is what you were responsible for, not the group's general goal.", 3),
    A=('Show what you did, step by step.', None, '"We figured it out" hides your part. Describe what you did, even inside a group effort.', 5),
    R=('Name the outcome. What happened because of what you did?', None, '"It went well" isn\'t a result. Name what specifically happened.', 3),
    Tr=('Connect it forward. What does this mean for what comes next?', None,
        '"This will help me in the future" isn\'t a Transfer. Name a specific place, role, or situation.', 4),
)
A_LEAD = 'This is the most important step. Use "I": I decided, I reached out, I chose. '

FORMS = [
 dict(file='STAR-Fillable-Form-Adaptability-and-Leadership', skill='Adaptability & Leadership',
      subtitle='A story about adjusting when things changed, or stepping up when it mattered.',
      about="Adaptability & Leadership is about adjusting when things change and stepping up to help others toward a goal. Leadership here doesn't need a title. It shows up when you take initiative, keep someone else going, or keep moving when circumstances shift.",
      find=['Was there a time your plan fell apart and you had to change course, without falling apart yourself?',
            'Have you ever stepped up to lead, in a group, at work, or in your family, even though nobody officially asked you to?',
            'Is there a moment when you helped someone else stay motivated or on track when things got hard?',
            'Did you have to adjust to a new place, a new system, or new expectations, and figure it out?'],
      T='For this skill, the Task is often something unexpected landing in your lap, or noticing that someone needed to step up and deciding that someone was you.',
      A='Show how you responded when things changed: the decisions you made, the steps you took, and how you supported others.',
      R='Results for this skill often show up in how the group did, in relationships, or in your own growth, not just in getting the task done.',
      Tr='College, work, and life will keep asking you to adapt and step up. Where specifically do you expect to need this skill next, and what does this story tell you about how you\'ll handle it?'),
 dict(file='STAR-Fillable-Form-Professionalism', skill='Professionalism',
      subtitle='A story about following through, owning a mistake, or being someone others could count on.',
      about='Professionalism is about how you show up: following through, taking responsibility, managing your time and commitments, acting ethically, and communicating with care. Think of a moment when you showed reliability, integrity, or accountability in a real situation.',
      find=['Was there a time you met a deadline or commitment even when it was hard?',
            'Have you ever owned a mistake, taken responsibility for something that went wrong, and handled it well?',
            'Is there a moment when you juggled competing responsibilities and made deliberate choices about priorities?',
            'Was there a time when doing the right thing was harder than taking the easy way out?'],
      T='What were you accountable for? What was expected of you, and what made it hard to meet?',
      A='Show the specific choices you made, especially when the easier choice would have been to do less, avoid the conversation, or let it slide. Describe what you actually did, not what you were supposed to do.',
      R="Results for this skill often show up in relationships: trust built, a problem solved, a standard kept. They don't have to be dramatic to matter.",
      Tr='How will this shape the way you show up at work or in your program? Name a field, a role, or a situation where this skill will be tested.'),
 dict(file='STAR-Fillable-Form-Knowledge-Application', skill='Knowledge Application',
      subtitle='A story about a time something you learned met a moment you needed it.',
      about='Knowledge Application is about using something you learned, in a class, at work, or through experience, in a real situation. Think of a moment when "I learned this" met "I need it right now."',
      find=['Was there a moment in this course, or another class, when something you learned helped you handle a real situation?',
            "At work or in your community, have you used what you knew to solve a problem others couldn't?",
            'Is there something you know how to do that you had to actually use when it mattered?'],
      T='What were you trying to solve, and what part of it was yours to handle?',
      A='Name the specific knowledge or skill you brought to the situation, and exactly how you used it.',
      R='What changed or got resolved? An honest, imperfect result is more believable than a vague "it went well."',
      Tr='Try this shape: "This showed me that [something specific], and I expect to use this skill when [a specific situation]."'),
 dict(file='STAR-Fillable-Form-Your-Choice', skill='Your Choice',
      subtitle='The fourth story is yours. Pick the skill you can tell the most honest story about.',
      about='Three of your four stories are assigned. This one is yours to choose. Pick the skill that connects most honestly to a real experience, from this course or from your life before college. The best choice is the one where you have the most specific, honest thing to say, not the one that sounds most impressive.',
      choice=[(1, 'Communication', 'Listening carefully, responding clearly, and writing or speaking in ways that actually land.'),
              (2, 'Critical & Creative Thinking', 'Evaluating information carefully, questioning assumptions, or finding a new approach to a real problem.'),
              (3, 'Quantitative Reasoning', 'Using numbers, data, or calculations to understand a situation and make a better decision.'),
              (4, 'Interpersonal Relations', 'Handling relationships thoughtfully: understanding other perspectives, building trust, or working through conflict respectfully.'),
              (7, 'Civic Engagement', 'Taking action in your community and contributing to something beyond yourself.'),
              (8, 'Collaboration & Teamwork', 'Working well with others: contributing to a team, sharing the work, and building toward a shared goal.'),
              (10, 'Information Literacy', 'Finding, evaluating, and using information responsibly, and knowing what to trust before you act on it.')],
      T='What were you trying to do or solve, and what part of it was yours?',
      A='Describe the specific things you did and the choices you made. This is where your skill lives. Show it, don\'t just claim it.',
      R='What changed or got resolved because of what you did? Be specific.',
      Tr='Where will this skill show up next? Name a program, a kind of work, a relationship, or a responsibility where it will matter.'),
]

CSS = """
@page { size: Letter; margin: 0.5in; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: "Liberation Sans", Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #000; padding: 12pt 12pt 0; }
.kicker { font-size: 9.4pt; font-weight: 700; color: #7a5500; letter-spacing: .12em; text-transform: uppercase; margin-bottom: 4pt; }
h1 { font-size: 24pt; font-weight: 700; color: #00467f; line-height: 1.2; margin-bottom: 4pt; }
.sub-title { font-style: italic; color: #00467f; font-size: 12.6pt; }
.gold-rule { border: 0; border-top: 2pt solid #e7a614; margin: 10pt 0 14pt; }
.intro { border-left: 3pt solid #00467f; background: #f4f8fb; padding: 9pt 12pt; font-size: 10.5pt; margin-bottom: 12pt; }
.intro p + p { margin-top: 7pt; }
.note { border-left: 3pt solid #e7a614; background: #fffaef; padding: 8pt 12pt; margin-bottom: 14pt; }
.names { display: flex; gap: 24pt; margin-bottom: 18pt; }
.names > div { flex: 1; }
.lab { display: block; font-size: 9.8pt; font-weight: 700; color: #00467f; text-transform: uppercase; letter-spacing: .04em; margin-bottom: 2pt; }
.eyebrow { font-size: 9.4pt; font-weight: 700; color: #00467f; text-transform: uppercase; letter-spacing: .06em; }
.h2 { font-size: 12pt; font-weight: 700; margin-bottom: 3pt; }
.help { font-style: italic; margin-bottom: 8pt; }
.q { font-weight: 700; margin: 10pt 0 4pt; }
ul.b { list-style: none; margin: 0 0 8pt; }
ul.b li { position: relative; padding-left: 16pt; margin-bottom: 3pt; }
ul.b li::before { content: "\\25CF"; position: absolute; left: 1pt; top: 2pt; font-size: 6.6pt; color: #00467f; }
.choose-lab { font-size: 10.2pt; font-weight: 700; color: #00467f; margin-bottom: 6pt; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10pt 24pt; margin-bottom: 6pt; }
.opt { display: grid; grid-template-columns: 14pt 1fr; gap: 3pt; break-inside: avoid; }
.opt b { font-size: 10.6pt; display: block; }
.opt span.d { font-size: 9.8pt; color: #333; display: block; }
.ck { display: inline-block; width: 10pt; height: 10pt; margin-top: 2pt; background: #fcfcfc; outline: 1pt solid #4a4a4a; outline-offset: -1pt; }
.fz { background: #fefefe; break-inside: avoid; }
.fz .ln { height: 24pt; border-bottom: 1pt solid #aaaaaa; }
.card { border: .75pt solid #ccd8e3; border-radius: 4pt; margin: 14pt 0 0; break-inside: avoid; overflow: hidden; }
.card-h { display: grid; grid-template-columns: 26pt 1fr; gap: 9pt; align-items: center; background: #00467f; color: #fff; padding: 9pt 10pt; }
.card-h .ltr { width: 26pt; height: 26pt; border-radius: 50%; background: #e7a614; color: #011d41; display: grid; place-items: center; font-weight: 700; font-size: 13.8pt; }
.card-h b { display: block; font-size: 11.8pt; }
.card-h i { display: block; font-size: 10.2pt; }
.card.tr .card-h { background: #9a3412; }
.card.tr .card-h .ltr { background: #fff; color: #9a3412; }
.card-b { padding: 9pt 10pt 10pt; }
.prompt { border-left: 2pt solid #00467f; background: #f4f8fb; padding: 6pt 9pt; font-size: 10.8pt; margin-bottom: 8pt; }
.watch { border-left: 2pt solid #9a3412; padding-left: 8pt; margin-top: 7pt; font-style: italic; font-size: 10.3pt; color: #9a3412; }
.after { margin-top: 20pt; break-inside: avoid; }
.keep { break-inside: avoid; }
"""


def zone(lines):
    return '<div class="fz">' + '<div class="ln"></div>' * lines + '</div>'


def build(f):
    e = lambda s: H.escape(s, quote=False)
    fields = [('Name', 'Name', 'text'), ('Date', 'Date', 'text')]
    title = f"STAR(T) Story: {f['skill']}"
    o = [f'<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>{e(title)}</title><style>{CSS}</style></head><body>',
         '<p class="kicker">Fillable Form</p>', f'<h1>{e(title)}</h1>', f'<p class="sub-title">{e(f["subtitle"])}</p><hr class="gold-rule">',
         f'<div class="intro"><p>{e(f["about"])}</p><p>Use this form for your final story. Fill it in, save it as a PDF, and upload it to the matching '
         'STAR(T) Stories submission portal in Blackboard. Recording your story instead? Use this form to plan what you\'ll say.</p></div>',
         f'<div class="note"><p><b>Two ways to use this form.</b> It matches the {e(f["skill"])} Practice Guide in the STAR(T) Stories Guide. '
         'Type in the boxes and save a PDF, or print it, fill it in by hand, and upload a photo or scan. Aim for a story that runs 2 to 4 minutes out loud.</p></div>',
         f'<div class="names"><div><span class="lab">Name</span>{zone(1)}</div><div><span class="lab">Date</span>{zone(1)}</div></div>']
    if 'choice' in f:
        o.append('<p class="eyebrow">Step 0</p><p class="h2">Choose your skill</p>'
                 '<p class="help">Read through the options and pick the one you can tell the most specific, honest story about.</p>'
                 '<p class="choose-lab">My chosen skill</p><div class="grid">')
        for n, name, d in f['choice']:
            o.append(f'<div class="opt"><span class="ck"></span><span><b>#{n} {e(name)}</b><span class="d">{e(d)}</span></span></div>')
            fields.append((f'Skill_{n}', f'My chosen skill: #{n} {name}', 'check'))
        o.append('</div>')
        o.append(f'<div class="keep"><p class="q">Why I chose it, in one or two sentences. Your submission starts with this.</p>{zone(2)}</div>')
        fields.append(('Why', 'Why I chose it, in one or two sentences. Your submission starts with this.', 'multi'))
    else:
        o.append('<p class="eyebrow">Step 0</p><p class="h2">Find your story first</p>'
                 "<p class=\"help\">Your story can come from school, work, family, or your community. It doesn't have to be dramatic. It has to be real, and yours.</p>"
                 '<ul class="b">' + ''.join(f'<li>{e(x)}</li>' for x in f['find']) + '</ul>')
    o.append(f'<div class="keep"><p class="q">The experience I\'m going to use</p>{zone(2)}</div>')
    fields.append(('Story', "The experience I'm going to use", 'multi'))
    names = dict(S='Situation', T='Task', A='Action', R='Result', Tr='Transfer')
    for k in ('S', 'T', 'A', 'R', 'Tr'):
        sub, prompt, watch, lines = COMMON[k]
        prompt = f.get(k) or prompt
        if k == 'A': prompt = A_LEAD + prompt
        o.append(f'<div class="card{" tr" if k == "Tr" else ""}"><div class="card-h"><span class="ltr" aria-hidden="true">{"T" if k == "Tr" else k}</span>'
                 f'<span><b>{names[k]}</b><i>{e(sub)}</i></span></div><div class="card-b"><p class="prompt">{e(prompt)}</p>{zone(lines)}'
                 f'<p class="watch">Watch out: {e(watch)}</p></div></div>')
        fields.append((k, names[k], 'multi'))
    o.append('<div class="after"><p class="eyebrow">After you draft it</p><p class="h2">Quick reflection</p>'
             f'<p class="q">Which step was hardest to write, and why do you think that is?</p>{zone(2)}</div>'
             f'<div class="keep"><p class="q">Does anything sound generic, like anyone could have written it? Where could you be more specific?</p>{zone(2)}</div>')
    fields += [('Hard', 'Which step was hardest to write, and why do you think that is?', 'multi'),
               ('Generic', 'Does anything sound generic, like anyone could have written it? Where could you be more specific?', 'multi')]
    o.append('</body></html>')
    base = OUT / f['file']
    base.with_suffix('.html').write_text(''.join(o), encoding='utf-8')
    return base, title, fields


def print_pdf(base):
    js = (f"const {{chromium}}=require('playwright');(async()=>{{const b=await chromium.launch();const p=await b.newPage();"
          f"await p.goto('file://'+{json.dumps(str(base.with_suffix('.html')))});"
          f"await p.pdf({{path:{json.dumps(str(base) + '.print.pdf')},format:'Letter',printBackground:true,tagged:true,preferCSSPageSize:true}});await b.close()}})()")
    env = dict(os.environ, NODE_PATH=subprocess.check_output(['npm', 'root', '-g'], text=True).strip())
    subprocess.run(['node', '-e', js], check=True, env=env)


def add_fields(base, title, fields):
    import pdfplumber, pymupdf as fitz
    zones = []
    with pdfplumber.open(str(base) + '.print.pdf') as pdf:
        for i, pg in enumerate(pdf.pages):
            for r in pg.rects:
                c = r.get('non_stroking_color')
                if c and len(c) == 3 and all(abs(v - 0.9961) < 0.002 for v in c) and r['height'] > 10:
                    zones.append((i, round(r['top']), r['x0'], r['top'], r['x1'], r['bottom']))
                elif c and len(c) == 3 and all(abs(v - 0.9882) < 0.002 for v in c) and 6 < r['height'] < 16:
                    zones.append((i, round(r['top']), r['x0'], r['top'], r['x1'], r['bottom']))
    # checkboxes sit in a two-column grid: read them row by row, left then right (matches the field list)
    zones.sort(key=lambda z: (z[0], z[1] // 4, z[2]))
    assert len(zones) == len(fields), (base.name, len(zones), len(fields))
    doc = fitz.open(str(base) + '.print.pdf')
    for (pg, _, x0, t, x1, b), (name, tip, kind) in zip(zones, fields):
        w = fitz.Widget(); w.field_name = name; w.field_label = tip
        if kind == 'check':
            w.field_type = fitz.PDF_WIDGET_TYPE_CHECKBOX; w.field_value = False; w.border_width = 0
            w.rect = fitz.Rect(x0, t, x1, b); doc[pg].add_widget(w); continue
        w.field_type = fitz.PDF_WIDGET_TYPE_TEXT; w.text_fontsize = 11; w.border_width = 0
        if kind == 'multi':
            box = fitz.Rect(x0, t - 2, x1, b + 2)
            doc[pg].draw_rect(box, color=(0.75, 0.78, 0.82), fill=(1, 1, 1), width=0.8, radius=4 / min(box.width, box.height))
            w.field_flags = fitz.PDF_TX_FIELD_IS_MULTILINE; w.rect = fitz.Rect(x0 + 6, t + 2, x1 - 6, b - 2)
        else:
            w.rect = fitz.Rect(x0 + 2, t + 3, x1 - 2, b - 1)
        doc[pg].add_widget(w)
    doc.set_metadata({'title': title, 'author': 'Owensboro Community & Technical College', 'subject': 'FYE 100 STAR(T) Stories fillable form'})
    doc.save(str(base) + '.pdf', garbage=3, deflate=True)
    os.remove(str(base) + '.print.pdf'); base.with_suffix('.html').unlink()
    d = fitz.open(str(base) + '.pdf')
    print(base.name + '.pdf', d.page_count, 'pages,', sum(len(list(p.widgets())) for p in d), 'fields')


if __name__ == '__main__':
    for f in FORMS:
        base, title, fields = build(f)
        print_pdf(base)
        add_fields(base, title, fields)

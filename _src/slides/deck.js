// FYE 100 instructor slide builder. One spec per module (m02.js, ...); this file holds the
// theme, layouts, and slide types so every deck looks the same.
// usage: node m02.js
const pptxgen = require('pptxgenjs');
const React = require('react');
const RDS = require('react-dom/server');
const sharp = require('sharp');
const lu = require('react-icons/lu');
const fs = require('fs');
const { execFileSync } = require('child_process');
const { applyTheme } = require('/mnt/skills/public/pptx/scripts/apply_theme.js');

const path = require('path');
const BOOK = path.resolve(__dirname, '../..') + '/';
const TEACH = (n) => JSON.parse(fs.readFileSync(`${BOOK}_src/teach/m${String(n).padStart(2, '0')}.json`, 'utf8'));
const HEX = { navy: '011D41', blue: '00467F', sky: '3BB3E5', gold: 'E7A614', ink: '17212B', muted: '52606D',
  softBlue: 'EAF4FB', softGold: 'FFF5DC', accentInk: '0B5F86', line: 'D9E2EA', white: 'FFFFFF' };
const THEME = { name: 'FYE 100 Pathfinder', headFontFace: 'Calibri', bodyFontFace: 'Calibri',
  colors: { dk1: HEX.ink, lt1: HEX.white, dk2: HEX.navy, lt2: HEX.softBlue, accent1: HEX.blue, accent2: HEX.gold,
    accent3: HEX.sky, accent4: HEX.accentInk, accent5: HEX.softGold, accent6: HEX.muted, hlink: HEX.blue, folHlink: HEX.accentInk } };

const W = 13.333, H = 7.5, M = 0.6;
// type scale for a projector: nothing on a slide below 20 pt; body copy 24 pt and up
const T = { title: 40, hero: 54, kicker: 20, h: 28, body: 24, big: 32 };

async function icon(name, color, px = 256) {
  const svg = RDS.renderToStaticMarkup(React.createElement(lu[name], { color: '#' + color, size: px, strokeWidth: 2 }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return 'image/png;base64,' + buf.toString('base64');
}
const b64 = (p) => 'image/png;base64,' + fs.readFileSync(p).toString('base64');
// QR code PNG (navy on white) for an outside link, so students can scan it from the projector
function qrData(url) {
  const py = "import qrcode,sys,io,base64;q=qrcode.QRCode(border=2,box_size=12,error_correction=qrcode.constants.ERROR_CORRECT_M);q.add_data(sys.argv[1]);q.make(fit=True);im=q.make_image(fill_color='#011d41',back_color='white');b=io.BytesIO();im.save(b,format='PNG');print(base64.b64encode(b.getvalue()).decode())";
  return 'image/png;base64,' + execFileSync('python3', ['-c', py, url]).toString().trim();
}

async function build(S) {
  if (!S.disc) S.disc = TEACH(S.n).discussion;  // a spec can bring its own discussion (e.g., the capstone deck)
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.title = `FYE 100 Module ${S.n}: ${S.title}`;
  pres.subject = 'FYE 100 instructor slides';
  pres.author = 'OCTC FYE 100';
  pres.company = 'Owensboro Community &amp; Technical College';
  const C = pres.SchemeColor;
  const shadow = () => ({ type: 'outer', color: '000000', opacity: 0.12, blur: 8, offset: 2, angle: 90 });

  // ---- layouts (frames); every slide's visible title is a real title placeholder
  pres.defineSlideMaster({ title: 'FYE Title', background: { color: HEX.navy },
    objects: [
      { placeholder: { options: { name: 'kicker', type: 'body', align: 'left', x: 4.3, y: 1.15, w: 8.4, h: 0.5, fontSize: T.kicker, bold: true, color: C.accent2, charSpacing: 3, margin: 0 }, text: '' } },
      { placeholder: { options: { name: 'title', type: 'title', align: 'left', x: 4.3, y: 1.7, w: 8.4, h: 2.2, fontSize: T.hero, bold: true, color: C.background1, valign: 'top', margin: 0 }, text: '' } },
      { placeholder: { options: { name: 'body', type: 'body', align: 'left', x: 4.3, y: 3.95, w: 7.6, h: 1.1, fontSize: T.big, color: 'D6EEFA', valign: 'top', margin: 0 }, text: '' } },
    ] });
  pres.defineSlideMaster({ title: 'FYE Content', background: { color: HEX.white },
    objects: [
      { placeholder: { options: { name: 'kicker', type: 'body', align: 'left', x: M, y: 0.45, w: 10, h: 0.42, fontSize: T.kicker, bold: true, color: C.accent4, charSpacing: 3, margin: 0 }, text: '' } },
      { placeholder: { options: { name: 'title', type: 'title', align: 'left', x: M, y: 0.88, w: W - 2 * M, h: 0.95, fontSize: T.title, bold: true, color: C.text2, valign: 'top', margin: 0, fit: 'shrink' }, text: '' } },
    ],
    slideNumber: { x: W - 1.1, y: H - 0.55, w: 0.6, h: 0.35, fontSize: 14, color: HEX.muted, align: 'right' } });
  pres.defineSlideMaster({ title: 'FYE Discussion', background: { color: HEX.navy },
    objects: [
      { placeholder: { options: { name: 'kicker', type: 'body', align: 'left', x: 4.3, y: 0.7, w: 8.4, h: 0.45, fontSize: T.kicker, bold: true, color: C.accent2, charSpacing: 3, margin: 0 }, text: '' } },
      { placeholder: { options: { name: 'title', type: 'title', align: 'left', x: 4.3, y: 1.2, w: 8.4, h: 1.5, fontSize: 40, bold: true, color: C.background1, valign: 'top', margin: 0 }, text: '' } },
    ] });

  const sec = (t) => pres.addSection({ title: t });
  const notes = (s, txt) => s.addNotes(txt.trim().replace(/\n {2,}/g, '\n'));
  const content = (section, kicker, title) => {
    const s = pres.addSlide({ masterName: 'FYE Content', sectionTitle: section });
    s.addText(kicker.toUpperCase(), { placeholder: 'kicker' });
    s.addText(title, { placeholder: 'title' });
    return s;
  };
  const card = (s, x, y, w, h, fill, name) => s.addShape(pres.shapes.ROUNDED_RECTANGLE,
    { x, y, w, h, rectRadius: 0.12, fill: { color: fill }, line: { color: fill }, shadow: shadow(), objectName: 'Decorative: ' + name });
  const txt = (s, t, o) => s.addText(t, Object.assign({ isTextBox: true, margin: 0, fontSize: T.body, color: C.text1, valign: 'top' }, o));
  // scannable code plus the short address under it; the image carries alt text, so it is not decorative
  const qr = (s, url, label, x, y, d = 1.6, display) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x - 0.12, y: y - 0.12, w: d + 0.24, h: d + 0.24, rectRadius: 0.1, fill: { color: HEX.white }, line: { color: HEX.line, width: 1 }, objectName: 'Decorative: QR frame' });
    s.addImage({ data: qrData(url), x, y, w: d, h: d, altText: `QR code for ${label}: ${url}`, objectName: `QR code: ${label}` });
    txt(s, display || url.replace(/^https?:\/\//, '').replace(/\/$/, ''), { x: x - 0.6, y: y + d + 0.15, w: d + 1.2, h: 0.8, fontSize: 20, valign: 'top', align: 'center', color: C.accent6, objectName: `Address: ${label}` });
  };
  const ico = async (s, name, x, y, d, fg, bg) => {
    s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: bg }, line: { color: bg }, objectName: 'Decorative: icon circle' });
    s.addImage({ data: await icon(name, fg), x: x + d * 0.22, y: y + d * 0.22, w: d * 0.56, h: d * 0.56, objectName: 'Decorative: ' + name });
  };

  // ---- 1. Title
  sec('Opening');
  {
    const s = pres.addSlide({ masterName: 'FYE Title', sectionTitle: 'Opening' });
    s.addImage({ path: S.art, x: 0, y: 0, w: W, h: H, objectName: 'Decorative: module cover art' });
    s.addText(S.kicker || `MODULE ${S.n}`, { placeholder: 'kicker' });
    s.addText(S.title, { placeholder: 'title' });
    s.addText(S.tagline, { placeholder: 'body' });
    txt(s, 'Instructor name  ·  Section', { x: 4.3, y: 5.15, w: 6, h: 0.45, fontSize: 20, color: 'D6EEFA', objectName: 'Instructor and section (edit me)' });
    notes(s, S.notes.title);
  }

  // ---- 2. Housekeeping (instructor)
  if (S.house) {
    const s = content('Opening', `Instructor slide · Housekeeping`, S.house.title);
    txt(s, S.house.sub, { x: M, y: 1.8, w: 11.5, h: 0.5, fontSize: T.body, color: C.accent6, italic: true });
    card(s, M, 2.55, 7.6, 4.1, HEX.softBlue, 'announcements panel');
    txt(s, 'Announcements', { x: M + 0.35, y: 2.8, w: 7, h: 0.45, fontSize: T.h, bold: true, color: C.text2 });
    txt(s, [{ text: 'Add this week\'s announcements here.', options: { breakLine: true } },
            { text: 'Grades posted, office hours, campus dates.', options: {} }],
      { x: M + 0.35, y: 3.35, w: 7, h: 3, fontSize: T.body, color: C.accent6, objectName: 'Announcements (edit me)' });
    card(s, 8.55, 2.55, W - 8.55 - M, 4.1, HEX.softGold, 'looking ahead panel');
    await ico(s, 'LuCalendarCheck', 8.9, 2.85, 0.8, HEX.navy, HEX.gold);
    txt(s, 'Looking ahead', { x: 8.9, y: 3.8, w: 3.6, h: 0.45, fontSize: T.h, bold: true, color: C.text2 });
    txt(s, S.house.ahead, { x: 8.9, y: 4.35, w: 3.6, h: 2.2, fontSize: T.body });
    notes(s, S.notes.house);
  }

  // ---- 3. This week
  sec('This week');
  {
    const s = content('This week', S.week.kicker || `Module ${S.n} · This week`, S.week.title);
    let y = 2.15;
    for (const [ic, line] of S.week.items) {
      await ico(s, ic, M, y, 0.75, HEX.white, HEX.blue);
      txt(s, line, { x: M + 1.0, y: y + 0.12, w: 6.6, h: 0.6, fontSize: T.body, valign: 'middle' });
      y += 1.05;
    }
    card(s, 8.6, 2.15, W - 8.6 - M, 4.2, HEX.softBlue, 'skills panel');
    txt(s, S.week.skillsLabel || 'Skills you\'ll build', { x: 8.95, y: 2.4, w: 3.6, h: 0.45, fontSize: T.h, bold: true, color: C.text2 });
    const many = S.week.skills.length > 3, cs = many ? 0.68 : 0.8, st = many ? 0.8 : 1.0;
    let yy = many ? 2.95 : 3.05;
    for (const [k, name] of S.week.skills) {
      if (k) s.addImage({ data: b64(`${BOOK}images/shared/10es/10es-${String(k).padStart(2, '0')}.png`), x: 8.95, y: yy, w: cs, h: cs, objectName: 'Decorative: skill coin' });
      else { s.addShape(pres.shapes.OVAL, { x: 8.95, y: yy, w: cs, h: cs, fill: { color: HEX.white }, line: { color: HEX.blue, width: 2, dashType: 'dash' }, objectName: 'Decorative: choice coin' });
             txt(s, '?', { x: 8.95, y: yy, w: cs, h: cs, fontSize: 26, bold: true, color: C.accent1, align: 'center', valign: 'middle', objectName: 'Decorative: choice mark' }); }
      txt(s, k ? [{ text: `#${k} `, options: { bold: true, color: C.accent4 } }, { text: name }] : [{ text: name, options: { bold: true, color: C.accent4 } }], { x: 8.95 + cs + 0.2, y: yy - 0.05, w: 3.75 - cs - 0.2, h: cs + 0.1, fontSize: 20, valign: 'middle' });
      yy += st;
    }
    notes(s, S.notes.week);
  }

  // ---- lesson slides
  sec('Lessons');
  for (const L of S.lessons) {
    const s = content('Lessons', L.kicker, L.title);
    await L.draw(s, { pres, C, HEX, T, W, H, M, txt, card, ico, b64, BOOK, icon, qr });
    notes(s, L.notes);
  }

  // ---- assignments
  if (S.work) sec('This week\'s work');
  if (S.work) {
    const s = content('This week\'s work', 'Assignments', S.work.title);
    const rows = S.work.items, rh = rows.length > 4 ? 0.88 : 1.1, wq = S.work.qr ? 3.4 : 0, rw = W - 2 * M - (wq ? wq + 0.35 : 0); let y = 2.05;
    if (wq) {
      const q = S.work.qr, qx = W - M - wq;
      card(s, qx, 2.05, wq, 4.35, HEX.softGold, 'QR panel');
      txt(s, q.label, { x: qx + 0.25, y: 2.2, w: wq - 0.5, h: 0.75, fontSize: 20, bold: true, color: C.text2, align: 'center', valign: 'middle' });
      qr(s, q.url, q.label, qx + (wq - 2.2) / 2, 3.05, 2.2, q.display);
    }
    for (const [ic, name, sub] of rows) {
      card(s, M, y, rw, rh - 0.18, HEX.softBlue, 'assignment row');
      await ico(s, ic, M + 0.2, y + 0.1, 0.6, HEX.white, HEX.blue);
      txt(s, [{ text: name, options: { bold: true, color: C.text2, breakLine: !!sub } }].concat(sub ? [{ text: sub, options: { fontSize: 20, color: C.accent6 } }] : []),
        { x: M + 1.05, y: y + 0.06, w: rw - 1.4, h: rh - 0.3, fontSize: T.body, valign: 'middle' });
      y += rh;
    }
    notes(s, S.notes.work);
  }
  if (S.mm) {
    const MM = S.mm;
    const s = content('This week\'s work', `Mile Marker #${S.n}`, MM.title);
    let y = 2.05;
    const nq = MM.qs.length, compact = nq > 3, step = nq === 4 ? 1.08 : nq === 5 ? 0.92 : compact ? 0.78 : 1.45, d = nq >= 6 ? 0.55 : compact ? 0.62 : 0.75;
    MM.qs.forEach((q, i) => {
      s.addShape(pres.shapes.OVAL, { x: M, y, w: d, h: d, fill: { color: HEX.gold }, line: { color: HEX.gold }, objectName: 'Decorative: number circle' });
      txt(s, String(i + 1), { x: M, y, w: d, h: d, fontSize: nq >= 6 ? 22 : compact ? 24 : 28, bold: true, color: C.text2, align: 'center', valign: 'middle', objectName: `Question ${i + 1} number` });
      const runs = compact || !q[1] ? [{ text: q[0], options: { bold: true, color: C.text2 } }]
        : [{ text: q[0], options: { bold: true, color: C.text2, breakLine: true } }, { text: q[1], options: { color: C.accent6 } }];
      txt(s, runs, { x: M + d + 0.3, y: compact ? y : y - 0.05, w: 8.4 - d - 0.3, h: compact ? d : 1.25, fontSize: nq >= 6 ? 22 : T.body, valign: compact ? 'middle' : 'top' });
      y += step;
    });
    card(s, 9.0, 2.05, W - 9.0 - M, 4.15, HEX.softGold, 'mile marker details panel');
    txt(s, MM.side, { x: 9.3, y: 2.3, w: W - 9.3 - M - 0.3, h: 3.7, fontSize: 22, paraSpaceAfter: 10 });
    notes(s, S.notes.mm);
  }

  // ---- discussion (in person)
  sec('Discussion');
  {
    const s = pres.addSlide({ masterName: 'FYE Discussion', sectionTitle: 'Discussion' });
    s.addImage({ path: S.art, x: 0, y: 0, w: W, h: H, objectName: 'Decorative: module cover art' });
    s.addText(S.disc.kicker || 'TALK IT THROUGH · IN CLASS', { placeholder: 'kicker' });
    s.addText(S.disc.title, { placeholder: 'title' });
    txt(s, S.disc.prompt.map((p, i, a) => ({ text: p, options: { bullet: { type: 'number' }, breakLine: i < a.length - 1 } })),
      { x: 4.3, y: 2.95, w: 8.3, h: 2.0, fontSize: 24, color: C.background1, paraSpaceAfter: 12, objectName: 'Discussion questions' });
    txt(s, S.disc.format, { x: 4.3, y: 5.05, w: 5.6, h: 0.8, fontSize: 22, color: 'D6EEFA', italic: true });
    notes(s, S.notes.disc);
  }

  const out = `${BOOK}downloads/slides/${S.file}`;
  fs.mkdirSync(`${BOOK}downloads/slides`, { recursive: true });
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  execFileSync('python3', [path.join(__dirname, 'postfix.py'), out], { stdio: 'inherit' });
  console.log('wrote', out);
}
module.exports = { build, HEX, T, W, H, M, BOOK };

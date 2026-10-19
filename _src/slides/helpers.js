// helper: two side-by-side cards with an icon, heading, and short body
async function pair(s, k, a, b, y = 2.1, h = 3.0) {
  const { M, W, HEX, txt, card, ico, C } = k, gap = 0.4, w = (W - 2 * M - gap) / 2;
  for (const [i, c] of [a, b].entries()) {
    const x = M + i * (w + gap);
    card(s, x, y, w, h, c.fill || HEX.softBlue, 'card');
    await ico(s, c.icon, x + 0.35, y + 0.35, 0.8, c.fg || HEX.white, c.bg || HEX.blue);
    txt(s, c.label, { x: x + 1.35, y: y + 0.38, w: w - 1.7, h: 0.75, fontSize: 28, bold: true, color: C.text2, valign: 'middle' });
    txt(s, c.body, { x: x + 0.35, y: y + 1.4, w: w - 0.7, h: h - 1.6, fontSize: 24 });
  }
}
function bar(s, k, text, y = 5.55) {
  const { M, W, HEX, txt, card, C } = k;
  card(s, M, y, W - 2 * M, 0.9, HEX.softGold, 'callout');
  txt(s, text, { x: M + 0.35, y: y + 0.12, w: W - 2 * M - 0.7, h: 0.66, fontSize: 24, bold: true, color: C.text2, valign: 'middle' });
}

// Skill Spotlight: coin, one-line definition, then where you start -> where you're headed
async function spotlight(s, k, coin, def, start, target) {
  const { M, W, HEX, txt, card, C, b64, BOOK, icon } = k;
  s.addImage({ data: b64(`${BOOK}images/shared/10es/10es-${String(coin).padStart(2, '0')}.png`), x: M, y: 2.1, w: 1.3, h: 1.3, objectName: 'Decorative: skill coin' });
  txt(s, def, { x: M + 1.6, y: 2.15, w: 10.5, h: 1.2, fontSize: 26, color: C.text1, valign: 'middle' });
  const w = (W - 2 * M - 1.0) / 2, y = 3.75, h = 2.75;
  card(s, M, y, w, h, HEX.softBlue, 'benchmark card');
  txt(s, [{ text: 'WHERE YOU START', options: { fontSize: 20, bold: true, color: C.accent4, charSpacing: 2, breakLine: true } }, { text: start }], { x: M + 0.35, y: y + 0.3, w: w - 0.7, h: h - 0.5 });
  s.addImage({ data: await icon('LuArrowRight', HEX.gold), x: M + w + 0.2, y: y + h / 2 - 0.3, w: 0.6, h: 0.6, objectName: 'Decorative: arrow' });
  card(s, M + w + 1.0, y, w, h, HEX.softGold, 'milestone card');
  txt(s, [{ text: "WHERE YOU'RE HEADED", options: { fontSize: 20, bold: true, color: '7A5500', charSpacing: 2, breakLine: true } }, { text: target }], { x: M + w + 1.35, y: y + 0.3, w: w - 0.7, h: h - 0.5 });
}

// 2x2 grid of icon cards: [icon, head, body]
async function grid4(s, k, items, top = 2.0, h = 1.95) {
  const { M, W, HEX, txt, card, ico, C } = k, gap = 0.35, w = (W - 2 * M - gap) / 2;
  for (const [i, [ic, head, body]] of items.entries()) {
    const x = M + (i % 2) * (w + gap), y = top + Math.floor(i / 2) * (h + 0.3);
    card(s, x, y, w, h, HEX.softBlue, 'card');
    await ico(s, ic, x + 0.3, y + 0.3, 0.75, HEX.white, HEX.blue);
    txt(s, [{ text: head, options: { bold: true, fontSize: 26, color: C.text2, breakLine: true } }, { text: body }], { x: x + 1.3, y: y + 0.22, w: w - 1.55, h: h - 0.35 });
  }
}

// row of cards with the icon on top: [icon, head, body]; opts.gold = index to highlight
async function cards(s, k, items, y, h, opts = {}) {
  const { M, W, HEX, txt, card, ico, C } = k, gap = 0.3, n = items.length, w = (W - 2 * M - (n - 1) * gap) / n;
  for (const [i, [ic, head, body]] of items.entries()) {
    const x = M + i * (w + gap), gold = opts.gold === i;
    card(s, x, y, w, h, gold ? HEX.softGold : HEX.softBlue, 'card');
    await ico(s, ic, x + 0.3, y + 0.3, 0.75, gold ? HEX.navy : HEX.white, gold ? HEX.gold : HEX.blue);
    txt(s, body ? [{ text: head, options: { bold: true, fontSize: opts.headSize || 26, color: C.text2, breakLine: true } }, { text: body, options: { paraSpaceBefore: 6 } }]
               : [{ text: head, options: { bold: true, fontSize: opts.headSize || 26, color: C.text2 } }],
      { x: x + 0.3, y: y + 1.2, w: w - 0.6, h: h - 1.4 });
  }
}

// icon list rows: [icon, bold lead, rest]
async function rows(s, k, items, top = 1.95, step = 0.75, width) {
  const { M, HEX, txt, ico, C } = k;
  for (const [i, [ic, head, body]] of items.entries()) {
    const y = top + i * step;
    await ico(s, ic, M, y, 0.6, HEX.white, HEX.blue);
    txt(s, [{ text: head, options: { bold: true, color: C.text2 } }, { text: body ? ': ' + body : '' }], { x: M + 0.85, y, w: (width || 12.05) - 0.85, h: 0.6, valign: 'middle', fit: 'shrink' });
  }
}

// QR panel on the right side of a lesson slide (3.4in wide); returns the width left for content
function qrPanel(s, k, url, label, display) {
  const { M, W, HEX, txt, card, C } = k, wq = 3.4, qx = W - M - wq;
  card(s, qx, 2.0, wq, 4.4, HEX.softGold, 'QR panel');
  txt(s, label, { x: qx + 0.25, y: 2.15, w: wq - 0.5, h: 0.75, fontSize: 20, bold: true, color: C.text2, align: 'center', valign: 'middle' });
  k.qr(s, url, label, qx + (wq - 2.2) / 2, 3.0, 2.2, display);
  return W - 2 * M - wq - 0.35;
}

module.exports = { pair, bar, spotlight, grid4, cards, rows, qrPanel };

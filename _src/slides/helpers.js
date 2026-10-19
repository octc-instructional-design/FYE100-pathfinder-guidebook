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

module.exports = { pair, bar };

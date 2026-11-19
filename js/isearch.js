/* Instructor search for the Pathfinder Guidebook. Loads the two section indexes and searches them in the browser. */
(function () {
  var form = document.querySelector('.isearch'), input = document.getElementById('isq');
  var list = document.getElementById('isr'), status = document.getElementById('iss');
  if (!form || !list) return;
  var STOP = { the:1, a:1, an:1, of:1, to:1, and:1, or:1, in:1, for:1, on:1, is:1, are:1, how:1, do:1, does:1, i:1, my:1, what:1, where:1, with:1, about:1, it:1 };
  var data = null, timer;

  function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
      .replace(/grade book/g, 'gradebook').replace(/e-mail/g, 'email').replace(/catch up/g, 'catch-up');
  }
  function stem(w) { return (w.length > 4 && /s$/.test(w) && !/ss$/.test(w)) ? w.slice(0, -1) : w; }
  function words(s) { return norm(s).split(/[^a-z0-9#*()]+/).filter(Boolean).map(stem); }
  function terms(q) { return words(q).filter(function (w) { return !STOP[w]; }); }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function prep(e) { e._t = words(e.t); e._s = words(e.s); e._x = words(e.x); e._n = norm(e.x); return e; }

  function hits(tokens, term) { var c = 0; for (var i = 0; i < tokens.length; i++) if (tokens[i].indexOf(term) === 0) c++; return c; }

  function score(e, ts, phrase) {
    var total = 0;
    for (var i = 0; i < ts.length; i++) {
      var t = ts[i], ht = hits(e._t, t), hs = hits(e._s, t), hx = hits(e._x, t);
      if (!ht && !hs && !hx) return 0;
      total += ht * 8 + hs * 5 + Math.min(hx, 6);
    }
    if (phrase && ts.length > 1 && e._n.indexOf(phrase) > -1) total += 8;
    if (e.s === '') total += 1;
    return total;
  }

  function snippet(e, ts) {
    var x = e.x, low = norm(x), at = -1;
    for (var i = 0; i < ts.length && at < 0; i++) at = low.search(new RegExp('\\b' + ts[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    if (at < 0) at = 0;
    var start = Math.max(0, at - 70), end = Math.min(x.length, at + 170);
    if (start > 0) { var sp = x.indexOf(' ', start); if (sp > -1 && sp < at) start = sp + 1; }
    if (end < x.length) { var ep = x.lastIndexOf(' ', end); if (ep > at) end = ep; }
    var s = (start ? '… ' : '') + x.slice(start, end) + (end < x.length ? ' …' : '');
    var out = esc(s);
    ts.forEach(function (t) {
      out = out.replace(new RegExp('\\b(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[a-z0-9]*)', 'gi'), '<mark>$1</mark>');
    });
    return out;
  }

  function kind() { var r = document.querySelector('input[name="isk"]:checked'); return r ? r.value : 'all'; }

  function run() {
    var q = input.value.trim(), ts = terms(q);
    try { history.replaceState(null, '', q ? '?q=' + encodeURIComponent(q) : location.pathname); } catch (e) {}
    list.innerHTML = '';
    if (!q) { status.textContent = ''; return; }
    if (!data) { status.textContent = 'Loading the search…'; return; }
    if (!ts.length) { status.textContent = 'Try a more specific word.'; return; }
    var k = kind(), phrase = norm(q), res = [];
    data.forEach(function (e) { if (k !== 'all' && e.k !== k) return; var s = score(e, ts, phrase); if (s) res.push([s, e]); });
    res.sort(function (a, b) { return b[0] - a[0]; });
    var perPage = {}, shown = [];
    for (var i = 0; i < res.length && shown.length < 40; i++) {
      var e = res[i][1], key = e.u.split('#')[0];
      perPage[key] = (perPage[key] || 0) + 1;
      if (perPage[key] <= 3) shown.push(e);
    }
    status.textContent = shown.length ? (res.length > shown.length ? 'Top ' + shown.length + ' results for "' + q + '"' : shown.length + (shown.length === 1 ? ' result' : ' results') + ' for "' + q + '"') : 'No results for "' + q + '". Try a shorter or different word.';
    list.innerHTML = shown.map(function (e) {
      var tag = e.k === 'i' ? '<span class="isr-tag isr-i">Instructor Guide</span>' : '<span class="isr-tag isr-s">Student page</span>';
      var head = esc(e.t) + (e.s && e.s !== e.t ? ' <span class="isr-sec">› ' + esc(e.s) + '</span>' : '');
      return '<li><a href="../../' + e.u + '">' + head + '</a><span class="isr-meta">' + tag + esc(e.l) + '</span><p>' + snippet(e, ts) + '</p></li>';
    }).join('');
  }

  form.addEventListener('submit', function (ev) { ev.preventDefault(); run(); });
  input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(run, 180); });
  document.querySelectorAll('input[name="isk"]').forEach(function (r) { r.addEventListener('change', run); });

  var q0 = new URLSearchParams(location.search).get('q');
  if (q0) input.value = q0;
  Promise.all(['search-student.json', 'search-instructor.json'].map(function (f) {
    return fetch(f).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; });
  })).then(function (parts) {
    data = parts[0].concat(parts[1]).map(prep);
    if (!data.length) status.textContent = 'The search index could not be loaded.';
    run();
  });
  if (!q0) input.focus();
})();

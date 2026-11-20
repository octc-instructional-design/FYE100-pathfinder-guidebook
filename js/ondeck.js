/* Highlights the module on deck this week. Nothing is locked; it only points.
   Dates come from js/term.js, written by the build from _src/schedule.json. */
(function () {
  var T = window.FYE_TERM; if (!T) return;
  var p = T.start.split('-'), start = new Date(+p[0], +p[1] - 1, +p[2]);
  var now = new Date(), today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var week = Math.floor(Math.round((today - start) / 86400000) / 7);
  var cur = null, state = 'off';
  if (week < 0) state = 'before';
  else if (T.breakAfter && week === T.breakAfter) state = 'break';
  else { var n = (T.breakAfter && week > T.breakAfter) ? week : week + 1; if (n >= 1 && n <= T.modules.length) { cur = n; state = 'on'; } else if (n === T.modules.length + 1 && today.getDay() === 1) state = 'last'; }
  // Preview: add ?ondeck=7 (or ?ondeck=break) to any page to see a week before it arrives.
  var pv = (location.search.match(/[?&]ondeck=([^&]+)/) || [])[1];
  if (pv === 'break') { state = 'break'; cur = null; } else if (pv && +pv >= 1 && +pv <= T.modules.length) { state = 'on'; cur = +pv; }
  var mod = function (n) { for (var i = 0; i < T.modules.length; i++) if (T.modules[i].n === n) return T.modules[i]; };
  var root = (document.querySelector('meta[name="book-root"]') || {}).content || '';

  var band = document.getElementById('ondeck');
  if (band) {
    var html = '';
    if (state === 'on') { var m = mod(cur); html = '<span class="od-k">This week</span><a href="' + root + m.u + '"><span class="od-n">Module ' + m.n + '</span> ' + m.t + ' <span aria-hidden="true">→</span></a>'; }
    else if (state === 'break') { var nx = mod(T.breakAfter + 1); html = '<span class="od-k">Spring Break</span><span>Module ' + nx.n + ' starts Monday. Behind? Break is a good week to catch up.</span>'; }
    else if (state === 'last') { var lm = mod(T.modules.length); html = '<span class="od-k">Due today</span><a href="' + root + lm.u + '">Module ' + lm.n + ' and your STAR(T) Stories, by 11:59 PM. Today is the last day to submit anything. <span aria-hidden="true">→</span></a>'; }
    else if (state === 'before') { var d = start.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }); html = '<span class="od-k">Coming up</span><a href="' + root + mod(1).u + '">Module 1 starts ' + d + ' <span aria-hidden="true">→</span></a>'; }
    if (html) { band.innerHTML = html; band.hidden = false; }
  }
  if (state !== 'on') return;
  [].forEach.call(document.querySelectorAll('[data-mod="' + cur + '"]'), function (li) {
    li.classList.add('od-current');
    var h = li.querySelector('h3'); if (h && !h.querySelector('.od-tag')) h.insertAdjacentHTML('beforeend', ' <span class="od-tag">This week</span>');
  });
  [].forEach.call(document.querySelectorAll('[data-ondeck-mod="' + cur + '"]'), function (el) { el.hidden = false; });
})();

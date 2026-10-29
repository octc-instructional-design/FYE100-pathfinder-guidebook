// Instructor Guide access gate. A courtesy gate, not security: GitHub Pages serves every file publicly.
// To change the code, replace CODE with btoa('newcode') (run it in any browser console) and rebuild.
(function () {
  var CODE = 'ODY3NTMwOQ==', KEY = 'fye100-instructor';
  var root = document.documentElement;
  function open() { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  if (open()) return;
  root.classList.add('gated');
  document.addEventListener('DOMContentLoaded', function () {
    var home = (document.querySelector('.bookbar .brand') || {}).getAttribute ? document.querySelector('.bookbar .brand').getAttribute('href') : '../../index.html';
    var g = document.createElement('div');
    g.className = 'gate';
    g.innerHTML =
      '<form class="gate-card" role="dialog" aria-modal="true" aria-labelledby="gate-h" novalidate>' +
      '<h1 id="gate-h">Instructor Guide</h1>' +
      '<p>This section is for FYE 100 instructors. Enter the access code to continue.</p>' +
      '<label for="gate-code">Access code</label>' +
      '<input id="gate-code" type="password" inputmode="numeric" autocomplete="off" aria-describedby="gate-msg">' +
      '<p id="gate-msg" class="gate-msg" aria-live="polite"></p>' +
      '<button type="submit">Open the guide</button>' +
      '<p class="gate-back"><a href="' + home + '">Back to the guidebook</a></p>' +
      '</form>';
    document.body.appendChild(g);
    var input = g.querySelector('input'), msg = g.querySelector('.gate-msg');
    input.focus();
    g.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault();
      if (btoa(input.value.trim()) === CODE) {
        try { localStorage.setItem(KEY, '1'); } catch (err) {}
        g.remove(); root.classList.remove('gated');
        var h = document.querySelector('#main h1, h1'); if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
      } else {
        msg.textContent = 'That code didn’t work. Check with your FYE 100 coordinator.';
        input.select();
      }
    });
  });
})();

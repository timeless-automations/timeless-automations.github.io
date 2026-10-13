/* Sector "Call Lena" bar — one element, moved into the active "Built for your business" chat panel when tabs switch. */
(function () {
  var box = document.getElementById('indCall'); if (!box) return;
  function place(s) {
    var demo = document.querySelector('.ind-panel[data-panel="' + s + '"] .ind-demo');
    if (demo && box.parentNode !== demo) demo.appendChild(box);
    box.setAttribute('data-sector', s);
  }
  [].forEach.call(document.querySelectorAll('.ind-tab'), function (t) { t.addEventListener('click', function () { place(t.getAttribute('data-ind')); }); });
  var act = document.querySelector('.ind-tab.active'); place(act ? act.getAttribute('data-ind') : 'garage');
})();

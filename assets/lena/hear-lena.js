/* Hear Lena — one shared <audio> (#lenaVoice, preload=none, no autoplay) driven by the hero call card and the backup pill. */
(function () {
  var audio = document.getElementById('lenaVoice'); if (!audio) return;
  var pill = document.getElementById('hearLena'), card = document.getElementById('lenaCallCard');
  var bar = document.getElementById('hearLenaBar'), time = document.getElementById('lenaCallTime');
  var ctrls = [pill, card].filter(Boolean);
  function fmt(s) { s = Math.floor(s || 0); return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); }
  function sync(playing) { ctrls.forEach(function (b) { b.classList.toggle('is-playing', playing); b.setAttribute('aria-pressed', playing ? 'true' : 'false'); }); }
  function toggle() { if (audio.paused) { var p = audio.play(); if (p && p.catch) p.catch(function () { sync(false); }); } else audio.pause(); }
  ctrls.forEach(function (b) { b.addEventListener('click', toggle); });
  audio.addEventListener('play', function () { sync(true); if (pill) pill.classList.add('has-progress'); });
  audio.addEventListener('pause', function () { sync(false); });
  audio.addEventListener('timeupdate', function () {
    if (time) time.textContent = fmt(audio.currentTime);
    if (bar && audio.duration) bar.style.width = (audio.currentTime / audio.duration * 100) + '%';
  });
  audio.addEventListener('ended', function () {
    sync(false); audio.currentTime = 0; if (bar) bar.style.width = '0'; if (time) time.textContent = '0:00';
    if (pill) pill.classList.remove('has-progress');
  });
})();

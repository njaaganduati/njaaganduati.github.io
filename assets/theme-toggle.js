/* RETACH shared theme toggle — light/dark, persisted in localStorage as 'retach-theme'.
   Pair with an inline anti-flash script in <head> that sets data-theme before paint. */
(function () {
  function current() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
  function label(theme) {
    return theme === 'dark' ? 'Light' : 'Dark';
  }
  function syncLabels() {
    var t = current();
    document.querySelectorAll('[data-theme-label]').forEach(function (el) {
      el.textContent = label(t);
    });
  }
  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('retach-theme', theme); } catch (e) {}
    syncLabels();
  }
  function init() {
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        apply(current() === 'dark' ? 'light' : 'dark');
      });
    });
    syncLabels();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

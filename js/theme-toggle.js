(function () {
  var root = document.documentElement;
  var button = document.querySelector('[data-theme-toggle]');
  if (!button) return;

  function icon(theme) {
    return theme === 'dark'
      ? '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v2.2M12 19.8V22M4.93 4.93l1.56 1.56M17.51 17.51l1.56 1.56M2 12h2.2M19.8 12H22M4.93 19.07l1.56-1.56M17.51 6.49l1.56-1.56" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    button.innerHTML = icon(theme);
    button.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }

  button.addEventListener('click', function () {
    apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  apply(localStorage.getItem('theme') || 'light');
}());

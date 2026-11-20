(() => {
  let theme;
  try { theme = localStorage.getItem('rk-theme'); } catch {}
  document.documentElement.dataset.theme = ['light','dark'].includes(theme) ? theme : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
})();

document.querySelectorAll('.menu-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const nav = button.parentElement?.querySelector('.nav');
    if (!nav) return;
    const open = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
});

const nav = document.querySelector('.nav');
const toggle = document.querySelector('.mobile-toggle');
const links = document.querySelector('.links');
const contactBtn = document.getElementById('contactBtn');
const toast = document.getElementById('toast');
const year = document.getElementById('year');

year.textContent = String(new Date().getFullYear());

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

toggle?.addEventListener('click', () => {
  const nowOpen = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(nowOpen));
});

links?.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

contactBtn?.addEventListener('click', () => {
  toast.textContent = "We've received your signal! Our team will reach out shortly.";
  setTimeout(() => {
    toast.textContent = '';
  }, 3500);
});

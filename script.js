const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const active = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', active);
});
document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('open')));
document.querySelector('#year').textContent = new Date().getFullYear();
const form = document.querySelector('#contactForm');
form.addEventListener('submit', () => {
  const name = new FormData(form).get('nombre');
  document.querySelector('.form-status').textContent = `Enviando, ${name}...`;
});
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

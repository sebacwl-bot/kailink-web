const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const active = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', active);
});
document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('open')));
document.querySelector('#year').textContent = new Date().getFullYear();
const form = document.querySelector('#contactForm');
const formStatus = document.querySelector('.form-status');
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = formData.get('nombre');
  const originalLabel = submitButton.innerHTML;

  submitButton.disabled = true;
  submitButton.innerHTML = 'Enviando...';
  formStatus.textContent = 'Enviando tu consulta...';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok || data.success !== 'true' && data.success !== true) {
      throw new Error(data.message || 'No se pudo enviar la consulta.');
    }

    form.reset();
    formStatus.textContent = `¡Gracias, ${name}! Recibimos tu consulta y te responderemos pronto.`;
  } catch (error) {
    formStatus.textContent = 'No pudimos enviar la consulta. Inténtalo nuevamente o escríbenos por WhatsApp.';
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalLabel;
  }
});
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

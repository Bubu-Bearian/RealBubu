function setActiveNav() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function handleContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  const status = document.querySelector('#contact-status');
  const targetEmail = 'BubuBearian@gmail.com';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name')?.toString().trim() || 'Friend';
    const email = formData.get('email')?.toString().trim() || 'unknown';
    const reason = formData.get('reason')?.toString().trim() || 'General';
    const message = formData.get('message')?.toString().trim() || '';

    const subject = encodeURIComponent(`Signal from ${name} — ${reason}`);
    const body = encodeURIComponent(`${message}\n\nSender: ${name}\nEmail: ${email}\nReason: ${reason}`);
    const mailtoLink = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

    status.textContent = 'Opening your secure mail client...';
    status.style.color = 'var(--accent)';

    setTimeout(() => {
      window.location.href = mailtoLink;
      status.textContent = 'If your email app did not open, drop a note at ' + targetEmail + '.';
    }, 150);
  });
}

function attachGlowEffect() {
  document.querySelectorAll('.panel, .tile, .article').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
      card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(90,226,255,0.08), transparent 120px), linear-gradient(160deg, rgba(255,255,255,0.04), rgba(90,226,255,0.06))`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.background = '';
    });
  });
}

function setupHologram() {
  const trigger = document.querySelector('.holo-trigger');
  const hero = document.querySelector('.hero-visual');
  const hologram = document.querySelector('#holo-bear');
  if (!trigger || !hero || !hologram) return;

  const toggleHolo = () => {
    const shouldShow = !hero.classList.contains('holo-active');
    hero.classList.toggle('holo-active', shouldShow);
    hologram.classList.toggle('is-visible', shouldShow);
    trigger.setAttribute('aria-pressed', shouldShow.toString());
    trigger.classList.add('energize');
    setTimeout(() => trigger.classList.remove('energize'), 620);
  };

  trigger.addEventListener('click', toggleHolo);
  trigger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleHolo();
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  handleContactForm();
  attachGlowEffect();
  setupHologram();
});

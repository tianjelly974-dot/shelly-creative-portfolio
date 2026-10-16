(() => {
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  // Keep semantic links and native video controls as the interaction targets.
  document.querySelectorAll('.project-card').forEach(card => {
    const cover = card.querySelector('.project-cover');
    const title = card.querySelector('h3');
    if (!cover || !title) return;
    const overlay = document.createElement('span');
    overlay.className = 'cover-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    const name = document.createElement('span');
    name.className = 'cover-project-name';
    name.textContent = title.textContent.replace('↗', '').trim();
    overlay.append(name);
    cover.append(overlay);
  });

  const ambient = document.createElement('div');
  ambient.className = 'ambient-light';
  ambient.setAttribute('aria-hidden', 'true');
  ambient.append(document.createElement('span'), document.createElement('span'));
  document.body.prepend(ambient);

  const heroItems = [...document.querySelectorAll('.hero-copy > .eyebrow, .hero-title-line, .hero-english, .hero-description, .hero-actions')];
  heroItems.forEach((item, index) => {
    item.classList.add('hero-enter');
    item.style.setProperty('--enter-delay', `${index * 90}ms`);
  });

  const revealItems = new Set();
  const addReveal = (item, index = 0, columns = 1) => {
    if (!item) return;
    item.classList.add('reveal-item');
    item.style.setProperty('--reveal-delay', `${(index % columns) * 90}ms`);
    revealItems.add(item);
  };
  document.querySelectorAll('.section-heading, .filters, .about-intro, .contact-section, .project-intro > *, .project-hero-cover, .channel-feature, .case-section > .eyebrow, .case-section > h2, .case-section > .media-note, .evidence-block, .metrics-inline, .insight-list, .case-link-row, .project-bottom').forEach(item => addReveal(item));
  document.querySelectorAll('.project-grid, .process-grid, .media-grid, .image-grid, .experience-list').forEach(group => {
    const columns = group.matches('.process-grid, .media-grid') ? 3 : 2;
    [...group.children].forEach((item, index) => addReveal(item, index, columns));
  });
  let observer;
  const revealAll = () => {
    observer?.disconnect();
    revealItems.forEach(item => item.classList.add('is-revealed'));
  };
  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealAll();
  }
  root.classList.add('motion-ready');
  // A hash jump or browser find must not leave its destination invisible.
  document.addEventListener('focusin', event => {
    const item = event.target.closest('.reveal-item');
    if (item) item.classList.add('is-revealed');
  });
  addEventListener('beforeprint', revealAll);

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) revealAll();
  });
})();

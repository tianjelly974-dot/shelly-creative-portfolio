(() => {
  const toast = document.querySelector('.toast');
  let toastTimer;
  const announce = text => {
    if (!toast) return;
    toast.textContent = text;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 3600);
  };
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        announce('邮箱已复制');
      } catch {
        announce('邮箱：' + button.dataset.copy);
      }
    });
  });
  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-category]')];
  filters.forEach(button => {
    button.addEventListener('click', () => {
      filters.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      let count = 0;
      cards.forEach(card => {
        card.hidden = button.dataset.filter !== 'all' && !card.dataset.category.split(' ').includes(button.dataset.filter);
        if (!card.hidden) count++;
      });
      const status = document.getElementById('filter-status');
      if (status) status.textContent = `显示${button.textContent}，共 ${count} 个项目`;
    });
  });
  const dialog = document.getElementById('image-viewer');
  if (dialog) {
    const image = dialog.querySelector('img');
    const caption = dialog.querySelector('.viewer-caption');
    let opener;
    document.querySelectorAll('[data-zoom]').forEach(button => {
      button.addEventListener('click', () => {
        opener = button;
        const original = button.querySelector('img');
        image.src = original.src;
        image.alt = original.alt;
        caption.textContent = button.dataset.caption || original.alt;
        dialog.showModal();
      });
    });
    dialog.querySelector('[data-close-viewer]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) {
        const box = dialog.getBoundingClientRect();
        if(event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
      }
    });
    dialog.addEventListener('close', () => { image.removeAttribute('src'); if (opener) opener.focus(); });
  }
  const videos = [...document.querySelectorAll('video')];
  const connection = navigator.connection;
  const conserveData = connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '');
  // Prepare metadata only near the viewport. Full buffering starts on intent,
  // so off-screen videos do not compete with images or the video being watched.
  const prepareVideo = video => {
    if (video.preload === 'none') video.preload = 'metadata';
  };
  const observer = !conserveData && 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        prepareVideo(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '300px 0px' })
    : null;
  videos.forEach(video => {
    observer?.observe(video);
    const warmVideo = () => {
      if (conserveData || videos.some(other => other !== video && !other.paused)) return;
      video.preload = 'auto';
    };
    video.addEventListener('pointerenter', warmVideo, { once: true });
    video.addEventListener('focus', warmVideo, { once: true });
    video.addEventListener('play', () => videos.forEach(other => { if (other !== video) other.pause(); }));
    video.addEventListener('error', () => {
      const fallback = video.parentElement.querySelector('.video-fallback');
      if (fallback) fallback.hidden = false;
    });
  });
})();

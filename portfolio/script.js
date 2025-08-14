document.addEventListener('DOMContentLoaded', () => {
  // Init theme (dark by default if OS prefers or saved)
  const html = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  menuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });



  // Typewriter (loop)
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const lines = [
      "A passionate Full Stack Developer crafting modern, responsive, and user-friendly web applications.",
      "Specialized in React.js, Node.js, and Tailwind CSS.",
      "Turning ideas into reality with clean code and elegant UI."
    ];
    let l = 0, i = 0, del = false;
    const speed = 70;

    (function type() {
      const text = lines[l];
      typewriterEl.textContent = del ? text.slice(0, i--) : text.slice(0, i++);
      if (!del && i === text.length) { del = true; setTimeout(type, 1200); return; }
      if (del && i < 0) { del = false; l = (l + 1) % lines.length; i = 0; }
      setTimeout(type, del ? speed / 2 : speed);
    })();
  }

  // Simple scroll reveal
  const revealEls = document.querySelectorAll('.will-animate');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.remove('opacity-0','translate-y-4');
        e.target.classList.add('transition','duration-700');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
});

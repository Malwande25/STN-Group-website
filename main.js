/* ═══════════════════════════════════════════
   STN GROUP — main.js  (shared across pages)
   ═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav scroll effect ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ── Highlight active nav link ── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Mobile hamburger ── */
  const burger = document.querySelector('.nav__burger');
  const mobileMenu = document.querySelector('.nav__mobile');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ── Scroll-reveal ── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 6) * 0.07}s`;
    observer.observe(el);
  });

  /* ── Counter animation (used on about page) ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.ceil(target / 60);
    const tick = () => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

  /* ── Lightbox for gallery images ── */
  const galleryImgs = document.querySelectorAll('.gallery__img');
  if (galleryImgs.length) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `<div class="lightbox__backdrop"></div><img class="lightbox__img" src="" alt=""><button class="lightbox__close">✕</button>`;
    document.body.appendChild(lb);

    galleryImgs.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        lb.querySelector('.lightbox__img').src = img.src;
        lb.classList.add('open');
      });
    });
    lb.querySelector('.lightbox__backdrop').addEventListener('click', () => lb.classList.remove('open'));
    lb.querySelector('.lightbox__close').addEventListener('click', () => lb.classList.remove('open'));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });
  }

  /* ── Contact form validation ── */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        field.classList.remove('error');
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        }
      });
      if (valid) {
        const btn = form.querySelector('[type="submit"]');
        btn.textContent = 'Message Sent ✓';
        btn.style.background = '#2d7a2d';
        btn.disabled = true;
      }
    });
  }

});

/* ── Lightbox CSS injected by JS (keeps style.css lean) ── */
const lbStyle = document.createElement('style');
lbStyle.textContent = `
.lightbox{position:fixed;inset:0;z-index:999;display:none;align-items:center;justify-content:center;}
.lightbox.open{display:flex;}
.lightbox__backdrop{position:absolute;inset:0;background:rgba(0,0,0,.88);}
.lightbox__img{position:relative;z-index:1;max-width:90vw;max-height:88vh;object-fit:contain;border-radius:3px;}
.lightbox__close{position:absolute;top:1.5rem;right:1.5rem;z-index:2;background:rgba(201,162,39,.2);border:1px solid rgba(201,162,39,.4);color:#c9a227;font-size:1.1rem;width:40px;height:40px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;}
.lightbox__close:hover{background:rgba(201,162,39,.4);}
.contact-form input.error,.contact-form textarea.error,.contact-form select.error{border-color:#e05555 !important;}
`;
document.head.appendChild(lbStyle);

/* Zara Injury Law — Premium Interactions */
(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  var toggle = document.getElementById('navToggle');
  var nav = document.querySelector('nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(function (lnk) {
      lnk.addEventListener('click', function () {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---- Header scroll effect ---- */
  var header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ---- Reveal-on-scroll ---- */
  var revealed = [];

  function revealAll() {
    revealed.forEach(function (el) { el.classList.add('visible'); });
  }

  function initReveal() {
    document.querySelectorAll(
      '.section, .section-alt, .content-page, .cta-banner, .attorney-hero, .contact-grid, .contact-info, .contact-method'
    ).forEach(function (el) { el.classList.add('reveal'); revealed.push(el); });

    document.querySelectorAll('.grid').forEach(function (g) {
      g.classList.add('stagger-grid');
      revealed.push(g);
    });

    document.querySelectorAll('.sidebar-card').forEach(function (el) {
      el.classList.add('reveal'); revealed.push(el);
    });

    if (!('IntersectionObserver' in window)) {
      revealAll();
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '50px 0px -20px 0px' });

    revealed.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      revealed.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < window.innerHeight + 100) {
          el.classList.add('visible');
        }
      });
    }, 2000);

    var scrollRevealTimer;
    window.addEventListener('scroll', function () {
      clearTimeout(scrollRevealTimer);
      scrollRevealTimer = setTimeout(function () {
        revealed.forEach(function (el) {
          if (!el.classList.contains('visible')) {
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight + 50) {
              el.classList.add('visible');
            }
          }
        });
      }, 100);
    }, { passive: true });
  }

  /* ---- Active page highlighting ---- */
  var path = window.location.pathname;
  document.querySelectorAll('nav a').forEach(function (lnk) {
    var href = lnk.getAttribute('href');
    if (!href || lnk.classList.contains('nav-cta')) return;
    if (href === path || (path !== '/' && href !== '/' && path.indexOf(href) === 0)) {
      lnk.classList.add('active');
    }
  });

  /* ---- Init on DOM ready ---- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }
})();

/* Zara Injury Law — Premium Interactions */
(function () {
  'use strict';

  /* ---- Header scroll effect ---- */
  var header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ---- IntersectionObserver — reveal on scroll ---- */
  var io = ('IntersectionObserver' in window)
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' })
    : null;

  function observe(el) { if (io) io.observe(el); else el.classList.add('visible'); }

  document.addEventListener('DOMContentLoaded', function () {
    /* sections */
    document.querySelectorAll(
      '.section, .section-alt, .content-page, .cta-banner, .attorney-hero, .contact-grid, .contact-info, .contact-method'
    ).forEach(function (el) { el.classList.add('reveal'); observe(el); });

    /* grids get staggered children */
    document.querySelectorAll('.grid').forEach(function (g) {
      g.classList.add('stagger-grid');
      observe(g);
    });

    /* sidebar cards */
    document.querySelectorAll('.sidebar-card').forEach(function (el) {
      el.classList.add('reveal'); observe(el);
    });
  });

  /* ---- Mobile nav — close on link click ---- */
  document.querySelectorAll('nav a').forEach(function (lnk) {
    lnk.addEventListener('click', function () {
      var n = document.querySelector('nav');
      if (n) n.classList.remove('open');
    });
  });

  /* ---- Active page highlighting ---- */
  var path = window.location.pathname;
  document.querySelectorAll('nav a').forEach(function (lnk) {
    var href = lnk.getAttribute('href');
    if (!href || lnk.classList.contains('nav-cta')) return;
    if (href === path || (path !== '/' && href !== '/' && path.indexOf(href) === 0)) {
      lnk.classList.add('active');
    }
  });
})();

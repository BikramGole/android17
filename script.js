(function () {
  'use strict';

  /* ----- Scroll Reveal (IntersectionObserver) ----- */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ----- Mobile Navigation Toggle ----- */
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true' ? false : true;
      toggle.setAttribute('aria-expanded', expanded);
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ----- Smooth Scroll for Anchor Links ----- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navHeight = document.querySelector('.nav').offsetHeight || 60;
        var targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ----- Active Nav Link Highlighting ----- */
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a');

  if (sections.length && navAnchors.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navAnchors.forEach(function (a) {
              a.style.color = '';
              a.style.background = '';
              if (a.getAttribute('href') === '#' + entry.target.id) {
                a.style.color = 'var(--text)';
                a.style.background = 'var(--green-dark)';
              }
            });
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: '-60px 0px 0px 0px'
      }
    );

    sections.forEach(function (s) {
      navObserver.observe(s);
    });
  }

  /* ----- Keyboard: Escape closes mobile nav ----- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle && navLinks) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });

})();

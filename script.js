(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ===== Utility helpers ===== */
  var q = function (s, ctx) { return (ctx || document).querySelector(s); };
  var qa = function (s, ctx) { return (ctx || document).querySelectorAll(s); };

  /* ===== 1. Enhanced Scroll Reveal ===== */
  (function () {
    var revealMap = {
      'reveal':     { threshold: 0.12, rootMargin: '0px 0px -40px 0px', cls: 'show' },
      'anim-fade-up':    { threshold: 0.15, rootMargin: '0px 0px -50px 0px', cls: 'animated' },
      'anim-fade-scale': { threshold: 0.15, rootMargin: '0px 0px -50px 0px', cls: 'animated' },
      'anim-blur':       { threshold: 0.12, rootMargin: '0px 0px -40px 0px', cls: 'animated' },
      'anim-left':       { threshold: 0.12, rootMargin: '0px 0px -40px 0px', cls: 'animated' },
      'anim-right':      { threshold: 0.12, rootMargin: '0px 0px -40px 0px', cls: 'animated' },
      'anim-fade-in':    { threshold: 0.1,  rootMargin: '0px 0px -40px 0px', cls: 'animated' }
    };

    Object.keys(revealMap).forEach(function (cls) {
      var els = qa('.' + cls + ':not(.' + revealMap[cls].cls + ')');
      if (!els.length) return;
      var cfg = revealMap[cls];
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add(cfg.cls);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: cfg.threshold, rootMargin: cfg.rootMargin });
      Array.prototype.forEach.call(els, function (el) { obs.observe(el); });
    });

    /* Image clip reveals */
    var imgReveals = qa('.img-reveal');
    if (imgReveals.length) {
      var imgObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            imgObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      Array.prototype.forEach.call(imgReveals, function (el) { imgObs.observe(el); });
    }

    /* Compare table rows */
    var compareRows = qa('.compare-table tbody tr');
    if (compareRows.length) {
      var rowObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var i = 0;
            Array.prototype.forEach.call(compareRows, function (row) {
              setTimeout(function () { row.classList.add('visible'); }, i * 120);
              i++;
            });
            rowObs.unobserve(entry.target.parentElement);
          }
        });
      }, { threshold: 0.15 });
      if (compareRows[0].parentElement) rowObs.observe(compareRows[0].parentElement);
    }
  })();

  /* ===== 2. Hero Cinematic Sequence ===== */
  (function () {
    var hero = q('.hero');
    if (!hero) return;

    /* Word-by-word heading animation */
    var heading = q('h1', hero);
    if (heading && !heading.dataset.animWords) {
      heading.dataset.animWords = '1';
      var words = heading.textContent.trim().split(/\s+/);
      heading.innerHTML = '';
      words.forEach(function (word, i) {
        var w = document.createElement('span');
        w.className = 'word-reveal';
        var s = document.createElement('span');
        s.textContent = word + (i < words.length - 1 ? '\u00A0' : '');
        s.style.animationDelay = (1.2 + i * 0.12) + 's';
        w.appendChild(s);
        heading.appendChild(w);
      });
    }

    /* Hero glow */
    var glow = document.createElement('div');
    glow.className = 'hero-glow';
    glow.style.top = '30%';
    glow.style.left = '55%';
    hero.appendChild(glow);

    /* Particles */
    (function () {
      var container = hero;
      for (var i = 0; i < 12; i++) {
        var p = document.createElement('div');
        p.style.cssText =
          'position:absolute;width:' + (2 + Math.random() * 3) + 'px;height:' + (2 + Math.random() * 3) + 'px;' +
          'border-radius:50%;background:rgba(61,220,132,' + (0.15 + Math.random() * 0.25) + ');' +
          'top:' + (10 + Math.random() * 80) + '%;left:' + (5 + Math.random() * 90) + '%;' +
          'pointer-events:none;z-index:1;' +
          'animation:particleFloat ' + (4 + Math.random() * 4) + 's ease-in-out ' + (Math.random() * 3) + 's infinite;' +
          'animation-delay:' + (Math.random() * 2) + 's;';
        container.appendChild(p);
      }
    })();
  })();

  /* ===== 3. Device Mouse Tilt Parallax ===== */
  (function () {
    var devices = qa('.device');
    if (!devices.length || window.innerWidth < 768) return;

    var container = q('.device-stack');
    if (!container) return;

    container.addEventListener('mousemove', function (e) {
      var rect = container.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width;
      var y = (e.clientY - rect.top) / rect.height;
      Array.prototype.forEach.call(devices, function (d) {
        var rx = (y - 0.5) * 8;
        var ry = (x - 0.5) * -8;
        d.style.transform = d.getAttribute('data-base-transform') || d.style.transform || '';
        var current = d.style.transform;
        var tilt = ' perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
        d.style.transform = current.replace(/perspective\([^)]+\)\s*rotateX\([^)]+\)\s*rotateY\([^)]+\)/g, '').trim() + tilt;
      });
    });

    container.addEventListener('mouseleave', function () {
      Array.prototype.forEach.call(devices, function (d) {
        d.style.transform = d.style.transform.replace(/perspective\([^)]+\)\s*rotateX\([^)]+\)\s*rotateY\([^)]+\)/g, '').trim();
      });
    });
  })();

  /* ===== 4. Scroll Parallax ===== */
  (function () {
    if (window.innerWidth < 768) return;
    var heroBg = q('.hero-bg');
    var heroContent = q('.hero-content');
    var heroVisual = q('.hero-visual');

    window.addEventListener('scroll', function () {
      var st = window.pageYOffset;
      if (heroBg) heroBg.style.transform = 'translateY(' + (st * 0.15) + 'px)';
      if (heroContent) heroContent.style.transform = 'translateY(' + (st * -0.05) + 'px)';
      if (heroVisual) heroVisual.style.transform = 'translateY(' + (st * 0.08) + 'px)';
    }, { passive: true });
  })();

  /* ===== 5. Performance Counter Animation ===== */
  (function () {
    var counters = qa('.perf-counter');
    if (!counters.length) return;

    var counterObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-target'), 10) || 100;
          var duration = parseInt(el.getAttribute('data-duration'), 10) || 2000;
          var start = performance.now();

          function update(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
          counterObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    Array.prototype.forEach.call(counters, function (c) { counterObs.observe(c); });
  })();

  /* ===== 6. Sticky Nav Scroll Effect ===== */
  (function () {
    var nav = q('.nav');
    if (!nav) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        nav.classList.toggle('nav-scrolled', !entry.isIntersecting);
      });
    }, { threshold: 0 });

    var sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;';
    document.body.prepend(sentinel);
    observer.observe(sentinel);
  })();

  /* ===== 7. Active Nav Highlight (Improved) ===== */
  (function () {
    var sections = qa('section[id]');
    var navAnchors = qa('.nav-links a');
    if (!sections.length || !navAnchors.length) return;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          Array.prototype.forEach.call(navAnchors, function (a) {
            a.style.color = '';
            a.style.background = '';
            if (a.getAttribute('href') === '#' + entry.target.id) {
              a.style.color = 'var(--text)';
              a.style.background = 'var(--green-dark)';
            }
          });
        }
      });
    }, { threshold: 0.2, rootMargin: '-80px 0px -30% 0px' });

    Array.prototype.forEach.call(sections, function (s) { obs.observe(s); });
  })();

  /* ===== 8. Mobile Nav Toggle ===== */
  (function () {
    var toggle = q('.nav-toggle');
    var navLinks = q('.nav-links');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true' ? false : true;
      toggle.setAttribute('aria-expanded', expanded);
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    qa('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle && navLinks) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  })();

  /* ===== 9. Smooth Scroll ===== */
  (function () {
    qa('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = q(targetId);
        if (target) {
          e.preventDefault();
          var navHeight = q('.nav').offsetHeight || 60;
          var targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
      });
    });
  })();

  /* ===== 10. Image Hover Scale for all feature images ===== */
  (function () {
    qa('.fc-media img, .adaptive-visual img, .perf-image img, .security-image img, .media-image img, .youtube-cover img').forEach(function (img) {
      img.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
      img.parentElement.addEventListener('mouseenter', function () { img.style.transform = 'scale(1.05)'; });
      img.parentElement.addEventListener('mouseleave', function () { img.style.transform = 'scale(1)'; });
    });
  })();

})();

(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ===== Utility helpers ===== */
  var q = function (s, ctx) { return (ctx || document).querySelector(s); };
  var qa = function (s, ctx) { return (ctx || document).querySelectorAll(s); };

  /* ===== 0. Page Load Animation ===== */
  (function () {
    var body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(function () {
      body.style.opacity = '1';
    });
  })();

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

    /* Word-by-word heading animation (preserves existing HTML) */
    var heading = q('h1', hero);
    if (heading && !heading.dataset.animWords) {
      heading.dataset.animWords = '1';
      var html = heading.innerHTML;
      var temp = document.createElement('div');
      temp.innerHTML = html;
      var processNode = function (node) {
        if (node.nodeType === 3) {
          var words = node.textContent.trim().split(/\s+/);
          if (words.length === 0) return document.createDocumentFragment();
          var frag = document.createDocumentFragment();
          words.forEach(function (word, i) {
            var w = document.createElement('span');
            w.className = 'word-reveal';
            var s = document.createElement('span');
            s.textContent = word + (i < words.length - 1 ? '\u00A0' : '');
            s.style.animationDelay = (1.2 + i * 0.12) + 's';
            w.appendChild(s);
            frag.appendChild(w);
          });
          return frag;
        } else if (node.nodeType === 1) {
          var clone = node.cloneNode(false);
          Array.prototype.forEach.call(node.childNodes, function (child) {
            clone.appendChild(processNode(child));
          });
          return clone;
        }
        return node.cloneNode(true);
      };
      heading.innerHTML = '';
      Array.prototype.forEach.call(temp.childNodes, function (child) {
        heading.appendChild(processNode(child));
      });
    }

    /* Hero glow */
    var glow = document.createElement('div');
    glow.className = 'hero-glow';
    glow.style.top = '30%';
    glow.style.left = '55%';
    hero.appendChild(glow);
    var glow2 = document.createElement('div');
    glow2.className = 'hero-glow-secondary';
    hero.appendChild(glow2);

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

  /* ===== 3. Hero Mouse Parallax ===== */
  (function () {
    var heroEl = q('.hero');
    var heroBg = q('.hero-bg');
    var content = q('.hero-content');
    var visual = q('.hero-visual');
    if (!heroEl || window.innerWidth < 768) return;

    heroEl.addEventListener('mousemove', function (e) {
      var rect = heroEl.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      if (heroBg) heroBg.style.transform = 'translate(' + (x * -20) + 'px, ' + (y * -10) + 'px) scale(1.05)';
      if (content) content.style.transform = 'translate(' + (x * 8) + 'px, ' + (y * 4) + 'px)';
      if (visual) visual.style.transform = 'translate(' + (x * -12) + 'px, ' + (y * -6) + 'px)';
    });

    heroEl.addEventListener('mouseleave', function () {
      if (heroBg) { heroBg.style.transform = ''; }
      if (content) { content.style.transform = ''; }
      if (visual) { visual.style.transform = ''; }
    });
  })();

  /* ===== 3.5 Device Mouse Tilt Parallax ===== */
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

  /* ===== 5.5 Scroll Progress Bar ===== */
  (function () {
    var bar = document.getElementById('scroll-progress');
    if (!bar) return;
    var update = function () {
      var scrollTop = window.pageYOffset;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
      bar.setAttribute('aria-valuenow', Math.round(progress));
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  })();

  /* ===== 5.6 Feature Card Scroll Lift ===== */
  (function () {
    var cards = qa('.feature-card, .overview-card, .perf-item, .sec-item, .roadmap-step');
    if (!cards.length) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    Array.prototype.forEach.call(cards, function (c) {
      c.classList.add('reveal');
      obs.observe(c);
    });
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
            a.classList.remove('active-section');
            if (a.getAttribute('href') === '#' + entry.target.id) {
              a.classList.add('active-section');
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
    var bodyEl = document.body;
    if (!toggle || !navLinks) return;

    var closeMenu = function () {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
      bodyEl.style.overflow = '';
    };

    var openMenu = function () {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      bodyEl.style.overflow = 'hidden';
    };

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      if (expanded) closeMenu();
      else openMenu();
    });

    qa('.nav-links a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
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

  /* ===== 11. Phone Simulator ===== */
  (function () {
    var appsContainer = document.getElementById('phone-apps');
    var bubblesContainer = document.getElementById('phone-bubbles');
    var reactionsContainer = document.getElementById('phone-reactions');
    var phoneFrame = document.querySelector('.phone-frame');
    if (!appsContainer) return;

    var apps = [
      { label: 'Messages', color: '#34b7f1', icon: 'M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z' },
      { label: 'Photos', color: '#ea4335', icon: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z' },
      { label: 'Maps', color: '#34a853', icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' },
      { label: 'Gmail', color: '#ea4335', icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
      { label: 'Chrome', color: '#4285f4', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.49 0-4.6-1.48-5.57-3.62C7.1 14.85 8.48 15 12 15c3.52 0 4.9-.15 5.57-.42-.97 2.14-3.08 3.62-5.57 3.62z' },
      { label: 'YouTube', color: '#ff0000', icon: 'M21.43 4.73c.84.89 1.07 2.93 1.07 7.27s-.23 6.38-1.07 7.27c-.84.89-2.41.98-4.43 1.02-3.23.06-7.08.06-7.08.06s-3.85 0-7.08-.06c-2.02-.04-3.59-.13-4.43-1.02C1.23 18.38 1 16.34 1 12s.23-6.38 1.07-7.27C2.9 3.84 4.47 3.75 6.5 3.71 9.73 3.65 13.58 3.65 13.58 3.65s3.85 0 7.08.06c2.02.04 3.59.13 4.43 1.02zM9.96 8.27v7.46l6.23-3.73L9.96 8.27z' },
      { label: 'Calendar', color: '#4285f4', icon: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z' },
      { label: 'Clock', color: '#fbbc04', icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z' },
      { label: 'Settings', color: '#5f6368', icon: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z' },
      { label: 'Files', color: '#4285f4', icon: 'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z' },
      { label: 'Play Store', color: '#34a853', icon: 'M3 2l2.01 18.11C5.04 20.29 5.17 20.5 5.39 20.61l6.28 3.23c.2.1.43.1.63.01l6.3-3.24c.22-.11.35-.32.38-.55L21 2H3zm15.69 3.49l-1.59 10.62-5.1 3.54-5.61-3.56L4.52 5.49h14.17zM9.86 8.02c-.36-.37-.88-.55-1.55-.55H5.92l.3 2.09h1.95c.57 0 1.02-.13 1.33-.43.31-.3.46-.71.46-1.21 0-.32-.08-.59-.22-.8l.12-.1zm1.37 0c.14.21.22.48.22.81 0 .5-.15.91-.46 1.21-.31.3-.76.43-1.33.43H8.31l.31 2.09h1.95c.57 0 1.02-.13 1.33-.43.31-.3.46-.71.46-1.21 0-.33-.08-.6-.22-.81l.12-.1h.11l2.14 2.29h.32l-.68-2.09h.54z' },
      { label: 'Camera', color: '#5f6368', icon: 'M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z' },
    ];

    /* Render app icons with SVG icons */
    apps.forEach(function (a) {
      var el = document.createElement('div');
      el.className = 'phone-app';
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', a.label);
      el.innerHTML =
        '<div class="phone-app-icon" style="background:' + a.color + '">' +
          '<svg viewBox="0 0 24 24" fill="#fff" width="22" height="22"><path d="' + a.icon + '"/></svg>' +
        '</div>' +
        '<span class="phone-app-label">' + a.label + '</span>';
      el.addEventListener('click', function () {
        this.classList.add('phone-app-tap');
        setTimeout(function () { this.classList.remove('phone-app-tap'); }.bind(this), 300);
      });
      appsContainer.appendChild(el);
    });

    /* Bubble icons (SVG) */
    if (bubblesContainer) {
      var bubbles = [
        { icon: '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>', color: '#34b7f1' },
        { icon: '<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>', color: '#4285f4' },
        { icon: '<svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>', color: '#ea4335' },
      ];

      function toggleBubbles() {
        bubblesContainer.innerHTML = '';
        var visible = Math.random() > 0.3;
        if (!visible) return;
        bubbles.forEach(function (b, i) {
          var el = document.createElement('div');
          el.className = 'phone-bubble';
          el.style.background = b.color;
          el.style.animation = 'fadeIn 0.3s ease ' + (i * 0.1) + 's both';
          el.innerHTML = b.icon;
          bubblesContainer.appendChild(el);
        });
      }

      toggleBubbles();
      setInterval(toggleBubbles, 4000);
    }

    /* Screen reactions */
    if (reactionsContainer) {
      var reactions = [
        { path: '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>', color: '#ff4081' },
        { path: '<path d="M1 9h2V7H1v2zm0 4h2v-2H1v2zm0-8h2V3c-1.1 0-2 .9-2 2zm8 16h2v-2H9v2zm-8-4h2v-2H1v2zm2 4v-2H1c0 1.1.9 2 2 2zM21 3h-8l6 6-6 6h8V3zm-2 14h2v-2h-2v2zM9 3h2V1H9v2zM5 3h2V1H5v2z"/>', color: '#ffeb3b' },
        { path: '<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>', color: '#42a5f5' },
      ];

      reactions.forEach(function (r, i) {
        var el = document.createElement('div');
        el.className = 'phone-reaction';
        el.innerHTML = '<svg viewBox="0 0 24 24" fill="' + r.color + '">' + r.path + '</svg>';
        el.style.animation = 'floatReaction 2s ease-in-out ' + (i * 0.3) + 's infinite';
        reactionsContainer.appendChild(el);
      });
    }

    /* Add keyframe for reactions */
    if (!document.getElementById('sim-keyframes')) {
      var style = document.createElement('style');
      style.id = 'sim-keyframes';
      style.textContent =
        '@keyframes floatReaction {' +
        '0%,100%{transform:translateY(0) rotate(0deg)}' +
        '25%{transform:translateY(-6px) rotate(5deg)}' +
        '75%{transform:translateY(-4px) rotate(-5deg)}' +
        '}';
      document.head.appendChild(style);
    }
  })();

  /* ===== 12. Three.js Android Bot ===== */
  (function () {
    var canvas = document.getElementById('android-bot-canvas');
    var container = document.getElementById('android-bot-container');
    if (!canvas || !container) return;

    import('three').then(function (THREE) {
      Promise.all([
        import('three/addons/loaders/OBJLoader.js'),
        import('three/addons/controls/OrbitControls.js')
      ]).then(function (mods) {
        var OBJLoader = mods[0].OBJLoader;
        var OrbitControls = mods[1].OrbitControls;

        var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera(30, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 320);
        camera.lookAt(0, 0, 0);

        var renderer = new THREE.WebGLRenderer({
          canvas: canvas,
          alpha: true,
          antialias: true
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;

        scene.background = null;

        var controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 2;
        controls.enableZoom = false;
        controls.update();

        var envLight = new THREE.AmbientLight(0x404060, 0.6);
        scene.add(envLight);

        var keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
        keyLight.position.set(8, 12, 10);
        scene.add(keyLight);

        var fillLight = new THREE.DirectionalLight(0x3ddc84, 0.8);
        fillLight.position.set(-6, 4, 6);
        scene.add(fillLight);

        var rimLight = new THREE.DirectionalLight(0x4488ff, 0.6);
        rimLight.position.set(0, -8, -12);
        scene.add(rimLight);

        var greenLight = new THREE.PointLight(0x3ddc84, 0.4, 60);
        greenLight.position.set(0, -10, 8);
        scene.add(greenLight);

        // subtle green ground glow
        var glowRing = new THREE.Mesh(
          new THREE.RingGeometry(24, 38, 64),
          new THREE.MeshBasicMaterial({ color: 0x3ddc84, transparent: true, opacity: 0.06, side: THREE.DoubleSide })
        );
        glowRing.rotation.x = -Math.PI / 2;
        glowRing.position.y = -28;
        scene.add(glowRing);

        var modelGroup = new THREE.Group();
        scene.add(modelGroup);

        var mat = new THREE.MeshPhysicalMaterial({
          color: 0x3ddc84,
          metalness: 0.05,
          roughness: 0.25,
          clearcoat: 0.15,
          side: THREE.DoubleSide,
        });

        var modelParts = [];
        var partsToLoad = 6;
        var loaders = [
          'assets/android-bot/model_0.obj',
          'assets/android-bot/model_1.obj',
          'assets/android-bot/model_2.obj',
          'assets/android-bot/model_3.obj',
          'assets/android-bot/model_4.obj',
          'assets/android-bot/model_5.obj'
        ];

        function onPartLoaded(obj) {
          obj.traverse(function (child) {
            if (child.isMesh) {
              child.material = mat;
            }
          });
          modelParts.push(obj);
          partsToLoad--;
          if (partsToLoad === 0) assembleModel();
        }

        function assembleModel() {
          modelParts.forEach(function (p) { modelGroup.add(p); });

          var box = new THREE.Box3().setFromObject(modelGroup);
          var center = box.getCenter(new THREE.Vector3());
          var size = box.getSize(new THREE.Vector3());

          modelGroup.position.sub(center);

          var maxDim = Math.max(size.x, size.y, size.z);
          if (maxDim > 0) {
            var scale = 100 / maxDim;
            modelGroup.scale.setScalar(scale);
          }

          box.setFromObject(modelGroup);
          var halfZ = box.max.z;

          // Add black eyes
          var eyeMat = new THREE.MeshPhysicalMaterial({
            color: 0x000000,
            metalness: 0,
            roughness: 0.05,
          });

          var eyeY = box.min.y + size.y * 0.62;
          var eyeSpacing = size.x * 0.08 * scale;
          var eyeZ = halfZ + 2;

          [-1, 1].forEach(function (side) {
            var eye = new THREE.Mesh(new THREE.SphereGeometry(2.2, 16, 16), eyeMat);
            eye.position.set(side * eyeSpacing, eyeY, eyeZ);
            modelGroup.add(eye);
          });

          container.classList.add('loaded');
        }

        var loader = new OBJLoader();
        loaders.forEach(function (path) {
          loader.load(path, onPartLoaded, undefined, function () { partsToLoad--; if (partsToLoad === 0) assembleModel(); });
        });

        function resize() {
          var w = container.clientWidth;
          var h = container.clientHeight;
          if (w === 0 || h === 0) return;
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        }

        window.addEventListener('resize', resize);
        new ResizeObserver(function () { resize(); }).observe(container);

        function animate() {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }

        animate();
      });
    });
  })();

})();

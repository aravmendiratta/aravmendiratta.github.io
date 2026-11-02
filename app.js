/* ==========================================================================
   Arav Mendiratta — Studio Notebook Portfolio ('26) Interactive Script
   Includes EN / DE bilingual switcher, draggable sticky notes,
   domain filtering, and interactive studio receipt.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var currentLang = 'en';

  /* ------------------------------------------------------------------------
     0. Split-flap name board (#flap)
     Each run gets a token so a language switch / click can never leave
     half-finished timers scrambling tiles.
     ------------------------------------------------------------------------ */
  var FLAP = {
    en: [['GENERATIVE AI', 'FOR BUSINESS'], ['BIOINFORMATICS', 'AND HEALTH AI'], ['BUILDING', 'LLM AGENTS']],
    de: [['GENERATIVE KI', 'FUER BUSINESS'], ['BIOINFORMATIK', 'UND HEALTH KI'], ['ICH BAUE', 'LLM AGENTEN']]
  };
  var runFlap = function () {};
  var flapEl = document.getElementById('flap');
  if (flapEl) {
    var COLS = 15, ROWS = 2, LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var tiles = [], flapIdx = 0, flapTimer = null, flapToken = 0;
    flapEl.innerHTML = '';
    for (var fr = 0; fr < ROWS; fr++) {
      var rowEl = document.createElement('div');
      rowEl.className = 'flap-row';
      rowEl.setAttribute('aria-hidden', 'true');
      for (var fc = 0; fc < COLS; fc++) {
        var tile = document.createElement('span');
        tile.className = 'tile';
        tile.dataset.ch = ' ';
        tile.textContent = '\u00A0';
        tiles.push(tile);
        rowEl.appendChild(tile);
      }
      flapEl.appendChild(rowEl);
    }
    var setTile = function (el, ch) {
      el.dataset.ch = ch;
      el.textContent = ch === ' ' ? '\u00A0' : ch;
      el.classList.remove('tick');
      void el.offsetWidth;
      el.classList.add('tick');
    };
    var flapTarget = function () {
      var pair = (FLAP[currentLang] || FLAP.en)[flapIdx % 3];
      var out = '';
      for (var r = 0; r < ROWS; r++) {
        out += String(pair[r] || '').toUpperCase().slice(0, COLS).padEnd(COLS, ' ');
      }
      return out;
    };
    var nextFlap = function () {
      flapIdx = (flapIdx + 1) % 3;
      runFlap();
    };
    runFlap = function () {
      clearTimeout(flapTimer);
      var my = ++flapToken;
      var target = flapTarget();
      flapEl.setAttribute('aria-label', (FLAP[currentLang] || FLAP.en)[flapIdx % 3].join(' '));
      if (reduceMotion) {
        tiles.forEach(function (el, i) { setTile(el, target[i]); });
        flapTimer = setTimeout(nextFlap, 3000);
        return;
      }
      var pending = 0;
      tiles.forEach(function (el, i) {
        var finalCh = target[i];
        if (el.dataset.ch === finalCh) return;
        pending++;
        var spins = finalCh === ' ' ? 1 : 2 + (i % 3), n = 0;
        var step = function () {
          if (my !== flapToken) return;
          if (n < spins) {
            setTile(el, LETTERS[Math.floor(Math.random() * LETTERS.length)]);
            n++;
            setTimeout(step, 70);
          } else {
            setTile(el, finalCh);
            pending--;
            if (pending === 0) flapTimer = setTimeout(nextFlap, 3000);
          }
        };
        setTimeout(step, (i % COLS) * 35 + Math.floor(i / COLS) * 60);
      });
      if (pending === 0) flapTimer = setTimeout(nextFlap, 3000);
    };
    var flapCard = flapEl.closest('.note');
    if (flapCard) {
      flapCard.addEventListener('click', function () {
        if (flapCard._dragged) return;
        nextFlap();
      });
    }
    runFlap();
  }

  /* ------------------------------------------------------------------------
     1. Sticky-Note Hero Board Scaling & Dragging (#homeStage)
     ------------------------------------------------------------------------ */
  function layoutStages() {
    document.querySelectorAll('.stage[data-w]').forEach(function (st) {
      var wrap = st.parentElement;
      if (!wrap) return;
      var W = +st.dataset.w;
      var H = +st.dataset.h;
      var minW = +(st.dataset.min || 680);
      var maxScale = +(st.dataset.max || 1);
      var avail = wrap.clientWidth;

      if (avail < minW) {
        st.classList.add('flow');
        st.dataset.scale = '1';
        wrap.style.height = 'auto';
        st.style.width = '';
        st.style.height = '';
        st.style.transform = '';
      } else {
        st.classList.remove('flow');
        var fitH = Math.max((window.innerHeight - 230) / H, 0.85);
        var scale = Math.min(maxScale, avail / W, fitH);
        st.style.width = W + 'px';
        st.style.height = H + 'px';
        st.style.transform = 'translateX(-50%) scale(' + scale + ')';
        st.dataset.scale = String(scale);
        wrap.style.height = Math.round(H * scale) + 'px';
      }
    });
  }

  window.addEventListener('resize', layoutStages);
  window.addEventListener('load', layoutStages);
  layoutStages();

  var topZ = 15;
  var activeDrag = null;

  function bindDraggableNote(note) {
    note.addEventListener('pointerdown', function (e) {
      var interactive = e.target.closest('a, button, textarea');
      if (e.button !== 0 || (interactive && interactive !== note) || note.closest('.stage.flow')) {
        return;
      }
      e.preventDefault();
      var st = note.closest('.stage');
      var scale = st ? parseFloat(st.dataset.scale) || 1 : 1;
      activeDrag = {
        note: note,
        sx: e.clientX,
        sy: e.clientY,
        dx: parseFloat(note.style.getPropertyValue('--dx')) || 0,
        dy: parseFloat(note.style.getPropertyValue('--dy')) || 0,
        scale: scale,
        moved: false
      };
      note.style.zIndex = String(++topZ);
      note.classList.add('dragging');
      try {
        note.setPointerCapture(e.pointerId);
      } catch (_) {}
    });
  }

  window.addEventListener('pointermove', function (e) {
    if (!activeDrag) return;
    var deltaX = e.clientX - activeDrag.sx;
    var deltaY = e.clientY - activeDrag.sy;
    if (Math.abs(deltaX) + Math.abs(deltaY) > 4) {
      activeDrag.moved = true;
    }
    activeDrag.note.style.setProperty('--dx', (activeDrag.dx + deltaX / activeDrag.scale).toFixed(1) + 'px');
    activeDrag.note.style.setProperty('--dy', (activeDrag.dy + deltaY / activeDrag.scale).toFixed(1) + 'px');
  });

  function endNoteDrag() {
    if (!activeDrag) return;
    activeDrag.note.classList.remove('dragging');
    activeDrag.note._dragged = activeDrag.moved;
    activeDrag = null;
  }

  window.addEventListener('pointerup', endNoteDrag);
  window.addEventListener('pointercancel', endNoteDrag);

  document.querySelectorAll('.stage .note').forEach(bindDraggableNote);

  /* "+ add a sticky note" button */
  var noteColors = ['#F9CCE3', '#C9E4F8', '#FBD8B0', '#E4F1AE', '#FBE48C'];
  var addedNotes = 0;

  document.querySelectorAll('[data-add]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var st = document.getElementById(btn.dataset.add);
      if (!st) return;
      var note = document.createElement('div');
      note.className = 'note n-new';
      note.style.background = noteColors[addedNotes % noteColors.length];
      var leftPos = 60 + (addedNotes % 5) * 42;
      var topPos = 40 + (addedNotes % 3) * 32;
      note.style.left = leftPos + 'px';
      note.style.top = topPos + 'px';
      note.style.setProperty('--r', (addedNotes % 2 ? 2.2 : -2.2) + 'deg');
      note.style.zIndex = String(++topZ);
      var ph = currentLang === 'de' ? 'schreib eine kleine Notiz...' : 'write a little note...';
      note.innerHTML =
        '<textarea aria-label="Sticky note text" placeholder="' + ph + '"></textarea>' +
        '<button class="x" type="button" aria-label="Remove sticky note">✕</button>';
      note.querySelector('.x').addEventListener('click', function () {
        note.remove();
      });
      bindDraggableNote(note);
      st.appendChild(note);
      addedNotes++;
      var ta = note.querySelector('textarea');
      if (ta) ta.focus({ preventScroll: true });
    });
  });

  /* ------------------------------------------------------------------------
     3. Projects Dropdown Menu & Domain Filter Bar
     ------------------------------------------------------------------------ */
  var menu = document.getElementById('menu');
  var menuBtn = menu ? menu.querySelector('.menu-btn') : null;

  function closeMenu() {
    if (!menu || !menuBtn) return;
    menu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  if (menu && menuBtn) {
    menuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = menu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
        menuBtn.focus();
      }
    });
  }

  var filterBtns = document.querySelectorAll('.d-pill[data-filter]');
  var domainGroups = document.querySelectorAll('.domain-group[data-domain]');

  function setDomainFilter(domain) {
    filterBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.filter === domain);
    });
    domainGroups.forEach(function (grp) {
      grp.hidden = domain !== 'all' && grp.dataset.domain !== domain;
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setDomainFilter(btn.dataset.filter);
    });
  });

  document.querySelectorAll('[data-domain-jump]').forEach(function (link) {
    link.addEventListener('click', function () {
      var targetDomain = link.dataset.domainJump || 'all';
      setDomainFilter('all');
      closeMenu();
      if (targetDomain !== 'all') {
        setTimeout(function () {
          var el = document.querySelector('.domain-group[data-domain="' + targetDomain + '"]');
          if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        }, 40);
      }
    });
  });

  /* ------------------------------------------------------------------------
     4. Interactive Studio Receipt (.rcpt) + Language Switcher (EN / DE)
     ------------------------------------------------------------------------ */
  var rcpt = document.querySelector('.rcpt');
  var RECEIPT_MODES = {
    en: {
      work: {
        h: 'Generative AI for business transformation &amp; bioinformatics.',
        items: [
          ['Generative AI &amp; LLMs', 'x1'],
          ['Business Transformation', 'x1'],
          ['Bioinformatics &amp; Health AI', 'x1']
        ],
        total: ['ENGLISH + A LIL GERMAN', 'DUS · FR']
      },
      off: {
        h: 'Volleyball spikes, chess tactics &amp; street photography.',
        items: [
          ['volleyball 🏐', 'x1'],
          ['chess &amp; photos', 'x1'],
          ['espresso', '100%']
        ],
        total: ['TOTAL · VIBE', '100%']
      }
    },
    de: {
      work: {
        h: 'Generative KI für Business Transformation &amp; Bioinformatik.',
        items: [
          ['Generative KI &amp; LLMs', 'x1'],
          ['Business Transformation', 'x1'],
          ['Bioinformatik &amp; Health KI', 'x1']
        ],
        total: ['ENGLISCH + ETWAS DEUTSCH', 'DUS · FR']
      },
      off: {
        h: 'Volleyball-Spikes, Schach &amp; Street-Fotografie.',
        items: [
          ['Volleyball 🏐', 'x1'],
          ['Schach &amp; Fotos', 'x1'],
          ['Espresso', '100%']
        ],
        total: ['TOTAL · VIBE', '100%']
      }
    }
  };

  function renderReceipt(mode) {
    if (!rcpt) return;
    var rcBody = rcpt.querySelector('.rc-body');
    var rcTabs = rcpt.querySelectorAll('.rc-tabs button');
    var langDict = RECEIPT_MODES[currentLang] || RECEIPT_MODES.en;
    var d = langDict[mode] || langDict.work;
    if (!d || !rcBody) return;
    rcBody.innerHTML =
      '<hr><p class="rc-h">' + d.h + '</p><hr><ul class="rc-items">' +
      d.items.map(function (it) {
        return '<li><span>' + it[0] + '</span><i></i><span>' + it[1] + '</span></li>';
      }).join('') +
      '</ul><p class="rc-total"><span>' + d.total[0] + '</span><span>' + d.total[1] + '</span></p>';
    rcpt.dataset.mode = mode;
    rcTabs.forEach(function (t) {
      t.setAttribute('aria-pressed', String(t.dataset.mode === mode));
    });
  }

  if (rcpt) {
    var rcTabs = rcpt.querySelectorAll('.rc-tabs button');
    rcTabs.forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        e.stopPropagation();
        renderReceipt(tab.dataset.mode);
      });
    });

    var rcPaper = rcpt.querySelector('.rcpt-paper');
    if (rcPaper) {
      rcPaper.addEventListener('click', function () {
        renderReceipt(rcpt.dataset.mode === 'work' ? 'off' : 'work');
      });
    }
  }

  /* Language Toggle (EN / DE) */
  var langBtns = document.querySelectorAll('.lang-btn[data-lang]');
  function setLanguage(lang) {
    currentLang = lang === 'de' ? 'de' : 'en';
    document.documentElement.lang = currentLang;

    langBtns.forEach(function (b) {
      var active = b.dataset.lang === currentLang;
      b.classList.toggle('on', active);
      b.setAttribute('aria-pressed', String(active));
    });

    document.querySelectorAll('[data-en][data-de]').forEach(function (el) {
      var val = el.getAttribute('data-' + currentLang);
      if (val !== null) {
        el.innerHTML = val;
      }
    });

    if (rcpt) {
      renderReceipt(rcpt.dataset.mode || 'work');
    }
    runFlap();
  }

  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLanguage(btn.dataset.lang);
    });
  });

  /* ------------------------------------------------------------------------
     5. Back to Top & Scroll Spy for Pill Nav
     ------------------------------------------------------------------------ */
  var topBtn = document.getElementById('backToTop');
  if (topBtn) {
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  var navLinks = document.querySelectorAll('.pill > a[data-nav]');
  var sections = [
    { id: 'top', el: document.getElementById('top') },
    { id: 'about', el: document.getElementById('about') },
    { id: 'work', el: document.getElementById('work') },
    { id: 'research', el: document.getElementById('research') }
  ];

  function updateNavHighlight() {
    document.body.classList.toggle("scrolled", window.scrollY > 30);
    var y = window.scrollY + 180;
    var current = 'top';
    sections.forEach(function (s) {
      if (s.el && s.el.offsetTop <= y) {
        current = s.id;
      }
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('on', a.dataset.nav === current);
    });
    if (menuBtn) {
      menuBtn.classList.toggle('on', current === 'work');
    }
  }

  window.addEventListener('scroll', updateNavHighlight, { passive: true });

  /* ------------------------------------------------------------------------
     6. Personal Bio Pop-up Modal Note (#bioModal)
     ------------------------------------------------------------------------ */
  var bioModal = document.getElementById('bioModal');
  var openBioBtn = document.getElementById('openBioModal');
  var closeBioBtn = document.getElementById('closeBioModal');

  function openBio() {
    if (!bioModal) return;
    bioModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    if (openBioBtn) openBioBtn.setAttribute('aria-expanded', 'true');
    if (closeBioBtn) closeBioBtn.focus();
  }

  function closeBio() {
    if (!bioModal) return;
    bioModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (openBioBtn) {
      openBioBtn.setAttribute('aria-expanded', 'false');
      openBioBtn.focus();
    }
  }

  if (bioModal) {
    document.querySelectorAll('#openBioModal, .bio-modal-open-link').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openBio();
      });
    });
  }

  if (closeBioBtn) {
    closeBioBtn.addEventListener('click', closeBio);
  }

  if (bioModal) {
    bioModal.addEventListener('click', function (e) {
      if (e.target === bioModal) {
        closeBio();
      }
    });
  }

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && bioModal && !bioModal.hasAttribute('hidden')) {
      closeBio();
    }
  });
})();

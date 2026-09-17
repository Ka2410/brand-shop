'use strict';

/* ============================================
   LUX — ANIMATIONS ENGINE (Full + Mobile Fixes v2)
   ============================================ */
(function() {

  const DEBUG = true; // ← بدّلها false بعد ما تتأكد إن كل حاجة شغالة
  const log = (...args) => { if (DEBUG) console.log('[LUX]', ...args); };

  /* ============ UTILS ============ */
  const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = () => window.matchMedia('(hover: none)').matches;
  const isMobile = () => window.innerWidth < 900;

  function debounce(fn, ms) {
    let t;
    return function() {
      clearTimeout(t);
      const args = arguments, ctx = this;
      t = setTimeout(() => fn.apply(ctx, args), ms);
    };
  }

  function isInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
      rect.width > 0 && rect.height > 0 &&
      rect.bottom > 0 && rect.right > 0 &&
      rect.top < window.innerHeight && rect.left < window.innerWidth
    );
  }

  /* ============ 1 + 2. SCROLL REVEAL + STAGGER ============ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('in-view', entry.isIntersecting);
    });
  }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

  function initScrollReveal() {
    if (prefersReduced()) return;

    const autoSelectors = [
      '.section-head', '.collection-card', '.story-block', '.blog-card',
      '.blog-featured', '.instagram-post', '.newsletter h2', '.newsletter p',
      '.newsletter-form', '.review-card', '.order-card', '.pdp-why',
      '.pdp-trust-signals', '.pdp-accordion', '.pdp-social-proof',
      '.empty-state', '.error-visual', '.error-actions', '.error-suggestions-title'
    ];
    autoSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') &&
            !el.classList.contains('reveal-right') && !el.classList.contains('reveal-scale') &&
            !el.closest('.stagger')) {
          el.classList.add('reveal');
        }
      });
    });

    const staggerSelectors = ['.product-grid', '.collections-grid', '.values-grid', '.blog-grid'];
    staggerSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(grid => {
        if (!grid.classList.contains('stagger')) {
          grid.classList.add('stagger');
          [...grid.children].forEach((child, i) => {
            child.style.setProperty('--stagger-i', i);
            child.classList.remove('reveal', 'reveal-left', 'reveal-right', 'reveal-scale');
          });
        }
      });
    });

    document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger, ' +
      '.clip-reveal, .clip-reveal-center'
    ).forEach(el => revealObserver.observe(el));
  }

  /* ============ 3. HERO ENTRY ANIMATION ============ */
  let heroFirstPlay = true;
  let isPlayingHero = false;

  function waitForPreloader(cb) {
    let n = 0;
    const check = () => {
      const pre = document.getElementById('luxPreloader');
      if (!pre || pre.classList.contains('hide')) cb();
      else if (n++ < 100) setTimeout(check, 100);
      else cb();
    };
    check();
  }

  function initHeroEntry() {
    const hero = document.querySelector('.hero');
    if (!hero) { log('Hero not found — skipping Hero Entry'); return; }

    log('Hero found — waiting for Swiper init...');

    // ✅ Auto-inject hero-preload class لو مش موجود
    if (!hero.classList.contains('hero-preload')) {
      hero.classList.add('hero-preload');
      log('hero-preload class auto-injected');
    }

    if (prefersReduced()) {
      hero.classList.remove('hero-preload');
      return;
    }

    // ✅ استنى السلايدر يخد الـ classes
    let attempts = 0;
    const tryInit = () => {
      const active = hero.querySelector('.swiper-slide-active');
      const prev = hero.querySelector('.swiper-slide-prev');
      const next = hero.querySelector('.swiper-slide-next');

      if (active && prev && next) {
        log('Swiper ready — setting up Hero Observer');
        setupHeroObserver(hero);
      } else if (attempts++ < 80) {
        // 80 × 50ms = 4 ثواني كحد أقصى
        setTimeout(tryInit, 50);
      } else {
        log('Swiper timeout — forcing hero reveal');
        hero.classList.remove('hero-preload');
      }
    };
    tryInit();
  }

  function setupHeroObserver(hero) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isPlayingHero) {
          if (heroFirstPlay) {
            heroFirstPlay = false;
            waitForPreloader(() => {
              setTimeout(() => playHeroEntry(hero), 200);
            });
          } else {
            playHeroEntry(hero);
          }
        } else if (!entry.isIntersecting && !isPlayingHero) {
          resetHeroEntry(hero);
        }
      });
    }, {
      threshold: 0.15,          // ← قللنا من 0.3 عشان يشتغل أسرع على الموبايل
      rootMargin: '0px 0px -40px 0px'
    });
    heroObserver.observe(hero);
  }

  function playHeroEntry(hero) {
    if (isPlayingHero) return;
    isPlayingHero = true;
    log('Playing Hero Entry animation');

    const slides = hero.querySelectorAll('.swiper-slide');

    slides.forEach(slide => {
      const img = slide.querySelector('.hero-img');
      if (!img) return;

      if (slide.classList.contains('swiper-slide-active')) {
        img.style.animation = 'heroEnterCenter 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) both';
      } else if (slide.classList.contains('swiper-slide-prev')) {
        img.style.animation = 'heroEnterFromLeft 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s both';
      } else if (slide.classList.contains('swiper-slide-next')) {
        img.style.animation = 'heroEnterFromRight 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s both';
      }
    });

    hero.classList.remove('hero-preload');

    setTimeout(() => {
      slides.forEach(slide => {
        const img = slide.querySelector('.hero-img');
        if (img) img.style.animation = '';
      });
      isPlayingHero = false;
    }, 1800);
  }

  function resetHeroEntry(hero) {
    if (isPlayingHero) return;
    hero.querySelectorAll('.hero-img').forEach(img => { img.style.animation = ''; });
    hero.classList.add('hero-preload');
  }

  /* ============ 4. FLY TO CART ============ */
  function flyToCart(sourceEl, imgSrc, onArrive, forcedSize) {
    if (prefersReduced()) { if (onArrive) onArrive(); return; }

    const bagIcon = document.getElementById('bagOpen');
    if (!bagIcon || !sourceEl || !imgSrc) {
      log('flyToCart: missing bag/source/img', { bagIcon: !!bagIcon, sourceEl: !!sourceEl, imgSrc: !!imgSrc });
      if (onArrive) onArrive();
      return;
    }

    // رجّع الناف بار لو مخفي
    const navbar = document.querySelector('.navbar');
    if (navbar && navbar.classList.contains('navbar-hidden')) {
      navbar.classList.remove('navbar-hidden');
    }

    requestAnimationFrame(() => {
      const startRect = sourceEl.getBoundingClientRect();
      const endRect = bagIcon.getBoundingClientRect();

      const startX = startRect.left + startRect.width / 2;
      const startY = startRect.top + startRect.height / 2;
      const endX = endRect.left + endRect.width / 2;
      const endY = endRect.top + endRect.height / 2;

      let startSize = forcedSize || Math.min(startRect.width, startRect.height, 90);
      if (startSize < 60) startSize = 60;

      log('flyToCart', { startX, startY, endX, endY, startSize });

      const flyer = document.createElement('img');
      flyer.className = 'fly-to-cart';
      flyer.src = imgSrc;
      flyer.style.cssText = `
        position: fixed;
        left: ${startX - startSize / 2}px;
        top: ${startY - startSize / 2}px;
        width: ${startSize}px;
        height: ${startSize}px;
        z-index: 9996;
        pointer-events: none;
        object-fit: contain;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.18);
      `;
      document.body.appendChild(flyer);

      void flyer.offsetWidth;

      const deltaX = endX - startX;
      const deltaY = endY - startY;

      flyer.style.transition = 'transform 0.85s cubic-bezier(0.5, -0.3, 0.6, 1), opacity 0.85s cubic-bezier(0.5, 0, 0.6, 1)';
      flyer.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.15) rotate(20deg)`;
      flyer.style.opacity = '0.3';

      setTimeout(() => {
        flyer.remove();
        bagIcon.classList.remove('pulse');
        void bagIcon.offsetWidth;
        bagIcon.classList.add('pulse');
        if (onArrive) onArrive();
      }, 850);
    });
  }

  window.flyToCart = flyToCart;

  /* ============ 5. PAGE TRANSITIONS ============ */
  function initPageTransitions() {
    if (prefersReduced()) return;

    const trans = document.createElement('div');
    trans.className = 'page-transition';
    trans.id = 'pageTransition';
    trans.innerHTML = `<div class="page-transition-curtain"><div class="page-transition-logo">LUX</div></div>`;
    document.body.appendChild(trans);

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href) return;

      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') ||
          href.startsWith('#') || href.startsWith('javascript:') ||
          link.target === '_blank' || link.hasAttribute('download') ||
          e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const targetPath = href.split('?')[0].split('#')[0];
      if (targetPath === currentPath && !href.includes('?')) return;

      e.preventDefault();
      trans.classList.add('active', 'closing');
      setTimeout(() => { window.location.href = href; }, 650);
    });

    window.addEventListener('pageshow', () => {
      trans.classList.remove('active', 'closing', 'opening');
    });
  }

  /* ============ 6. COUNTERS ============ */
  function animateCounter(el, target, duration = 1600) {
    const startTime = performance.now();
    const decimals = (target % 1 !== 0) ? 1 : 0;
    const isRTL = document.documentElement.dir === 'rtl';
    const format = (n) => {
      const s = n.toFixed(decimals);
      return isRTL ? s.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]) : s;
    };
    const tick = (now) => {
      const p = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(target * eased);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = format(target);
    };
    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.counter);
        if (!isNaN(target)) animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  function initCounters() {
    document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));
    const big = document.getElementById('reviewsRatingBig');
    if (big && !big.dataset.counter) {
      const val = parseFloat(big.textContent);
      if (!isNaN(val)) {
        big.dataset.counter = val;
        big.classList.add('counter-number');
        counterObserver.observe(big);
      }
    }
  }

  /* ============ 7. PARALLAX (Desktop only) ============ */
  function initParallax() {
    if (prefersReduced() || isMobile()) return;
    const items = document.querySelectorAll('[data-parallax]');
    if (!items.length) return;
    let raf = null;
    const update = () => {
      const scrollY = window.scrollY;
      items.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        const rect = el.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2 + scrollY;
        const viewportCenter = scrollY + window.innerHeight / 2;
        const offset = (viewportCenter - centerY) * speed;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      raf = null;
    };
    window.addEventListener('scroll', () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  function applyHeroParallax() {
    if (prefersReduced() || isMobile()) return;
    document.querySelectorAll('.hero-img').forEach(img => {
      if (!img.dataset.parallax) img.dataset.parallax = '0.12';
    });
    initParallax();
  }

  /* ============ 8. CLIP REVEAL ============ */
  function initClipReveal() {
    ['.story-image img', '.blog-featured-image img'].forEach(sel => {
      document.querySelectorAll(sel).forEach(img => {
        if (!img.classList.contains('clip-reveal') && !img.classList.contains('clip-reveal-center')) {
          img.classList.add('clip-reveal');
          revealObserver.observe(img);
        }
      });
    });
  }

  /* ============ 9. MAGNETIC BUTTONS (Desktop only) ============ */
  function initMagneticButtons() {
    if (prefersReduced() || isTouch()) return;
    const selectors = ['.hero-btn', '.pdp-add-btn', '.pdp-buy-now', '.sticky-add-btn',
                       '.newsletter-form button', '.section-link', '.icon-btn'];
    document.querySelectorAll(selectors.join(',')).forEach(btn => {
      if (btn.dataset.magneticInit) return;
      btn.dataset.magneticInit = '1';
      btn.classList.add('magnetic');
      const strength = 0.35;
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ============ 10. 3D TILT (Desktop only) ============ */
  function initTilt() {
    if (prefersReduced() || isTouch()) return;
    document.querySelectorAll('.pdp-image, [data-tilt]').forEach(el => {
      if (el.dataset.tiltInit) return;
      el.dataset.tiltInit = '1';
      el.classList.add('tilt');
      if (el.parentElement) el.parentElement.classList.add('tilt-container');
      const MAX = 8;
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(1000px) rotateX(${-y * MAX}deg) rotateY(${x * MAX}deg) scale(1.02)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ============ 11. SOUND FX ============ */
  const SoundFX = {
    enabled: localStorage.getItem('lux_sound') !== 'false',
    ctx: null,
    init() {
      if (!this.enabled) return;
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        this.ctx = new Ctx();
      } catch {}
    },
    play(freq = 880, dur = 0.08, type = 'sine', vol = 0.03) {
      if (!this.enabled || !this.ctx) return;
      try {
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type; osc.frequency.value = freq; gain.gain.value = vol;
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);
        osc.stop(this.ctx.currentTime + dur);
      } catch {}
    },
    click() { this.play(880, 0.06, 'sine', 0.02); },
    success() { this.play(660, 0.08, 'sine', 0.025); setTimeout(() => this.play(990, 0.12, 'sine', 0.025), 70); }
  };
  window.SoundFX = SoundFX;

  /* ============ 12. CONFETTI ============ */
  function launchConfetti(originX, originY, count = 22) {
    if (prefersReduced()) return;
    let container = document.querySelector('.confetti-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'confetti-container';
      document.body.appendChild(container);
    }
    const colors = ['#0A0A0A', '#8B1538', '#F59E0B', '#16A34A', '#9A9A9A'];
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = originX + 'px';
      piece.style.top = originY + 'px';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      const w = 4 + Math.random() * 6;
      piece.style.width = w + 'px';
      piece.style.height = w + 'px';
      container.appendChild(piece);

      const angle = Math.random() * Math.PI * 2;
      const distance = 60 + Math.random() * 140;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - 60;
      const rot = (Math.random() - 0.5) * 720;

      piece.animate([
        { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(0.6)`, opacity: 0 }
      ], { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)' })
        .onfinish = () => piece.remove();
    }
  }
  window.launchConfetti = launchConfetti;

  /* ============ 13. MOBILE ANIMATIONS ============ */
  function haptic(ms = 10) {
    if (!navigator.vibrate) return;
    try { navigator.vibrate(ms); } catch {}
  }

  function initHapticFeedback() {
    if (!isTouch()) return;
    document.addEventListener('click', (e) => {
      const importantBtn = e.target.closest(
        '.pdp-add-btn, .pdp-buy-now, .sticky-add-btn, .hero-btn, ' +
        '.product-card-wish, #addBtn, #buyNowBtn, #wishBtn, ' +
        '.newsletter-form button, .checkout-nav .btn, ' +
        '.mobile-menu nav a, .mobile-menu-footer a, .cart-remove, .cart-save-later'
      );
      if (importantBtn) haptic(15);
    }, { passive: true });
  }

  function initNavbarAutoHide() {
    if (!isTouch()) return;
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    let lastScrollY = window.scrollY;
    let isHidden = false;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const diff = y - lastScrollY;
      if (y < 120) {
        if (isHidden) { navbar.classList.remove('navbar-hidden'); isHidden = false; }
      } else if (diff > 8 && !isHidden) {
        navbar.classList.add('navbar-hidden'); isHidden = true;
      } else if (diff < -8 && isHidden) {
        navbar.classList.remove('navbar-hidden'); isHidden = false;
      }
      lastScrollY = y;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
  }

  function initMobileAnimations() {
    initHapticFeedback();
    initNavbarAutoHide();
  }

  /* ============ HOOKS ============ */

  function findSourceElement(product) {
    // 1. Quick View
    const qvModal = document.getElementById('quickViewModal');
    if (qvModal && qvModal.classList.contains('show')) {
      const qvImg = qvModal.querySelector('.quick-view-image img');
      if (isInViewport(qvImg)) return { el: qvImg, img: qvImg.src, forcedSize: null };
    }
    // 2. PDP
    const pdpImg = document.querySelector('.pdp-image img');
    if (isInViewport(pdpImg)) return { el: pdpImg, img: pdpImg.src, forcedSize: null };
    // 3. Product Card
    if (product && product.id) {
      const cardImg = document.querySelector(`[data-product-id="${product.id}"] .product-card-image img`);
      if (isInViewport(cardImg)) return { el: cardImg, img: cardImg.src, forcedSize: null };
    }
    // 4. Mobile fallback — استخدم زر Sticky Add لو موجود
    if (isMobile() || isTouch()) {
      const stickyBtn = document.getElementById('stickyAddBtn') || document.getElementById('stickyBuyBtn');
      const anyImg = document.querySelector('.pdp-image img') ||
                     (product ? document.querySelector(`[data-product-id="${product.id}"] .product-card-image img`) : null);
      if (stickyBtn && isInViewport(stickyBtn)) {
        return {
          el: stickyBtn,
          img: anyImg ? anyImg.src : (product?.images?.[0] || null),
          forcedSize: 70
        };
      }
    }
    // 5. Fallback: وسط الشاشة
    const anyImg = document.querySelector('.product-card-image img, .pdp-image img, .quick-view-image img');
    if (anyImg) return { el: anyImg, img: anyImg.src, forcedSize: 70 };
    if (product?.images?.[0]) {
      const virtual = document.createElement('div');
      virtual.style.cssText = 'position:fixed;left:50%;top:50%;width:1px;height:1px;pointer-events:none;';
      document.body.appendChild(virtual);
      setTimeout(() => virtual.remove(), 1200);
      return { el: virtual, img: product.images[0], forcedSize: 70 };
    }
    return null;
  }

  function triggerFlySequence(product) {
    const source = findSourceElement(product);
    if (!source || !source.el || !source.img) {
      log('Fly: no source found');
      return;
    }
    log('Fly: source found →', source.el.tagName, source.forcedSize ? `(forced ${source.forcedSize}px)` : '');
    flyToCart(source.el, source.img, () => {
      const bag = document.getElementById('bagOpen');
      if (bag) {
        const r = bag.getBoundingClientRect();
        launchConfetti(r.left + r.width / 2, r.top + r.height / 2, 18);
      }
      SoundFX.success();
    }, source.forcedSize);
  }

  function hookAddToCart() {
    if (typeof window.addToCart !== 'function') {
      setTimeout(hookAddToCart, 150);
      return;
    }
    if (window.addToCart.__hooked) return;

    const original = window.addToCart;
    window.addToCart = function(product, size, color, qty = 1) {
      try { triggerFlySequence(product); }
      catch (err) { console.warn('[LUX] flyToCart failed:', err); }
      return original.apply(this, arguments);
    };
    window.addToCart.__hooked = true;
    log('✅ addToCart hooked — fly-to-cart active');
  }

  function hookWishlist() {
    if (typeof window.toggleWishlist !== 'function' || window.toggleWishlist.__hooked) return;
    const original = window.toggleWishlist;
    window.toggleWishlist = function(id) {
      const added = original.apply(this, arguments);
      if (added) SoundFX.click();
      return added;
    };
    window.toggleWishlist.__hooked = true;
  }

  function hookButtonSounds() {
    if (document.body.dataset.btnSoundsHook) return;
    document.body.dataset.btnSoundsHook = '1';
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('button.btn, .icon-btn, .filter-btn, .sort-btn, .chip, .pdp-size, .pdp-color');
      if (btn) SoundFX.click();
    }, { passive: true });
  }

  /* ============ INIT ============ */
  function initAnimations() {
    log('Init Animations', {
      mobile: isMobile(),
      touch: isTouch(),
      reduced: prefersReduced(),
      products: typeof PRODUCTS !== 'undefined' ? PRODUCTS.length : 0
    });

    SoundFX.init();
    initScrollReveal();
    initHeroEntry();
    initPageTransitions();
    initCounters();
    initClipReveal();
    initMagneticButtons();
    initTilt();
    applyHeroParallax();
    initMobileAnimations();

    setTimeout(() => {
      hookAddToCart();
      hookWishlist();
      hookButtonSounds();
    }, 150);

    const reInit = debounce(() => {
      initScrollReveal();
      initCounters();
      initClipReveal();
      initMagneticButtons();
      initTilt();
    }, 150);
    new MutationObserver(reInit).observe(document.body, { childList: true, subtree: true });
  }

  // ✅ شغّل بعد DOMContentLoaded + شوية عشان نضمن إن السلايدر جاهز
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initAnimations, 100);
    });
  } else {
    setTimeout(initAnimations, 100);
  }
})();
/**
 * Main JS Script for Innov'Eclat CI
 * Mode : Clair + Sombre (bascule persistante) - FormSubmit activé pour l'envoi réel des formulaires
 */

document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------------------
  // 0. Global Image Watermark (désactivé)
  // ----------------------------------------------------
  // Désactivé - les images restent propres sans watermark.

  // ----------------------------------------------------
  // 1. Page Loader - Avec protection contre le double déclenchement
  // ----------------------------------------------------
  const loader = document.getElementById('page-loader');
  if (loader) {
    let loaderHidden = false;

    const hideLoader = () => {
      if (loaderHidden) return;
      loaderHidden = true;
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    };

    window.addEventListener('load', hideLoader);
    // Fallback : masquer après 2s si 'load' ne se déclenche pas
    setTimeout(hideLoader, 2000);
  }

  // ----------------------------------------------------
  // 2. Sticky Navbar (Mode Clair)
  // ----------------------------------------------------
  const navbar = document.getElementById('main-navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Appel initial
  }

  // ----------------------------------------------------
  // 3. Mobile Menu Drawer
  // ----------------------------------------------------
  const menuToggleBtn = document.getElementById('menu-toggle');
  const menuCloseBtn  = document.getElementById('menu-close');
  const mobileMenu    = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

  if (menuToggleBtn && mobileMenu) {
    const openMenu = () => {
      mobileMenu.classList.remove('translate-x-full');
      document.body.classList.add('overflow-hidden');
    };

    const closeMenu = () => {
      mobileMenu.classList.add('translate-x-full');
      document.body.classList.remove('overflow-hidden');
    };

    menuToggleBtn.addEventListener('click', openMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);

    mobileMenuLinks.forEach(link => link.addEventListener('click', closeMenu));

    // Fermer en cliquant en dehors du panneau
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) closeMenu();
    });
  }

  // ----------------------------------------------------
  // 4. Hero Background Slider (index.html)
  //    Déplacé depuis le script inline de index.html
  // ----------------------------------------------------
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let currentHeroSlide = 0;
    setInterval(() => {
      heroSlides[currentHeroSlide].classList.remove('opacity-100');
      heroSlides[currentHeroSlide].classList.add('opacity-0');
      currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
      heroSlides[currentHeroSlide].classList.remove('opacity-0');
      heroSlides[currentHeroSlide].classList.add('opacity-100');
    }, 5000);
  }

  // ----------------------------------------------------
  // 5. Scroll Reveal Animations (Intersection Observer)
  // ----------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Arrêter l'observation une fois animé
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => revealObserver.observe(element));
  } else {
    // Fallback : activer immédiatement si IntersectionObserver non disponible
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ----------------------------------------------------
  // 6. Compteurs de Statistiques Animés
  // ----------------------------------------------------
  const counterElements = document.querySelectorAll('.stats-counter');

  const animateCounter = (element) => {
    const target    = parseInt(element.getAttribute('data-target'), 10);
    const duration  = 2000; // 2 secondes
    const stepTime  = 20;
    const steps     = duration / stepTime;
    const increment = target / steps;
    let current     = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.ceil(current);
      }
    }, stepTime);
  };

  if ('IntersectionObserver' in window && counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(counter => counterObserver.observe(counter));
  } else {
    counterElements.forEach(counter => {
      counter.textContent = counter.getAttribute('data-target');
    });
  }

  // ----------------------------------------------------
  // 7. Comparateur Avant/Après (Drag & Swipe)
  // ----------------------------------------------------
  const baContainer = document.querySelector('.before-after-container');
  if (baContainer) {
    const sliderHandle        = baContainer.querySelector('.slider-handle');
    const afterImageContainer = baContainer.querySelector('.after-image-container');
    let isDragging = false;

    const updateSlider = (clientX) => {
      const rect       = baContainer.getBoundingClientRect();
      let percentage   = ((clientX - rect.left) / rect.width) * 100;
      percentage = Math.max(0, Math.min(100, percentage));
      sliderHandle.style.left             = `${percentage}%`;
      afterImageContainer.style.clipPath  = `inset(0 ${100 - percentage}% 0 0)`;
    };

    // Evénements Souris
    baContainer.addEventListener('mousedown', (e) => { isDragging = true; updateSlider(e.clientX); });
    window.addEventListener('mousemove',      (e) => { if (isDragging) updateSlider(e.clientX); });
    window.addEventListener('mouseup',         ()  => { isDragging = false; });

    // Evénements Tactiles (Mobile/Tablette)
    baContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches.length > 0) updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length > 0) updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => { isDragging = false; });
  }

  // ----------------------------------------------------
  // 8. Carrousel de Témoignages - Autoplay 7s
  // ----------------------------------------------------
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const nextBtn           = document.getElementById('testimonial-next');
  const prevBtn           = document.getElementById('testimonial-prev');
  const dotsContainer     = document.getElementById('testimonial-dots');

  if (testimonialSlides.length > 0) {
    let currentSlide = 0;
    const slideCount = testimonialSlides.length;
    let autoPlayInterval;

    // Créer les points indicateurs
    if (dotsContainer) {
      testimonialSlides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = idx === 0
          ? 'w-6 h-3 rounded-full bg-primary-500 ring-2 ring-primary-500/25 transition-all duration-300'
          : 'w-3 h-3 rounded-full bg-slate-300 transition-all duration-300';
        dot.setAttribute('aria-label', `Témoignage ${idx + 1}`);
        dot.addEventListener('click', () => { goToSlide(idx); resetAutoPlay(); });
        dotsContainer.appendChild(dot);
      });
    }

    const updateDots = () => {
      if (!dotsContainer) return;
      dotsContainer.querySelectorAll('button').forEach((dot, idx) => {
        dot.className = idx === currentSlide
          ? 'w-6 h-3 rounded-full bg-primary-500 ring-2 ring-primary-500/25 transition-all duration-300'
          : 'w-3 h-3 rounded-full bg-slate-300 transition-all duration-300';
      });
    };

    const goToSlide = (index) => {
      testimonialSlides.forEach(slide => {
        slide.classList.add('hidden', 'opacity-0');
        slide.classList.remove('block', 'opacity-100');
      });
      currentSlide = (index + slideCount) % slideCount;
      testimonialSlides[currentSlide].classList.remove('hidden', 'opacity-0');
      testimonialSlides[currentSlide].classList.add('block', 'opacity-100');
      updateDots();
    };

    const nextSlide = () => goToSlide(currentSlide + 1);
    const prevSlide = () => goToSlide(currentSlide - 1);

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

    const startAutoPlay  = () => { autoPlayInterval = setInterval(nextSlide, 7000); };
    const resetAutoPlay  = () => { clearInterval(autoPlayInterval); startAutoPlay(); };

    goToSlide(0);
    startAutoPlay();

    // Swipe mobile tactile sur le carrousel
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleGesture = () => {
      const swipeThreshold = 50; // distance minimale de swipe en px
      if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
        resetAutoPlay();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
        resetAutoPlay();
      }
    };

    const carouselContainer = document.querySelector('.testimonial-carousel-container');
    if (carouselContainer) {
      // Pause au survol de la souris
      carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
      carouselContainer.addEventListener('mouseleave', resetAutoPlay);

      // Listeners tactiles
      carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      carouselContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
      }, { passive: true });
    }
  }

  // ----------------------------------------------------
  // 9. Bouton Retour en Haut
  // ----------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
        backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
        backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ----------------------------------------------------
  // 10. Formulaire de Contact — Envoi via FormSubmit.co
  // ----------------------------------------------------
  // Fonctionnement :
  //   Le formulaire HTML pointe vers https://formsubmit.co/ajax/infos@innoveclat.ci
  //   Ce script intercepte la soumission, envoie les données en AJAX
  //   et affiche un retour visuel (succès ou erreur) sans rechargement de page.
  //
  //   ⚠️ PREMIÈRE UTILISATION : FormSubmit envoie un email d'activation
  //   à infos@innoveclat.ci lors du tout premier envoi. Il faut cliquer
  //   sur le lien de confirmation reçu pour activer la réception des messages.
  // ----------------------------------------------------

  const contactForm = document.getElementById('innov-contact-form');

  if (contactForm) {

    // --- Éléments de feedback ---
    const successAlert = document.getElementById('form-success-alert');
    const errorAlert   = document.getElementById('form-error-alert');

    // --- Bouton Envoyer ---
    const submitBtn  = contactForm.querySelector('button[type="submit"]');
    const btnText    = submitBtn ? submitBtn.querySelector('.btn-text')    : null;
    const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;

    // Passer le bouton en état "chargement"
    function setBtnLoading() {
      if (submitBtn)  submitBtn.disabled = true;
      if (btnText)    btnText.classList.add('hidden');
      if (btnSpinner) btnSpinner.classList.remove('hidden');
    }

    // Restaurer le bouton en état normal
    function setBtnReady() {
      if (submitBtn)  submitBtn.disabled = false;
      if (btnText)    btnText.classList.remove('hidden');
      if (btnSpinner) btnSpinner.classList.add('hidden');
    }

    // Masquer toutes les alertes
    function hideAlerts() {
      if (successAlert) successAlert.classList.add('hidden');
      if (errorAlert)   errorAlert.classList.add('hidden');
    }

    // Afficher l'alerte de succès
    function showSuccess() {
      if (successAlert) {
        successAlert.classList.remove('hidden');
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    // Afficher l'alerte d'erreur
    function showError(msg) {
      console.error('[Formulaire Innov\'Eclat]', msg);
      if (errorAlert) {
        errorAlert.classList.remove('hidden');
        errorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    // --- Gestion de la soumission ---
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      // 1. Masquer les alertes précédentes
      hideAlerts();

      // 2. Vérification HTML5 des champs obligatoires
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      // 3. Passer en mode chargement
      setBtnLoading();

      try {
        // 4. Construire et envoyer le formulaire
        const formData = new FormData(contactForm);

        const response = await fetch('https://formsubmit.co/ajax/infos@innoveclat.ci', {
          method : 'POST',
          headers: { 'Accept': 'application/json' },
          body   : formData
        });

        // 5. Analyser la réponse
        let result;
        try {
          result = await response.json();
        } catch (_) {
          result = {};
        }

        setBtnReady();

        // FormSubmit répond { success: "true" } ou { success: true } en cas de succès
        const isSuccess = response.ok && (result.success === true || result.success === 'true');

        if (isSuccess) {
          showSuccess();
          contactForm.reset();
        } else {
          showError(result.message || 'Réponse inattendue du serveur (HTTP ' + response.status + ')');
        }

      } catch (networkError) {
        // Erreur réseau (pas de connexion, timeout, etc.)
        setBtnReady();
        showError('Erreur réseau — vérifiez votre connexion Internet. Détail : ' + networkError.message);
      }
    });

  }

  // ----------------------------------------------------
  // 11. Dock de Contact Flottant (macOS Style)
  // ----------------------------------------------------
  const contactDock  = document.getElementById('floating-contact-dock');
  const closeDockBtn = document.getElementById('close-floating-dock');

  if (contactDock) {
    let dockTimeout;
    let isHovered       = false;
    let isDockDismissed = false;

    const showDock = () => {
      if (isDockDismissed) return;
      contactDock.classList.remove('translate-y-24', 'opacity-0', 'scale-95');
      contactDock.classList.add('translate-y-0', 'opacity-100', 'scale-100');
    };

    const hideDock = () => {
      contactDock.classList.add('translate-y-24', 'opacity-0', 'scale-95');
      contactDock.classList.remove('translate-y-0', 'opacity-100', 'scale-100');
    };

    window.addEventListener('scroll', () => {
      if (isDockDismissed) return;
      clearTimeout(dockTimeout);
      if (window.scrollY > 300) {
        showDock();
        if (!isHovered) dockTimeout = setTimeout(hideDock, 3000);
      } else {
        hideDock();
      }
    });

    // Pause au survol
    contactDock.addEventListener('mouseenter', () => {
      if (isDockDismissed) return;
      isHovered = true;
      clearTimeout(dockTimeout);
    });

    contactDock.addEventListener('mouseleave', () => {
      if (isDockDismissed) return;
      isHovered = false;
      if (window.scrollY > 300) dockTimeout = setTimeout(hideDock, 3000);
    });

    if (closeDockBtn) {
      closeDockBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isDockDismissed = true;
        hideDock();
        clearTimeout(dockTimeout);
      });
    }
  }

  // ----------------------------------------------------
  // 12. Section Vidéo Cinématique - Autoplay + Bouton Son
  // ----------------------------------------------------
  const showcaseVideo = document.getElementById('showcase-video');
  const videoOverlay  = document.getElementById('video-overlay');
  const muteBtnEl     = document.getElementById('video-mute-btn');
  const muteIconEl    = document.getElementById('mute-icon');
  const muteLabelEl   = document.getElementById('mute-label');

  if (showcaseVideo) {
    // Ne pas définir de volume non nul avant interaction pour préserver l'autoplay
    showcaseVideo.muted = true;

    const showOverlay = () => {
      if (videoOverlay) videoOverlay.classList.remove('opacity-0', 'pointer-events-none');
    };
    const hideOverlay = () => {
      if (videoOverlay) videoOverlay.classList.add('opacity-0', 'pointer-events-none');
    };

    showcaseVideo.addEventListener('play',  hideOverlay);
    showcaseVideo.addEventListener('pause', () => {
      if (!showcaseVideo.ended) showOverlay();
    });

    if (videoOverlay) {
      videoOverlay.addEventListener('click', () => {
        showcaseVideo.play();
        hideOverlay();
      });
    }

    // Gestion du bouton Mute / Unmute
    const updateMuteBtn = () => {
      if (!muteBtnEl || !muteIconEl || !muteLabelEl) return;
      if (showcaseVideo.muted) {
        muteIconEl.className    = 'fa fa-volume-xmark text-sm';
        muteLabelEl.textContent = 'Son coupé';
        muteBtnEl.title         = 'Activer le son (volume 40%)';
        muteBtnEl.classList.remove('opacity-0', 'pointer-events-none', 'group-hover:opacity-100', 'group-hover:pointer-events-auto');
        muteBtnEl.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        muteIconEl.className    = 'fa fa-volume-high text-sm';
        muteLabelEl.textContent = 'Son activé';
        muteBtnEl.title         = 'Couper le son';
        muteBtnEl.classList.remove('opacity-100', 'pointer-events-auto');
        muteBtnEl.classList.add('opacity-0', 'pointer-events-none', 'group-hover:opacity-100', 'group-hover:pointer-events-auto');
      }
    };

    if (muteBtnEl) {
      muteBtnEl.addEventListener('click', () => {
        if (showcaseVideo.muted) {
          showcaseVideo.muted  = false;
          showcaseVideo.volume = 0.4;
        } else {
          showcaseVideo.muted = true;
        }
        updateMuteBtn();
      });
    }

    showcaseVideo.addEventListener('volumechange', updateMuteBtn);
    updateMuteBtn(); // Etat initial
  }

  // ----------------------------------------------------
  // 13. Gestionnaire de Thème (Clair / Sombre)
  // ----------------------------------------------------
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');

  // Fonction pour mettre à jour les icônes sur tous les boutons de la page
  const updateThemeIcons = (isDark) => {
    themeToggleBtns.forEach(btn => {
      const sunIcon = btn.querySelector('.theme-icon-light');
      const moonIcon = btn.querySelector('.theme-icon-dark');
      if (isDark) {
        if (sunIcon) sunIcon.classList.remove('hidden');
        if (moonIcon) moonIcon.classList.add('hidden');
      } else {
        if (sunIcon) sunIcon.classList.add('hidden');
        if (moonIcon) moonIcon.classList.remove('hidden');
      }
    });
  };

  // Initialisation visuelle au chargement
  const isCurrentlyDark = document.documentElement.classList.contains('dark');
  updateThemeIcons(isCurrentlyDark);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('innoveclat-theme', isDark ? 'dark' : 'light');
      updateThemeIcons(isDark);
    });
  });

});

/**
 * Main JS Script for Innov'Éclat CI
 */

document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------------------
  // 0. Global Image Watermark (Innov'Éclat logo overlay)
  // ----------------------------------------------------
  const applyImageWatermark = () => {
    const imgs = Array.from(document.querySelectorAll('img'));
    imgs.forEach((img) => {
      const src = (img.getAttribute('src') || '').toLowerCase();
      if (!src) return;

      // Don't watermark the brand logo, favicon, or already-processed images
      if (src.includes('assets/images/logo.png') || src.includes('assets/images/favicon')) return;
      if (img.closest('.img-watermark')) return;

      const wrapper = document.createElement('span');
      wrapper.className = 'img-watermark';
      wrapper.setAttribute('aria-hidden', 'true');

      // Preserve flow and common sizing behavior
      if (img.className) wrapper.classList.add(...img.className.split(' ').filter(Boolean));
      img.className = '';

      img.parentNode?.insertBefore(wrapper, img);
      wrapper.appendChild(img);
    });
  };

  // ----------------------------------------------------
  // 1. Page Loader
  // ----------------------------------------------------
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    });
    // Fallback if load event already fired or delayed
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 2000);
  }

  // ----------------------------------------------------
  // 2. Dark/Light Theme Handler
  // ----------------------------------------------------
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  const enableDarkMode = () => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    updateThemeIcons(true);
  };

  const disableDarkMode = () => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    updateThemeIcons(false);
  };

  const updateThemeIcons = (isDark) => {
    themeToggles.forEach(toggle => {
      const darkIcon = toggle.querySelector('.theme-toggle-dark');
      const lightIcon = toggle.querySelector('.theme-toggle-light');
      if (isDark) {
        if (darkIcon) darkIcon.classList.add('hidden');
        if (lightIcon) lightIcon.classList.remove('hidden');
      } else {
        if (darkIcon) darkIcon.classList.remove('hidden');
        if (lightIcon) lightIcon.classList.add('hidden');
      }
    });
  };

  // Check saved theme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }

  // Bind toggle click
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      if (document.documentElement.classList.contains('dark')) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });
  });

  // ----------------------------------------------------
  // 3. Sticky Navbar
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
    handleScroll(); // Initial call
  }

  // ----------------------------------------------------
  // 4. Mobile Menu Drawer
  // ----------------------------------------------------
  const menuToggleBtn = document.getElementById('menu-toggle');
  const menuCloseBtn = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
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
    
    // Close menu on clicking links
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on click outside drawer content
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        closeMenu();
      }
    });
  }

  // ----------------------------------------------------
  // 5. Scroll Reveal Animations (Intersection Observer)
  // ----------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
  
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback: activate everything immediately if browser does not support IntersectionObserver
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ----------------------------------------------------
  // 6. Statistics Counter Animation
  // ----------------------------------------------------
  const counterElements = document.querySelectorAll('.stats-counter');
  
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

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
    }, {
      threshold: 0.5
    });

    counterElements.forEach(counter => {
      counterObserver.observe(counter);
    });
  } else {
    // Fallback
    counterElements.forEach(counter => {
      counter.textContent = counter.getAttribute('data-target');
    });
  }

  // ----------------------------------------------------
  // 7. Before/After Image Slider Drag-and-Swipe Logic
  // ----------------------------------------------------
  const baContainer = document.querySelector('.before-after-container');
  if (baContainer) {
    const sliderHandle = baContainer.querySelector('.slider-handle');
    const afterImageContainer = baContainer.querySelector('.after-image-container');
    let isDragging = false;

    const updateSlider = (clientX) => {
      const rect = baContainer.getBoundingClientRect();
      const positionX = clientX - rect.left;
      let percentage = (positionX / rect.width) * 100;

      // Keep inside bounds
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;

      // Update positions
      sliderHandle.style.left = `${percentage}%`;
      afterImageContainer.style.width = `${percentage}%`;
    };

    // Mouse Events
    baContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch Events (Mobile/Tablet support)
    baContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches.length > 0) {
        updateSlider(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches.length > 0) {
        updateSlider(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // ----------------------------------------------------
  // 8. Testimonials Carousel / Slider
  // ----------------------------------------------------
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const nextBtn = document.getElementById('testimonial-next');
  const prevBtn = document.getElementById('testimonial-prev');
  const dotsContainer = document.getElementById('testimonial-dots');

  applyImageWatermark();

  if (testimonialSlides.length > 0) {
    let currentSlide = 0;
    const slideCount = testimonialSlides.length;
    let autoPlayInterval;

    // Create dot indicators
    if (dotsContainer) {
      testimonialSlides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-primary-500 dark:bg-secondary-400 w-6 ring-2 ring-primary-500/25 dark:ring-secondary-400/25' : 'bg-slate-300 dark:bg-slate-700'}`;
        dot.setAttribute('aria-label', `Slide ${idx + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(idx);
          resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
      });
    }

    const updateDots = () => {
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('button');
        dots.forEach((dot, idx) => {
          if (idx === currentSlide) {
            dot.className = 'w-3 h-3 rounded-full bg-primary-500 dark:bg-secondary-400 w-6 ring-2 ring-primary-500/25 dark:ring-secondary-400/25 transition-all duration-300';
          } else {
            dot.className = 'w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 transition-all duration-300';
          }
        });
      }
    };

    const goToSlide = (index) => {
      testimonialSlides.forEach(slide => {
        slide.classList.add('hidden', 'opacity-0');
        slide.classList.remove('block', 'opacity-100');
      });

      // Clamp index
      currentSlide = (index + slideCount) % slideCount;
      
      testimonialSlides[currentSlide].classList.remove('hidden', 'opacity-0');
      testimonialSlides[currentSlide].classList.add('block', 'opacity-100');
      updateDots();
    };

    const nextSlide = () => {
      goToSlide(currentSlide + 1);
    };

    const prevSlide = () => {
      goToSlide(currentSlide - 1);
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
      });
    }

    // Auto Play
    const startAutoPlay = () => {
      autoPlayInterval = setInterval(nextSlide, 15000); // 15 seconds
    };

    const resetAutoPlay = () => {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    };

    // Initial load
    goToSlide(0);
    startAutoPlay();

    // Pause autoPlay on hover
    const carouselContainer = document.querySelector('.testimonial-carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
      carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
  }

  // ----------------------------------------------------
  // 9. Back to Top Button
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
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ----------------------------------------------------
  // 10. Interactive Contact Form (Client Simulation)
  // ----------------------------------------------------
  const contactForm = document.getElementById('innov-contact-form');
  if (contactForm) {
    const successAlert = document.getElementById('form-success-alert');
    const errorAlert = document.getElementById('form-error-alert');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear previous alerts
      if (successAlert) successAlert.classList.add('hidden');
      if (errorAlert) errorAlert.classList.add('hidden');

      // Check validation
      if (!contactForm.checkValidity()) {
        return;
      }

      // Show spinner & disable button
      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.classList.add('hidden');
      if (btnSpinner) btnSpinner.classList.remove('hidden');

      // Simulate network request (1.5s delay)
      setTimeout(() => {
        const emailInput = contactForm.querySelector('input[type="email"]');
        
        // Randomly simulate success or failure (95% success for normal operation)
        const isSuccess = Math.random() < 0.95;

        // Reset button state
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.classList.remove('hidden');
        if (btnSpinner) btnSpinner.classList.add('hidden');

        if (isSuccess) {
          if (successAlert) {
            successAlert.classList.remove('hidden');
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          contactForm.reset();
        } else {
          if (errorAlert) {
            errorAlert.classList.remove('hidden');
            errorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      }, 1500);
    });
  }

});

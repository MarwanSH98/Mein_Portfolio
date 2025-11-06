// ========== GLOBALE VARIABLEN ==========
const themeToggle = document.getElementById("theme-toggle");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const hamburger = document.querySelector(".hamburger");
const scrollTopButton = document.getElementById("scroll-top");
const contactForm = document.getElementById("contactForm");
const navLinks = document.querySelectorAll('a[href^="#"]');

// ========== DARK MODE TOGGLE ==========
function toggleDarkMode() {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("color-theme", "light");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("color-theme", "dark");
  }
}

function loadThemePreference() {
  const saved = localStorage.getItem("color-theme") || "dark";
  if (saved === "dark") document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
}


// ========== MOBILE MENU TOGGLE ==========
function toggleMobileMenu() {
  mobileMenu.classList.toggle("hidden");
  hamburger.classList.toggle("open");
}

// ========== AKTIVE SECTION HERVORHEBEN ==========
function highlightActiveSection() {
  const scrollPosition = window.scrollY + 80; // Berücksichtige Navbar-Höhe (80px)
  let activeSectionFound = false;

  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop - 100; // Puffer für bessere Sichtbarkeit
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
          activeSectionFound = true;
        }
      });
    }
  });

  // Entferne active-Klasse, wenn keine Sektion aktiv ist
  if (!activeSectionFound) {
    navLinks.forEach((link) => link.classList.remove("active"));
  }
}

// ========== FORMULAR VALIDIERUNG ==========
function validateForm(e) {
  e.preventDefault();

  // Formular-Daten sammeln
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Einfache Validierung
  if (!data.name || !data.email || !data.message) {
    alert("Bitte füllen Sie alle erforderlichen Felder aus.");
    return;
  }

  // Email Validierung
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    alert("Bitte geben Sie eine gültige Email-Adresse ein.");
    return;
  }

  // Formular absenden
  contactForm.submit();

  // Formular leeren
  contactForm.reset();
}

// ========== SCROLL TO TOP ==========
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function handleScroll() {
  if (window.pageYOffset > 300) {
    scrollTopButton.classList.remove("opacity-0", "invisible");
    scrollTopButton.classList.add("opacity-100", "visible");
  } else {
    scrollTopButton.classList.remove("opacity-100", "visible");
    scrollTopButton.classList.add("opacity-0", "invisible");
  }
}

// ========== SMOOTH SCROLLING ==========
function smoothScroll(e) {
  e.preventDefault();

  const targetId = this.getAttribute("href");
  if (targetId === "#") return;

  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: "smooth",
    });
  }

  // Schließe Mobile Menu nach Klick auf Link
  if (!mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.add("hidden");
    hamburger.classList.remove("open");
  }
}

// ========== NAVBAR BACKGROUND CHANGE ==========
function handleNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (window.pageYOffset > 50) {
    navbar.classList.add("shadow-md");
    navbar.classList.remove("bg-white/80", "dark:bg-dark-800/80");
    navbar.classList.add("bg-white", "dark:bg-dark-800");
  } else {
    navbar.classList.remove("shadow-md");
    navbar.classList.remove("bg-white", "dark:bg-dark-800");
    navbar.classList.add("bg-white/80", "dark:bg-dark-800/80");
  }
}

// ========== TYPEWRITER EFFECT ==========
function initTypewriter() {
  const typingElement = document.querySelector(".typing");
  const professions = [
    "Informatik-Masterstudent mit B.Sc.",
    "Begeisterter Web- & Softwareentwickler",
    "Motiviert & lernbereit",
    "Bringt frische Ideen ins Team",
    "Liebt Technik & sauberen Code",
    "Denkt lösungsorientiert & kreativ",
  ];
  let professionIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isEnd = false;

  function type() {
    const currentProfession = professions[professionIndex];

    if (isDeleting) {
      typingElement.textContent = currentProfession.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentProfession.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentProfession.length) {
      isEnd = true;
      isDeleting = true;
      setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      professionIndex++;
      if (professionIndex === professions.length) professionIndex = 0;
      setTimeout(type, 500);
    } else {
      const typingSpeed = isDeleting ? 100 : 150;
      const randomSpeed = Math.random() * 100;
      setTimeout(type, isEnd ? typingSpeed : typingSpeed + randomSpeed);
    }
  }

  setTimeout(type, 1500);
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
  const sections = document.querySelectorAll(".section-hidden");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-show");
          // Trigger progress bar animation for skills section
          if (entry.target.id === "skills") {
            initSkillProgressBars();
          }
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => observer.observe(section));
}

// ========== SKILL PROGRESS BARS ==========
function initSkillProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar");
  progressBars.forEach((bar, index) => {
    bar.style.width = "0"; // Zurücksetzen für Animation
    setTimeout(() => {
      const progressWidth = bar.getAttribute("style").match(/--progress-width:\s*(\d+%)/)[1];
      bar.style.width = progressWidth;
    }, 100 * index); // Gestaffelte Animation für jeden Balken
  });
}

// ========== PARALLAX EFFECT ==========
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll(".parallax");
  if (!parallaxElements.length) {
    console.warn("Keine Parallax-Elemente gefunden.");
    return;
  }

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.getAttribute("data-parallax-speed") || 0.5);
      const yPos = -(scrollY * speed);
      element.style.backgroundPositionY = `${yPos}px`;
    });
  });
}

// ========== INTERACTIVE PROJECT CARDS ==========
function initProjectCardInteractions() {
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("card-hover");
      const overlay = card.querySelector(".overlay");
      if (overlay) {
        overlay.style.opacity = "1";
      }
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("card-hover");
      const overlay = card.querySelector(".overlay");
      if (overlay) {
        overlay.style.opacity = "0";
      }
    });
  });
}

// ========== PARTICLES ANIMATION ==========
function initParticles() {
  if (window.particlesJS) {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: document.documentElement.classList.contains("dark") ? "#ffffff" : "#4361ee",
        },
        shape: {
          type: "circle",
          stroke: { width: 0 },
        },
        opacity: {
          value: 0.5,
          random: true,
        },
        size: {
          value: 3,
          random: true,
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: document.documentElement.classList.contains("dark") ? "#ffffff" : "#4361ee",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    });

    // Update particle colors when theme changes
    themeToggle?.addEventListener("click", updateParticleColors);
    themeToggleMobile?.addEventListener("click", updateParticleColors);
  }
}

function updateParticleColors() {
  const isDark = document.documentElement.classList.contains("dark");
  if (window.pJSDom && window.pJSDom[0]) {
    const particles = window.pJSDom[0].pJS.particles;
    particles.color.value = isDark ? "#ffffff" : "#4361ee";
    particles.line_linked.color = isDark ? "#ffffff" : "#4361ee";
    window.pJSDom[0].pJS.fn.particlesRefresh();
  }
}

// ========== EVENT LISTENER ==========
document.addEventListener("DOMContentLoaded", () => {
  // Theme laden
  loadThemePreference();

  // Dark Mode Toggle
  if (themeToggle) themeToggle.addEventListener("click", toggleDarkMode);
  if (themeToggleMobile) themeToggleMobile.addEventListener("click", toggleDarkMode);

  // Mobile Menu
  if (mobileMenuButton) mobileMenuButton.addEventListener("click", toggleMobileMenu);

  // Smooth Scrolling
  navLinks.forEach((link) => {
    link.addEventListener("click", smoothScroll);
  });

  // Scroll to Top
  if (scrollTopButton) {
    scrollTopButton.addEventListener("click", scrollToTop);
    window.addEventListener("scroll", handleScroll);
  }

  // Navbar Scroll
  window.addEventListener("scroll", handleNavbarScroll);

  // Highlight Active Section
  window.addEventListener("scroll", highlightActiveSection);

  // Form Validation
  if (contactForm) {
    contactForm.addEventListener("submit", validateForm);
  }

  // Typewriter Effect
  initTypewriter();

  // Scroll Animations
  initScrollAnimations();

  // Skill Progress Bars
  initSkillProgressBars();

  // Parallax Effect
  initParallaxEffect();

  // Project Card Interactions
  initProjectCardInteractions();

  // Particles Animation
  initParticles();

  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();
});

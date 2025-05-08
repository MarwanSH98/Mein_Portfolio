// ========== GLOBALE VARIABLEN ==========
const darkModeToggle = document.getElementById("darkModeToggle");
const darkModeToggleMobile = document.getElementById("darkModeToggleMobile");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");
const scrollToTopBtn = document.querySelector(".scroll-to-top");
const contactForm = document.getElementById("contactForm");
const navLinks = document.querySelectorAll(".nav-link, #mobileMenu a");

// ========== DARK MODE FUNKTIONALITÄT ==========
function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.getAttribute("data-theme") === "dark";

  // Theme umschalten
  html.setAttribute("data-theme", isDark ? "light" : "dark");

  // Icon aktualisieren
  const icons = document.querySelectorAll(
    "#darkModeToggle i, #darkModeToggleMobile i"
  );
  icons.forEach((icon) => {
    icon.className = isDark
      ? "fas fa-sun text-yellow-300"
      : "fas fa-moon text-yellow-300";
  });

  // Text aktualisieren (nur mobile)
  const darkModeText = document.querySelector("#darkModeToggleMobile span");
  if (darkModeText) {
    darkModeText.textContent = isDark ? "Light Mode" : "Dark Mode";
  }

  // Status speichern
  localStorage.setItem("theme", isDark ? "light" : "dark");
}

function loadThemePreference() {
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  document.documentElement.setAttribute("data-theme", savedTheme);

  // Icons entsprechend setzen
  const isDark = savedTheme === "dark";
  const icons = document.querySelectorAll(
    "#darkModeToggle i, #darkModeToggleMobile i"
  );
  icons.forEach((icon) => {
    icon.className = isDark
      ? "fas fa-moon text-yellow-300"
      : "fas fa-sun text-yellow-300";
  });

  // Text aktualisieren (nur mobile)
  const darkModeText = document.querySelector("#darkModeToggleMobile span");
  if (darkModeText) {
    darkModeText.textContent = isDark ? "Dark Mode" : "Light Mode";
  }
}

// ========== MOBILE MENU TOGGLE ==========
function toggleMobileMenu() {
  mobileMenu.classList.toggle("hidden");
  mobileMenu.classList.toggle("show");

  // Icon ändern (Hamburger zu X und umgekehrt)
  const icon = mobileMenuButton.querySelector("i");
  if (mobileMenu.classList.contains("show")) {
    icon.className = "fas fa-times";
  } else {
    icon.className = "fas fa-bars";
  }
}

// ========== SMOOTH SCROLLING ==========
function smoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute("href");
  const targetElement = document.querySelector(targetId);

  // Mobile Menu schließen
  if (mobileMenu.classList.contains("show")) {
    toggleMobileMenu();
  }

  // Zum Ziel scrollen
  targetElement.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// ========== SCROLL-TO-TOP BUTTON ==========
function handleScroll() {
  // Button anzeigen/verstecken
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }

  // Aktiven Nav-Link hervorheben
  highlightActiveSection();
}

function scrollToTop(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ========== AKTIVE SECTION HERVORHEBEN ==========
function highlightActiveSection() {
  const scrollPosition = window.scrollY;

  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop - 100;
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
        }
      });
    }
  });
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

  // Formular absenden (hier würde normalerweise AJAX/Fetch stehen)
  contactForm.submit();

  // Formular leeren
  contactForm.reset();

 
}

// ========== TYPEWRITER EFFECT ==========
function initTypewriter() {
  const nameElement = document.querySelector(".typing-name");
  const descriptionElement = document.querySelector(".typing");

  if (!nameElement || !descriptionElement) return;

  const nameText = "Marwan Sabah";
  const words = [
    "Angehender Web- Software Entwickler",
    "Coder",
    "Tech-Liebhaber",
    "Lernender",
  ];

  let nameIndex = 0;
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeName() {
    if (nameIndex < nameText.length) {
      nameElement.textContent += nameText.charAt(nameIndex);
      nameIndex++;
      setTimeout(typeName, 150);
    } else {
      typeDescription();
    }
  }

  function typeDescription() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      descriptionElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      descriptionElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeDescription, 1000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeDescription, 500);
    } else {
      setTimeout(typeDescription, isDeleting ? 50 : 150);
    }
  }

  typeName();
}

// ========== SCROLL ANIMATIONEN ==========
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fadeIn");
      }
    });
  }, observerOptions);

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
}

// ========== EVENT LISTENER ==========
document.addEventListener("DOMContentLoaded", () => {
  // Theme laden
  loadThemePreference();

  // Dark Mode Toggle
  if (darkModeToggle) darkModeToggle.addEventListener("click", toggleDarkMode);
  if (darkModeToggleMobile)
    darkModeToggleMobile.addEventListener("click", toggleDarkMode);

  // Mobile Menu
  if (mobileMenuButton)
    mobileMenuButton.addEventListener("click", toggleMobileMenu);

  // Smooth Scrolling
  navLinks.forEach((link) => {
    link.addEventListener("click", smoothScroll);
  });

  // Scroll to Top
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", scrollToTop);
    window.addEventListener("scroll", handleScroll);
  }

  // Form Validation
  if (contactForm) {
    contactForm.addEventListener("submit", validateForm);
  }

  // Typewriter Effect
  initTypewriter();

  // Scroll Animations
  initScrollAnimations();
});

// Tippeffekt für das Hero-Text-Element
const words = ["Angehender Webentwickler", "Coder", "Tech-Liebhaber"];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;
const typingElement = document.querySelector(".typing");

function type() {
  if (!typingElement) return;

  currentWord = words[i];
  if (isDeleting) {
    typingElement.textContent = currentWord.substring(0, j--);
  } else {
    typingElement.textContent = currentWord.substring(0, j++);
  }

  if (!isDeleting && j === currentWord.length + 1) {
    isDeleting = true;
    setTimeout(type, 1000); // Pause nach kompletter Eingabe
    return;
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
  }

  const speed = isDeleting ? 50 : 100;
  setTimeout(type, speed);
}
type();

// Fortschrittsbalken animieren
document.querySelectorAll(".progress-bar div").forEach((bar) => {
  bar.style.width = "0";
  setTimeout(() => (bar.style.width = bar.textContent), 500);
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
}

// Button-Klick-Animationen
const buttons = document.querySelectorAll(".clickable-btn"); // Passe die Klasse ggf. an
buttons.forEach((btn) =>
  btn.addEventListener("click", () => {
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 300);
  })
);

// Tippen-Indikator im Kontaktformular
const message = document.getElementById("message");
const typingIndicator = document.getElementById("typing-indicator");
if (message && typingIndicator) {
  message.addEventListener("input", () => {
    typingIndicator.style.display = message.value ? "block" : "none";
  });
}

// Lebenslauf-Download Button
const cvButton = document.getElementById("cvButton");
if (cvButton) {
  cvButton.addEventListener("click", (e) => {
    e.preventDefault();
    cvButton.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Wird heruntergeladen...';
    setTimeout(() => (window.location.href = "CV/Bewerbung.pdf"), 1500);
  });
}

// Konami-Code Easter Egg
const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let index = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === konamiCode[index]) {
    index++;
    if (index === konamiCode.length) {
      document.body.style.background =
        'url("https://i.giphy.com/media/3o7aTskHEUdgCQAXde/giphy.webp")';
      index = 0;
    }
  } else {
    index = 0;
  }
});
const toggle = document.getElementById("darkModeToggle");
toggle.addEventListener("click", () => {
  const body = document.body;
  if (body.getAttribute("data-theme") === "light") {
    body.setAttribute("data-theme", "dark");
  } else {
    body.setAttribute("data-theme", "light");
  }
});
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    // Keine event.preventDefault() hier, damit das Formular tatsächlich an Formspree gesendet wird

    // Erlaubt Formspree, die Nachricht zu senden
    const form = this;

    // Setze das Formular nach einer kleinen Verzögerung zurück
    setTimeout(() => {
      form.reset(); // Formular zurücksetzen, wenn die Antwort von Formspree angekommen ist
    }, 2000); // Verzögerung von 2 Sekunden, damit das Formular erfolgreich gesendet wird
  });

// ==========================================
// PANTALLA DE BIENVENIDA (PRELOADER)
// ==========================================
window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 800);
});

// ==========================================
// ANIMACIONES AL HACER SCROLL (REVEAL OPTIMIZADO)
// ==========================================
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

revealElements.forEach((element) => revealObserver.observe(element));

// ==========================================
// MENÚ HAMBURGUESA (MÓVILES)
// ==========================================
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinksContainer = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links a");

function toggleMobileMenu() {
  navLinksContainer.classList.toggle("active");
  const isExpanded = navLinksContainer.classList.contains("active");
  mobileMenuToggle.setAttribute("aria-expanded", isExpanded);
  mobileMenuToggle.textContent = isExpanded ? "✕" : "☰";
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("active");
    mobileMenuToggle.setAttribute("aria-expanded", "false");
    mobileMenuToggle.textContent = "☰";
  });
});

// ==========================================
// LÓGICA DEL ACORDEÓN DE PREGUNTAS FRECUENTES
// ==========================================
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    question.classList.toggle("active");
    const answer = question.nextElementSibling;
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// ==========================================
// LÓGICA DEL MODAL DE RESERVAS
// ==========================================
const modal = document.getElementById("modalReserva");

function openModal(planName = "No especificado") {
  navLinksContainer.classList.remove("active");
  mobileMenuToggle.textContent = "☰";

  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  if (planName !== "No especificado") {
    const select = document.getElementById("waPlan");
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.includes(planName)) {
        select.selectedIndex = i;
        break;
      }
    }
  }
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// ==========================================
// MOSTRAR TÉRMINOS DE SERVICIO
// ==========================================
function mostrarTerminos() {
  alert(
    "Al contratar el servicio, asumo la responsabilidad por las modificaciones en mi hardware/software. Hardware Piece opera dentro de márgenes seguros.",
  );
}

// ==========================================
// LÓGICA DE ENVÍO A WHATSAPP
// ==========================================
function enviarWhatsApp() {
  const miNumero = "5491123756940";

  const nombre = document.getElementById("waNombre").value.trim();
  const plan = document.getElementById("waPlan").value;
  const horario = document.getElementById("waHorario").value;
  const pago = document.getElementById("waPago").value;
  const specs = document.getElementById("waSpecs").value.trim();
  const terms = document.getElementById("waTerms").checked;

  if (!nombre || !horario) {
    alert("Por favor, ingresá tu nombre y elegí un horario de sesión.");
    return;
  }

  if (!terms) {
    alert("Debes aceptar los Términos de Servicio para continuar.");
    return;
  }

  let mensaje = `*NUEVA RESERVA - HARDWARE PIECE*\n\n`;
  mensaje += `*Nombre:* ${nombre}\n`;
  mensaje += `*Plan elegido:* ${plan}\n`;
  mensaje += `*Horario preferido:* A las ${horario} hs.\n`;
  mensaje += `*Medio de pago:* ${pago}\n\n`;

  if (specs) {
    mensaje += `💻 *Specs de la PC:*\n${specs}\n\n`;
  }

  mensaje += `¡Hola! Vengo desde la página web para arrancar mi sesión de optimización.`;

  const mensajeCodificado = encodeURIComponent(mensaje);
  const urlAPI = `https://wa.me/${miNumero}?text=${mensajeCodificado}`;

  window.open(urlAPI, "_blank");
}

// ==========================================
// EFECTO 3D TILT EN TARJETAS DE PRECIOS
// ==========================================
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  if (window.innerWidth <= 768) return;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    card.style.transition = "transform 0.5s ease";
  });

  card.addEventListener("mouseenter", () => {
    card.style.transition = "none";
  });
});

// ==========================================
// ANIMACIONES AL HACER SCROLL (REVEAL)
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
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => revealObserver.observe(element));

// ==========================================
// LÓGICA DEL ACORDEÓN DE PREGUNTAS FRECUENTES
// ==========================================
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    // Alternar el estado activo del botón clicado
    question.classList.toggle("active");

    // Obtener el div de la respuesta que le sigue
    const answer = question.nextElementSibling;

    // Efecto abrir/cerrar calculando la altura exacta
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
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Autocompletar el select según el botón que se presionó
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

// Cerrar haciendo clic en el fondo gris
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// ==========================================
// LÓGICA DE ENVÍO A WHATSAPP
// ==========================================
function enviarWhatsApp() {
  // ⚠️ REEMPLAZÁ ESTE NÚMERO POR EL TUYO REAL (Ej: 5491144445555)
  const miNumero = "5491100000000";

  const nombre = document.getElementById("waNombre").value.trim();
  const plan = document.getElementById("waPlan").value;
  const horario = document.getElementById("waHorario").value;
  const pago = document.getElementById("waPago").value;
  const specs = document.getElementById("waSpecs").value.trim();

  if (!nombre || !horario) {
    alert("Por favor, ingresá tu nombre y elegí un horario de sesión.");
    return;
  }

  let mensaje = `🔥 *NUEVA RESERVA - HARDWARE PIECE* 🔥\n\n`;
  mensaje += `👤 *Nombre:* ${nombre}\n`;
  mensaje += `⚡ *Plan elegido:* ${plan}\n`;
  mensaje += `🕒 *Horario preferido:* A las ${horario} hs.\n`;
  mensaje += `💳 *Medio de pago:* ${pago}\n\n`;

  if (specs) {
    mensaje += `💻 *Specs de la PC:*\n${specs}\n\n`;
  }

  mensaje += `¡Hola! Vengo desde la página web para arrancar mi sesión de optimización.`;

  const mensajeCodificado = encodeURIComponent(mensaje);
  const urlAPI = `https://wa.me/${miNumero}?text=${mensajeCodificado}`;

  window.open(urlAPI, "_blank");
}

// Scroll suave para los enlaces del menú
const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// Efecto sticky/shadow en navbar al hacer scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Validación básica del formulario de contacto
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    let valid = true;
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('input-error');
        valid = false;
      } else {
        input.classList.remove('input-error');
      }
    });
    if (!valid) {
      e.preventDefault();
      alert('Por favor, completa todos los campos requeridos.');
    }
  });
}

// UX: Quitar error al escribir
const inputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
inputs.forEach(input => {
  input.addEventListener('input', function() {
    if (this.value.trim()) {
      this.classList.remove('input-error');
    }
  });
});

// Evitar scroll horizontal global cuando se usa el carrusel de servicios y activar marcadores
const carousel = document.querySelector('.services-carousel');
const markers = document.querySelectorAll('.carousel-markers span');
if (carousel) {
  // Scroll horizontal solo en el carrusel
  carousel.addEventListener('wheel', function(e) {
    if (e.deltaX !== 0) {
      e.stopPropagation();
    }
    if (e.deltaY !== 0 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      if (
        (e.deltaY < 0 && carousel.scrollLeft > 0) ||
        (e.deltaY > 0 && carousel.scrollLeft < carousel.scrollWidth - carousel.clientWidth)
      ) {
        e.preventDefault();
        carousel.scrollLeft += e.deltaY;
      }
    }
  }, { passive: false });
  // Marcadores activos
  if (markers.length) {
    function updateMarkers() {
      const cards = carousel.querySelectorAll('.service-card');
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(carousel).gap || 0);
      const index = Math.round(scrollLeft / cardWidth);
      markers.forEach((m, i) => m.classList.toggle('active', i === index));
    }
    carousel.addEventListener('scroll', updateMarkers);
    window.addEventListener('resize', updateMarkers);
    updateMarkers();
  }
}

// Envío con EmailJS para el formulario de contacto
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('form-success');
if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    emailjs.sendForm('service_uumq61a', 'template_jjyuj0g', contactForm, 'EuzMScAfCGR8bmylD')
      .then(function() {
        formSuccess.style.display = 'block';
        formSuccess.textContent = 'Mensaje enviado.';
        contactForm.reset();
      }, function(error) {
        formSuccess.style.display = 'block';
        formSuccess.textContent = 'Ocurrió un error al enviar el mensaje. Intenta nuevamente.';
      });
  });
} 
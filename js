document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Año dinámico en el footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Menú móvil (Hamburguesa)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 3. Cerrar menú móvil al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 4. Smooth Scroll (Desplazamiento suave) para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70; // Ajuste por la altura del navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Animación de aparición al hacer scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Dejar de observar una vez animado
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // 6. Simulación de interacción con el carrito de compras
    const botonesComprar = document.querySelectorAll('.btn-comprar');
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', function() {
            const producto = this.getAttribute('data-producto');
            
            // Efecto visual en el botón
            const textoOriginal = this.textContent;
            this.textContent = '¡Agregado!';
            this.style.background = '#28a745';
            
            setTimeout(() => {
                this.textContent = textoOriginal;
                this.style.background = '#82528e';
                alert(`¡Excelente elección! Has agregado "${producto}" a tu carrito.\n\nEn una implementación real, esto redirigiría al checkout o abriría un modal de WhatsApp con el pedido.`);
            }, 800);
        });
    });

    // 7. Botón de descargar recetario (Lead Magnet)
    const btnRecetas = document.getElementById('btn-descargar-recetas');
    if (btnRecetas) {
        btnRecetas.addEventListener('click', function(e) {
            e.preventDefault();
            alert('¡Gracias por tu interés! En un sitio real, aquí se abriría un formulario para capturar el correo electrónico del cliente y enviarle el recetario en PDF.');
        });
    }
});
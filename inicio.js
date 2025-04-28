document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out'
    });

    // Interactive background effect
    const bg = document.querySelector('.interactive-bg');
    let mouseX = 0, mouseY = 0;
    let bgX = 0, bgY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 50;
        mouseY = (e.clientY / window.innerHeight) * 50;
    });

    function animateBackground() {
        bgX += (mouseX - bgX) * 0.05;
        bgY += (mouseY - bgY) * 0.05;
        bg.style.transform = `translate(-${bgX}px, -${bgY}px)`;
        requestAnimationFrame(animateBackground);
    }
    animateBackground();

    // Custom cursor effect
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    function animateCursor() {
        followerX += (cursorX - followerX) * 0.1;
        followerY += (cursorY - followerY) * 0.1;
        
        follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .product-card, .service-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1.5)`;
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1)`;
        });
    });

    // Navigation toggle
    // Modificar la funcionalidad del toggle
    // Control de la barra lateral
    const navToggle = document.querySelector('.nav-toggle');
    const sidenav = document.querySelector('.sidenav');
    const content = document.querySelector('.content');
    
    navToggle.addEventListener('click', () => {
        sidenav.classList.toggle('active');
        content.classList.toggle('shifted');
        navToggle.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidenav.classList.add('active');
                content.classList.add('shifted');
                navToggle.classList.add('active');
            }
        });
    });
    
    // Close navigation when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidenav.contains(e.target) && !navToggle.contains(e.target)) {
            sidenav.classList.remove('active');
            content.classList.remove('expanded');
        }
    });
    
    // Active link highlighting
    const navLinks = document.querySelectorAll('.nav-item a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
            
            if (window.innerWidth <= 768) {
                sidenav.classList.remove('active');
                content.classList.remove('expanded');
            }
        });
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active section tracking
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                updateActiveNav(id);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    function updateActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(item => {
            const link = item.querySelector('a');
            if (link.getAttribute('href') === `#${id}`) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 100;
            
            function updateCounter() {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            }
            updateCounter();
        });
    }

    // Trigger stats animation when in view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Form validation and submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add your form submission logic here
            const formData = new FormData(contactForm);
            console.log('Form submitted:', Object.fromEntries(formData));
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            alert('Mensaje enviado correctamente');
        });
    }

    // Image loading optimization
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
});


// Filtrado de productos
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Actualizar botones activos
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filtrar productos
        const filter = button.dataset.filter;
        productCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Funcionalidad de los botones de acción
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const action = e.currentTarget.querySelector('i').className;
        
        // Aquí puedes agregar la lógica para cada acción
        if (action.includes('fa-eye')) {
            // Vista rápida del producto
            console.log('Vista rápida');
        } else if (action.includes('fa-shopping-cart')) {
            // Agregar al carrito
            console.log('Agregado al carrito');
        } else if (action.includes('fa-heart')) {
            // Agregar a favoritos
            console.log('Agregado a favoritos');
        }
    });
});
// Animación simple para los cards (puedes agregar AOS o tu propio efecto)
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, i) => {
        card.style.opacity = 0;
        setTimeout(() => {
            card.style.transition = 'opacity 0.7s, transform 0.7s';
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, 200 + i * 150);
    });
});
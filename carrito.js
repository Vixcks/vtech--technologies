let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function actualizarCarrito() {
    document.getElementById('cart-count').textContent = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    carrito.forEach((prod, idx) => {
        total += prod.precio * prod.cantidad;
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${prod.nombre}</span>
                <span>$${prod.precio.toFixed(2)} x ${prod.cantidad}</span>
                <button onclick="eliminarDelCarrito(${idx})">Eliminar</button>
            </div>
        `;
    });
    document.getElementById('cart-total').textContent = total.toFixed(2);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, precio) {
    const idx = carrito.findIndex(p => p.nombre === nombre);
    if (idx > -1) {
        carrito[idx].cantidad += 1;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    actualizarCarrito();
}

function eliminarDelCarrito(idx) {
    carrito.splice(idx, 1);
    actualizarCarrito();
}

document.getElementById('cart-icon').onclick = function() {
    document.getElementById('cart-modal').style.display = 'block';
};
document.getElementById('close-cart').onclick = function() {
    document.getElementById('cart-modal').style.display = 'none';
};
window.onclick = function(event) {
    if (event.target == document.getElementById('cart-modal')) {
        document.getElementById('cart-modal').style.display = 'none';
    }
};

actualizarCarrito();

// Automatización para todos los botones de carrito
document.addEventListener('DOMContentLoaded', function() {
    const botones = document.querySelectorAll('.add-to-cart-btn');
    botones.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const nombre = btn.getAttribute('data-nombre');
            const precio = parseFloat(btn.getAttribute('data-precio'));
            agregarAlCarrito(nombre, precio);
        });
    });
});
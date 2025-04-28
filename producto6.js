document.addEventListener('DOMContentLoaded', function() {
    const qtyInput = document.querySelector('.quantity-selector input');
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');

    minusBtn.addEventListener('click', () => {
        let value = parseInt(qtyInput.value);
        if (value > 1) qtyInput.value = value - 1;
    });

    plusBtn.addEventListener('click', () => {
        let value = parseInt(qtyInput.value);
        if (value < 99) qtyInput.value = value + 1;
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartTotalDiscounted = document.getElementById('cartTotalDiscounted');

    const updateCart = () => {
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = currentCart.length;
        cartItems.innerHTML = '';
        let total = 0;
        let totalDiscounted = 0;

        currentCart.forEach(item => {
            const itemTotal = item.descuento ? parseFloat(item.descuento) : parseFloat(item.precio);
            total += parseFloat(item.precio);
            totalDiscounted += itemTotal;

            const listItem = `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <h6>${item.nombre}</h6>
                        <p>Precio: $${parseFloat(item.precio).toFixed(2)}</p>
                        ${item.descuento ? `<p>Descuento: $${parseFloat(item.descuento).toFixed(2)}</p>` : ''}
                    </div>
                    <span>$${itemTotal.toFixed(2)}</span>
                </li>
            `;
            cartItems.insertAdjacentHTML('beforeend', listItem);
        });

        cartTotal.textContent = `$${total.toFixed(2)}`;
        cartTotalDiscounted.textContent = `$${totalDiscounted.toFixed(2)}`;
    };

    const addToCart = (producto) => {
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        currentCart.push(producto);
        localStorage.setItem('cart', JSON.stringify(currentCart));
        updateCart();
    };

    window.addToCart = addToCart;

    updateCart();
});

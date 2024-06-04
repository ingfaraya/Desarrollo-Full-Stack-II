document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        alert('Debe iniciar sesión para agregar productos al carrito.');
        return;
    }

    const cartKey = `cart_${loggedInUser.nombreUsuario}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const cartCount = document.getElementById('cartCount');
    const cartLink = document.getElementById('cartLink');

    const updateCartCount = () => {
        cartCount.textContent = cart.length;
    };

    updateCartCount();

    const updateCartModal = () => {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        cartItemsContainer.innerHTML = '';

        let total = 0;

        cart.forEach(item => {
            const itemTotal = parseFloat(item.precio) - (item.descuento ? parseFloat(item.descuento) : 0);
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'row mb-3';
            cartItem.innerHTML = `
                <div class="col-4">
                    <img src="${item.imagen}" class="img-fluid cart-img" alt="${item.nombre}">
                </div>
                <div class="col-8">
                    <h5>${item.nombre}</h5>
                    <p>Precio: $${item.precio}</p>
                    <p>Descuento: ${item.descuento ? '$' + item.descuento : 'No'}</p>
                    <p>Total: $${itemTotal.toFixed(2)}</p>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotal.textContent = total.toFixed(2);
    };

    window.addToCart = function(productName) {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        const product = productos.find(p => p.nombre === productName);
        if (product) {
            cart.push(product);
            localStorage.setItem(cartKey, JSON.stringify(cart));
            updateCartCount();
            updateCartModal();
            const addToCartModal = new bootstrap.Modal(document.getElementById('addToCartModal'));
            addToCartModal.show();
        } else {
            alert('Producto no encontrado');
        }
    };

    cartLink.addEventListener('click', function() {
        updateCartModal();
    });
});

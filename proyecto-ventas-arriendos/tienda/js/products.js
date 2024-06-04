document.addEventListener('DOMContentLoaded', function() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    const productContainer = document.getElementById('productContainer');

    const categories = ['strategy', 'family', 'party', 'kids'];

    const createProductCard = (producto) => `
        <div class="col-md-4">
            <div class="card mb-4">
                <img src="${producto.imagen}" class="card-img-top catalog-img" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p>Precio: $${producto.precio}</p>
                    <p>Descuento: ${producto.descuento ? 'Sí' : 'No'}</p>
                    <button class="btn btn-primary" onclick="addToCart('${producto.nombre}')">Agregar al Carrito</button>
                </div>
            </div>
        </div>
    `;

    const renderProductsByCategory = (category) => {
        const filteredProducts = productos.filter(producto => producto.categoria === category);
        productContainer.innerHTML = `
            <h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <div class="row">
                ${filteredProducts.map(createProductCard).join('')}
            </div>
            <button class="btn btn-secondary mt-4" onclick="showAllCategories()">Volver a todas las categorías</button>
        `;
    };

    const renderAllCategories = () => {
        productContainer.innerHTML = categories.map(category => {
            const filteredProducts = productos.filter(producto => producto.categoria === category);
            return `
                <h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                <div class="row">
                    ${filteredProducts.slice(0, 3).map(createProductCard).join('')}
                </div>
            `;
        }).join('');
    };

    window.showCategory = (category) => {
        renderProductsByCategory(category);
    };

    window.showAllCategories = () => {
        renderAllCategories();
    };

    renderAllCategories();

    // Actualizar la navegación dependiendo del usuario logueado
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const logoutLink = document.getElementById('logoutLink');
    const adminLink = document.getElementById('adminLink');

    const updateNav = () => {
        if (loggedInUser) {
            loginLink.style.display = 'none';
            registerLink.style.display = 'none';
            logoutLink.style.display = 'block';
            if (loggedInUser.role === 'Administrador') {
                adminLink.style.display = 'block';
            }
        } else {
            loginLink.style.display = 'block';
            registerLink.style.display = 'block';
            logoutLink.style.display = 'none';
            adminLink.style.display = 'none';
        }
    };

    updateNav();
});

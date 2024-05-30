document.addEventListener('DOMContentLoaded', function() {
    const cargarProductos = () => {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        const categorias = {
            strategy: document.querySelector('#categoria1 .productos'),
            family: document.querySelector('#categoria2 .productos'),
            party: document.querySelector('#categoria3 .productos'),
            kids: document.querySelector('#categoria4 .productos')
        };

        Object.keys(categorias).forEach(key => {
            if (categorias[key]) {
                categorias[key].innerHTML = '';
            }
        });

        const categoriaProductos = {
            strategy: [],
            family: [],
            party: [],
            kids: []
        };

        productos.forEach(producto => {
            const precio = parseFloat(producto.precio);
            const descuento = producto.descuento ? parseFloat(producto.descuento) : null;

            const productoCard = `
                <div class="col-md-4">
                    <div class="card mb-4">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">${producto.descripcion}</p>
                            <p>Precio: $${precio.toFixed(2)}</p>
                            ${descuento ? `<p>Descuento: $${descuento.toFixed(2)}</p>` : ''}
                            <button class="btn btn-primary" onclick='addToCart(${JSON.stringify({...producto, precio, descuento})})'>
                                <span class="material-icons">add_shopping_cart</span> Agregar al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            `;
            if (categorias[producto.categoria]) {
                categoriaProductos[producto.categoria].push(productoCard);
            }
        });

        Object.keys(categoriaProductos).forEach(key => {
            if (categoriaProductos[key].length > 3) {
                let innerHtml = '';
                categoriaProductos[key].forEach((producto, index) => {
                    if (index % 3 === 0) {
                        innerHtml += `<div class="carousel-item ${index === 0 ? 'active' : ''}"><div class="row">`;
                    }
                    innerHtml += producto;
                    if ((index + 1) % 3 === 0 || index === categoriaProductos[key].length - 1) {
                        innerHtml += `</div></div>`;
                    }
                });

                categorias[key].innerHTML = `
                    <div id="carousel${key}" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            ${innerHtml}
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carousel${key}" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Anterior</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carousel${key}" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Siguiente</span>
                        </button>
                    </div>
                `;
            } else {
                categorias[key].innerHTML = categoriaProductos[key].join('');
            }
        });
    };

    const cargarProductosEnIndex = () => {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        const categorias = {
            strategy: document.querySelector('#indexCategoria1 .productos'),
            family: document.querySelector('#indexCategoria2 .productos'),
            party: document.querySelector('#indexCategoria3 .productos'),
            kids: document.querySelector('#indexCategoria4 .productos')
        };

        Object.keys(categorias).forEach(key => {
            if (categorias[key]) {
                categorias[key].innerHTML = '';
            }
        });

        const categoriaProductos = {
            strategy: [],
            family: [],
            party: [],
            kids: []
        };

        productos.forEach(producto => {
            const precio = parseFloat(producto.precio);
            const descuento = producto.descuento ? parseFloat(producto.descuento) : null;

            const productoCard = `
                <div class="col-md-4">
                    <div class="card mb-4">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">${producto.descripcion}</p>
                            <p>Precio: $${precio.toFixed(2)}</p>
                            ${descuento ? `<p>Descuento: $${descuento.toFixed(2)}</p>` : ''}
                            <button class="btn btn-primary" onclick='addToCart(${JSON.stringify({...producto, precio, descuento})})'>
                                <span class="material-icons">add_shopping_cart</span> Agregar al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            `;
            if (categorias[producto.categoria]) {
                categoriaProductos[producto.categoria].push(productoCard);
            }
        });

        Object.keys(categoriaProductos).forEach(key => {
            if (categoriaProductos[key].length > 3) {
                let innerHtml = '';
                categoriaProductos[key].forEach((producto, index) => {
                    if (index % 3 === 0) {
                        innerHtml += `<div class="carousel-item ${index === 0 ? 'active' : ''}"><div class="row">`;
                    }
                    innerHtml += producto;
                    if ((index + 1) % 3 === 0 || index === categoriaProductos[key].length - 1) {
                        innerHtml += `</div></div>`;
                    }
                });

                categorias[key].innerHTML = `
                    <div id="carousel${key}" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            ${innerHtml}
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carousel${key}" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Anterior</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carousel${key}" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Siguiente</span>
                        </button>
                    </div>
                `;
            } else {
                categorias[key].innerHTML = categoriaProductos[key].join('');
            }
        });
    };

    window.mostrarCategoria = (categoriaId) => {
        document.querySelectorAll('.categoria').forEach(categoria => {
            if (categoria.id === categoriaId) {
                categoria.classList.remove('d-none');
            } else {
                categoria.classList.add('d-none');
            }
        });
        document.getElementById('volverBtn').classList.remove('d-none');
    };

    window.mostrarTodasCategorias = () => {
        document.querySelectorAll('.categoria').forEach(categoria => {
            categoria.classList.remove('d-none');
        });
        document.getElementById('volverBtn').classList.add('d-none');
    };

    if (document.querySelector('.carousel')) {
        cargarProductos();
    } else if (document.querySelector('#indexCategorias')) {
        cargarProductosEnIndex();
    }
});

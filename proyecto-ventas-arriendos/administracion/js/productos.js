document.addEventListener('DOMContentLoaded', function() {
    const productosContainer = document.getElementById('productosContainer');
    const manageProductoForm = document.getElementById('manageProductoForm');
    const productoModal = new bootstrap.Modal(document.getElementById('productoModal'));
    const productoModalLabel = document.getElementById('productoModalLabel');
    const pagination = document.getElementById('pagination');

    const productosPerPage = 10;
    let currentPage = 1;

    const loadProductos = () => {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        displayProductos(productos, currentPage);
        setupPagination(productos.length);
    };

    const displayProductos = (productos, page) => {
        productosContainer.innerHTML = '';
        const start = (page - 1) * productosPerPage;
        const end = start + productosPerPage;
        const paginatedProductos = productos.slice(start, end);

        let table = `
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Descuento</th>
                        <th>Categoría</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        paginatedProductos.forEach((producto, index) => {
            table += `
                <tr>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>$${producto.precio}</td>
                    <td>${producto.descuento ? '$' + producto.descuento : 'No'}</td>
                    <td>${producto.categoria}</td>
                    <td><img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid" style="max-width: 50px;"></td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editProducto(${start + index})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteProducto(${start + index})">Eliminar</button>
                    </td>
                </tr>
            `;
        });

        table += `
                </tbody>
            </table>
        `;

        productosContainer.innerHTML = table;
    };

    const setupPagination = (totalProductos) => {
        pagination.innerHTML = '';
        const pageCount = Math.ceil(totalProductos / productosPerPage);

        for (let i = 1; i <= pageCount; i++) {
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item', i === currentPage ? 'active' : '');
            pageItem.innerHTML = `
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            `;
            pageItem.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = i;
                loadProductos();
            });
            pagination.appendChild(pageItem);
        }
    };

    const deleteProducto = (index) => {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            productos.splice(index, 1);
            localStorage.setItem('productos', JSON.stringify(productos));
            loadProductos();
        }
    };

    const editProducto = (index) => {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        const productoToEdit = productos[index];
        document.getElementById('productoNombre').value = productoToEdit.nombre;
        document.getElementById('productoDescripcion').value = productoToEdit.descripcion;
        document.getElementById('productoPrecio').value = productoToEdit.precio;
        document.getElementById('productoDescuento').value = productoToEdit.descuento;
        document.getElementById('productoCategoria').value = productoToEdit.categoria;
        document.getElementById('productoImagen').value = productoToEdit.imagen;
        document.getElementById('editProductoIndex').value = index;

        productoModalLabel.textContent = 'Editar Producto';
        productoModal.show();
    };

    const showCreateProductModal = () => {
        productoModalLabel.textContent = 'Crear Producto';
        manageProductoForm.reset();
        document.getElementById('editProductoIndex').value = '';
        productoModal.show();
    };

    manageProductoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('productoNombre').value.trim();
        const descripcion = document.getElementById('productoDescripcion').value.trim();
        const precio = document.getElementById('productoPrecio').value.trim();
        const descuento = document.getElementById('productoDescuento').value.trim();
        const categoria = document.getElementById('productoCategoria').value;
        const imagen = document.getElementById('productoImagen').value.trim();
        const editProductoIndex = document.getElementById('editProductoIndex').value;

        const producto = {
            nombre,
            descripcion,
            precio,
            descuento,
            categoria,
            imagen
        };

        const productos = JSON.parse(localStorage.getItem('productos')) || [];

        if (editProductoIndex) {
            productos[editProductoIndex] = producto;
        } else {
            productos.push(producto);
        }

        localStorage.setItem('productos', JSON.stringify(productos));
        loadProductos();
        productoModal.hide();
    });

    window.deleteProducto = deleteProducto;
    window.editProducto = editProducto;
    window.showCreateProductModal = showCreateProductModal;

    loadProductos();
});

document.addEventListener('DOMContentLoaded', function() {
    const productosTable = document.getElementById('productosTable').querySelector('tbody');
    const productosForm = document.getElementById('manageProductoForm');

    const loadProductos = () => {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        productosTable.innerHTML = '';
        productos.forEach((producto, index) => {
            const row = `
                <tr>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.descuento}</td>
                    <td>${producto.categoria}</td>
                    <td><img src="${producto.imagen}" alt="${producto.nombre}" width="50"></td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick='editProducto(${index})'>Editar</button>
                        <button class="btn btn-sm btn-danger" onclick='deleteProducto(${index})'>Eliminar</button>
                    </td>
                </tr>
            `;
            productosTable.insertAdjacentHTML('beforeend', row);
        });
    };

    window.editProducto = (index) => {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        const producto = productos[index];

        document.getElementById('productoNombre').value = producto.nombre;
        document.getElementById('productoDescripcion').value = producto.descripcion;
        document.getElementById('productoPrecio').value = producto.precio;
        document.getElementById('productoDescuento').value = producto.descuento;
        document.getElementById('productoCategoria').value = producto.categoria;
        document.getElementById('productoImagen').value = producto.imagen;
        document.getElementById('editProductoIndex').value = index;

        const productosModal = new bootstrap.Modal(document.getElementById('productoModal'));
        productosModal.show();
    };

    window.deleteProducto = (index) => {
        let productos = JSON.parse(localStorage.getItem('productos')) || [];
        productos.splice(index, 1);
        localStorage.setItem('productos', JSON.stringify(productos));
        loadProductos();
    };

    productosForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('productoNombre').value.trim();
        const descripcion = document.getElementById('productoDescripcion').value.trim();
        const precio = parseFloat(document.getElementById('productoPrecio').value.trim());
        const descuento = parseFloat(document.getElementById('productoDescuento').value.trim());
        const categoria = document.getElementById('productoCategoria').value.trim();
        const imagen = document.getElementById('productoImagen').value.trim();
        const index = document.getElementById('editProductoIndex').value;

        let productos = JSON.parse(localStorage.getItem('productos')) || [];

        if (index !== '') {
            productos[index] = { nombre, descripcion, precio, descuento, categoria, imagen };
        } else {
            productos.push({ nombre, descripcion, precio, descuento, categoria, imagen });
        }

        localStorage.setItem('productos', JSON.stringify(productos));
        loadProductos();

        const productosModal = bootstrap.Modal.getInstance(document.getElementById('productoModal'));
        productosModal.hide();
    });

    loadProductos();
});

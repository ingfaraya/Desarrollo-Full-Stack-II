document.addEventListener('DOMContentLoaded', function() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const cuentas = JSON.parse(localStorage.getItem('users')) || [];
    const roles = JSON.parse(localStorage.getItem('roles')) || ["Administrador", "Soporte", "Cliente"];
    const productosContainer = document.getElementById('productosContainer');
    const cuentasContainer = document.getElementById('cuentasContainer');
    const rolesContainer = document.getElementById('rolesContainer');
    const manageProductoForm = document.getElementById('manageProductoForm');
    const manageCuentaForm = document.getElementById('manageCuentaForm');
    const manageRoleForm = document.getElementById('manageRoleForm');
    const editProductoIndex = document.getElementById('editProductoIndex');
    const editCuentaIndex = document.getElementById('editCuentaIndex');
    const editRoleIndex = document.getElementById('editRoleIndex');
    const cuentaRolSelect = document.getElementById('cuentaRol');

    const renderProductos = () => {
        productosContainer.innerHTML = `
            <div class="table-responsive">
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
                        ${productos.map((producto, index) => `
                            <tr>
                                <td>${producto.nombre}</td>
                                <td>${producto.descripcion}</td>
                                <td>${producto.precio}</td>
                                <td>${producto.descuento}</td>
                                <td>${producto.categoria}</td>
                                <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover;"></td>
                                <td>
                                    <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">Editar</button>
                                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Eliminar</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    };

    const renderCuentas = () => {
        cuentasContainer.innerHTML = `
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre Completo</th>
                            <th>Nombre de Usuario</th>
                            <th>Email</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Dirección</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cuentas.map((cuenta, index) => `
                            <tr>
                                <td>${cuenta.nombreCompleto}</td>
                                <td>${cuenta.nombreUsuario}</td>
                                <td>${cuenta.email}</td>
                                <td>${cuenta.fechaNacimiento}</td>
                                <td>${cuenta.direccion}</td>
                                <td>${cuenta.role}</td>
                                <td>
                                    <button class="btn btn-warning btn-sm" onclick="editCuenta(${index})">Editar</button>
                                    <button class="btn btn-danger btn-sm" onclick="deleteCuenta(${index})">Eliminar</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    };

    const renderRoles = () => {
        rolesContainer.innerHTML = `
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre del Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${roles.map((rol, index) => `
                            <tr>
                                <td>${rol}</td>
                                <td>
                                    <button class="btn btn-warning btn-sm" onclick="editRole(${index})">Editar</button>
                                    <button class="btn btn-danger btn-sm" onclick="deleteRole(${index})">Eliminar</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    };

    const populateRolesSelect = () => {
        cuentaRolSelect.innerHTML = roles.map(role => `<option value="${role}">${role}</option>`).join('');
    };

    window.showSection = (sectionId) => {
        document.querySelectorAll('.admin-section').forEach(section => section.classList.add('d-none'));
        document.getElementById(sectionId).classList.remove('d-none');
    };

    window.showProductModal = () => {
        manageProductoForm.reset();
        editProductoIndex.value = '';
        const productModal = new bootstrap.Modal(document.getElementById('productModal'));
        productModal.show();
    };

    window.showCuentaModal = () => {
        manageCuentaForm.reset();
        editCuentaIndex.value = '';
        populateRolesSelect();
        const cuentaModal = new bootstrap.Modal(document.getElementById('cuentaModal'));
        cuentaModal.show();
    };

    window.showRoleModal = () => {
        manageRoleForm.reset();
        editRoleIndex.value = '';
        const roleModal = new bootstrap.Modal(document.getElementById('roleModal'));
        roleModal.show();
    };

    window.editProduct = (index) => {
        const producto = productos[index];
        document.getElementById('productoNombre').value = producto.nombre;
        document.getElementById('productoDescripcion').value = producto.descripcion;
        document.getElementById('productoPrecio').value = producto.precio;
        document.getElementById('productoDescuento').value = producto.descuento;
        document.getElementById('productoCategoria').value = producto.categoria;
        document.getElementById('productoImagen').value = producto.imagen;
        editProductoIndex.value = index;
        const productModal = new bootstrap.Modal(document.getElementById('productModal'));
        productModal.show();
    };

    window.editCuenta = (index) => {
        const cuenta = cuentas[index];
        document.getElementById('cuentaNombre').value = cuenta.nombreCompleto;
        document.getElementById('cuentaUsuario').value = cuenta.nombreUsuario;
        document.getElementById('cuentaEmail').value = cuenta.email;
        document.getElementById('cuentaPassword').value = cuenta.password;
        document.getElementById('cuentaFechaNacimiento').value = cuenta.fechaNacimiento;
        document.getElementById('cuentaDireccion').value = cuenta.direccion;
        document.getElementById('cuentaRol').value = cuenta.role;
        editCuentaIndex.value = index;
        const cuentaModal = new bootstrap.Modal(document.getElementById('cuentaModal'));
        cuentaModal.show();
    };

    window.editRole = (index) => {
        const role = roles[index];
        document.getElementById('roleNombre').value = role;
        editRoleIndex.value = index;
        const roleModal = new bootstrap.Modal(document.getElementById('roleModal'));
        roleModal.show();
    };

    window.deleteProduct = (index) => {
        productos.splice(index, 1);
        localStorage.setItem('productos', JSON.stringify(productos));
        renderProductos();
    };

    window.deleteCuenta = (index) => {
        cuentas.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(cuentas));
        renderCuentas();
    };

    window.deleteRole = (index) => {
        roles.splice(index, 1);
        localStorage.setItem('roles', JSON.stringify(roles));
        renderRoles();
    };

    manageProductoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('productoNombre').value;
        const descripcion = document.getElementById('productoDescripcion').value;
        const precio = document.getElementById('productoPrecio').value;
        const descuento = document.getElementById('productoDescuento').value;
        const categoria = document.getElementById('productoCategoria').value;
        const imagen = document.getElementById('productoImagen').value;
        const index = editProductoIndex.value;

        const producto = { nombre, descripcion, precio, descuento, categoria, imagen };

        if (index === '') {
            productos.push(producto);
        } else {
            productos[index] = producto;
        }

        localStorage.setItem('productos', JSON.stringify(productos));
        renderProductos();
        const productModal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
        productModal.hide();
    });

    manageCuentaForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombreCompleto = document.getElementById('cuentaNombre').value;
        const nombreUsuario = document.getElementById('cuentaUsuario').value;
        const email = document.getElementById('cuentaEmail').value;
        const password = document.getElementById('cuentaPassword').value;
        const fechaNacimiento = document.getElementById('cuentaFechaNacimiento').value;
        const direccion = document.getElementById('cuentaDireccion').value;
        const role = document.getElementById('cuentaRol').value;
        const index = editCuentaIndex.value;

        const cuenta = { nombreCompleto, nombreUsuario, email, password, fechaNacimiento, direccion, role };

        if (index === '') {
            cuentas.push(cuenta);
        } else {
            cuentas[index] = cuenta;
        }

        localStorage.setItem('users', JSON.stringify(cuentas));
        renderCuentas();
        const cuentaModal = bootstrap.Modal.getInstance(document.getElementById('cuentaModal'));
        cuentaModal.hide();
    });

    manageRoleForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const roleNombre = document.getElementById('roleNombre').value;
        const index = editRoleIndex.value;

        if (index === '') {
            roles.push(roleNombre);
        } else {
            roles[index] = roleNombre;
        }

        localStorage.setItem('roles', JSON.stringify(roles));
        renderRoles();
        const roleModal = bootstrap.Modal.getInstance(document.getElementById('roleModal'));
        roleModal.hide();
    });

    renderProductos();
    renderCuentas();
    renderRoles();
});

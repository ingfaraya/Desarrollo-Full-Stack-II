document.addEventListener('DOMContentLoaded', function() {
    const cuentasTable = document.getElementById('cuentasTable').querySelector('tbody');
    const cuentasForm = document.getElementById('manageCuentasForm');

    const loadCuentas = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        cuentasTable.innerHTML = '';
        users.forEach((user, index) => {
            const row = `
                <tr>
                    <td>${user.nombreCompleto}</td>
                    <td>${user.nombreUsuario}</td>
                    <td>${user.email}</td>
                    <td>${user.fechaNacimiento}</td>
                    <td>${user.direccion}</td>
                    <td>${user.role}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick='editCuenta(${index})'>Editar</button>
                        <button class="btn btn-sm btn-danger" onclick='deleteCuenta(${index})'>Eliminar</button>
                    </td>
                </tr>
            `;
            cuentasTable.insertAdjacentHTML('beforeend', row);
        });
    };

    window.editCuenta = (index) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users[index];

        document.getElementById('cuentasNombreCompleto').value = user.nombreCompleto;
        document.getElementById('cuentasNombreUsuario').value = user.nombreUsuario;
        document.getElementById('cuentasEmail').value = user.email;
        document.getElementById('cuentasFechaNacimiento').value = user.fechaNacimiento;
        document.getElementById('cuentasDireccion').value = user.direccion;
        document.getElementById('cuentasRol').value = user.role;
        document.getElementById('editCuentaIndex').value = index;

        const cuentasModal = new bootstrap.Modal(document.getElementById('cuentasModal'));
        cuentasModal.show();
    };

    window.deleteCuenta = (index) => {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        loadCuentas();
    };

    cuentasForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombreCompleto = document.getElementById('cuentasNombreCompleto').value.trim();
        const nombreUsuario = document.getElementById('cuentasNombreUsuario').value.trim();
        const email = document.getElementById('cuentasEmail').value.trim();
        const fechaNacimiento = document.getElementById('cuentasFechaNacimiento').value.trim();
        const direccion = document.getElementById('cuentasDireccion').value.trim();
        const role = document.getElementById('cuentasRol').value.trim();
        const index = document.getElementById('editCuentaIndex').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (index !== '') {
            users[index] = { nombreCompleto, nombreUsuario, email, fechaNacimiento, direccion, role };
        } else {
            users.push({ nombreCompleto, nombreUsuario, email, fechaNacimiento, direccion, role });
        }

        localStorage.setItem('users', JSON.stringify(users));
        loadCuentas();

        const cuentasModal = bootstrap.Modal.getInstance(document.getElementById('cuentasModal'));
        cuentasModal.hide();
    });

    const loadRoles = () => {
        const roles = JSON.parse(localStorage.getItem('roles')) || [];
        const cuentasRolSelect = document.getElementById('cuentasRol');
        cuentasRolSelect.innerHTML = '';
        roles.forEach(role => {
            const option = `<option value="${role}">${role}</option>`;
            cuentasRolSelect.insertAdjacentHTML('beforeend', option);
        });
    };

    loadCuentas();
    loadRoles();
});

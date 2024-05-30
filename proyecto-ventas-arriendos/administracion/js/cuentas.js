document.addEventListener('DOMContentLoaded', function() {
    const cuentasContainer = document.getElementById('cuentasContainer');
    const manageAccountForm = document.getElementById('manageAccountForm');
    const accountModal = new bootstrap.Modal(document.getElementById('accountModal'));
    const accountModalLabel = document.getElementById('accountModalLabel');
    const pagination = document.getElementById('pagination');
    const roleSelect = document.getElementById('role');

    const accountsPerPage = 10;
    let currentPage = 1;

    const loadRoles = () => {
        const roles = JSON.parse(localStorage.getItem('roles')) || [];
        roleSelect.innerHTML = '';
        roles.forEach(role => {
            const option = document.createElement('option');
            option.value = role;
            option.textContent = role;
            roleSelect.appendChild(option);
        });
    };

    const loadAccounts = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        displayAccounts(users, currentPage);
        setupPagination(users.length);
    };

    const displayAccounts = (users, page) => {
        cuentasContainer.innerHTML = '';
        const start = (page - 1) * accountsPerPage;
        const end = start + accountsPerPage;
        const paginatedAccounts = users.slice(start, end);

        let table = `
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
        `;

        paginatedAccounts.forEach((user, index) => {
            table += `
                <tr>
                    <td>${user.nombreCompleto}</td>
                    <td>${user.nombreUsuario}</td>
                    <td>${user.email}</td>
                    <td>${user.fechaNacimiento}</td>
                    <td>${user.direccion}</td>
                    <td>${user.role}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editUser(${start + index})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser(${start + index})">Eliminar</button>
                    </td>
                </tr>
            `;
        });

        table += `
                </tbody>
            </table>
        `;

        cuentasContainer.innerHTML = table;
    };

    const setupPagination = (totalAccounts) => {
        pagination.innerHTML = '';
        const pageCount = Math.ceil(totalAccounts / accountsPerPage);

        for (let i = 1; i <= pageCount; i++) {
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item', i === currentPage ? 'active' : '');
            pageItem.innerHTML = `
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            `;
            pageItem.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = i;
                loadAccounts();
            });
            pagination.appendChild(pageItem);
        }
    };

    const deleteUser = (index) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (confirm('¿Estás seguro de que deseas eliminar esta cuenta?')) {
            users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(users));
            loadAccounts();
        }
    };

    const editUser = (index) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userToEdit = users[index];
        document.getElementById('nombreCompleto').value = userToEdit.nombreCompleto;
        document.getElementById('nombreUsuario').value = userToEdit.nombreUsuario;
        document.getElementById('email').value = userToEdit.email;
        document.getElementById('password').value = userToEdit.password;
        document.getElementById('fechaNacimiento').value = userToEdit.fechaNacimiento;
        document.getElementById('direccion').value = userToEdit.direccion;
        document.getElementById('role').value = userToEdit.role;
        document.getElementById('editIndex').value = index;

        accountModalLabel.textContent = 'Editar Cuenta';
        accountModal.show();
    };

    const showCreateAccountModal = () => {
        accountModalLabel.textContent = 'Crear Cuenta';
        manageAccountForm.reset();
        document.getElementById('editIndex').value = '';
        accountModal.show();
    };

    manageAccountForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
        const nombreUsuario = document.getElementById('nombreUsuario').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const fechaNacimiento = document.getElementById('fechaNacimiento').value.trim();
        const direccion = document.getElementById('direccion').value.trim();
        const role = document.getElementById('role').value;
        const editIndex = document.getElementById('editIndex').value;

        const user = {
            nombreCompleto,
            nombreUsuario,
            email,
            password,
            fechaNacimiento,
            direccion,
            role
        };

        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (editIndex) {
            users[editIndex] = user;
        } else {
            users.push(user);
        }

        localStorage.setItem('users', JSON.stringify(users));
        loadAccounts();
        accountModal.hide();
    });

    window.deleteUser = deleteUser;
    window.editUser = editUser;
    window.showCreateAccountModal = showCreateAccountModal;

    loadRoles();
    loadAccounts();
});

document.addEventListener('DOMContentLoaded', function() {
    const rolesContainer = document.getElementById('rolesContainer');
    const manageRoleForm = document.getElementById('manageRoleForm');
    const roleModal = new bootstrap.Modal(document.getElementById('roleModal'));
    const roleModalLabel = document.getElementById('roleModalLabel');
    const pagination = document.getElementById('pagination');

    const rolesPerPage = 10;
    let currentPage = 1;

    const loadRoles = () => {
        const roles = JSON.parse(localStorage.getItem('roles')) || [];
        displayRoles(roles, currentPage);
        setupPagination(roles.length);
    };

    const displayRoles = (roles, page) => {
        rolesContainer.innerHTML = '';
        const start = (page - 1) * rolesPerPage;
        const end = start + rolesPerPage;
        const paginatedRoles = roles.slice(start, end);

        let table = `
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre del Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        paginatedRoles.forEach((role, index) => {
            table += `
                <tr>
                    <td>${role}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editRole(${start + index})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteRole(${start + index})">Eliminar</button>
                    </td>
                </tr>
            `;
        });

        table += `
                </tbody>
            </table>
        `;

        rolesContainer.innerHTML = table;
    };

    const setupPagination = (totalRoles) => {
        pagination.innerHTML = '';
        const pageCount = Math.ceil(totalRoles / rolesPerPage);

        for (let i = 1; i <= pageCount; i++) {
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item', i === currentPage ? 'active' : '');
            pageItem.innerHTML = `
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            `;
            pageItem.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = i;
                loadRoles();
            });
            pagination.appendChild(pageItem);
        }
    };

    const deleteRole = (index) => {
        const roles = JSON.parse(localStorage.getItem('roles')) || [];
        if (confirm('¿Estás seguro de que deseas eliminar este rol?')) {
            roles.splice(index, 1);
            localStorage.setItem('roles', JSON.stringify(roles));
            loadRoles();
        }
    };

    const editRole = (index) => {
        const roles = JSON.parse(localStorage.getItem('roles')) || [];
        const roleToEdit = roles[index];
        document.getElementById('roleName').value = roleToEdit;
        document.getElementById('editRoleIndex').value = index;

        roleModalLabel.textContent = 'Editar Rol';
        roleModal.show();
    };

    const showCreateRoleModal = () => {
        roleModalLabel.textContent = 'Crear Rol';
        manageRoleForm.reset();
        document.getElementById('editRoleIndex').value = '';
        roleModal.show();
    };

    manageRoleForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const roleName = document.getElementById('roleName').value.trim();
        const editRoleIndex = document.getElementById('editRoleIndex').value;

        const roles = JSON.parse(localStorage.getItem('roles')) || [];

        if (editRoleIndex) {
            roles[editRoleIndex] = roleName;
        } else {
            roles.push(roleName);
        }

        localStorage.setItem('roles', JSON.stringify(roles));
        loadRoles();
        roleModal.hide();
    });

    window.deleteRole = deleteRole;
    window.editRole = editRole;
    window.showCreateRoleModal = showCreateRoleModal;

    loadRoles();
});

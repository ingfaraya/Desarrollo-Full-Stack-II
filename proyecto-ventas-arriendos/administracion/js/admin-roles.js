document.addEventListener('DOMContentLoaded', function() {
    const rolesTable = document.getElementById('rolesTable').querySelector('tbody');
    const rolesForm = document.getElementById('manageRolesForm');

    const loadRoles = () => {
        const roles = JSON.parse(localStorage.getItem('roles')) || [];
        rolesTable.innerHTML = '';
        roles.forEach((role, index) => {
            const row = `
                <tr>
                    <td>${role}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick='deleteRole(${index})'>Eliminar</button>
                    </td>
                </tr>
            `;
            rolesTable.insertAdjacentHTML('beforeend', row);
        });
    };

    window.deleteRole = (index) => {
        let roles = JSON.parse(localStorage.getItem('roles')) || [];
        roles.splice(index, 1);
        localStorage.setItem('roles', JSON.stringify(roles));
        loadRoles();
    };

    rolesForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const role = document.getElementById('rolesNombre').value.trim();

        let roles = JSON.parse(localStorage.getItem('roles')) || [];
        if (!roles.includes(role)) {
            roles.push(role);
        }

        localStorage.setItem('roles', JSON.stringify(roles));
        loadRoles();

        const rolesModal = bootstrap.Modal.getInstance(document.getElementById('rolesModal'));
        rolesModal.hide();
    });

    loadRoles();
});

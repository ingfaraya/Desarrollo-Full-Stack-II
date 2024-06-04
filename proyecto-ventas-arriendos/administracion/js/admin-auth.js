document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!user || user.role !== 'Administrador') {
        const adminLoginModal = new bootstrap.Modal(document.getElementById('adminLoginModal'));
        adminLoginModal.show();

        document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const nombreUsuario = document.getElementById('adminLoginNombreUsuario').value.trim();
            const password = document.getElementById('adminLoginPassword').value.trim();

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const adminUser = users.find(u => u.nombreUsuario === nombreUsuario && u.password === password && u.role === 'Administrador');

            if (adminUser) {
                localStorage.setItem('loggedInUser', JSON.stringify(adminUser));
                location.reload();
            } else {
                alert('Nombre de usuario o contraseña incorrectos, o no tienes permisos de administrador.');
            }
        });
    }

    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        window.location.href = '../index.html';
    });
});

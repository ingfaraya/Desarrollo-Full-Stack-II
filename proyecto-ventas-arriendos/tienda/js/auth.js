document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    const checkUserSession = () => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        const registerNavItem = document.getElementById('registerNavItem');
        const loginNavItem = document.getElementById('loginNavItem');

        if (user) {
            registerNavItem.innerHTML = `<span class="nav-link">Hola, ${user.nombreUsuario}</span>`;
            loginNavItem.innerHTML = `<a class="nav-link" href="#" id="logoutBtn"><span class="material-icons">logout</span>Cerrar Sesión</a>`;

            document.getElementById('logoutBtn').addEventListener('click', function() {
                localStorage.removeItem('loggedInUser');
                location.reload();
            });
        }
    };

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombreCompleto = document.getElementById('registerNombreCompleto').value.trim();
        const nombreUsuario = document.getElementById('registerNombreUsuario').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value.trim();
        const fechaNacimiento = document.getElementById('registerFechaNacimiento').value.trim();
        const direccion = document.getElementById('registerDireccion').value.trim();

        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ nombreCompleto, nombreUsuario, email, password, fechaNacimiento, direccion });
        localStorage.setItem('users', JSON.stringify(users));

        document.getElementById('registerModal').querySelector('.btn-close').click();
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombreUsuario = document.getElementById('loginNombreUsuario').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.nombreUsuario === nombreUsuario && u.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            document.getElementById('loginModal').querySelector('.btn-close').click();
            location.reload();
        } else {
            alert('Nombre de usuario o contraseña incorrectos');
        }
    });

    checkUserSession();
});

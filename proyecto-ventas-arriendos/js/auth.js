document.addEventListener('DOMContentLoaded', function() {
    // Función para establecer la sesión del usuario
    const setSession = (user) => {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
    };

    // Función para obtener la sesión del usuario
    const getSession = () => {
        return JSON.parse(localStorage.getItem('loggedInUser'));
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    };

    // Registro
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
            const nombreUsuario = document.getElementById('nombreUsuario').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            const fechaNacimiento = document.getElementById('fechaNacimiento').value;
            const direccion = document.getElementById('direccion').value.trim();

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            const user = {
                nombreCompleto,
                nombreUsuario,
                email,
                password,
                fechaNacimiento,
                direccion
            };

            localStorage.setItem(nombreUsuario, JSON.stringify(user));
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            window.location.href = 'login.html';
        });
    }

    // Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const nombreUsuario = document.getElementById('nombreUsuario').value.trim();
            const password = document.getElementById('password').value.trim();

            const user = JSON.parse(localStorage.getItem(nombreUsuario));

            if (user && user.password === password) {
                alert('Login exitoso. Bienvenido ' + user.nombreCompleto + '!');
                setSession(user);
                window.location.href = 'index.html';
            } else {
                alert('Nombre de usuario o contraseña incorrectos.');
            }
        });
    }

    // Manejo del estado de sesión
    const sessionUser = getSession();
    if (sessionUser) {
        const loginLink = document.querySelector('a[href="login.html"]');
        const registroLink = document.querySelector('a[href="registro.html"]');
        const navbar = document.querySelector('.navbar-nav');
        
        if (loginLink && registroLink) {
            loginLink.style.display = 'none';
            registroLink.style.display = 'none';

            const userInfo = document.createElement('li');
            userInfo.className = 'nav-item';
            userInfo.innerHTML = `<a class="nav-link" href="#">Bienvenido, ${sessionUser.nombreCompleto}</a>`;
            navbar.appendChild(userInfo);

            const logoutItem = document.createElement('li');
            logoutItem.className = 'nav-item';
            logoutItem.innerHTML = `<a class="nav-link" href="#" id="logout">Cerrar Sesión</a>`;
            navbar.appendChild(logoutItem);

            document.getElementById('logout').addEventListener('click', function(event) {
                event.preventDefault();
                logout();
            });
        }
    }
});

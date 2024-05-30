document.addEventListener('DOMContentLoaded', function() {
    const setSession = (user) => {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
    };

    const getSession = () => {
        return JSON.parse(localStorage.getItem('loggedInUser'));
    };

    const logout = () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = '../tienda/index.html';
    };

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
                window.location.href = user.role === 'admin' ? 'admin.html' : '../tienda/index.html';
            } else {
                alert('Nombre de usuario o contraseña incorrectos.');
            }
        });
    }

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

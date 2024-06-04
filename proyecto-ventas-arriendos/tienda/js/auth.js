document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const logoutLink = document.getElementById('logoutLink');
    const adminLink = document.getElementById('adminLink');
    const welcomeMessage = document.getElementById('welcomeMessage');

    const updateNav = () => {
        if (loggedInUser) {
            loginLink.style.display = 'none';
            registerLink.style.display = 'none';
            logoutLink.style.display = 'block';
            welcomeMessage.textContent = `Hola, ${loggedInUser.nombreCompleto}`;
            welcomeMessage.style.display = 'block';
            if (loggedInUser.role === 'Administrador') {
                adminLink.style.display = 'block';
            }
        } else {
            loginLink.style.display = 'block';
            registerLink.style.display = 'block';
            logoutLink.style.display = 'none';
            adminLink.style.display = 'none';
            welcomeMessage.textContent = '';
            welcomeMessage.style.display = 'none';
        }
    };

    updateNav();

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const nombreUsuario = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.nombreUsuario === nombreUsuario && u.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            location.reload();
        } else {
            alert('Nombre de usuario o contraseña incorrectos.');
        }
    });

    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const nombreCompleto = document.getElementById('registerFullName').value.trim();
        const nombreUsuario = document.getElementById('registerUsername').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value.trim();
        const fechaNacimiento = document.getElementById('registerDOB').value.trim();
        const direccion = document.getElementById('registerAddress').value.trim();

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const newUser = { nombreCompleto, nombreUsuario, email, password, fechaNacimiento, direccion, role: 'Cliente' };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', JSON.stringify(newUser));
        location.reload();
    });

    logoutLink.addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        location.reload();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');
    const loginForm = document.getElementById('loginForm');
    const modificarForm = document.getElementById('modificarForm');
    const recuperarForm = document.getElementById('recuperarForm');

    const validarEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validarPassword = (password) => {
        const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return re.test(password);
    };

    if (registroForm) {
        registroForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();

            if (!validarEmail(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            if (!validarPassword(password)) {
                alert('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            registroForm.submit();
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!validarEmail(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            if (!validarPassword(password)) {
                alert('Contraseña incorrecta.');
                return;
            }

            loginForm.submit();
        });
    }

    if (modificarForm) {
        modificarForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!validarEmail(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            if (password && !validarPassword(password)) {
                alert('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.');
                return;
            }

            modificarForm.submit();
        });
    }

    if (recuperarForm) {
        recuperarForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value.trim();

            if (!validarEmail(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            recuperarForm.submit();
        });
    }
});

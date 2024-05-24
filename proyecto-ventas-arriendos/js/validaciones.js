function validarFormulario() {
    const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
    const nombreUsuario = document.getElementById('nombreUsuario').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
    const direccion = document.getElementById('direccion').value.trim();

    if (!nombreCompleto || !nombreUsuario || !email || !password || !confirmPassword || isNaN(fechaNacimiento.getTime())) {
        alert('Todos los campos excepto la dirección son obligatorios.');
        return false;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        alert('El correo electrónico no es válido.');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return false;
    }

    if (!/(?=.*[0-9])(?=.*[A-Z]).{6,18}/.test(password)) {
        alert('La contraseña debe tener entre 6 y 18 caracteres, y contener al menos un número y una letra mayúscula.');
        return false;
    }

    const today = new Date();
    const age = today.getFullYear() - fechaNacimiento.getFullYear();
    const m = today.getMonth() - fechaNacimiento.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < fechaNacimiento.getDate())) {
        age--;
    }
    if (age < 13) {
        alert('Debes tener al menos 13 años para registrarte.');
        return false;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    const sections = ['dashboard', 'cuentas', 'productos', 'roles'];

    window.showSection = function(sectionId) {
        sections.forEach(section => {
            document.getElementById(section).classList.toggle('d-none', section !== sectionId);
        });
    };

    showSection('dashboard'); // Mostrar la sección de inicio por defecto
});

document.addEventListener('DOMContentLoaded', function() {
    const categorias = document.querySelectorAll('.categoria');

    const juegosPorCategoria = {
        1: [
            { img: 'img/catan.jpg', title: 'Catan', description: 'Juego de estrategia donde los jugadores colonizan una isla desierta.', price: '$30.00', discount: 'Sí' },
            { img: 'img/risk.jpg', title: 'Risk', description: 'Juego de conquista territorial donde la estrategia es clave.', price: '$25.00', discount: 'No' }
        ],
        2: [
            { img: 'img/monopoly.jpg', title: 'Monopoly', description: 'Juego clásico de compra y venta de propiedades.', price: '$20.00', discount: 'No' },
            { img: 'img/clue.jpg', title: 'Clue', description: 'Juego de misterio donde los jugadores deben resolver un asesinato.', price: '$25.00', discount: 'Sí' }
        ],
        3: [
            { img: 'img/codenames.jpg', title: 'Codenames', description: 'Juego de palabras y pistas para equipos.', price: '$20.00', discount: 'Sí' },
            { img: 'img/dixit.jpg', title: 'Dixit', description: 'Juego de narración con hermosas ilustraciones.', price: '$25.00', discount: 'No' }
        ],
        4: [
            { img: 'img/candyland.jpg', title: 'Candy Land', description: 'Juego clásico para los más pequeños, lleno de dulces aventuras.', price: '$10.00', discount: 'Sí' },
            { img: 'img/mousetrap.jpg', title: 'Mouse Trap', description: 'Juego de construcción de trampas para ratones.', price: '$20.00', discount: 'No' }
        ]
    };

    const cargarJuegos = (categoriaElement) => {
        const categoriaId = categoriaElement.getAttribute('data-categoria');
        const juegosContainer = categoriaElement.querySelector('.juegos');
        const juegosCarouselContainer = categoriaElement.querySelector('.juegos-carousel');

        juegosPorCategoria[categoriaId].forEach((juego, index) => {
            // Crear elementos para la vista de tarjetas
            const col = document.createElement('div');
            col.className = 'col-md-6';

            const card = `
                <div class="card mb-4">
                    <img src="${juego.img}" class="card-img-top" alt="${juego.title}">
                    <div class="card-body">
                        <h5 class="card-title">${juego.title}</h5>
                        <p class="card-text">${juego.description}</p>
                        <p>Precio: ${juego.price}</p>
                        <p>Descuento: ${juego.discount}</p>
                    </div>
                </div>
            `;
            col.innerHTML = card;
            juegosContainer.appendChild(col);

            // Crear elementos para la vista de carrusel
            const carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item' + (index === 0 ? ' active' : '');

            const carouselCard = `
                <div class="card mb-4">
                    <img src="${juego.img}" class="card-img-top" alt="${juego.title}">
                    <div class="card-body">
                        <h5 class="card-title">${juego.title}</h5>
                        <p class="card-text">${juego.description}</p>
                        <p>Precio: ${juego.price}</p>
                        <p>Descuento: ${juego.discount}</p>
                    </div>
                </div>
            `;
            carouselItem.innerHTML = carouselCard;
            juegosCarouselContainer.appendChild(carouselItem);
        });
    };

    const onScroll = () => {
        categorias.forEach(categoria => {
            const rect = categoria.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                if (!categoria.classList.contains('loaded')) {
                    cargarJuegos(categoria);
                    categoria.classList.add('loaded');
                }
            }
        });
    };

    window.addEventListener('scroll', onScroll);
    onScroll(); // Cargar los elementos visibles al inicio
});

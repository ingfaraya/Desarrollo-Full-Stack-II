document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
});

function addToCart(event) {
    const product = event.target.parentElement;
    const productName = product.querySelector('h3').textContent;
    const productPrice = product.querySelector('p:nth-of-type(2)').textContent;

    alert(`Añadido al carrito: ${productName} - ${productPrice}`);
}

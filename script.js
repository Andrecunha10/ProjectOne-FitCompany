const btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event) {
  if (event.type === 'touchstart') event.preventDefault();
  const nav1 = document.getElementById('nav1');
  nav1.classList.toggle('activemenu');
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);

const btncart = document.getElementById('btn-cart');


function togglecart(event) {
    if (event.type ==='touchstart') event.preventDefault();
    const cart = document.getElementById('cart-windows');
    cart.classList.toggle('activecart');
}

btncart.addEventListener('click', togglecart);
btncart.addEventListener('touchstart', togglecart);

const btncartclose = document.getElementById('btn-close-cart');


function togglecartclose(event) {
    if (event.type ==='touchstart') event.preventDefault();
    const cartclose = document.getElementById('cart-windows');
    cartclose.classList.remove('activecart');
}

btncartclose.addEventListener('click', togglecartclose);
btncartclose.addEventListener('touchstart', togglecartclose);

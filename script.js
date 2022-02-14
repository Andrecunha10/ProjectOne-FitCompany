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
    const cart = document.getElementById('cart');
    cart.classList.toggle('activecart');
}

btncart.addEventListener('click', togglecart);
btncart.addEventListener('touchstart', togglecart);

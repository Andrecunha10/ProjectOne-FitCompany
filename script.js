const btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event) {
  if (event.type === 'touchstart') event.preventDefault();
  const nav1 = document.getElementById('nav-mobile');
  nav1.classList.toggle('activemenu');
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);

const btncart = document.getElementById('btn-cart');

function togglecart(event) {
  if (event.type === 'touchstart') event.preventDefault();
  const cart = document.getElementById('cart-windows');
  cart.classList.toggle('activecart');
}

btncart.addEventListener('click', togglecart);
btncart.addEventListener('touchstart', togglecart);

const btncartclose = document.getElementById('btn-close-cart');


function togglecartclose(event) {
  if (event.type === 'touchstart') event.preventDefault();
  const cartclose = document.getElementById('cart-windows');
  cartclose.classList.remove('activecart');
}

btncartclose.addEventListener('click', togglecartclose);
btncartclose.addEventListener('touchstart', togglecartclose);


const selectGroups = () => {
  const mainGroups = document.querySelector('#main-groups')
  fetch('/apifake.json')
    .then(response => response.json())
    .then(data => {
      // mainGroups.innerHTML = ''
      data.groups.forEach((group) => {
        const section = getSectionTag(group)
        mainGroups.appendChild(section)
      })
      console.log('data', data)
    })

    .catch(() => {
      mainGroups.innerHTML = '<p class="error">Falha ao carregar a página. Por favor, tente novamente.</p>'
    })
}
const getSectionTag = (group) => {
  const createSection = document.createElement('section')
  const createTitle = document.createElement('h2')
  createTitle.classList.add('product-title')
  createTitle.textContent = group.name
  createSection.appendChild(createTitle)
  const createDivContainer = document.createElement('div')
  createDivContainer.classList.add('section-container')
  createSection.appendChild(createDivContainer)
  group.products.forEach((product) => {
    const createArticle = document.createElement('article')
    createArticle.classList.add('product')
    createDivContainer.appendChild(createArticle)
    createArticle.innerHTML = `
        <img class="image-produtc" src="${product.image}" alt="${product.name}" width="200" height="240">
        <div>
            <h3 class="product-name">${product.name}</h3>
            <button type="button" class="btn-santadart btnaddcart">Adicionar ao carrinho</button>
       </div>
  `
  })
  return createSection
}
selectGroups()
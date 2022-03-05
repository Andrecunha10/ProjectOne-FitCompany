//Open Menu Mobile
const btnMobile = document.getElementById('btn-mobile');
function toggleMenu(event) {
  if (event.type === 'touchstart') event.preventDefault();
  const nav1 = document.getElementById('nav-mobile');
  nav1.classList.toggle('activemenu');
}
btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);

//Open/Close Cart - With Cart Button
const btncart = document.getElementById('btn-cart');
function togglecart(event) {
  if (event.type === 'touchstart') event.preventDefault();
  const cart = document.getElementById('cart-windows');
  cart.classList.toggle('activecart');
}
btncart.addEventListener('click', togglecart);
btncart.addEventListener('touchstart', togglecart);

//Close Cart - With Button in Cart Windows
const btncartclose = document.getElementById('btn-close-cart');
function togglecartclose(event) {
  if (event.type === 'touchstart') event.preventDefault();
  const cartclose = document.getElementById('cart-windows');
  cartclose.classList.remove('activecart');
}
btncartclose.addEventListener('click', togglecartclose);
btncartclose.addEventListener('touchstart', togglecartclose);

//Validation API
const selectGroups = () => {
  const mainGroups = document.querySelector('#main-groups')
  fetch('/apifake.json')
    .then(response => response.json())
    .then(data => {
      mainGroups.innerHTML = ''
      data.groups.forEach((group) => {
        const section = getSectionTag(group)
        mainGroups.appendChild(section)
      })
    })
    .catch(() => {
      mainGroups.innerHTML = '<p class="alert-error">Falha ao carregar a página. Por favor, tente novamente.</p>'
    })
}
selectGroups()
//ADD HTML ON MAIN FROM API
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
  const btnAddCart = createArticle.querySelector('.btnaddcart')
  btnAddCart.addEventListener('click', () => {
    addToCart(product)
  })
})
  return createSection
}

// ADD PRODUCTS TO CART

let addProductsCart = []
const addToCart = newProduct => {
  const productIndex = addProductsCart.findIndex(
    item => item.id === newProduct.id
  )
  if (productIndex === -1) {
    addProductsCart.push({
      ...newProduct,
      qty: 1
    })
  } else {
    addProductsCart[productIndex].qty++
  }
  CartUpdate()
}

const CartUpdate = () => {
  if (addProductsCart.length > 0) {
    const cartBadge = document.querySelector('.btn-cart-badge')
    cartBadge.classList.add('btn-cart-badge-show')
    let total = 0
    addProductsCart.forEach(product => {
      total = total + product.qty
    })
    cartBadge.textContent = total
  }
  getProductToCart()
}

const getProductToCart = () => {
  const selectDivEmptyCart = document.querySelector ('.empty-cart')
    selectDivEmptyCart.classList.add('full-cart')
    const selectBtnRequest = document.querySelector ('.btn-request')
    selectBtnRequest.classList.add('btn-request-on')
    const selectAside = document.getElementById('add-products-cart')
    const selectAsideUl= selectAside.querySelector('ul')
    const createLi = document.createElement('li')
    createLi.classList.add('product-select')
    addProductsCart.forEach(product => {
      createLi.innerHTML = `
      <img class="image-cart" src="${product.image}" alt="${product.name}" height="40" width="40" />
      <p>${product.name}</p>
      <input class="inputs" type="number" value="${product.qty}"/>
      <button><img src="images/trash.svg" alt="Excluir" height="27" width="22" /></button>
    `
    selectAsideUl.appendChild(createLi)
  })
}
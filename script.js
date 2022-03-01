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
      // mainGroups.innerHTML = ''
      data.groups.forEach((group) => {
        const section = getSectionTag(group)
        mainGroups.appendChild(section)
      })
    })

    .catch(() => {
      mainGroups.innerHTML = '<p class="error">Falha ao carregar a página. Por favor, tente novamente.</p>'
    })
}
//ADD HTML FROM API
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
selectGroups()

const addProductsCart = []
const addToCart = newProduct => {
  const productIndex = addProductsCart.findIndex(
    item => item.id === newProduct.id
  )
  if (productIndex === -1) {
    addProductsCart.push({
      ...newProduct,
      qty: 1
    })
    getProductToCart()
  } else {
    addProductsCart[productIndex].qty++
    addProductsCart.forEach(product => {
      const teste = document.querySelector('.productqty')
      teste.textContent = `(${product.qty})`
    })

  }
  // getProductToCart()
  handleCartUpdate()

}
const handleCartUpdate = () => {
  if (addProductsCart.length > 0) {
    const cartBadge = document.querySelector('.btn-cart-badge')
    cartBadge.classList.add('btn-cart-badge-show')
    let total = 0
    addProductsCart.forEach(product => {
      total = total + product.qty
    })
    cartBadge.textContent = total
  }
}

const getProductToCart = () => {
  const selectDivEmptyCart = document.querySelector ('.empty-cart')
    selectDivEmptyCart.classList.add('full-cart')
    const selectBtnRequest = document.querySelector ('.btn-request')
    selectBtnRequest.classList.add('btn-request-on')
    const selectAside = document.getElementById('add-products-cart')
    const createDivProductSelect = document.createElement('div')
    createDivProductSelect.classList.add('product-select')
    selectAside.appendChild(createDivProductSelect)
    addProductsCart.forEach(product => {
    createDivProductSelect.innerHTML = `
    <img class="image-cart" src="${product.image}" alt="${product.name}" height="47" width="40" />
    <p>${product.name}</p>
    `
    const createProductsQty = document.createElement('p')
    createProductsQty.textContent = `(${product.qty})`
    createProductsQty.classList.add('productqty')
    createDivProductSelect.appendChild(createProductsQty)
    const createBtntrash = document.createElement('button')
    createBtntrash.innerHTML = `<img src="images/trash.svg" alt="Excluir" height="27" width="22" />`
    createDivProductSelect.appendChild(createBtntrash)
    createBtntrash.addEventListener('click', deleteItens)
    })
  // const selectDivEmptyCart = document.querySelector ('.empty-cart')
  // selectDivEmptyCart.classList.add('full-cart')
  // const selectBtnRequest = document.querySelector ('.btn-request')
  // selectBtnRequest.classList.add('btn-request-on')
  // const selectAside = document.getElementById('add-products-cart')
  // const createDivProductSelect = document.createElement('div')
  // createDivProductSelect.classList.add('product-select')
  // selectAside.appendChild(createDivProductSelect)
  // addProductsCart.forEach(product => {
  // createDivProductSelect.innerHTML = `
  //   <img class="image-cart" src="${product.image}" alt="${product.name}" height="47" width="40" />
  //   <p>${product.name}</p>
  //   <p class="produtcqty">(${parseInt(product.qty)})</p>
  //   <button><img src="images/trash.svg" alt="Excluir" height="27" width="22" /></button>
  // `
  // })
}

function deleteItens(){
  const seletcItem = document.querySelector('.product-select')
  seletcItem.innerHTML = ''
}


//Open Menu Mobile
const btnMobile = document.getElementById('btn-mobile');
function toggleMenu() {
  const nav1 = document.getElementById('nav-mobile');
  nav1.classList.toggle('activemenu');
}
btnMobile.addEventListener('click', toggleMenu);

//Open/Close Cart - With Cart Button
const btncart = document.getElementById('btn-cart');
const cart = document.getElementById('cart-windows')
function togglecart () {
  cart.classList.toggle('activecart');
}
btncart.addEventListener('click', togglecart);

//Close Cart - With Button in Cart Windows
const btncartclose = document.getElementById('btn-close-cart');
function closeCart () {
  cart.classList.remove('activecart');
}
btncartclose.addEventListener('click', closeCart);


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
const productInStorege = localStorage.getItem('productsinCart')
if (productInStorege) {
  addProductsCart = JSON.parse(productInStorege)
}
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
  CartUpdate(true)
}

const inputQtyUpdate = (id, newQty) => {
  const newQtyInt = parseInt(newQty)
  if (isNaN(newQtyInt)){
    return
  }
  // if (newQtyInt > 10){
  //   alert('Não é permitido iserir um número maior que 10')
  //   return
  // }
  if (newQtyInt > 0){
  const findIndex = addProductsCart.findIndex((product) => {
    if (product.id === id){
      return true
    }
      return false
      
    })
    addProductsCart[findIndex].qty = parseInt(newQty)
    CartUpdate(false)
}else{
  deleteToCart(id)
} 
}

const deleteToCart = (id) => {
  // addProductsCart = addProductsCart.filter((product) =>{
  //   if (product.id === id){
  //     return false
  //   }
  //   return true
  // })
  addProductsCart = addProductsCart.filter(    
    product => product.id != id
    )
  CartUpdate(true)
  if(addProductsCart.length === 0){
    closeCart()
  }
  }

const CartUpdate = (printProducts) => {
  //SAVE CART IN A LOCALSTORAGE
  const productsCartSotorege = JSON.stringify(addProductsCart)
  localStorage.setItem('productsinCart', productsCartSotorege)
  //VARIABLES
  const selectDivEmptyCart = document.querySelector ('.empty-cart')
  const cartBadge = document.querySelector('.btn-cart-badge')
  const selectBtnRequest = document.querySelector ('.btn-request')
  const selectAside = document.getElementById('add-products-cart')
  const selectAsideUl= selectAside.querySelector('ul')
  if (addProductsCart.length > 0) {
    // UPDATE BADGE
    cartBadge.classList.add('btn-cart-badge-on')
    let total = 0
    addProductsCart.forEach(product => {
      total = total + product.qty
    })
    cartBadge.textContent = total
    //UPDATE CART
    if (printProducts){
      selectAside.classList.add('add-products-cart-on')
      selectBtnRequest.classList.add('btn-request-on')
      selectAsideUl.innerHTML=''
      addProductsCart.forEach(product => {
        const createLi = document.createElement('li')
          createLi.classList.add('product-select')
          createLi.innerHTML = `
          <img class="image-cart" src="${product.image}" alt="${product.name}" height="40" width="40" />
          <p>${product.name}</p>
          <input class="inputs" type="number" value="${product.qty}"/>
          <button><img src="images/trash.svg" alt="Excluir" height="27" width="22" /></button>
        `
        const selectInput = createLi.querySelector('input')
        selectInput.addEventListener('keyup', (event) => {
          inputQtyUpdate(product.id, event.target.value)
        })
        selectInput.addEventListener('change', (event) => {
          inputQtyUpdate(product.id, event.target.value)
        })
        selectInput.addEventListener('keydown', (event) => {
          if (event.key === '.' || event.key === ',' || event.key === '-'){
            event.preventDefault()
          }
        }) 
        const selectBtnDelete = createLi.querySelector('button')
        selectBtnDelete.addEventListener('click', () => {
          deleteToCart(product.id)
        })
        selectAsideUl.appendChild(createLi)
        })
        //TURN-OFF EMPTY CART
        selectDivEmptyCart.classList.remove('empty-cart-on')
    }
  } else {
    //TURN-ON EMPTY CART
    selectDivEmptyCart.classList.add('empty-cart-on')

    //TURN-OFF BADGE AND CART WITH PRODUCTS
    cartBadge.classList.remove('btn-cart-badge-on')
    selectBtnRequest.classList.remove('btn-request-on')
    selectAside.classList.remove('add-products-cart-on')

  }
}
CartUpdate(true)

window.addEventListener('storage', (e)=> {
  if (e.key === 'productsinCart'){
    addProductsCart = JSON.parse(e.newValue)
    CartUpdate(true)
  }
})


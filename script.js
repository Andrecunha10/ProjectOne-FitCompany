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
function togglecart() {
  cart.classList.toggle('activecart');
}
btncart?.addEventListener('click', togglecart);

//Close Cart - With Button in Cart Windows
const btncartclose = document.getElementById('btn-close-cart');
function closeCart() {
  cart?.classList.remove('activecart');
}
btncartclose?.addEventListener('click', closeCart);

//CLOSE CART WINDOWS
document.addEventListener('click', closeCart)
btncart?.addEventListener('click', event => { event.stopPropagation() })
cart?.addEventListener('click', event => { event.stopPropagation() })

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
      if (mainGroups) {
        mainGroups.innerHTML = '<p class="alert-error">Falha ao carregar a página. Por favor, tente novamente.</p>'
      }
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
            <a href="product.html" class="product-name">${product.name}</a>
            <button type="button" class="btn-santadart btnaddcart">Adicionar ao carrinho</button>
       </div>
  `
    const btnAddCart = createArticle.querySelector('.btnaddcart')
    btnAddCart.addEventListener('click', () => {
      addToCart(product)
    })

    const imageProduct = createArticle.querySelector('.product-name')
    imageProduct.addEventListener('click', () => {
      saveLocalStorage(product)
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
  if (isNaN(newQtyInt)) {
    return
  }
  // if (newQtyInt > 10){
  //   alert('Não é permitido iserir um número maior que 10')
  //   return
  // }
  if (newQtyInt > 0) {
    const findIndex = addProductsCart.findIndex((product) => {
      if (product.id === id) {
        return true
      }
      return false

    })
    addProductsCart[findIndex].qty = parseInt(newQty)
    CartUpdate(false)
  } else {
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
  if (addProductsCart.length === 0) {
    closeCart()
  }
}

const CartUpdate = (printProducts) => {
  //SAVE CART IN A LOCALSTORAGE
  const productsCartStorege = JSON.stringify(addProductsCart)
  localStorage.setItem('productsinCart', productsCartStorege)
  //VARIABLES
  const selectDivEmptyCart = document.querySelector('.empty-cart')
  const cartBadge = document.querySelector('.btn-cart-badge')
  const selectBtnRequest = document.querySelector('.btn-request')
  const selectAside = document.getElementById('add-products-cart')
  const selectAsideUl = selectAside.querySelector('ul')
  const selectBtn = document.querySelector('.btn-add-more')
  if (addProductsCart.length > 0) {
    // UPDATE BADGE
    cartBadge?.classList.add('btn-cart-badge-on')
    let total = 0
    addProductsCart.forEach(product => {
      total = total + product.qty
    })
    if (cartBadge) {
      cartBadge.textContent = total
    }
    //UPDATE CART
    if (printProducts) {
      selectAside.classList.add('add-products-cart-on')
      selectBtnRequest?.classList.add('btn-request-on')
      selectBtn?.classList.add('btn-add-more-on')
      selectAsideUl.innerHTML = ''
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
          if (event.key === '.' || event.key === ',' || event.key === '-') {
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
    cartBadge?.classList.remove('btn-cart-badge-on')
    selectBtnRequest?.classList.remove('btn-request-on')
    selectBtn?.classList.remove('btn-add-more-on')
    selectAside.classList.remove('add-products-cart-on')

  }
}
CartUpdate(true)

//CLOSE CART WITH WINDOW
window.addEventListener('storage', (e) => {
  if (e.key === 'productsinCart') {
    addProductsCart = JSON.parse(e.newValue)
    CartUpdate(true)
  }
})

const selectForm = document.querySelector('.form-send')
selectForm?.addEventListener('submit', (event) => {
  event.preventDefault()
  if (addProductsCart.length == 0) {
    let budget = `Por gentileza, retorne meu contato.\n
*Nome* ${selectForm.elements['form-name'].value}\n
*Email* ${selectForm.elements['form-email'].value}\n
*Telefone* ${selectForm.elements['form-phone'].value}\n
*Mensagem* ${selectForm.elements['form-message'].value}`
    const whats = window.innerWidth > 768 ? 'web' : 'api'
    window.open(`https://${whats}.whatsapp.com/send?phone=5511998218975&text=${encodeURI(budget)}`, '_blank')
  } else {
    let budget = 'Por gentileza, me enviar o seguinte orçamento:\n'
    addProductsCart.forEach(product => {
      budget += `\n*${product.qty}x ${product.name}* - cód. ${product.id}\n`
    })
    budget += `\n*Nome* ${selectForm.elements['form-name'].value}\n
*Email* ${selectForm.elements['form-email'].value}\n
*Telefone* ${selectForm.elements['form-phone'].value}\n
*Mensagem* ${selectForm.elements['form-message'].value}`
    const whats = window.innerWidth > 768 ? 'web' : 'api'
    window.open(`https://${whats}.whatsapp.com/send?phone=5511998218975&text=${encodeURI(budget)}`, '_blank')
  }
})

if (typeof IMask !== 'undefined') {
  const selectPhone = document.getElementById('form-phone')
  const maskOptions = {
    mask: '(00)00000-0000'
  }
  IMask(selectPhone, maskOptions);
}


//PAGE PRODUCT.HMTL

const saveLocalStorage = product => {
  localStorage.setItem('productSelect', JSON.stringify(product))
}
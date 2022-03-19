const openProductPage = () => {
    //SAVE PRODUCT OF LOCALSTORAGE
    let pageProduct = {}
    const pageProductSave = localStorage.getItem('productSelect')
    if (pageProductSave) {
    pageProduct = JSON.parse(pageProductSave)
    }
    const selectDivProduct = document.getElementById('page-product')
if(!pageProduct || !pageProductSave){
  selectDivProduct.innerHTML = `
    <div class="alert-error">
      <p>Falha ao carregar a página. Por favor, retorne a página de produtos. <a href="/index.html">Clique Aqui!</a></p>
    </div>
  `
} else{
        selectDivProduct.innerHTML=`
        <h1>${pageProduct.group}</h1>
        <div class="imageanddescripition">
            <img src="${pageProduct.image}" alt="${pageProduct.name}" height="360" width="300">
            <div class="product-description">
              <h2><span class="bold">${pageProduct.name}</span></h2>
              <p><span class="bold">Tamanho da máquina (A*L*P)mm</span> ${pageProduct.size}</p>
              <p><span class="bold">Tubo</span> ${pageProduct.pipe}</p>
              <p><span class="bold">Peso Total da Máquina</span> ${pageProduct.weight}</p>
              <p><span class="bold">Garantia</span> ${pageProduct.warranty}</p>
              <p><span class="bold">Pintura Eletrostática</span> ${pageProduct.painting}</p>
              <button type="button" class="btn-santadart btnaddcart">Adicionar ao carrinho</button>
            </div>
        </div>
        <h2>Utilização</h2>     
        <p>O equipamento Agachamento com Panturrilha Delph Sports é um aparelho 2x1, ou seja, em uma unica maquina o usuário poderá fazer Agachamento, desenvolvendo assim músculos do quadríceps femural, glúteo médio , glúteo máximo , bíceps femural (posterior da coxa) , abdominal e lombar. O aparelho contém um degrau para trabalhar também a panturrilha.</p>   
        <h3>Frete e Prazo</h3>
        <p>Frete Grátis no Alto Tietê e São Paulo Capital. O equipamento é fabricado sob encomendas. Para verificar a possibilidade e valor do frete e o prazo para o equipamento ficar disponível para o transporte, entre em contato com  o vendedor e informe o CEP do local onde deverá ser a entrega do equipamento.</p>`

      const selectButton = selectDivProduct.querySelector('button')
      selectButton.addEventListener('click', () =>{
        addToCart(pageProduct)
        })
}
  }
  
  openProductPage()
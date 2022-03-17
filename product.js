const openProductPage = () => {
    //SAVE PRODUCT OF LOCALSTORAGE
    let pageProduct = {}
    const pageProductSave = localStorage.getItem('productSelect')
    if (pageProductSave) {
    pageProduct = JSON.parse(pageProductSave)
    }

    const selectDivProduct = document.getElementById('page-product')
      if (selectDivProduct){
      selectDivProduct.innerHTML=`
        <h1>Linha Especial</h1>
        <div class="imageanddescripition">
            <img src="${pageProduct.image}" alt="extensora" height="360" width="300">
            <div class="product-description">
              <h2><span class="bold">Nome do Produto</span></h2>
              <p><span class="bold">Tamanho da máquina (A*L*P)mm</span> 1500*1100*1200</p>
              <p><span class="bold">Tubo</span> 4 Polegadas com parede de 2mm</p>
              <p><span class="bold">Peso Total da Máquina</span> 238 kg</p>
              <p><span class="bold">Garantia</span> 3 anos</p>
              <p><span class="bold">Pintura Eletrostática</span> Consulte cores disponíveis</p>
              <button type="button" class="btn-santadart btnaddcart">Adicionar ao carrinho</button>
            </div>
        </div>
        <h2>Utilização</h2>     
        <p>O equipamento Agachamento com Panturrilha Delph Sports é um aparelho 2x1, ou seja, em uma unica maquina o usuário poderá fazer Agachamento, desenvolvendo assim músculos do quadríceps femural, glúteo médio , glúteo máximo , bíceps femural (posterior da coxa) , abdominal e lombar. O aparelho contém um degrau para trabalhar também a panturrilha.</p>   
        <h3>Frete e Prazo</h3>
        <p>Frete Grátis no Alto Tietê e São Paulo Capital. O equipamento é fabricado sob encomendas. Para verificar a possibilidade e valor do frete e o prazo para o equipamento ficar disponível para o transporte, entre em contato com  o vendedor e informe o CEP do local onde deverá ser a entrega do equipamento.</p>`
      }
      
  }
  
  openProductPage()
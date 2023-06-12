// declarando array (vazio) de produtos
let products = [];

// Obter os parâmetros da URL
const urlParams = new URLSearchParams(window.location.search);
// declarando url da api 
let apiUrl = "http://diwserver.vps.webdock.cloud:8765/products/search?query=";

// Verificar se o parâmetro 'tipo' está presente na URL e adiciona-lo na url da api
if (urlParams.has('tipo')) {
    const tipoProduto = urlParams.get('tipo');
    apiUrl += `&${encodeURIComponent(tipoProduto)}`;
}

// Verificar se o parâmetro 'marca' está presente na URL e adiciona-lo na url da api
if (urlParams.has('marca')) {
    const marcaProduto = urlParams.get('marca');
    apiUrl += `&${encodeURIComponent(marcaProduto)}`;
}

// Verificar se o parâmetro 'genero' está presente na URL e adiciona-lo na url da api
if (urlParams.has('genero')) {
    const generoProduto = urlParams.get('genero');
    apiUrl += `&${encodeURIComponent(generoProduto)}`;
}

// Verificar se o parâmetro 'avaliacao' está presente na URL e adiciona-lo na url da api
if (urlParams.has('avaliacao')) {
    const avaliacaoProduto = urlParams.get('avaliacao');
    apiUrl += `&${encodeURIComponent(avaliacaoProduto)}`;
}

console.log('URL da API:', apiUrl);

console.log(products); 

// objeto que cria e adiciona o produto na dom e na tela
const DOM = {
    productsContainer: document.querySelector('#products-list'),

    addProduct(product, index) {
        const element = document.createElement('div')
        element.classList.add("col-md-6")
        element.classList.add("col-lg-4")
        element.innerHTML = DOM.innerHTMLProduct(product, index)
        element.dataset.index = index

        DOM.productsContainer.appendChild(element)
    },

    innerHTMLProduct(product, index) {
        return `
            <div class="product card mb-2 m-2">
                    <img src=${product.image} class="card-img-top"
                        alt="Imagem produto">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text fw-bold">R$ ${product.price}</p>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Avaliação: ${product.rating.rate}</p>
                        <p class="card-text">Ano de lançamento: ${product.year}</p>
                        <a href="detalhes.html?id=${product.id}" data-product-id="${product.id}" target="_blank" class="btn btn-primary">Mais detalhes</a>
                    </div>
            </div>
        `
    }
} 

// chamando api
async function init() {
    await fetch(apiUrl)
      .then(async function (response) {
        return response.json();
      })
      .then(function (response) {
        if(response.products && products) {
          products.push(...response.products);
        }
      })
      .catch(function (error) {
        console.log("Error: " + error);
      });
  
    DOM.productsContainer.innerHTML = "";
  
    products.forEach((product) => DOM.addProduct(product));
  }
  
  init();

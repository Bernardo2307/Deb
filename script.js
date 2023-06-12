// declarando array (vazio) de produtos
let products = [];

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

// produtos do aside 
const productsAside = [];

const DOMaside = {
    productsAsideContainer: document.querySelector('#aside-list'),


    addProduct(productAside, index) {

        const element = document.createElement('div')
        element.classList.add("row")
        element.innerHTML = DOMaside.innerHTMLProduct(productAside, index)
        element.dataset.index = index
        DOMaside.productsAsideContainer.appendChild(element)

    },


    innerHTMLProduct(productAside) {

        return `
                    <div class="col-4">
                        <img src="${productAside.image}" class="img-fluid" alt="Produto">
                    </div>
                    <div class="col-8">
                      <div class="card-body">
                            <h5 class="card-title">${productAside.title}</h5>
                            <p class="card-text fw-bold">Avaliação: ${productAside.rating.rate}</p>
                            <a href="detalhes.html?id=${productAside.id}" data-product-id="${productAside.id}" target="_blank" class="btn btn-primary">Visualizar</a>
                        </div>
                    </div>
                `

    }
}


// chamando api 
 async function init(pageNumber) {
    // limpando produtos anteriores (para paginação)
    products.length = 0;
    productsAside.length = 0;

    await fetch(`http://diwserver.vps.webdock.cloud:8765/products/category/Accessories - Headwear?page=${pageNumber}`)
        .then(async function (response) {
            return response.json();
        })
        .then(function (response) {
            products.push(...response.products);
            productsAside.push(...response.products);
        })
        .catch(function (error) {
            console.log("Error: " + error);
        });

    DOM.productsContainer.innerHTML = "";
    DOMaside.productsAsideContainer.innerHTML = "";

    products.forEach(product => DOM.addProduct(product));

    // melhores avaliados 
    productsAside.sort(function (a, b) {
        if (a.rating.rate < b.rating.rate) {
            return 1;
        }
        if (a.rating.rate > b.rating.rate) {
            return -1;
        }
        // a deve ser igual a b
        return 0;
    });
    for (let i = 0; i < 5; i++) {
        DOMaside.addProduct(productsAside[i]);
    }
} 

init(1)


// funcionalidade de pesquisa (input)
const search = () => {
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const productslist = document.getElementById("products-list");
    const product = document.querySelectorAll('.product');
    const productname = productslist.getElementsByTagName("h5");

    for (let i=0; i < products.length; i++) {
        for (let j = 0; j < productname.length; j++) {
            let combina = product[j].getElementsByTagName('h5')[0];
            if (combina) {
                let textvalue = combina.textContent || combina.innerHTML;
                if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
                    product[j].style.display = "";
                } else {
                    product[j].style.display = "none";
                }
            }
        }
    }
}


// funcionalidade do formulário 
function searchForm() {
    // pegando o valor dos inputs  
    let tipoProduto = document.getElementById("tipo-produto").value;
    let marcaProduto = document.getElementById("marca-produto").value;
    let generoProduto = document.getElementById("gender-produto").value;
    let avaliacaoProduto = document.getElementById("avaliacao-produto").value;
    let link = document.getElementById("btnProcurar-produto");

    // parametros da url
    link.href = `pesquisa.html?`;
    let params = [];

    if (tipoProduto !== "") {
        params.push("tipo=" + encodeURIComponent(tipoProduto))
    }
    if (marcaProduto !== "") {
        params.push("marca=" + encodeURIComponent(marcaProduto))
    }
    if (generoProduto !== "") {
        params.push("genero=" + encodeURIComponent(generoProduto))
    }
    if (avaliacaoProduto !== "") {
        params.push("avaliacao=" + encodeURIComponent(avaliacaoProduto))
    }
    if (params.length > 0) {
        link.href += params.join("&");
    }
}


// pegando id da url
var url = window.location.href;
var id = url.match(/id=(\d+)/)[1];

console.log(url);
console.log(id);

// inserido elementos da api na tela
function inserindoElementos(imagemUrl, titulo, descricao, preco, ano, avaliacao, totalAv, tipo, gender) {
    const secao1 = document.getElementById('secao1');
    const imagem = document.createElement('img');
    imagem.src = imagemUrl;
    imagem.classList.add('col-8');
    secao1.appendChild(imagem);

    const secao2 = document.getElementById('secao2');
    const elementoTitulo = document.createElement('h1');
    const elementoDescricao = document.createElement('p');
    const elementoPreco = document.createElement('p');
    const elementoAno = document.createElement('p');
    const elementoAvaliacao = document.createElement('p');
    const elementototalAvaliacoes = document.createElement('p');
    const elementotipo = document.createElement('p');
    const elementogender = document.createElement('p');

    elementoTitulo.textContent = titulo;
    elementoDescricao.textContent = descricao;
    elementoPreco.textContent = `Preço: R$ ${preco}`;
    elementoAno.textContent = `Ano de lançamento: ${ano}`;
    elementoAvaliacao.textContent = `Nota de avaliação: ${avaliacao}`;
    elementototalAvaliacoes.textContent = `Total de avaliações: ${totalAv}`;
    elementotipo.textContent = `Tipo/ categoria do produto: ${tipo}`;
    elementogender.textContent = `Gênero para que o produto é destinado: ${gender}`;

    secao2.appendChild(elementoTitulo);
    secao2.appendChild(elementoDescricao);
    secao2.appendChild(elementoPreco);
    secao2.appendChild(elementoAno);
    secao2.appendChild(elementoAvaliacao);
    secao2.appendChild(elementototalAvaliacoes);
    secao2.appendChild(elementotipo);
    secao2.appendChild(elementogender);
}

// chamando api
async function carregarConteudo() {
    const apiUrl = `http://diwserver.vps.webdock.cloud:8765/products/${id}`;
    console.log(apiUrl);

    await fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const imagemUrl = data.image;
            const titulo = data.title;
            const descricao = data.description;
            const preco = data.price;
            const ano = data.year;
            const avaliacao = data.rating.rate;
            const totalAv = data.rating.count;
            const tipo = data.articleType;
            const gender = data.gender;

            inserindoElementos(imagemUrl, titulo, descricao, preco, ano, avaliacao, totalAv, tipo, gender);
        })
        .catch(error => {
            console.error(error);
        })
}
carregarConteudo();


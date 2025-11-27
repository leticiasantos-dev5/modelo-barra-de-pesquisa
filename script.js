let cardContainer = document.querySelector(".card-container");
let dados = [];

// Carrega os dados do JSON uma vez quando a página é carregada
window.addEventListener('DOMContentLoaded', async () => {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    rederizarCards(dados);
});

async function iniciarBusca() {
    const termoBusca = document.querySelector("#campo-busca").value.toLowerCase();

    if (termoBusca === "") {
        rederizarCards(dados); // Mostra todos se a busca estiver vazia
        return;
    }

    const resultados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    rederizarCards(resultados);
}

function rederizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.data_criacao}</p>
            <p>${dado.descricao}</p> 
            <a href="${dado.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    }
}

function leDados() {
  let strDados = localStorage.getItem("db");
  let objDados = {};

  if (strDados) {
    objDados = JSON.parse(strDados);
  } else {
    objDados = {
      usuario: [
        {
          nome: "Nícolas Carneiro",
          foto: "https://www.placecage.com/300/300",
          pontos: 240,
        },
      ],

      produtosTrocas: [
        {
          imagem: "./imgs/cinema.jpg",
          titulo: "R$ 5,00 de desconto em cinemas",
          descricao: "Tenha descontos para assistir seus filmes favoritos",
          preco: 40.0,
        },
        {
          imagem: "./imgs/ingresso.jpg",
          titulo: "Sorteio par de ingressos",
          descricao: "Participe do sorteio de um par de ingressos para ver Transformers",
          preco: 20.0,
        },
      ],
    };
  }

  console.log(objDados);

  salvaDados(objDados);

  return objDados;
}

function salvaDados(dados) {
  localStorage.setItem("db", JSON.stringify(dados));
}

function imprimeDados() {
  let nomeUsuario = document.getElementById("nome-usuario");
  let fotoUsuario = document.getElementById("foto-usuario");
  let pontosUsuarios = document.getElementById("pontos-usuario");

  let containerItens = document.getElementById("container-itens");
  let conteudoTroca = "";

  let objDados = leDados();

  nomeUsuario.innerHTML = `Olá ${objDados.usuario[0].nome}`;
  fotoUsuario.src = `${objDados.usuario[0].foto}`;
  pontosUsuarios.innerHTML = `${objDados.usuario[0].pontos} pontos`;

  for (let i = 0; i < objDados.produtosTrocas.length; i++) {
    conteudoTroca += `
            <article class="item">
              <img src=${objDados.produtosTrocas[i].imagem} alt="Imagem ilustrativa">
              <span>${objDados.produtosTrocas[i].titulo}</span>
              <p>${objDados.produtosTrocas[i].descricao}</p>
              <span>Preço: ${objDados.produtosTrocas[i].preco} pontos</span>
              <button id="button">Comprar</button>
              </article>
    `;
  }

  containerItens.innerHTML = conteudoTroca;

  let botoes = document.querySelectorAll("button");
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", function () {
        // alert('O elemento clicado foi o ' + objDados.produtosTrocas[i].preco);
        trocaPontos(objDados, i);
    })
  }
  
  console.log(botoes);
}

function trocaPontos(dados, botao) {
  let valorDescontado = dados.produtosTrocas[botao].preco;
  let valorAtual = dados.usuario[0].pontos;

  valorAtual -= valorDescontado;

  let pontosUsuarios = document.getElementById("pontos-usuario");
  pontosUsuarios.innerHTML = `${valorAtual} pontos`;
}

window.addEventListener('load', imprimeDados);
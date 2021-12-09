
// função que lê os dados do localStorage
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
          pontos: 600,
        },
      ],

      produtosTrocas: [
        {
          imagem: "./imgs/cinema.jpg",
          titulo: "R$ 5,00 de desconto em cinemas",
          descricao: "Tenha descontos para assistir seus filmes favoritos",
          preco: 40,
        },
        {
          imagem: "./imgs/ingresso.jpg",
          titulo: "Sorteio par de ingressos",
          descricao:
            "Participe do sorteio de um par de ingressos para ver Transformers",
          preco: 20,
        },
        {
          imagem: "./imgs/gift-card-music.jpg",
          titulo: "Gift Card de R$10",
          descricao:
            "Troque seus pontos por um gift card de R$10 em seu serviço de streaming de música favorito",
          preco: 60,
        },
        {
          imagem: "./imgs/bike.jpg",
          titulo: "Desconto de R$10 em serviços de bike",
          descricao:
            "Troque seus pontos por desconto em serviços de mobilidade urbana que usem bikes. Além de fazer bem para a saúde, ajuda o meio ambiente.",
          preco: 20,
        },
        {
          imagem: "./imgs/pet.jpg",
          titulo: "Banho no seu pet",
          descricao:
            "Troque seus pontos por um banho em seu pet. As pets shops são parceiras de nossa plataforma e irão tratar seu amigo com muito carinho.",
          preco: 400,
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

  nomeUsuario.innerHTML = `Olá, ${objDados.usuario[0].nome}`;
  fotoUsuario.src = `${objDados.usuario[0].foto}`;
  pontosUsuarios.innerHTML = `${objDados.usuario[0].pontos} pontos`;

  for (let i = 0; i < objDados.produtosTrocas.length; i++) {
    conteudoTroca += `
            <article class="item">
              <img src=${objDados.produtosTrocas[i].imagem} alt="Imagem ilustrativa">
              <span>${objDados.produtosTrocas[i].titulo}</span>
              <p>${objDados.produtosTrocas[i].descricao}</p>
              <span>Preço: ${objDados.produtosTrocas[i].preco} pontos</span>
              <button id="button">Trocar</button>
              </article>
    `;
  }

  containerItens.innerHTML = conteudoTroca;

  let botoes = document.querySelectorAll("button");
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", function () {
      if (objDados.produtosTrocas[i].preco > objDados.usuario[0].pontos) {
        alert(
          "Saldo insuficiente para trocar " +
            '"' +
            objDados.produtosTrocas[i].titulo +
            '"'
        );
      } else {
        alert(
          '"' +
            objDados.produtosTrocas[i].titulo +
            '"' +
            " trocado por " +
            objDados.produtosTrocas[i].preco +
            " pontos"
        );
        trocaPontos(objDados, i);
      }
    });
  }

  verificaSaldo(objDados, botoes);

  console.log(botoes);
}

function trocaPontos(dados, botao) {
  let valorDescontado = dados.produtosTrocas[botao].preco;
  let valorAtual = dados.usuario[0].pontos;

  valorAtual -= valorDescontado;

  dados.usuario[0].pontos = valorAtual;

  let pontosUsuarios = document.getElementById("pontos-usuario");
  pontosUsuarios.innerHTML = `${valorAtual} pontos`;

  salvaDados(dados);
  verificaSaldo(dados);
}

function verificaSaldo(dados, botoes) {
  let pontos = dados.usuario[0].pontos;
  let botaoAtual = botoes;

  if (pontos < 20) {
    document.getElementById("container-pontos").style.backgroundColor =
      "#e92929";
  }
}

window.addEventListener("load", imprimeDados);

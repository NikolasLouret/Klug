// função que lê os dados do localStorage
function leDados() {
  // pega os dados do localStorage
  let strDados = localStorage.getItem("db");
  // cria o objeto de dados
  let objDados = {};

  // confere se existe algo no localStorage
  if (strDados) {
    // caso tenha, coloca dentro da variável de dados
    objDados = JSON.parse(strDados);
  } else {
    // caso não tenha, cria o próprio objeto com os dados
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

  // mostra os dados no console
  console.log(objDados);

  // chama a função que salva os dados do localStorage
  salvaDados(objDados);

  // retorna o objeto, quando é chamada
  return objDados;
}

// função que salva os dados no localStorage
function salvaDados(dados) {
  // salva os dados passados por parâmetro no localStorage
  localStorage.setItem("db", JSON.stringify(dados));
}

// função que imprime os dados na tela
function imprimeDados() {
  // pega algumas informações do usuário no HTML da página
  let nomeUsuario = document.getElementById("nome-usuario");
  let fotoUsuario = document.getElementById("foto-usuario");
  let pontosUsuarios = document.getElementById("pontos-usuario");

  // pega o container dos itens para troca
  let containerItens = document.getElementById("container-itens");

  // declara variável que irá receber os itens
  let conteudoTroca = "";

  // define o objeto de dados como o retorno da função de ler dados
  let objDados = leDados();

  // coloca a frase abaixo com o nome do usuário no h1 do HTML
  nomeUsuario.innerHTML = `Olá, ${objDados.usuario[0].nome}`;
  // define o caminho da foto do usuário como o salvo no objeto
  fotoUsuario.src = `${objDados.usuario[0].foto}`;
  // carrega os pontos do usuário na tela
  pontosUsuarios.innerHTML = `${objDados.usuario[0].pontos} pontos`;

  // executa item por item e salva dentro da variável
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

  // coloca a variável no HTML da página
  containerItens.innerHTML = conteudoTroca;

  // pega todos os botões da página
  let botoes = document.querySelectorAll("button");

  // percorre por todos os botões da página
  for (let i = 0; i < botoes.length; i++) {
    // adiciona um Event Listener em cada um deles
    botoes[i].addEventListener("click", function () {
      // confere se o valor do item da a troca é maior do que o saldo do usuário
      if (objDados.produtosTrocas[i].preco > objDados.usuario[0].pontos) {
        // caso seja, exibe uma mensagem de alerta avisando o usuário
        alert(
          "Saldo insuficiente para trocar " +
            '"' +
            objDados.produtosTrocas[i].titulo +
            '"'
        );
      } else {
        // caso tenha saldo, mostra o produto e o valor dele
        alert(
          '"' +
            objDados.produtosTrocas[i].titulo +
            '"' +
            " trocado por " +
            objDados.produtosTrocas[i].preco +
            " pontos"
        );

        // chama a função que troca pontos, passando o objeto de dados e a posição do botão
        trocaPontos(objDados, i);
      }
    });
  }

  // chama a função que verifica o saldo do usuário
  verificaSaldo(objDados, botoes);

  // mostra os botões no console, apenas para controle
  console.log(botoes);
}

// função que troca os pontos
function trocaPontos(dados, botao) {
  // pega o valor do item a ser trocado
  let valorDescontado = dados.produtosTrocas[botao].preco;

  // pega o valor de pontos que o usuário tem atualmente
  let valorAtual = dados.usuario[0].pontos;

  // desconta os pontos do usuário do preço da troca
  valorAtual -= valorDescontado;

  // define o valor de pontos do usuário como o novo valor
  dados.usuario[0].pontos = valorAtual;

  // pega o elemento de pontos na tela
  let pontosUsuarios = document.getElementById("pontos-usuario");

  // atualiza no HTML o valor de pontos do usuário
  pontosUsuarios.innerHTML = `${valorAtual} pontos`;

  // chama a função que salva os dados atualizados no localStorage
  salvaDados(dados);

  // chama a função que verifica o saldo do usuário
  verificaSaldo(dados);
}

// função que verifica o saldo do usuário, apenas por questões estéticas
function verificaSaldo(dados, botoes) {
  // pega os pontos que o usuário tem atualmente
  let pontos = dados.usuario[0].pontos;

  // confere se o valor dos pontos é menor do que 20 (troca mais barata)
  if (pontos < 20) {
    // se for, define a cor do fundo do card como vermelho, apenas para layout
    document.getElementById("container-pontos").style.backgroundColor =
      "#e92929";
  }
}

// quando todos os itens da tela terminas de ser carregados, chama a função imprimeDados
window.addEventListener("load", imprimeDados);

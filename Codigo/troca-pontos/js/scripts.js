function leDados () {
  let strDados = localStorage.getItem('db');
  let objDados = {};

  if (strDados) {
      objDados = JSON. parse (strDados);
  }
  else {
      objDados = { 
        usuario: [
          {
            nome: 'Nícolas Carneiro',
            foto:' https://www.placecage.com/300/300',
            pontos: 240
          }
        ],
        
        produtosTrocas: [
          {
            imagem: './imgs/cinema.jpg',
            titulo: 'R$ 5,00 de desconto em cinemas',
            descricao: 'Tenha descontos para assistir seus filmes favoritos',
            preco: 20.0
          },
        ],
    }
  }

  console.log(objDados);

  return objDados;
}

function salvaDados (dados) {
  localStorage.setItem ('db', JSON.stringify (dados));
}

function imprimeDados() {
  let nomeUsuario = document.getElementById("nome-usuario");
  let fotoUsuario = document.getElementById("foto-usuario");
  let pontosUsuarios = document.getElementById("pontos-usuario")
  
  let objDados = leDados();

  nomeUsuario.innerHTML = `Olá ${objDados.usuario[0].nome}`;
  fotoUsuario.src = `${objDados.usuario[0].foto}`;
  pontosUsuarios.innerHTML = `${objDados.usuario[0].pontos} pontos`;

  
}

document.getElementById("comprar").addEventListener("click", imprimeDados);

imprimeDados();
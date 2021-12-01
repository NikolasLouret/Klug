// Página inicial de Login
const PERFIL_URL = "perfil.html";

// Objeto para o banco de dados de usuários baseado em JSON
var db_perfil = {};

// Objeto para o usuário corrente
var perfilCorrente = {};


// função para gerar códigos randômicos a serem utilizados como código de usuário
// Fonte: https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


// Dados de usuários para serem utilizados como carga inicial
const dadosPerfil = {
    perfil: [
        {"nome": "admin", "sobrenome": "de sistemas", "pais": "Brazil", "estado": "Minas Gerais", "email": "admin@abc.com", "senha":"123"},
    ]
};


// Inicializa o usuarioCorrente e banco de dados de usuários da aplicação de Login
function initPerfilApp () {
    // PARTE 1 - INICIALIZA USUARIOCORRENTE A PARTIR DE DADOS NO LOCAL STORAGE, CASO EXISTA
    perfilCorrenteJSON = sessionStorage.getItem('perfilCorrente');
    if (perfilCorrenteJSON) {
        perfilCorrente = JSON.parse (perfilCorrenteJSON);
    }
    
    // PARTE 2 - INICIALIZA BANCO DE DADOS DE USUÁRIOS
    // Obtem a string JSON com os dados de usuários a partir do localStorage
    var perfilJSON = localStorage.getItem('db_perfil');

    // Verifica se existem dados já armazenados no localStorage
    if (!perfilJSON) {  // Se NÃO há dados no localStorage
        
        // Informa sobre localStorage vazio e e que serão carregados os dados iniciais
        alert('Dados de usuários não encontrados no localStorage. \n -----> Fazendo carga inicial.');

        // Copia os dados iniciais para o banco de dados 
        db_perfil = dadosPerfil;

        // Salva os dados iniciais no local Storage convertendo-os para string antes
        localStorage.setItem('db_perfil', JSON.stringify (dadosPerfil));
    }
    else  {  // Se há dados no localStorage
        
        // Converte a string JSON em objeto colocando no banco de dados baseado em JSON
        db_perfil = JSON.parse(perfilJSON);    
    }
};

// Apaga os dados do usuário corrente no sessionStorage
function logoutUser () {
    perfilCorrente = {};
    sessionStorage.setItem ('perfilCorrente', JSON.stringify (perfilCorrente));
    window.location = PERFIL_URL;
}

function addUser (nome, sobrenome, pais, estado, email, senha) {
    
    // Cria um objeto de usuario para o novo usuario 
    let perfil = { "nome": nome, "sobrenome": sobrenome, "pais": pais, "estado": estado, "email": email, "senha": senha };
    
    // Inclui o novo usuario no banco de dados baseado em JSON
    db_perfil.perfil.push (perfil);

    // Salva o novo banco de dados com o novo usuário no localStorage
    localStorage.setItem('db_perfil', JSON.stringify (db_perfil));
}

function setUserPass () {

}
// Inicializa as estruturas utilizadas pelo PerfilApp
initPerfilApp ();
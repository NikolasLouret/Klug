var db_perguntas = {
    "data": [{
            "nickname": "Genivaldo",
            "titulo_pergunta": "Como editar rota?",
            "texto": "Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas maecenas pharetra"
        },
        {
            "nickname": "Nikolas",
            "titulo_pergunta": "Não consigo editar a rota",
            "texto": "Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas maecenas pharetra"
        }
    ]
}

// Caso os dados já estejam no Local Storage, caso contrário, carrega os dados iniciais
var db = JSON.parse(localStorage.getItem('db_quests'));
if (!db) {
    db = db_perguntas
};

// Exibe mensagem em um elemento de ID msg
function displayMessage(msg) {

}

function insertPergunta(pergunta) {
    let novaPergunta = {
        "nickname": pergunta.nickname,
        "titulo_pergunta": pergunta.titulo_pergunta,
        "texto": pergunta.texto
    };

    // Insere o novo objeto no array
    db.data.push(novaPergunta);

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_quests', JSON.stringify(db));
}
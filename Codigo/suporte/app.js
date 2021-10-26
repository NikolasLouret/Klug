var db_perguntas = {
    "data": [{
            "id": 1,
            "nickname": "Samantha",
            "titulo_pergunta": "Como editar rota?",
            "texto": "Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas maecenas pharetra",
        },
        {
            "id": 2,
            "nickname": "Carlos",
            "titulo_pergunta": "Não consigo editar a rota",
            "texto": "Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas maecenas pharetra"
        },
        {
            "id": 3,
            "nickname": "Laura Fonsceca",
            "titulo_pergunta": "Como deixar o mapa mais limpo?",
            "texto": "Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas maecenas pharetra"
        }
    ]
}

// Caso os dados já estejam no Local Storage, caso contrário, carrega os dados iniciais
var db = JSON.parse(localStorage.getItem('db_quests'));
if (!db) {
    db = db_perguntas
};

function insertPergunta(pergunta) {
    let novoId = db.data[db.data.length - 1].id + 1;
    let novaPergunta = {
        "id": novoId,
        "nickname": pergunta.nickname,
        "titulo_pergunta": pergunta.titulo_pergunta,
        "texto": pergunta.texto
    };

    // Insere o novo objeto no array
    db.data.push(novaPergunta);

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_quests', JSON.stringify(db));
}


function updatePergunta(id, pergunta) {
    // Localiza o indice do objeto a ser alterado no array a partir do seu ID
    let index = db.data.map(obj => obj.id).indexOf(id);

    // Altera os dados do objeto no array
    db.data[index].nickname = pergunta.nickname,
        db.data[index].titulo_pergunta = pergunta.titulo_pergunta,
        db.data[index].texto = pergunta.texto

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_quests', JSON.stringify(db));
}


function deletePergunta(id) {
    // Filtra o array removendo o elemento com o id passado
    db.data = db.data.filter(function(element) { return element.id != id });

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_quests', JSON.stringify(db));
}
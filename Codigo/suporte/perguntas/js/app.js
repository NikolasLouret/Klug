var db_perguntas = {
    "data": [{
            "question": {
                "id": 1,
                "nickname": "Wellington",
                "titulo_pergunta": "Como faz para criar um aviso de buraco no mapa?",
                "texto": "Onde eu moro tem muito buraco na rua, e eu queria criar alguns avisos no mapa pra mostrar pras outras pessoas onde eles estão. As únicas opções que eu encontro é de acidente, engarrafamento e pista alagada.",
            },
            "resp": [{
                "respId": 1,
                "name": "Nikolas",
                "content": "bafihsajkndyuoaetny"
            }, {
                "respId": 2,
                "name": "Nikolas",
                "content": "pokthjket´lkhnzedtr9uhtnçkhgjsrjtnhysçrtjkhgntsry"
            }, {
                "respId": 3,
                "name": "Nikolas",
                "content": "flgmnfdapgjkafd gouyafedhgpearng"
            }]
        },
        {
            "question": {
                "id": 2,
                "nickname": "Cleber",
                "titulo_pergunta": "Como faz pra mudar a visualização do gráfico da inclinação da rua?",
                "texto": "Sempre que tem uma rua mais inclinada, o site avisa através de um gráfico. Porém eu não entendo ele direito e eu queria mudar a vizualização dele pra outra mais simples."
            },
            "resp": [{
                "respId": 1,
                "name": "Nikolas",
                "content": "bafihsajkndyuoaetny"
            }, {
                "respId": 2,
                "name": "Nikolas",
                "content": "pokthjket´lkhnzedtr9uhtnçkhgjsrjtnhysçrtjkhgntsry"
            }, {
                "respId": 3,
                "name": "Nikolas",
                "content": "flgmnfdapgjkafd gouyafedhgpearng"
            }]
        },
        {
            "question": {
                "id": 3,
                "nickname": "Luiz",
                "titulo_pergunta": "Como que faz pra registrar o carro como forma de locomoção?",
                "texto": "Eu comprei um carro novo e queria mudar as formas de transporte pra aparecer apenas carro. O padrão é mostrar todos os meios de transporte, e eu queria mudar isso. Como que faz?"
            },
            "resp": [{
                "respId": 1,
                "name": "Nikolas",
                "content": "bafihsajkndyuoaetny"
            }, {
                "respId": 2,
                "name": "Nikolas",
                "content": "pokthjket´lkhnzedtr9uhtnçkhgjsrjtnhysçrtjkhgntsry"
            }, {
                "respId": 3,
                "name": "Nikolas",
                "content": "flgmnfdapgjkafd gouyafedhgpearng"
            }]
        },
        {
            "question": {
                "id": 4,
                "nickname": "Andriano",
                "titulo_pergunta": "Como faço pra tirar as marcações dos lugares do meu mapa",
                "texto": "Outro dia eu tava fazendo uma rota no site e não conseguia ver as ruas no mapa porque tinha muita marcação. Eu não gosto dessas marcações, por isso eu queria tirar. Eu fui nas configurações do mapa mas eu não encontrei nada. Alguém pode me ajudar?"
            },
            "resp": [{
                "respId": 1,
                "name": "Nikolas",
                "content": "bafihsajkndyuoaetny"
            }, {
                "respId": 2,
                "name": "Nikolas",
                "content": "pokthjket´lkhnzedtr9uhtnçkhgjsrjtnhysçrtjkhgntsry"
            }, {
                "respId": 3,
                "name": "Nikolas",
                "content": "flgmnfdapgjkafd gouyafedhgpearng"
            }]
        },
        {
            "question": {
                "id": 5,
                "nickname": "Wesley Wagner",
                "titulo_pergunta": "Como faz pra reportar as rotas erradas?",
                "texto": "Eu moro no interior e toda vez que eu faço um percurso, o site me indica uma rota que toda errada. Eu queria reportar essas rotas para que elas não apareçam mais. Obrigado!!!!"
            },
            "resp": [{
                "respId": 1,
                "name": "Nikolas",
                "content": "bafihsajkndyuoaetny"
            }, {
                "respId": 2,
                "name": "Nikolas",
                "content": "pokthjket´lkhnzedtr9uhtnçkhgjsrjtnhysçrtjkhgntsry"
            }, {
                "respId": 3,
                "name": "Nikolas",
                "content": "flgmnfdapgjkafd gouyafedhgpearng"
            }]
        }
    ]
}

// Caso os dados já estejam no Local Storage, caso contrário, carrega os dados iniciais
var db = JSON.parse(localStorage.getItem('db_quests'));
if (!db) {
    db = db_perguntas;
}

var user = JSON.parse(localStorage.getItem('usuarioCorrente'));

function insertPergunta(userId, pergunta) {
    let novaPergunta = {
        "question": {
            "id": userId,
            "nickname": user.nome + " " + user.sobrenome,
            "titulo_pergunta": pergunta.titulo_pergunta,
            "texto": pergunta.texto
        },
        "resp": []
    }

    // Insere o novo objeto no array
    db.data.push(novaPergunta);

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_quests', JSON.stringify(db));
}

function insertResp(classNome, resposta, userId) {
    // Criação de um novo objeto para adcicioná-lo no 'db.data.resp' correspondente
    let novaResp = {
        "name": userLogin.nome,
        "respId": userId,
        "content": resposta
    }

    // Obter o id da pergunta correspondete à resposta
    const id = classNome.substring(14);

    // Insere o novo objeto no array
    db.data[id].resp.push(novaResp);

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_quests', JSON.stringify(db));
}


function updatePergunta(id, pergunta) {
    // Identifica qual pergunta vai ser editada
    let question = db.data[id].question;

    // Altera os dados do objeto no array
    question.nickname = pergunta.nickname,
        question.titulo_pergunta = pergunta.titulo_pergunta,
        question.texto = pergunta.texto;

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_quests', JSON.stringify(db));
}

function updateResposta(classNome, resposta, respId) {
    const id = classNome.substring(9);

    // Identifica qual pergunta vai ser editada
    let jsonResp = db.data[respId].resp;

    // Altera os dados do objeto no array
    jsonResp[id].content = resposta;

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_quests', JSON.stringify(db));
}

function deletePergunta(classNome) {
    const id = classNome.substring(14);

    // Deleta todo o Array selecionado
    db.data.splice(id, 1);

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_quests', JSON.stringify(db));
}

function deleteResp(classNome, respId) {
    const id = classNome.substring(9);

    // Deleta todo o Array selecionado
    const resposta = db.data[respId].resp
    resposta.splice(id, 1);

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_quests', JSON.stringify(db));
}
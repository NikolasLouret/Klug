const PERFIL_URL = "https://icei-puc-minas-pples-ti.github.io/PLF-ES-2021-2-TI1-7924100-rotas-gps-1/Codigo/perfil/perfilPrincipal.html";
var link = JSON.parse(localStorage.getItem('link'));

function validacaoForm() {
    //Verificar os campos do formulário das perguntas individualmente
    const fields = document.querySelectorAll("[required]");

    function validateField(field) {
        //Lógica para verificar se existem erros
        function verifyErrors() {
            let foundError = false;

            for (key in field.validity) {
                if (field.validity[key] && !field.validity.valid)
                    foundError = key;
            }

            return foundError;
        }

        function setCustomMessage(message) {
            if (message) {
                $(field).attr('placeholder', field.placeholder + message);
            }
        }

        return function() {
            if (verifyErrors()) {
                field.style.border = "1px solid red";

                if (!asterisco) {
                    setCustomMessage("*");
                    asterisco = true;
                }
            } else {
                field.style.border = "1px solid rgb(0, 201, 0)";
                setCustomMessage();
            }
        }
    }

    function customValidation(event) {
        const field = event.target;
        const validation = validateField(field);
        // if (field.placeholder == "Primeiro nome" || field.placeholder == "Adicionar email" || field.placeholder == "Alterar senha")
        //     asterisco = false;
        // else asterisco = true;
        validation();
    }

    for (field of fields) {
        field.addEventListener("invalid", event => {
            //Tirar o bubble
            event.preventDefault();

            customValidation(event);
        })

        field.addEventListener("blur", customValidation);
    }
}

function start() {
    const btnEntrar = document.querySelector('#btn-entrar');
    btnEntrar.setAttribute('href', link);
}

// Declara uma função para processar o formulário de login
function processaFormLogin(event) {
    // Cancela a submissão do formulário para tratar sem fazer refresh da tela
    //event.preventDefault();

    //Faz a verificação individual de cada campo do formulário
    validacaoForm();

    // // Verfica se o formulário está preenchido corretamente
    if (!$('#login-form1')[0].checkValidity()) {
        return;
    }

    // Obtem os dados de login e senha a partir do formulário de login
    var username = $('#username').val();
    var password = $('#password').val();

    // Valida login e se estiver ok, redireciona para tela inicial da aplicação
    if (username && password) {
        resultadoLogin = loginUser(username, password);

        if (!resultadoLogin)
            alert('Usuário ou senha incorretos');
    }
}

function salvaLogin(event) {
    // Cancela a submissão do formulário para tratar sem fazer refresh da tela
    //event.preventDefault();

    //Faz a verificação individual de cada campo do formulário
    validacaoForm();

    // // Verfica se o formulário está preenchido corretamente
    if (!$('#login-form2')[0].checkValidity()) {
        return;
    }

    // Obtem os dados do formulário
    let nome = document.getElementById('txt_nome').value;
    let sobrenome = document.getElementById('txt_sobrenome').value;
    let email = document.getElementById('txt_email').value;
    let senha = document.getElementById('txt_senha').value;

    // Adiciona o usuário no banco de dados
    addUser(nome, sobrenome, senha, email);
    alert('Usuário salvo com sucesso. Proceda com o login para ');

    // Oculta a div modal do login
    //document.getElementById ('loginModal').style.display = 'none';
    $('#loginModal').modal('hide');
}

// Associa a funçao processaFormLogin  formulário adicionado um manipulador do evento submit
document.getElementById('login-form1').addEventListener('submit', processaFormLogin);


// Associar salvamento ao botao
document.getElementById('btn_salvar').addEventListener('click', salvaLogin);
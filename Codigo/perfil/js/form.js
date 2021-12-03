const LOGIN_URL = "https://icei-puc-minas-pples-ti.github.io/PLF-ES-2021-2-TI1-7924100-rotas-gps-1/Codigo/Login/login.html";
localStorage.setItem('link', JSON.stringify("https://icei-puc-minas-pples-ti.github.io/PLF-ES-2021-2-TI1-7924100-rotas-gps-1/Codigo/perfil/perfilPrincipal.html"));

function validacaoForm() {
    var asterisco;

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
        if (field.placeholder == "Primeiro nome" || field.placeholder == "Adicionar email" || field.placeholder == "Alterar senha")
            asterisco = false;
        else asterisco = true;
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

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) { //Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else { //Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function salvaPerfil(event) {
    // Cancela a submissão do formulário para tratar sem fazer refresh da tela
    event.preventDefault();

    //Faz a verificação individual de cada campo do formulário
    validacaoForm();

    // // Verfica se o formulário está preenchido corretamente
    if (!$('#form-configPerfil')[0].checkValidity()) {
        return;
    }

    // Obtem os dados do formulário
    let nome = $("#txt_nome").val();
    let sobrenome = $("#txt_sobrenome").val();
    let address = $("#txt_address").val();
    let email = $("#txt_email").val();
    let senha = $("#txt_senha").val();
    let userInfos = {
        nome: nome,
        sobrenome: sobrenome,
        address: address,
        email: email,
        senha: senha
    }

    // Adiciona o usuário no banco de dados
    updateUser(userInfos);
}

// Associar salvamento ao botao
document.getElementById('profile-button').addEventListener('click', salvaPerfil);

// Apaga os dados do usuário corrente no sessionStorage
function logoutUser() {
    const perfilCorrente = {};
    localStorage.setItem('usuarioCorrente', JSON.stringify(perfilCorrente));
    window.location.href = LOGIN_URL;
}

const usuario = JSON.parse(localStorage.getItem('usuarioCorrente'));
const usuariosJSON = JSON.parse(localStorage.getItem('db_usuarios'));

function updateUser(data) {
    // Localiza o indice do objeto a ser alterado no array a partir do seu ID
    let index = usuariosJSON.user.map(obj => obj.id).indexOf(usuario.id);

    // Altera os dados do objeto no array
    usuariosJSON.user[index].nome = data.nome,
        usuariosJSON.user[index].sobrenome = data.sobrenome,
        usuariosJSON.user[index].address = data.address,
        usuariosJSON.user[index].email = data.email,
        usuariosJSON.user[index].senha = data.senha

    const perfilCorrente = {};
    localStorage.setItem('usuarioCorrente', JSON.stringify(perfilCorrente));

    // Salva o novo banco de dados com o novo usuário no localStorage
    localStorage.setItem('db_usuarios', JSON.stringify(usuariosJSON));
    localStorage.setItem('usuarioCorrente', JSON.stringify(usuariosJSON.user[index]));

    //Recarregar a página
    location.reload();
}
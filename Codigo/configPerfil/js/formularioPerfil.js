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
    let nome = document.getElementById('txt_nome').value;
    let sobrenome = document.getElementById('txt_sobrenome').value;
    let address = document.getElementById('txt_address').value;
    let email = document.getElementById('txt_email').value;
    let senha = document.getElementById('txt_senha').value;

    // Adiciona o usuário no banco de dados
    addUser(nome, sobrenome, address, email, senha, email);
    alert('Usuário salvo com sucesso.');
}

function exibePerfil() {
    // Popula os inputs com os registros do banco de dados
    let perfil = perfilJSON.usuarios;

    let nome = `${perfil.nome}`;
    let sobrenome = `${perfil.sobrenome}`;
    let endereco = `${perfil.endereco}`;
    let email = `${perfil.email}`;
    let senha = `${perfil.senha}`;

    // Substitui as linhas do corpo dos inputs
    $('#txt_nome').val(nome);
    $('#txt_sobrenome').val(sobrenome);
    $('#txt_address').val(endereco);
    $('#txt_email').val(email);
    $('#txt_senha').val(senha);
}

function initPage() {
    exibePerfil();
}
window.addEventListener('load', initPage);

// Associar salvamento ao botao
document.getElementById('profile-button').addEventListener('click', salvaPerfil);
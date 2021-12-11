var link = JSON.parse(localStorage.getItem('link'));

function salvaLogin(event) {
    event.preventDefault();
    //Faz a verificação individual de cada campo do formulário
    validacaoForm();

    // // Verfica se o formulário está preenchido corretamente
    if (!$('#newUserForm')[0].checkValidity()) {
        alert('Dados incorretos');
        event.preventDefault();
        return;
    }

    // Obtem os dados do formulário
    let nome = document.getElementById('txt_nome').value;
    let sobrenome = document.getElementById('txt_sobrenome').value;
    let email = document.getElementById('txt_email').value;
    let senha = document.getElementById('txt_senha').value;

    // Adiciona o usuário no banco de dados
    addUser(nome, sobrenome, senha, email);

}

function linkBtnEntrar() {
    const btnSalvar = document.querySelector('#salvarLink');
    const inputSenha1 = document.querySelector('#txt_senha');
    const inputSenha2 = document.querySelector('#txt_senha2');

    if (link)
        inputSenha2.oninput = () => {
            if (inputSenha1.value == inputSenha2.value)
                btnSalvar.setAttribute('href', link);
            else
                btnSalvar.setAttribute('href', "");
        }
}

$(document).ready(function() {
    const btnSalvar = document.querySelector('#salvarLink');

    if (link == '' || link == null)
        btnSalvar.setAttribute('href', "https://icei-puc-minas-pples-ti.github.io/PLF-ES-2021-2-TI1-7924100-rotas-gps-1/Codigo/rotas/rotas.html");

    // Associa a funçao processaFormLogin  formulário adicionado um manipulador do evento submit
    document.getElementById('btn_salvar').onclick = salvaLogin;

    // Associar link da página antiga ao botão entrar
    document.getElementById('txt_senha2').addEventListener('focus', linkBtnEntrar);
})
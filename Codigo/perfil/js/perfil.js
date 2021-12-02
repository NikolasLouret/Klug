// Caso os dados já estejam no Local Storage, caso contrário, carrega os dados iniciais
var user = JSON.parse(localStorage.getItem('usuarioCorrente'));

window.addEventListener('load', function() {
    perfil(user);
    exibePerfil(user);
});


function perfil(data) {
    $('#perfil').append(`<!--Imagem do perfil-->
                        <img src="img/perfil-sem-foto.png" id="avatar_img" title="Foto de Perfil">

                        <!--Texto e Redes do perfil-->
                        <div class="infosPerfil">
                            <!--Texto-->
                            <div class="texto_perfil">
                                <h2 title="Nome de usuário">${data.nome} ${data.sobrenome}</h2>
                            </div>

                            <div class="infos">
                                <div id="location">
                                    <span><i class="fas fa-map-marker-alt"></i> Localização</span>
                                    : ${data.address}
                                </div>
                                <div id="email">
                                    <span><i class="fas fa-envelope"></i> Email</span>
                                    : ${data.email}
                                </div>
                            </div>
                        </div>`);
}

function exibePerfil(user) {
    let nome = `${user.nome}`;
    let sobrenome = `${user.sobrenome}`;
    let endereco = `${user.endereco}`;
    let email = `${user.email}`;

    // Substitui as linhas do corpo dos inputs
    $('#txt_nome').val(nome);
    $('#txt_sobrenome').val(sobrenome);
    $('#txt_address').val(endereco);
    $('#txt_email').val(email);
}
$(document).ready(function() {
    localStorage.setItem('link', JSON.stringify(""));

    const login = document.querySelector('#loginProfile');
    const trocaPonto = document.querySelector('#loginTrocaPonto');

    // Se o usuário não estiver logado, no menu aparecerá a palavra "Entrar"
    if (userLogin != undefined) {
        login.innerHTML = userLogin.nome;
        login.setAttribute('href', PERFIL_URL);
    } else {
        login.innerHTML = 'Entrar';
        login.setAttribute('href', LOGIN_URL);

        trocaPonto.classList.add("hidden");
    }

    login.addEventListener('click', function() {
        localStorage.setItem('link', JSON.stringify("https://icei-puc-minas-pples-ti.github.io/PLF-ES-2021-2-TI1-7924100-rotas-gps-1/Codigo/add-enderecos/index.html"));
    })
})

function toggleMenu() {
    const nav = document.getElementById("nav");
    const btnAddEndereco = document.querySelector('#addAddress')

    nav.classList.toggle('active');

    if (btnAddEndereco.className == 'block') {
        btnAddEndereco.classList.remove('block');
        btnAddEndereco.classList.add('hidden');
    } else {
        btnAddEndereco.classList.remove('hidden');
        btnAddEndereco.classList.add('block');
    }

}
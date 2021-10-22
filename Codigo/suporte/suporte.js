onload = () => {
    ethereum.autoRefreshOnNetworkChange = false;

}
const btnMobile = document.getElementById('btn-mobile');

function tuggleMenu() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
}

btnMobile.addEventListener('click', toggleMenu);
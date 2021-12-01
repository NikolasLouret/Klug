// Carregamento dos dados do JSON
const user = JSON.parse("perfil");
console.log(user);


// function mperfil(data) {
//     $('#perfil').append(`<!--Imagem do perfil-->
//                         <img src="${data.avatar_url}" id="avatar_img" title="Foto de Perfil">

//                         <!--Texto e Redes do perfil-->
//                         <div class="infosPerfil">
//                             <!--Texto-->
//                             <div class="texto_perfil">
//                                 <a href="${data.html_url}" target="_blank" title="Perfil no GitHub">${data.name}</a>
//                                 <p class="bio" title="Biografia">${data.bio}</p>
//                             </div>

//                             <div class="infos">
//                                 <div class="linha-1">
//                                     <div id="location">
//                                         <span><i class="fas fa-map-marker-alt"></i> Localização</span>
//                                         : ${data.location}
//                                     </div>

//                                     <div id="created_at">
//                                         <span><i class="fas fa-user"></i> Entrou</span>
//                                         : ${arrumaData(data.created_at)}
//                                     </div>
//                                 </div>

//                                 <div class="linha-2">
//                                     <div id="public_repos">
//                                         <span><i class="fab fa-github"></i> Repositórios</span>
//                                         : ${data.public_repos}
//                                     </div>

//                                     <div id="email">
//                                         <span><i class="fas fa-envelope"></i> Email</span>
//                                         : nikoul.ret@gmail.com
//                                     </div>
//                                 </div>
//                             </div>
//                             <a class="linkPerfil" href="${data.html_url}" target="_blank"><button id="btn-perfil" title="Acessar perfil no GitHub">Carregar perfil</button></a>
//                         </div>`);
// }
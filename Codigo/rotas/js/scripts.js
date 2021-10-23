// importa a chave de credencial de outro arquivo, por motivos de segurança
import { apiKey } from "./config.js";

import { initMap } from './mapa.js';

import { initAutocomplete } from './autoComplete.js';

// cria uma tag de script
let script = document.createElement("script");
// define o endereço do script como requisição da api, com a chave em seu escopo
script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
// função assíncrona, para não dar erro
script.async = true;

// anexa a função de iniciar mapa como resposta da requisição acima
window.initMap = function () {
  initMap();
  initAutocomplete();
};
// adiciona a tag acima no html
document.head.appendChild(script);



/*


// cria uma tag de script
let scriptAutoComplete = document.createElement("script");
// define o endereço do script como requisição da api, com a chave em seu escopo
scriptAutoComplete.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initAutocomplete&libraries=places&v=weekly`;
// função assíncrona, para não dar erro
scriptAutoComplete.async = true;

// anexa a função de iniciar mapa como resposta da requisição acima
window.initAutocomplete = function () {
  initAutocomplete();
};
// adiciona a tag acima no html
document.head.appendChild(scriptAutoComplete);

*/

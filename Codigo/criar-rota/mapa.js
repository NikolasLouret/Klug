// importa a chave de credencial de outro arquivo, por motivos de segurança
import { apiKey } from "./config.js";

// cria uma tag de script
let script = document.createElement("script");
// define o endereço do script como requisição da api, com a chave em seu escopo
script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
// função assíncrona, para não dar erro
script.async = true;

// anexa a função de iniciar mapa como resposta da requisição acima
window.initMap = function () {
  initMap();
};
// adiciona a tag acima no html
document.head.appendChild(script);

// função que inicia o mapa
function initMap() {
  // define o ponto inicial do centro do mapa
  let initialPosition = new google.maps.LatLng(-19.916667, -43.933333);

  // configurações visuais do mapa
  let mapOptions = {
    // posição inicial do mapa
    center: initialPosition,
    // zoom do mapa
    zoom: 16,
    // id do mapa otimizado para rotas
    mapId: "e98f0d30837eb812",
    // opções adicionais
    options: {
      // deixa o zoom do mapa apenas como o scrool do mouse
      gestureHandling: "greedy",
    },
  };

  // cria o mapa com as configurações definidas acima
  const map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // cria uma caixinha de informação do mapa
  const infoWindow = new google.maps.InfoWindow();

  // chama o botão para achar a posição atual
  const locationButton = document.getElementById("minha-localizacao");
  
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

// importa a chave de credencial de outro arquivo, por motivos de segurança
import { APIKEY } from "./config.js";

// chama a função que pega as coordenadas do usuário
getLocation();

// recupera as coordenadas do localSession
let coordenadas = JSON.parse(window.sessionStorage.getItem("coordenadas"));
console.log(coordenadas);

// se não tem as coordenadas do usuário, coloca como sendo o marco central de BH
if (!coordenadas) {
  coordenadas = {
    lat: -19.916667,
    lng: -43.933333,
  };
}

// função que pega as coordenadas do usuário
function getLocation() {
  // verifica se o navegador suporta geolocalização
  if (navigator.geolocation) {
    // caso sim, chama a função que vai guardar as coordenadas
    navigator.geolocation.getCurrentPosition(myLocation);
  }
  // caso não, mostra um mensagem de erro
  else {
    alert("O seu navegador não suporta Geolocalização.");
  }

  // função que guarda as coordenadas do usuário, recebendo a posição como parâmetro
  function myLocation(position) {
    // cria o objeto e guarda as coordenadas
    let objetoCoordenadas = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    // salva tudo no localSession
    window.sessionStorage.setItem(
      "coordenadas",
      JSON.stringify(objetoCoordenadas)
    );
  }
}

// cria o mapa, com estilo próprio feito e com algumas configurações adicionais
mapboxgl.accessToken = APIKEY;
const map = new mapboxgl.Map({
  // ID do container do map
  container: "map", 
  // URL do estilo do mapa, focado para quem dirige
  style: "mapbox://styles/mpolomartins/ckv3szjic4mit14leuvd8rz5a", 
  // iniciando com a posição das coordenadas [lng, lat] do usuário, caso tenha
  center: [coordenadas.lng, coordenadas.lat], 
  // define o zoom do mapa
  zoom: 18, // starting zoom
});

// adiciona o botão de encontrar a localização do usuário
map.addControl(
  new mapboxgl.GeolocateControl({
    // ativa a opção de alta precisão 
    positionOptions: {
      enableHighAccuracy: true,
    },
    // opção para quando a posição do usuário muda
    trackUserLocation: true,
    // Mostra na tela o raio da precisão da localização e um alfinete onde o usuário está
    showUserHeading: true,
  })
);

// Algumas experiências, futuras features

// const geocoder = new MapboxGeocoder({
//   accessToken: mapboxgl.accessToken,
//   mapboxgl: mapboxgl,
// });
// document.getElementById("searchTextField").appendChild(geocoder.onAdd(map));

// Add the control to the map.
// map.addControl(
//   new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     mapboxgl: mapboxgl,
//     placeholder: "Para onde iremos?",
//   })
// );

// adiciona o campo de criar rota no mapa
map.addControl(
  new MapboxDirections({
    // pega as credenciais usadas anteriormente
    accessToken: mapboxgl.accessToken,
    // define as unidades de medidas em metros
    unit: "metric",
    // define a língua como português brasileiro
    language: "pt-BR",
    // mensagem no local de origem da rota
    placeholderOrigin: "Origem da rota",
    // mensagem no local de destino da rota
    placeholderDestination: "Destino da rota",
    // pede para que o mapa traga mais rotas alternativas
    parameters: {
      alternatives: true,
    },
  }),
  // local onde ficará o campo de criar rota
  "top-left"
);

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

mapboxgl.accessToken = APIKEY;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mpolomartins/ckv3szjic4mit14leuvd8rz5a", // style URL
  center: [coordenadas.lng, coordenadas.lat], // starting position [lng, lat]
  zoom: 18, // starting zoom
});

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true,
  })
);

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

map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    placeholder: "Para onde iremos?",
    unit : 'metric',
    language: 'pt-BR',
    placeholderOrigin: 'Origem da rota',
    placeholderDestination: 'Destino da rota',
    parameters: {
      alternatives: true
    }
  }),
  'top-left'
);

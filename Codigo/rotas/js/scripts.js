// importa a chave de credencial de outro arquivo, por motivos de segurança
import { apiKey } from "./config.js";

getLocation();

let coordenadas = JSON.parse(
  window.sessionStorage.getItem("coordenadas")
);
console.log(coordenadas);

// async function myLocation() {
//   // cria uma caixinha de informação do mapa

//   // Try HTML5 geolocation.
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         start[0] = position.coords.longitude;
//         start[1] = position.coords.latitude;
//       },
//       () => {
//         // handleLocationError(true, infoWindow, map.getCenter());
//       },
//       { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 }
//     );
//   } else {
//     // Browser doesn't support Geolocation
//     // handleLocationError(false, infoWindow, map.getCenter());
//   }
//   console.log(start);
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(
//     browserHasGeolocation
//       ? "Error: The Geolocation service failed."
//       : "Error: Your browser doesn't support geolocation."
//   );
//   infoWindow.open(map);
// }

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(myLocation);
  } else {
    alert("O seu navegador não suporta Geolocalização.");
  }
  function myLocation(position) {
    let objetoCoordenadas = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    
    window.sessionStorage.setItem(
      "coordenadas",
      JSON.stringify(objetoCoordenadas)
    );
  }
}



// const geocoder = new MapboxGeocoder({
//   accessToken: mapboxgl.accessToken,
//   mapboxgl: mapboxgl,
// });
// document.getElementById('searchTextField').appendChild(geocoder.onAdd(map));

// // Add the control to the map.
// map.addControl(
//   new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     mapboxgl: mapboxgl,
//     placeholder: "Para onde iremos?",
//   }),
// );

mapboxgl.accessToken = apiKey;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mpolomartins/ckv3szjic4mit14leuvd8rz5a", // style URL
  center: [coordenadas.lng, coordenadas.lat], // starting position [lng, lat]
  zoom: 16, // starting zoom
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

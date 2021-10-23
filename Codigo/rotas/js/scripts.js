// importa a chave de credencial de outro arquivo, por motivos de segurança
import { apiKey } from "./config.js";

mapboxgl.accessToken = apiKey;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mpolomartins/ckv3szjic4mit14leuvd8rz5a", // style URL
  center: [-43.933333, -19.916667], // starting position [lng, lat]
  zoom: 16, // starting zoom
});

myLocation(map);

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true,
    maxZoom: 16,
  })
);

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
});

document.getElementById("searchTextField").appendChild(geocoder.onAdd(map));

function myLocation(map) {
  // cria uma caixinha de informação do mapa

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        console.log(pos);
      },
      () => {
        // handleLocationError(true, infoWindow, map.getCenter());
      },
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 }
    );
  } else {
    // Browser doesn't support Geolocation
    // handleLocationError(false, infoWindow, map.getCenter());
  }
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

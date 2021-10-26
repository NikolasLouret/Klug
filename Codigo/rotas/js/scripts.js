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

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
});
document.getElementById("searchTextField").appendChild(geocoder.onAdd(map));

// Add the control to the map.
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: "Para onde iremos?",
  })
);

map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    placeholder: "Para onde iremos?",
  })
);

// an arbitrary start will always be the same
// only the end or destination will change
const start = [coordenadas.lng, coordenadas.lat];

// create a function to make a directions request
async function getRoute(end) {
  // make a directions request using cycling profile
  // an arbitrary start will always be the same
  // only the end or destination will change
  const query = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&language=pt-BR&geometries=geojson&access_token=${mapboxgl.accessToken}`,
    { method: "GET" }
  );
  const json = await query.json();
  const data = json.routes[0];
  const route = data.geometry.coordinates;
  const geojson = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: route,
    },
  };
  // if the route already exists on the map, we'll reset it using setData
  if (map.getSource("route")) {
    map.getSource("route").setData(geojson);
  }
  // otherwise, we'll make a new request
  else {
    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: geojson,
      },
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3887be",
        "line-width": 5,
        "line-opacity": 0.75,
      },
    });
  }
  // add turn instructions here at the end
  // get the sidebar and add the instructions
  const instructions = document.getElementById("instructions");
  const steps = data.legs[0].steps;

  let tripInstructions = "";
  for (const step of steps) {
    tripInstructions += `<li>${step.maneuver.instruction}</li>`;
  }

  instructions.innerHTML =
    `<p><strong>Duração da viagem: ${Math.floor(
      data.duration / 60
    )} min 🚗 </strong></p>` +
    `<p><strong>Distância: ${(data.distance / 1000).toFixed(
      2
    )} km</strong></p><ol>${tripInstructions}</ol>`;

  instructions.style.display = "block";
}

map.on("load", () => {
  // make an initial directions request that
  // starts and ends at the same location
  getRoute(start);

  // Add starting point to the map
  map.addLayer({
    id: "point",
    type: "circle",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: start,
            },
          },
        ],
      },
    },
    paint: {
      "circle-radius": 10,
      "circle-color": "#3887be",
    },
  });
  // this is where the code from the next step will go
  map.on("click", (event) => {
    const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
    const end = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: coords,
          },
        },
      ],
    };
    if (map.getLayer("end")) {
      map.getSource("end").setData(end);
    } else {
      map.addLayer({
        id: "end",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: coords,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "#f30",
        },
      });
    }
    getRoute(coords);
  });
});

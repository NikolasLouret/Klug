export function initAutocomplete() {
  // var map = new google.maps.Map(document.getElementById('map'), {
  //   center: {
  //     lat: 48,
  //     lng: 4
  //   },
  //   zoom: 4,
  //   disableDefaultUI: true
  // });

  // Create the search box and link it to the UI element.
  let input = document.getElementById('searchTextField');
  let autocomplete = new google.maps.places.Autocomplete(input);
}

document.addEventListener("DOMContentLoaded", function(event) {
  initAutocomplete();
});











function marcador() {
  var marker = new google.maps.Marker({
    map: map
  });

  // Bias the SearchBox results towards current map's viewport.
  autocomplete.bindTo('bounds', map);
  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(
    ['address_components', 'geometry', 'name']);

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    var bounds = new google.maps.LatLngBounds();
    marker.setPosition(place.geometry.location);

    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
  });
}
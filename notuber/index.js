let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 42.352271, lng: -71.05524200000001 },
    zoom: 14,
  });

  const markerlocs = [
    { lat: 42.3453, lng: -71.0464 },
    { lat: 42.3662, lng: -71.0621 },
    { lat: 42.3603, lng: -71.0547 },
    { lat: 42.3472, lng: -71.0802 },
    { lat: 42.3663, lng: -71.0544 },
    { lat: 42.3542, lng: -71.0704 },
  ];

  markerlocs.forEach((marker) => {
    const setMarker = new google.maps.Marker({
      position: { lat: marker.lat, lng: marker.lng },
      icon: "car.png",
    });
    setMarker.setMap(map);
  });
}

window.initMap = initMap;

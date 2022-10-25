let map, distance;
let storeMarker = { lat: "", lng: "" };

const loadMap = () => {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 42.352271, lng: -71.05524200000001 },
    zoom: 13,
  });
};

const applyRideMarkers = (markerlocs, lat, lng) => {
  markerlocs.forEach((marker) => {
    const testDistance = Math.floor(
      google.maps.geometry.spherical.computeDistanceBetween(
        { lat, lng },
        { lat: marker.lat, lng: marker.lng },
      ) / 1609.344,
    );
    if (testDistance < distance || !distance) {
      distance = testDistance;
      storeMarker.lat = marker.lat;
      storeMarker.lng = marker.lng;
    }

    const infowindow = new google.maps.InfoWindow({
      content: testDistance.toString() + " miles away",
    });

    const rideMarker = new google.maps.Marker({
      position: { lat: marker.lat, lng: marker.lng },
      icon: "car.png",
    });

    rideMarker.addListener("click", () => {
      infowindow.open({
        anchor: rideMarker,
        map,
      });
    });

    rideMarker.setMap(map);
  });
};

const applyCurrentLocationMarker = (lat, lng) => {
  const infowindow = new google.maps.InfoWindow({
    content: distance.toString() + " miles to nearest ride",
  });

  const currentLocationMarker = new google.maps.Marker({
    position: { lat, lng },
  });
  currentLocationMarker.setMap(map);
  currentLocationMarker.addListener("click", () => {
    infowindow.open({
      anchor: currentLocationMarker,
      map,
    });
  });

  const coords = [
    { lat, lng },
    { lat: storeMarker.lat, lng: storeMarker.lng },
  ];
  const path = new google.maps.Polyline({
    path: coords,
    strokeColor: "blue",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  path.setMap(map);
};

const loadMarkers = () => {
  navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const http = new XMLHttpRequest();
    const url = "https://jordan-marsh.herokuapp.com/rides";
    const params = "username=DCEZBDzN&lat=" + lat + "&lng=" + lng;

    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
        document.getElementById("cover-spin").hidden = true;

        const markerlocs = JSON.parse(http.responseText);
        applyRideMarkers(markerlocs, lat, lng);
        applyCurrentLocationMarker(lat, lng);
      }
    };

    http.send(params);
  });
};

const loadNearby = () => {
  
}

window.initMap = () => {
  loadMap();
  loadMarkers();
  loadNearby();
};
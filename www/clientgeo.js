$(document).ready(function () {
  navigator.geolocation.getCurrentPosition(showPosition);

});

  function showPosition(position) {
    document.getElementById("lat").value = position.coords.latitude;
    document.getElementById("lng").value = position.coords.longitude;

    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    console.log(pos);
      userMap(pos);
    }

  function userMap(pos) {
    debugger;
    var mapCanvas = document.getElementById('map-canvas'); //div in the html
    var mapOptions = {
        center: {lat: pos.lat, lng: pos.lng},
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
    };
    map = new google.maps.Map(mapCanvas, mapOptions);
    console.log(map);
  };

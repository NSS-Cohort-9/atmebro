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
  var mapCanvas = document.getElementById('map-canvas'); //div in the html
  var mapOptions = {
    center: {
      lat: pos.lat,
      lng: pos.lng
    },
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);
  console.log('map>>>>>>>>>>', map);


  ///////////////
  //info window//
  ///////////////
var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. '+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';
;

  var infowindow = new google.maps.InfoWindow({
    //word from the post
    //and the photo from imagur
    //and the geolocation
    content: contentString

  });    console.log('infowindow>>>>>', infowindow);

  var marker = new google.maps.Marker({
    position: pos,
    map: map,
    title: 'This is a test'
  });
  console.log('marker>>>>>>>', marker)

  marker.addListener('click', function () {
    infowindow.open(map, marker);
  });
  //wait for the creation of the infowindow html structure
  google.maps.event.addListener(infowindow, 'domready', function () {
    //div that takes content for infowindow
    var iwOuter = $('.gm-style-iw');
    //just above that is the div we want to change
    var iwBackground = iwOuter.prev();
    //remove the background shadow div
    iwBackground.children(':nth-child(2)').css({
      'display': 'none'
    });
    //remove the white background div
    iwBackground.children('nth-child(4)').css({
      'display': 'none'
    });
    iwOuter.parent().parent().css({
      left: '115px'
    });
    //moves shadow of arrow to the left
    iwBackground.children(':nth-child(1)').attr('style', function (i, s) {
      return s + 'left: 76px !important;'
    });
    //moves arrow to left
    iwBackground.children(':nth-child(3)').attr('style', function (i, s) {
      return s + 'left: 76px !important;'
    });
    iwBackground.children(':nth-child(3)').find('div').children().css({
      'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px',
      'z-index': '1'
    });
  });
};

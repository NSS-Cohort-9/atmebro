(function () {

  'use strict';

  $(document).ready(function () {
    navigator.geolocation.getCurrentPosition(showPosition);

    function showPosition(position) {

      document.getElementById('lat').value = position.coords.latitude;
      document.getElementById('lng').value = position.coords.longitude;
    }
  });

})();

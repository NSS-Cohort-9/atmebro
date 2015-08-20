var geocoder = require('geocoder')

module.exports.getLoc = function getLoc (req, res) {
  res.render('geolocation/index')
}

module.exports.submitLoc = function submitLoc (req, res) {
  var lat = req.body.lat;
  var long = req.body.long;
  var newlat = parseFloat(lat);
  var newlong = parseFloat(long);

  geocoder.reverseGeocode(newlat, newlong, function(err, data) {
    var address = data.results[0].formatted_address;
  });
  res.redirect('/');
}

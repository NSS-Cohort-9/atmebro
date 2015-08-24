'use strict';

var geocoder = require('geocoder')

module.exports.submitLoc = function submitLoc (req, res, next) {
  var newlat = parseFloat(req.body.lat);
  var newlong = parseFloat(req.body.long);

  geocoder.reverseGeocode(newlat, newlong, function(err, data) {
    req.body.address = data.results[1].formatted_address;
    next();
  });
}

'use strict';

var geocoder = require('geocoder');

module.exports.submitLoc = function submitLoc(req, res, next) {
  var newlat = parseFloat(req.body.lat);
  var newlong = parseFloat(req.body.long);

  geocoder.reverseGeocode(newlat, newlong, function(err, data) {
    if (err) { throw err; }
    req.body.address = data.results[2].formatted_address;
    next();
  });
};

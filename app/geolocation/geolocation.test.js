var expect = require('chai').expect;
var request = require('supertest');
var geo = require('./geolocation.js')

describe('geolocation', function() {
  describe.only('IP Address', function() {
    it('should identify my IP address', function() {
      var actual = require('./geolocation.js').getIP();
      request
        .post('/')
        .end(function(err, res){
          console.log('res');
        })
    });
  });
});

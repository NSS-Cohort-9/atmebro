var expect = require('chai').expect;
var request = require('supertest');
var geo = require('./geolocation.js');
//var map = require('./map.js')

describe('geolocation', function () {
  describe.only('IP Address', function () {
    it('should identify my IP address', function () {
      var actual = require('./geolocation.js').getIP();
      request
        .post('/')
        .end(function (err, res) {
          console.log('res');
        })
    });
  });
});
describe('Map', function () {
  describe('constructor', function () {
    it('should return an animal object', function () {
      var animal = new Animal();
      animal.should.be.an('object');
      animal.should.be.an.instanceOf(Animal);
    });
  });
});

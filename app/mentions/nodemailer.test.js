'use strict';

var nodemailer = require('nodemailer');
var expect    = require('chai').expect;
var should    = require('chai').should();
var mention = require('./mentions')
var sinon = require('sinon');

describe('nodemailer unit tests', function () {
  var nm, transport;

  beforeEach(function () {
    transport = {
      name: 'test',
      send: function(data, cb) {
        cb();
      }
    };
    nm = nodemailer.createTransport(transport);
  });

  it('should create Nodemailer transport object', function() {
    expect(nm).to.exist;
  });

  it('should process sendMail', function(done) {
    sinon.stub(transport, 'send').yields(null, 'test message');

    nm.sendMail({
        subject: 'test'
    }, function(err, info) {
        expect(transport.send.callCount).to.equal(1);
        expect(info).to.equal('test message');
        transport.send.restore();
        done();
    });
  });

});

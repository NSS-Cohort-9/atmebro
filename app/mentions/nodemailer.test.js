'use strict';

var nodemailer = require('nodemailer');
var expect    = require('chai').expect;
var should    = require('chai').should();
var nodemailerJS = require('./nodemailer');

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

  it('should create mailOptions object', function (done) {

    expect(mailOptions.subject).to.equal('hello');
    done();
  });

});

'use strict';

var nodemailer = require('nodemailer');
var expect    = require('chai').expect;
var should    = require('chai').should();
var nodemailerJS = require('./nodemailer');
var mailOptions = require('./nodemailer');

describe('nodemailer unit tests', function () {
  var nm, transport;

  beforeEach(function () {
    transport = {
      name: 'test',
      send: function(data, cb) {
        cb();
      }
    };
  });

  it('should create Nodemailer transport object', function() {
    nm = nodemailer.createTransport({});
    expect(nm).to.exist;
  });

  it('should create mailOptions object', function (done) {

    var mailOptions;

    expect(mailOptions.subject).to.equal('hello');
    console.log(mailOptions.subject);
    done();
  });

});

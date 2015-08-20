var should = require("chai").should();
//var nm = require('nodemailer');
var request = require('supertest');


describe('Mocha + Chai', function() {
  it('thruthiness', function () {
    true.should.equal(true);
    false.should.equal(false);
  });
});

describe('#indexOf()', function () {
  it('should return -1 when value is not present', function () {
    [1, 2, 3].indexOf(5).should.equal(-1);
    [1, 2, 3].indexOf(0).should.equal(-1);
  });
});

describe('find username', function () {

  beforeEach(function (done) {
    var post = {

    }
    require('../../../../lib/mongo').connect(function(err, db){
      db.collection.insert(username, function () {
        done();
      });
    });
  });
  afterEach(function(done){
    require('../../../../lib/mongo').connect(function(err, db){
      username.remove({}, function () {
      done();
    });
  });

  it('should return username if mention added to user object', function (done) {
    username.findByUsername(user.username, function (){
      user.username.should.equal("buddythegirl");
      done();
    });
  });
});

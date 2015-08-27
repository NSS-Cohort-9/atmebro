'use strict';

var expect = require('chai').expect;

var User = require('../user/User');
var mongo = require('../../lib/mongo/');

describe('User', function () {

	before(function (done) {
		mongo.connect(function () {
			var user = {_id: 'foo', admin_status: true, toggled_admin_status: false};

			User.collection.insertOne(user, done);
		});
	});

	after(User.dropCollection);

	describe('.toggleAdminStatus()', function () {
		User.findByUserName('foo', function (err, user) {
	        if (err) { throw err; }
	        expect(user.admin_status).to.eql('{toggled_admin_status: false}');
	        done();
	  	});
	});

});
'use strict';

var User = require('../user/User');

User.toggleAdminStatus = function(id) {
	User.collection.findOne({_id: username}, function (err, user) {
	    if (user.admin_status == false) {
	    	User.collection.update({ _id: username },{$set: {
				admin_status: true
			}});
	    }else if( user.admin_status == true ) {
	        User.collection.update({ _id: username },{$set: {
				admin_status: false
			}});
	    }else {
	        User.collection.update({ _id: username },{$set: {
				admin_status: false
			}});
	    }
  });
}


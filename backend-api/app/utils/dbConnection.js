var mongoose = require('mongoose');

const options = {
	useNewUrlParser: true,
	autoReconnect: true
};

exports.connect = function () {
	mongoose.connect('mongodb://mongo:27017/models', options, 
		function(err, res) {
    	if(err) {
        	console.log('ERROR: connecting to database. ' + err);
    	}
	});
};
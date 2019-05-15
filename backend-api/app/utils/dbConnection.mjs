import mongoose from 'mongoose';

const options = {
	useNewUrlParser: true,
	autoReconnect: true
};

export function connect () {
	mongoose.connect('mongodb://mongo:27017/models', options,
		function (err, res) {
			if (err) {
				console.log('ERROR: connecting to database. ' + err);
			}
		});
}
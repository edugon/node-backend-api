var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	enums = require('../utils/enums');

// min/max value checks are not meant for arrays, custom validation needed
var availabilityValidators = [
	{ validator: availabilityMin, msg: 'at least one day' },
	{ validator: availabilityMax, msg: 'no more than a week' }
];

var workerSchema = new Schema({
	id: {
		required: [true, 'this is required!'],
		unique: true,
		type: Number,
		min: 1
	},
	availability: {
		required: [true, 'this is required!'],
		type: [{
			type: String,
			enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
		}],
		validate: availabilityValidators
	},
	payrate: {
		required: [true, 'this is required!'],
		type: Number,
		min: 0
	}
});

function availabilityMin(availability) {
	return availability.length >= 1;
}

function availabilityMax(availability) {
	return availability.length <= 5;
}

// not working :(
function dayEnum() {
	return enums.days;
}

module.exports = mongoose.model('Worker', workerSchema);
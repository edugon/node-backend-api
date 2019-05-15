import mongoose from 'mongoose';
import { DAYS, ENTITY, MESSAGES } from '../utils/constants';

const Schema = mongoose.Schema;

// min/max value checks are not meant for arrays, custom validation needed
const availabilityValidators = [
	{ validator: availabilityMin, msg: MESSAGES.min_day },
	{ validator: availabilityMax, msg: MESSAGES.max_week }
];

const workerSchema = new Schema({
	id: {
		required: [true, MESSAGES.required_field],
		unique: true,
		type: Number,
		min: 1
	},
	availability: {
		required: [true, MESSAGES.required_field],
		type: [{
			type: String,
			enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
		}],
		validate: availabilityValidators
	},
	payrate: {
		required: [true, MESSAGES.required_field],
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
	return DAYS;
}

export default mongoose.model(ENTITY.worker, workerSchema);
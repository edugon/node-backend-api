import mongoose from 'mongoose';
import { DAYS, ENTITY, MESSAGES } from '../utils/constants';

const Schema = mongoose.Schema;

// min/max value checks are not meant for arrays, custom validation needed
const dayValidators = [
	{ validator: dayMin, msg: MESSAGES.min_day },
	{ validator: dayMax, msg: MESSAGES.max_day }
];

const shiftSchema = new Schema({
	id: {
		required: [true, MESSAGES.required_field],
		unique: true,
		type: Number,
		min: 1
	},
	day: {
		required: [true, MESSAGES.required_field],
		type: [{
			type: String,
			enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
		}],
		validate: dayValidators
	}
});

function dayMin(day) {
	return day.length >= 1;
}

function dayMax(day) {
	return day.length <= 1;
}

// not working :(
function dayEnum() {
	return DAYS;
}

export default mongoose.model(ENTITY.shift, shiftSchema);
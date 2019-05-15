import mongoose from 'mongoose';
import { ENTITY, MESSAGES, REGEX } from '../utils/constants';

const Schema = mongoose.Schema;

const passwordValidators = [
		{ validator: checkPassword, msg: MESSAGES.invalid_pass }
	],
	emailValidators = [
		{ validator: checkEmail, msg: MESSAGES.invalid_email }
	];

const userSchema = new Schema({
	id: {
		required: [true, MESSAGES.required_field],
		unique: true,
		type: Number,
		min: 1
	},
	name: {
		required: [true, MESSAGES.required_field],
		type: String
	},
	password: {
		required: [true, MESSAGES.required_field],
		type: String,
		validate: passwordValidators
	},
	email: {
		required: [true, MESSAGES.required_field],
		unique: true,
		type: String,
		validate: emailValidators
	}
});

function checkPassword(password) {
	let pattern = new RegExp(REGEX.password);
	return pattern.test(password);
}

function checkEmail(email) {
	let pattern = new RegExp(REGEX.email);
	return pattern.test(email);
}

export default mongoose.model(ENTITY.user, userSchema);
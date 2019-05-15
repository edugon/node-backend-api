var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	regex = require('../utils/regex');

var passwordValidators = [
	{ validator: checkPassword, msg: 'at least one uppercase or one number (min. 4 chars)' }
],
	emailValidators = [
		{ validator: checkEmail, msg: 'invalid email address' }
	];

var userSchema = new Schema({
	id: {
		required: [true, 'this is required!'],
		unique: true,
		type: Number,
		min: 1
	},
	name: {
		required: [true, 'this is required!'],
		type: String
	},
	password: {
		required: [true, 'this is required!'],
		type: String,
		validate: passwordValidators
	},
	email: {
		required: [true, 'this is required!'],
		unique: true,
		type: String,
		validate: emailValidators
	}
});

function checkPassword(password) {
	let pattern = new RegExp(regex.password);
	return pattern.test(password);
}

function checkEmail(email) {
	let pattern = new RegExp(regex.email);
	return pattern.test(email);
}

module.exports = mongoose.model('User', userSchema);
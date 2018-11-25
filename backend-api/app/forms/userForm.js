var requestValidator = require('../utils/requestValidator'),
	errorHandler = require('../utils/errorHandler'),
	userSchema = require('mongoose').model('User').schema;

/* 
 * Here the validation procedure for users, triggered by controller (if needed).
 * If forms are OK, continue to schema validation.
 * Criteria:
 * 		1. Validate common forms, errors fired by validator.
 * 		2. Validate JSON keys, errors fired by validator.
 *		3. Any other specific criteria ...
 */

exports.validate = function(req, next) {
	// first validate common forms
	if(!requestValidator.validateRequest(req, next)) {
		return false;
	} else {
		let keys = Object.keys(req.body),
			userKeys = Object.keys(userSchema.paths);
		if(!requestValidator.validateKeys(keys, userKeys, next)) {
			return false;
		}
		// ... more validation of specific forms
		return true;
	}
}
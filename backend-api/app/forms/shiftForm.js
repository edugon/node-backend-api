var requestValidator = require('../utils/requestValidator'),
	errorHandler = require('../utils/errorHandler'),
	Worker = require('../models/worker'),
	shiftSchema = require('mongoose').model('Shift').schema;

/* 
 * Here the validation procedure for shifts, triggered by controller (if needed).
 * If forms are OK, continue to schema validation.
 * Criteria:
 * 		1. Validate common forms, errors fired by validator.
 * 		2. Validate JSON keys, errors fired by validator.
 *		3. Any other specific criteria (e.g. check the worker exists if associated).
 */

exports.validate = function(req, next) {
	// first validate common forms
	if(!requestValidator.validateRequest(req, next)) {
		return false;
	} else {
		let keys = Object.keys(req.body),
			shiftKeys = Object.keys(shiftSchema.paths);
		if(!requestValidator.validateKeys(keys, shiftKeys, next)) {
			return false;
		}
		// ... more validation of specific forms
		return true;
	}
}
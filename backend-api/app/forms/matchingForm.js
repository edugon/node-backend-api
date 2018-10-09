var requestValidator = require('../utils/requestValidator'),
	errorHandler = require('../utils/errorHandler');

/* 
 * Here the validation procedure for matching, triggered by controller (if needed).
 * If forms are OK, continue to schema validation.
 * Criteria:
 * 		1. Validate common forms, errors fired by validator.
 *		2. Any other specific criteria.
 */

exports.validate = function(req, next) {
	// first validate common forms
	if(!requestValidator.validateRequest(req, next)) {
		return false;
	} else {
		// validate specific forms
	}
}
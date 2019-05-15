import { validateRequest } from '../utils/requestValidator';

/* 
 * Here the validation procedure for matching, triggered by controller (if needed).
 * If forms are OK, continue to schema validation.
 * Criteria:
 * 		1. Validate common forms, errors fired by validator.
 *		2. Any other specific criteria.
 */

export function validate (req, next) {
	// first validate common forms
	if (!validateRequest(req, next)) {
		return false;
	} else {
		// validate specific forms
	}
}
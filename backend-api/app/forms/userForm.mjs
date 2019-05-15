import mongoose from 'mongoose';
import { ENTITY } from '../utils/constants';
import { validateRequest, validateKeys } from '../utils/requestValidator';
import user from '../models/user';

/* 
 * Here the validation procedure for users, triggered by controller (if needed).
 * If forms are OK, continue to schema validation.
 * Criteria:
 * 		1. Validate common forms, errors fired by validator.
 * 		2. Validate JSON keys, errors fired by validator.
 *		3. Any other specific criteria ...
 */

export function validate (req, next) {
	// first validate common forms
	if (!validateRequest(req, next)) {
		return false;
	} else {
		let keys = Object.keys(req.body),
			userKeys = Object.keys(user.schema.paths);
		if (!validateKeys(keys, userKeys, next)) {
			return false;
		}
		// ... more validation of specific forms
		return true;
	}
}
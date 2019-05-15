import mongoose from 'mongoose';
import { ENTITY } from '../utils/constants';
import { validateRequest, validateKeys } from '../utils/requestValidator';
import shift from '../models/shift';

/* 
 * Here the validation procedure for shifts, triggered by controller (if needed).
 * If forms are OK, continue to schema validation.
 * Criteria:
 * 		1. Validate common forms, errors fired by validator.
 * 		2. Validate JSON keys, errors fired by validator.
 *		3. Any other specific criteria (e.g. check the worker exists if associated).
 */

export function validate (req, next) {
	// first validate common forms
	if (!validateRequest(req, next)) {
		return false;
	} else {
		let keys = Object.keys(req.body),
			shiftKeys = Object.keys(shift.schema.paths);
		if (!validateKeys(keys, shiftKeys, next)) {
			return false;
		}
		// ... more validation of specific forms
		return true;
	}
}
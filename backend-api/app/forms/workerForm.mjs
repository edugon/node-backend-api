import mongoose from 'mongoose';
import { validateRequest, validateKeys } from '../utils/requestValidator';
import { fireError } from '../utils/errorHandler';
import { ERROR } from '../utils/constants';
import worker from '../models/worker';

/* 
 * Here the validation procedure for workers, triggered by controller (if needed).
 * If forms are OK, continue to schema validation.
 * Criteria:
 *		1. Validate common forms, errors fired by validator.
 *		2. Validate JSON keys, errors fired by validator.
 *		3. Availability:
 *			3.1. Days should not be duplicated.
 *		4. Any other specific criteria (e.g. check the shifts exist if associated).
 */

function isDayDuplicated(availability) {
	let isDuplicated = false;
	// we assume availability is not empty
	availability.forEach(function (dayToCheck, index) {
		let duplicated = 0;
		availability.forEach(function (day) {
			if (day === dayToCheck) {
				duplicated++;
			}
		});
		// we already expect it contains itself :)
		if (duplicated > 1) {
			isDuplicated = true;
		}
	});
	return isDuplicated;
}

export function validate (req, next) {
	// first validate common forms
	if (!validateRequest(req, next)) {
		return false;
	} else {
		let keys = Object.keys(req.body),
			workerKeys = Object.keys(worker.schema.paths);
		if (!validateKeys(keys, workerKeys, next)) {
			return false;
			// if undefined continue to schema validation
		} else if (req.body.availability && isDayDuplicated(req.body.availability)) {
			fireError(ERROR.bad_request, 'days should not be duplicated', next);
			return false;
		}
		// ... more validation of specific forms
		return true;
	}
}
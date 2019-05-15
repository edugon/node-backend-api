import { fireError } from './errorHandler';
import { ERROR } from './constants';

// validation of common POST/PUT requests stuff
export function validateRequest (req, next) {
	let contype = req.headers['content-type'];
	if (!contype || contype.indexOf('application/json') !== 0) {
		fireError(ERROR.bad_request, 'content-type should be application/json', next);
		return false;
	} else if (Array.isArray(req.body)) { // REST compliant :)
		fireError(ERROR.bad_request, 'body should not be an array', next);
		return false;
	}
	return true;
}

// validation of JSON keys
export function validateKeys (keys, knownKeys, next) {
	// we assume known keys are all required if exist
	let unknown = false;
	// _id and __v are Mongo related keys:
	knownKeys.splice(knownKeys.indexOf('_id'), 1);
	knownKeys.splice(knownKeys.indexOf('__v'), 1);
	if (keys.length <= knownKeys.length) {
		keys.forEach(function (key, index) {
			if (knownKeys.indexOf(key) === -1) { // unknown key
				unknown = true;
			}
		});
		if (unknown) {
			fireError(ERROR.bad_request, 'some parameters are unknown', next);
		}
	} else {
		fireError(ERROR.bad_request, 'parameters amount exceeded', next);
	}
	return true;
}
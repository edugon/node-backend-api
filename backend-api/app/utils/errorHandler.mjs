import { MESSAGES, HTTP_CODE, ERROR } from './constants'

// just some refactoring :)
export function fireError (errName, errMessage, next) {
	setImmediate(function () {
		let customError = new Error(errMessage);
		customError.name = errName;
		next(customError);
	});
}

// custom middleware for Express error handling
export function handleError (err, req, res, next) {
	console.error(err.stack);
	if (res.headersSent) {
		// delegate to default error handler if headers already sent
		// http://expressjs.com/es/guide/error-handling.html
		return next(err);
	} else {
		res.setHeader('content-type', 'application/json');
		let errorCode = err.code;
		switch (err.name) {
			// custom errors
			case ERROR.bad_request:
				res.status(HTTP_CODE.bad_request);
				break;
			case ERROR.not_found:
				res.status(HTTP_CODE.not_found);
				break;
			// mongoose errors
			case ERROR.validation:
				res.status(HTTP_CODE.bad_request);
				break;
			case ERROR.mongo:
				// check needed to avoid Mongo trace
				if (err.code && err.code === 11000) {
					err.message = MESSAGES.id_exists;
				} else {
					err.message = MESSAGES.mongo_error;
				}
				break;
			default:
				res.status(HTTP_CODE.error);
		}
		res.json({ error: err.message });
	}
	console.log('... catched');
}
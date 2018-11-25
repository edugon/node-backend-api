var errorHandler = require('./errorHandler');

// validation of common POST/PUT requests stuff
exports.validateRequest = function(req, next) {
	let contype = req.headers['content-type'];
	if(!contype || contype.indexOf('application/json') !== 0) {
		errorHandler.fireError('BadRequest', 'content-type should be application/json', next);
		return false;
  	} else if(Array.isArray(req.body)) { // REST compliant :)
		errorHandler.fireError('BadRequest', 'body should not be an array', next);
		return false;
	}
	return true;
}

// validation of JSON keys
exports.validateKeys = function(keys, knownKeys, next) {
	// we assume known keys are all required if exist
	let unknown = false;
	// _id and __v are Mongo related keys:
	knownKeys.splice(knownKeys.indexOf('_id'), 1);
	knownKeys.splice(knownKeys.indexOf('__v'), 1);
	if(keys.length <= knownKeys.length) { 
		keys.forEach(function(key, index) {
			if(knownKeys.indexOf(key) === -1) { // unknown key
				unknown = true;
			}
		});
		if(unknown) {
			errorHandler.fireError('BadRequest', 'some parameters are unknown', next);
		}
	} else {
		errorHandler.fireError('BadRequest', 'parameters amount exceeded', next);
	}
	return true;
}
// just some refactoring :)
exports.fireError = function(errName, errMessage, next) {
	setImmediate(function() { 
		let customError = new Error(errMessage);
		customError.name = errName;
		next(customError);
	});
}

// custom middleware for Express error handling
exports.handleError = function(err, req, res, next) {
	console.error(err.stack);
	if(res.headersSent) {
		// delegate to default error handler if headers already sent
		// http://expressjs.com/es/guide/error-handling.html
    	return next(err);
  	} else {
  		res.setHeader('content-type', 'application/json');
  		let errorCode = err.code;
  		switch(err.name) {
  			// custom errors
  			case 'BadRequest':
  				res.status(400);
  				break;
  			case 'NotFoundError':
		        res.status(404);
		        break;
		    // mongoose errors
		    case 'ValidationError':
		    	res.status(400);
		    	break;
		    case 'MongoError':
		    	// check needed to avoid Mongo trace
		    	if(err.code && err.code === 11000) {
	    			err.message = "id already exists";
	  			} else {
	  				err.message = 'Mongo error :(';
	  			}
		    	break;
		    default:
		    	res.status(500);
  		}
  		res.json({ error: err.message });
  	}
  	console.log('... catched');
}
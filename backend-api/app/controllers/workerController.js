var mongoose = require('mongoose'), 
	errorHandler = require('../utils/errorHandler'),
	Worker = require('../models/worker'),
	workerForm = require('../forms/workerForm');

// returns all workers in the collection
exports.findAllWorkers = function(req, res, next) {
	console.log('GET /workers');
	res.setHeader('content-type', 'application/json');
	// internal _id must be specifically excluded
	Worker.find({}, '-_id id availability payrate shifts', function(err, workers) {
	    if(err) {
	    	setImmediate(function() { next(err); });
		} else {
			res.status(200).json(workers);
			console.log('... done');
		}
	});
};

// returns a specific worker located by id
exports.findWorker = function(req, res, next) {
	console.log('GET /workers/' + req.params.id);
	res.setHeader('content-type', 'application/json');
	// internal _id must be specifically excluded
	Worker.findOne({ id: req.params.id } , '-_id id availability payrate shifts', 
		function(err, worker) {
		if(err) {
			setImmediate(function() { next(err); });
		} else {
			if(!worker) {
				errorHandler.fireError('NotFoundError', 'worker not found', next);
			} else {
				res.status(200).json(worker);
				console.log('... done');
			}
		}
	});
};

// adds a new worker to the collection
exports.addWorker = function(req, res, next) {
	console.log('POST /workers');
	console.log(JSON.stringify(req.body));
	res.setHeader('content-type', 'application/json');
	// first validate forms
	if(workerForm.validate(req, next)) {
		let worker = new Worker({
			id: 		  req.body.id,
	    	availability: req.body.availability,
	    	payrate: 	  req.body.payrate
		});
		worker.validate(function (err) {
  			if(err) {
  				setImmediate(function() { next(err); });
  			} else {
				worker.save(function(err) {
					if(err) {
						setImmediate(function() { next(err); });
					} else {
				      	res.status(200).json(worker);
				      	console.log('... done');
					} 
				});
			}
		});
	}
};

// updates a specific worker located by id
exports.updateWorker = function(req, res, next) {
	console.log('PUT /workers/' + req.params.id);
	console.log(JSON.stringify(req.body));
	res.setHeader('content-type', 'application/json');
	// first validate forms
	if(workerForm.validate(req, next)) {
		let worker = new Worker(req.body);
		worker.validate(function (err) {
			if(err) {
  				setImmediate(function() { next(err); });
  			} else {
				Worker.updateOne({ id: req.params.id }, req.body, function(err, result) {
					if(err) {
						setImmediate(function() { next(err); });
					} else {
						if(result.n === 0) {
							errorHandler.fireError('NotFoundError', 'worker not found', next);
						} else {
							res.status(200);
							res.json({ message: 'done' });
					    	console.log('... done');
						}
					}
				});
			}
		});
	}
}

// deletes a specific worker located by id
exports.deleteWorker = function(req, res, next) {
	console.log('DELETE /workers/' + req.params.id);
	res.setHeader('content-type', 'application/json');
	Worker.deleteOne({ id: req.params.id }, function(err, result) {
		if(err) {
			setImmediate(function() { next(err); });
		} else {
			if(result.n === 0) {
				errorHandler.fireError('NotFoundError', 'worker not found', next);
			} else {
				res.status(200);
				res.json({ message: 'done' });
		    	console.log('... done');
			}
		}
	});
};
var mongoose = require('mongoose'), 
	errorHandler = require('../utils/errorHandler'),
	Shift = require('../models/shift'),
	shiftForm = require('../forms/shiftForm');

// returns all shifts in the collection
exports.findAllShifts = function(req, res, next) {
	console.log('GET /shifts');
	res.setHeader('content-type', 'application/json');
	// internal _id must be specifically excluded
	Shift.find({}, '-_id id day worker', function(err, shifts) {
	    if(err) {
	    	setImmediate(function() { next(err); });
		} else {
			res.status(200).json(shifts);
			console.log('... done');
		}
	});
};

// returns a specific shift located by id
exports.findShift = function(req, res, next) {
	console.log('GET /shifts/' + req.params.id);
	res.setHeader('content-type', 'application/json');
	// internal _id must be specifically excluded
	Shift.findOne({ id: req.params.id }, '-_id id day worker', function(err, shift) {
	    if(err) {
	    	setImmediate(function() { next(err); });
		} else {
			if(!shift) {
				errorHandler.fireError('NotFoundError', 'shift not found', next);
			} else {
				res.status(200).json(shift);
				console.log('... done');
			}
		}
	});
};

// adds a new shift to the collection
exports.addShift = function(req, res, next) {
	console.log('POST /shifts');
	console.log(JSON.stringify(req.body));
	res.setHeader('content-type', 'application/json');
	// first validate forms
	if(shiftForm.validate(req, next)) {
		let shift = new Shift(req.body);
		shift.validate(function (err) {
  			if(err) {
  				setImmediate(function() { next(err); });
  			} else {
  				shift.save(function(err) {
					if(err) {
						setImmediate(function() { next(err); });
					} else {
				    	res.status(200).json(shift);
				    	console.log('... done');
					}
				});
  			}
		});
	}
};

// updates a specific shift located by id
exports.updateShift= function(req, res, next) {
	console.log('PUT /shifts/' + req.params.id);
	console.log(JSON.stringify(req.body));
	res.setHeader('content-type', 'application/json');
	// first validate forms
	if(shiftForm.validate(req, next)) {
		let shift = new Shift(req.body);
		shift.validate(function (err) {
			if(err) {
  				setImmediate(function() { next(err); });
  			} else {
				Shift.updateOne({ id: req.params.id }, req.body, function(err, result) {
					if(err) {
						setImmediate(function() { next(err); });
					} else {
						if(result.n === 0) {
							errorHandler.fireError('NotFoundError', 'shift not found', next);
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

// deletes a specific shift located by id
exports.deleteShift = function(req, res, next) {
	console.log('DELETE /shifts/' + req.params.id);
	res.setHeader('content-type', 'application/json');
	Shift.deleteOne({ id: req.params.id }, function(err, result) {
		if(err) {
			setImmediate(function() { next(err); });
		} else {
			if(result.n === 0) {
				errorHandler.fireError('NotFoundError', 'shift not found', next);
			} else {
				res.status(200);
				res.json({ message: 'done' });
		    	console.log('... done');
			}
		}
	});
};
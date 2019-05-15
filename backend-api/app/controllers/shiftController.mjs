import { fireError } from '../utils/errorHandler';
import { HTTP_CODE, ERROR } from '../utils/constants';
import { validate } from '../forms/shiftForm';
import Shift from '../models/shift';

// returns all shifts in the collection
export function findAllShifts (req, res, next) {
	console.log('GET /shifts');
	res.setHeader('content-type', 'application/json');
	// internal _id must be specifically excluded
	Shift.find({}, '-_id id day worker', function (err, shifts) {
		if (err) {
			setImmediate(function () { next(err); });
		} else {
			res.status(HTTP_CODE.success).json(shifts);
		}
	});
}

// returns a specific shift located by id
export function findShift (req, res, next) {
	console.log('GET /shifts/' + req.params.id);
	res.setHeader('content-type', 'application/json');
	// internal _id must be specifically excluded
	Shift.findOne({ id: req.params.id }, '-_id id day worker', function (err, shift) {
		if (err) {
			setImmediate(function () { next(err); });
		} else {
			if (!shift) {
				fireError(ERROR.not_found, 'shift not found', next);
			} else {
				res.status(HTTP_CODE.success).json(shift);
			}
		}
	});
}

// adds a new shift to the collection
export function addShift (req, res, next) {
	console.log('POST /shifts');
	console.log(JSON.stringify(req.body));
	res.setHeader('content-type', 'application/json');
	// first validate forms
	if (validate(req, next)) {
		let shift = new Shift(req.body);
		shift.validate(function (err) {
			if (err) {
				setImmediate(function () { next(err); });
			} else {
				shift.save(function (err) {
					if (err) {
						setImmediate(function () { next(err); });
					} else {
						res.status(HTTP_CODE.success).json(shift);
					}
				});
			}
		});
	}
}

// updates a specific shift located by id
export function updateShift (req, res, next) {
	console.log('PUT /shifts/' + req.params.id);
	console.log(JSON.stringify(req.body));
	res.setHeader('content-type', 'application/json');
	// first validate forms
	if (validate(req, next)) {
		let shift = new Shift(req.body);
		shift.validate(function (err) {
			if (err) {
				setImmediate(function () { next(err); });
			} else {
				Shift.updateOne({ id: req.params.id }, req.body, function (err, result) {
					if (err) {
						setImmediate(function () { next(err); });
					} else {
						if (result.n === 0) {
							fireError(ERROR.not_found, 'shift not found', next);
						} else {
							res.status(HTTP_CODE.success);
							res.json({ message: 'done' });
						}
					}
				});
			}
		});
	}
}

// deletes a specific shift located by id
export function deleteShift (req, res, next) {
	console.log('DELETE /shifts/' + req.params.id);
	res.setHeader('content-type', 'application/json');
	Shift.deleteOne({ id: req.params.id }, function (err, result) {
		if (err) {
			setImmediate(function () { next(err); });
		} else {
			if (result.n === 0) {
				fireError(ERROR.not_found, 'shift not found', next);
			} else {
				res.status(HTTP_CODE.success);
				res.json({ message: 'done' });
			}
		}
	});
}
import { fireError } from '../utils/errorHandler';
import { HTTP_CODE, ERROR } from '../utils/constants';
import { validate } from '../forms/workerForm';
import Worker from '../models/worker';

// returns all workers in the collection
export function findAllWorkers (req, res, next) {
	console.log('GET /workers');
	res.setHeader('content-type', 'application/json');
	// internal _id must be specifically excluded
	Worker.find({}, '-_id id availability payrate shifts', function (err, workers) {
		if (err) {
			setImmediate(function () { next(err); });
		} else {
			res.status(HTTP_CODE.success).json(workers);
		}
	});
}

// returns a specific worker located by id
export function findWorker (req, res, next) {
	console.log('GET /workers/' + req.params.id);
	res.setHeader('content-type', 'application/json');
	// internal _id must be specifically excluded
	Worker.findOne({ id: req.params.id }, '-_id id availability payrate shifts',
		function (err, worker) {
			if (err) {
				setImmediate(function () { next(err); });
			} else {
				if (!worker) {
					fireError(ERROR.not_found, 'worker not found', next);
				} else {
					res.status(HTTP_CODE.success).json(worker);
				}
			}
		});
}

// adds a new worker to the collection
export function addWorker (req, res, next) {
	console.log('POST /workers');
	console.log(JSON.stringify(req.body));
	res.setHeader('content-type', 'application/json');
	// first validate forms
	if (validate(req, next)) {
		let worker = new Worker({
			id: req.body.id,
			availability: req.body.availability,
			payrate: req.body.payrate
		});
		worker.validate(function (err) {
			if (err) {
				setImmediate(function () { next(err); });
			} else {
				worker.save(function (err) {
					if (err) {
						setImmediate(function () { next(err); });
					} else {
						res.status(HTTP_CODE.success).json(worker);
					}
				});
			}
		});
	}
}

// updates a specific worker located by id
export function updateWorker (req, res, next) {
	console.log('PUT /workers/' + req.params.id);
	console.log(JSON.stringify(req.body));
	res.setHeader('content-type', 'application/json');
	// first validate forms
	if (validate(req, next)) {
		let worker = new Worker(req.body);
		worker.validate(function (err) {
			if (err) {
				setImmediate(function () { next(err); });
			} else {
				Worker.updateOne({ id: req.params.id }, req.body, function (err, result) {
					if (err) {
						setImmediate(function () { next(err); });
					} else {
						if (result.n === 0) {
							fireError(ERROR.not_found, 'worker not found', next);
						} else {
							res.status(HTTP_CODE.success);
						}
					}
				});
			}
		});
	}
}

// deletes a specific worker located by id
export function deleteWorker (req, res, next) {
	console.log('DELETE /workers/' + req.params.id);
	res.setHeader('content-type', 'application/json');
	Worker.deleteOne({ id: req.params.id }, function (err, result) {
		if (err) {
			setImmediate(function () { next(err); });
		} else {
			if (result.n === 0) {
				fireError(ERROR.not_found, 'worker not found', next);
			} else {
				res.status(HTTP_CODE.success);
				res.json({ message: 'done' });
			}
		}
	});
}
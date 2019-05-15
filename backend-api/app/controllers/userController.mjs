import { fireError } from '../utils/errorHandler';
import { HTTP_CODE, ERROR } from '../utils/constants';
import { validate } from '../forms/userForm';
import User from '../models/user';

// returns all users in the collection
export function findAllUsers (req, res, next) {
	console.log('GET /users');
	res.setHeader('content-type', 'application/json');
	// internal _id must be specifically excluded
	User.find({}, '-_id id name email', function (err, users) {
		if (err) {
			setImmediate(function () { next(err); });
		} else {
			res.status(HTTP_CODE.success).json(users);
		}
	});
}

// returns a specific user located by id
export function findUser (req, res, next) {
	console.log('GET /users/' + req.params.id);
	res.setHeader('content-type', 'application/json');
	// internal _id must be specifically excluded
	User.findOne({ id: req.params.id }, '-_id id name email', function (err, user) {
		if (err) {
			setImmediate(function () { next(err); });
		} else {
			if (!user) {
				fireError(ERROR.not_found, 'user not found', next);
			} else {
				res.status(HTTP_CODE.success).json(user);
			}
		}
	});
}

// adds a new user to the collection
export function addUser (req, res, next) {
	console.log('POST /users');
	console.log(JSON.stringify(req.body));
	res.setHeader('content-type', 'application/json');
	// first validate forms
	if (validate(req, next)) {
		let user = new User(req.body);
		user.validate(function (err) {
			if (err) {
				setImmediate(function () { next(err); });
			} else {
				user.save(function (err) {
					if (err) {
						setImmediate(function () { next(err); });
					} else {
						res.status(HTTP_CODE.success).json(user);
					}
				});
			}
		});
	}
}

// updates a specific user located by id
export function updateUser (req, res, next) {
	console.log('PUT /users/' + req.params.id);
	console.log(JSON.stringify(req.body));
	res.setHeader('content-type', 'application/json');
	// first validate forms
	if (validate(req, next)) {
		let user = new User(req.body);
		user.validate(function (err) {
			if (err) {
				setImmediate(function () { next(err); });
			} else {
				User.updateOne({ id: req.params.id }, req.body, function (err, result) {
					if (err) {
						setImmediate(function () { next(err); });
					} else {
						if (result.n === 0) {
							fireError(ERROR.not_found, 'user not found', next);
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

// deletes a specific user located by id
export function deleteUser (req, res, next) {
	console.log('DELETE /users/' + req.params.id);
	res.setHeader('content-type', 'application/json');
	User.deleteOne({ id: req.params.id }, function (err, result) {
		if (err) {
			setImmediate(function () { next(err); });
		} else {
			if (result.n === 0) {
				fireError(ERROR.not_found, 'user not found', next);
			} else {
				res.status(HTTP_CODE.success);
				res.json({ message: 'done' });
			}
		}
	});
}
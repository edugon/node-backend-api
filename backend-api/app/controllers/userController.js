var mongoose = require('mongoose'),
	errorHandler = require('../utils/errorHandler'),
	User = require('../models/user'),
	userForm = require('../forms/userForm');

// returns all users in the collection
exports.findAllUsers = function (req, res, next) {
	console.log('GET /users');
	res.setHeader('content-type', 'application/json');
	// internal _id must be specifically excluded
	User.find({}, '-_id id name email', function (err, users) {
		if (err) {
			setImmediate(function () { next(err); });
		} else {
			res.status(200).json(users);
			console.log('... done');
		}
	});
};

// returns a specific user located by id
exports.findUser = function (req, res, next) {
	console.log('GET /users/' + req.params.id);
	res.setHeader('content-type', 'application/json');
	// internal _id must be specifically excluded
	User.findOne({ id: req.params.id }, '-_id id name email', function (err, user) {
		if (err) {
			setImmediate(function () { next(err); });
		} else {
			if (!user) {
				errorHandler.fireError('NotFoundError', 'user not found', next);
			} else {
				res.status(200).json(user);
				console.log('... done');
			}
		}
	});
};

// adds a new user to the collection
exports.addUser = function (req, res, next) {
	console.log('POST /users');
	console.log(JSON.stringify(req.body));
	res.setHeader('content-type', 'application/json');
	// first validate forms
	if (userForm.validate(req, next)) {
		let user = new User(req.body);
		user.validate(function (err) {
			if (err) {
				setImmediate(function () { next(err); });
			} else {
				user.save(function (err) {
					if (err) {
						setImmediate(function () { next(err); });
					} else {
						res.status(200).json(user);
						console.log('... done');
					}
				});
			}
		});
	}
};

// updates a specific user located by id
exports.updateUser = function (req, res, next) {
	console.log('PUT /users/' + req.params.id);
	console.log(JSON.stringify(req.body));
	res.setHeader('content-type', 'application/json');
	// first validate forms
	if (userForm.validate(req, next)) {
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
							errorHandler.fireError('NotFoundError', 'user not found', next);
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

// deletes a specific user located by id
exports.deleteUser = function (req, res, next) {
	console.log('DELETE /users/' + req.params.id);
	res.setHeader('content-type', 'application/json');
	User.deleteOne({ id: req.params.id }, function (err, result) {
		if (err) {
			setImmediate(function () { next(err); });
		} else {
			if (result.n === 0) {
				errorHandler.fireError('NotFoundError', 'user not found', next);
			} else {
				res.status(200);
				res.json({ message: 'done' });
				console.log('... done');
			}
		}
	});
};
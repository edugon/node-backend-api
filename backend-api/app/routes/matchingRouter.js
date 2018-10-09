var express = require('express'),
	matchingController = require('../controllers/matchingController'),
	matchingRouter = express.Router();

// here matching API endpoints are routed to controller middlewares

matchingRouter.route('/').get(matchingController.match);

module.exports = matchingRouter;
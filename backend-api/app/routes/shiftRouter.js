var express = require('express'),
	shiftController = require('../controllers/shiftController'),
	shiftRouter = express.Router();

// here shifts API endpoints are routed to controller middlewares

shiftRouter.route('/')
	.get(shiftController.findAllShifts)
	.post(shiftController.addShift);

shiftRouter.route('/:id')
	.get(shiftController.findShift)
	.put(shiftController.updateShift)
	.delete(shiftController.deleteShift);

module.exports = shiftRouter;
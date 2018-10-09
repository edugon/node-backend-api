var express = require('express'),
	workerController = require('../controllers/workerController'),
	workerRouter = express.Router();

// here workers API endpoints are routed to controller middlewares

workerRouter.route('/')
	.get(workerController.findAllWorkers)
	.post(workerController.addWorker);

workerRouter.route('/:id')
	.get(workerController.findWorker)
	.put(workerController.updateWorker)
	.delete(workerController.deleteWorker);

module.exports = workerRouter;
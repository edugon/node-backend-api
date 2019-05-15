import express from 'express';
import * as workerController from '../controllers/workerController';

const workerRouter = express.Router();

// here workers API endpoints are routed to controller middlewares

workerRouter.route('/')
	.get(workerController.findAllWorkers)
	.post(workerController.addWorker);

workerRouter.route('/:id')
	.get(workerController.findWorker)
	.put(workerController.updateWorker)
	.delete(workerController.deleteWorker);

export default workerRouter;
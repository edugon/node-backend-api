import express from 'express';
import * as shiftController from '../controllers/shiftController';

const shiftRouter = express.Router();

// here shifts API endpoints are routed to controller middlewares

shiftRouter.route('/')
	.get(shiftController.findAllShifts)
	.post(shiftController.addShift);

shiftRouter.route('/:id')
	.get(shiftController.findShift)
	.put(shiftController.updateShift)
	.delete(shiftController.deleteShift);

export default shiftRouter;
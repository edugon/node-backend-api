import express from 'express';
import * as matchingController from '../controllers/matchingController';

const matchingRouter = express.Router();

// here matching API endpoints are routed to controller middlewares

matchingRouter.route('/').get(matchingController.match);

export default matchingRouter;
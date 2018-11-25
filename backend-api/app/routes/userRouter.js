var express = require('express'),
	userController = require('../controllers/userController'),
	userRouter = express.Router();

// here users API endpoints are routed to controller middlewares

userRouter.route('/')
	.get(userController.findAllUsers)
	.post(userController.addUser);

userRouter.route('/:id')
	.get(userController.findUser)
	.put(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = userRouter;
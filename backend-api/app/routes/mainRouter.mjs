import express from 'express';

const mainRouter = express.Router();

// just a middleware saying hi :)

mainRouter.get('/', function (req, res) {
	console.log('GET /');
	res.send('backend-api is listening at http://localhost:3000/api/');
});

export default mainRouter;
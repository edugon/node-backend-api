var express = require('express'),
	mainRouter = express.Router();

// just a middleware saying hi :)

mainRouter.get('/', function(req, res) {
	console.log('GET /');
  	res.send('backend-api is listening at http://localhost:3000/api/');
  	console.log('... done');
});

module.exports = mainRouter;
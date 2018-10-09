var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    bodyParser  = require('body-parser'),
    methodOverride = require('method-override'),
    dbConnection = require('./utils/dbConnection'),
    errorHandler = require('./utils/errorHandler'),
    mainRouter = require('./routes/mainRouter'),
    workerRouter = require('./routes/workerRouter'),
    shiftRouter = require('./routes/shiftRouter'),
    matchingRouter = require('./routes/matchingRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

// set routes and custom error handling
app.use('/', mainRouter);
app.use('/api/workers', workerRouter);
app.use('/api/shifts', shiftRouter);
app.use('/api/matching', matchingRouter);
app.use(errorHandler.handleError);

dbConnection.connect();

app.listen(3000, function() {
    console.log('backend-api running on http://localhost:3000');
});
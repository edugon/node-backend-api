import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import mainRouter from './routes/mainRouter';
import userRouter from './routes/userRouter';
import workerRouter from './routes/workerRouter';
import shiftRouter from './routes/shiftRouter';
import matchingRouter from './routes/matchingRouter';
import * as dbConnection from './utils/dbConnection';
import * as errorHandler from './utils/errorHandler';

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

// set routes and custom error handling
app.use('/', mainRouter);
app.use('/api/users', userRouter);
app.use('/api/workers', workerRouter);
app.use('/api/shifts', shiftRouter);
app.use('/api/matching', matchingRouter);
app.use(errorHandler.handleError);

dbConnection.connect();

app.listen(3000, function () {
	console.log('backend-api running on http://localhost:3000');
});
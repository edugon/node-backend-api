var mongoose = require('mongoose'), 
	errorHandler = require('../utils/errorHandler'),
	Worker = require('../models/worker.js'),
	Shift = require('../models/shift.js'),
	matchingForm = require('../forms/matchingForm');

// returns the workers that match the input day
function matchWorkers(day, workers) {
	let matchedWorkers = [];
	workers.forEach(function(worker) {
		if(worker.availability.indexOf(day) > -1) {
			matchedWorkers.push(worker);
		}
	});
	return matchedWorkers;
}

// returns the worker with the lowest payrate
function getCheaperWorker(workers) {
	let cheaperWorker = null;
	workers.forEach(function(worker) {
		if(!cheaperWorker) {
			cheaperWorker = worker; // set first iteration
		} else {
			if(cheaperWorker.payrate > worker.payrate) {
				cheaperWorker = worker;
			}
		}
	});
	return cheaperWorker;
}

// matches shifts and workers depending on shift.day and worker.payrate
exports.match = async function(req, res, next) {
	console.log('GET /matching');
	let shifts = await Shift.find({}),
		workers = await Worker.find({}), // the simpler the better :)
		mappings = [],
		totalCost = 0;
	
	if(shifts) {
		if(workers) {
			shifts.forEach(function(shift) {
				let matchedWorkers = matchWorkers(shift.day, workers),
					cheaperWorker = getCheaperWorker(matchedWorkers),
					workerIndex = workers.indexOf(cheaperWorker);
				mappings.push({ shiftId: shift.id, workerId: cheaperWorker.id });
				totalCost += cheaperWorker.payrate;
				// we are not persisting the matching
				workers[workerIndex].availability.splice(shift.day, 1);
			});
			res.status(200).jsonp({ mappings: mappings, totalCost: totalCost });
		} else {
			res.status(500).jsonp({ message: 'found no workers' });
		}
	} else {
		res.status(500).jsonp({ message: 'found no shifts' });
	}
	console.log('... done');
}
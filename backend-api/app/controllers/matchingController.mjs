import { fireError } from '../utils/errorHandler';
import { HTTP_CODE, ERROR } from '../utils/constants';
import Worker from '../models/worker';
import Shift from '../models/shift';

// returns the workers that match the input day
function matchWorkers(day, workers) {
	let matchedWorkers = [];
	workers.forEach(function (worker) {
		if (worker.availability.indexOf(day) > -1) {
			matchedWorkers.push(worker);
		}
	});
	return matchedWorkers;
}

// returns the worker with the lowest payrate
function getCheaperWorker(workers) {
	let cheaperWorker = null;
	workers.forEach(function (worker) {
		if (!cheaperWorker) {
			cheaperWorker = worker; // set first iteration
		} else {
			if (cheaperWorker.payrate > worker.payrate) {
				cheaperWorker = worker;
			}
		}
	});
	return cheaperWorker;
}

// matches shifts and workers depending on shift.day and worker.payrate
export async function match (req, res, next) {
	console.log('GET /matching');
	let shifts = await Shift.find({}),
		workers = await Worker.find({}), // the simpler the better :)
		mappings = [],
		totalCost = 0;

	if (shifts) {
		if (workers) {
			shifts.forEach(function (shift) {
				let matchedWorkers = matchWorkers(shift.day, workers),
					cheaperWorker = getCheaperWorker(matchedWorkers),
					workerIndex = workers.indexOf(cheaperWorker);
				mappings.push({ shiftId: shift.id, workerId: cheaperWorker.id });
				totalCost += cheaperWorker.payrate;
				// we are not persisting the matching
				workers[workerIndex].availability.splice(shift.day, 1);
			});
			res.status(HTTP_CODE.success).jsonp({ mappings: mappings, totalCost: totalCost });
		} else {
			fireError(ERROR.not_found, 'found no workers', next);
		}
	} else {
		fireError(ERROR.not_found, 'found no shifts', next);
	}
}
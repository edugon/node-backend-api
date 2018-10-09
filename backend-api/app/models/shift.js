var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    enums = require('../utils/enums');

// min/max value checks are not meant for arrays, custom validation needed
var dayValidators = [
    { validator: dayMin, msg: 'at least one day' },
    { validator: dayMax, msg: 'no more than one day' }
];

var shiftSchema = new Schema({
    id:  { 
        required: [true, 'this is required!'],
        unique: true,
        type: Number, 
        min: 1
    },
    day: { 
        required: [true, 'this is required!'],
        type: [{ 
            type: String, 
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        }],
        validate: dayValidators
    }
});

function dayMin(day) {
    return day.length >= 1;
}

function dayMax(day) {
    return day.length <= 1;
}

// not working :(
function dayEnum() {
    return enums.days;
}

module.exports = mongoose.model('Shift', shiftSchema);
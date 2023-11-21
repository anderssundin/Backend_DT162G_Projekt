const mongoose = require('mongoose');
const { Schema } = mongoose;

// handle timezone
const offsetInMinutes = 60;
const currentDate = new Date();
const adjustedDate = new Date(currentDate.getTime() + offsetInMinutes * 60000);


const measurementSchema = new Schema({
weight:{
    type: Number,
    required: true
},
timestamp: {
    type: String,
    default : adjustedDate.toISOString()
},
// Reference to user
userEmail: {
    type: String,
    required: true
}
});

// Create a model from schema and export
const Measurement = mongoose.model('Measurement', measurementSchema);

module.exports = Measurement;
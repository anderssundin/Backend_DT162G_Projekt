const mongoose = require('mongoose');
const { Schema } = mongoose;



// handle timezone
const offsetInMinutes = 60;
const currentDate = new Date();
const adjustedDate = new Date(currentDate.getTime() + offsetInMinutes * 60000);

// Create a users schema

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    startWeight: {
        type: Number,
        required: true,
        default: 0
    },
    goalWeight: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: String,
        default : adjustedDate.toISOString()
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
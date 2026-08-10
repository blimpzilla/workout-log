const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    exercise: {
        type: String,
        required: [true, 'Exercise cannot be blank'],
        trim: true
    },
    sets: {
        type: Number,
        required: [true, 'Set count is required'],
        min: 1
    },
    reps: {
        type: Number,
        required: [true, 'Rep count is required'],
        min: 1
    },
    weight: {
        type: Number,
        min: 0
    },
    date: {
        type: Date,
        required: [true, 'Date cannot be blank']
    },
    notes: {
        type: String,
        trim: true,
    }
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;

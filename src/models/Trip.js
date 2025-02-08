const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Trip title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Trip description is required']
    },
    destination: {
        type: String,
        required: [true, 'Destination is required']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required']
    },
    budget: {
        type: Number,
        required: [true, 'Budget is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Trip', tripSchema);
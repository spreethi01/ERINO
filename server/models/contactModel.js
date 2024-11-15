const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    "First Name": {
        type: String,
        required: true,
    },
    "Last Name": {
        type: String,
        required: true,
    },
    "Email": {
        type: String,
        required: true,
    },
    "Phone Number": {
        type: Number,
        required: true,
    },
    "Company": {
        type: String,
        required: true,
    },
    "Job Title": {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Contact', contactSchema);

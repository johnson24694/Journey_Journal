const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
    feeling: { 
        type: String
    },
    notes: { 
        type: String
    },
}, { timestamps: true });

module.exports = mongoose.model('Journal', JournalSchema);
const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
    feeling: { type: String,
            required: [true, "You must enter in a feeling."],
            minlength: [2, "Feeling must be at least 2 characters."]
        },

    notes: { type: String,
            
    },  
   },
{timestamps: true });

module.exports = mongoose.model('Journal', JournalSchema);
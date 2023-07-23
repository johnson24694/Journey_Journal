const Journal = require('../models/journal.model');

module.exports.createJournal = (request, response) => {
    console.log(request.body);
    Journal.create(request.body) 
        .then(journal => response.json(journal))
        
        .catch(err => response.status(400).json(err))
}
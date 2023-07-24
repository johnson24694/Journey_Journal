const Journal = require('../models/journal.model');

module.exports.createJournal = (request, response) => {
    console.log(request.body);
    Journal.create(request.body) 
        .then(journal => response.json(journal))
        
        .catch(err => response.status(400).json(err))
}

module.exports.getAllJournals = (req, res) => {
    Journal.find({})
        .then(allJournals => {
            console.log(allJournals);
            res.json(allJournals);
        })
        .catch(err => {
            console.log(err)
            response.json(err)
        })
}

module.exports.getOneJournalById = (req, res) => {
    Journal.findOne({_id:req.params.id})
        .then(journal => res.json(journal))
        .catch(err => res.json(err));
}
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
        response.status(400).json(err)
    })
}

module.exports.updateJournal = (request, response) => {
    console.log(request.body);
    Journal.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators:true})
        .then(updatedJournal => {
            console.log(response);
            response.json(updatedJournal)})
        
        .catch(err => {
            console.log(err);
            response.status(400).json(err)})
}

module.exports.deleteJournal = (request, response) => {
    Journal.deleteOne({ _id: request.params.id }) 
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}



module.exports.getOneJournalById = (request, response) => {
    Journal.findOne({_id:request.params.id})
        .then(journal => response.json(journal))
        .catch(err => response.status(400).json(err));
}
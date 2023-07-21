const Journal = require('../models/journal.model');

module.exports.index = (request, response) => {  
    response.json({     
        message: "Hello World"
    });
}

module.exports.createJournal = (req, res) => {
    Journal.create(req.body) 
        .then((newJournal) => {
            res.json({ newJournal });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
    };



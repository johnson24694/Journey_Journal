const JournalController = require('../controller/journal.controller');  

module.exports = (app) => {
    app.get('/api', JournalController.index);
    app.post('/api/journal', JournalController.createJournal);
}


const JournalController = require('../controller/journal.controller'); 

module.exports = (app) => {
    app.post('/api/journal', JournalController.createJournal);
    app.patch('/api/journals/:id', JournalController.updateJournal);
    app.get('/api/journals',  JournalController.getAllJournals);
    app.get('/api/journal/:id', JournalController.getOneJournalById);
}


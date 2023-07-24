const JournalController = require('../controller/journal.controller'); 

module.exports = (app) => {
    app.get('/api/journal/:id', JournalController.getOneJournalById);
    app.post('/api/journal', JournalController.createJournal);+
    app.patch('/api/journals/:id', JournalController.updateJournal);
    app.get('/api/journals',  JournalController.getAllJournals);
    
}


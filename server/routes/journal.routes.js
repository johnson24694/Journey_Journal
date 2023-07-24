const JournalController = require('../controller/journal.controller'); 

module.exports = (app) => {
    app.post('/api/journal', JournalController.createJournal);
<<<<<<< HEAD
    app.patch('/api/journals/:id', JournalController.updateJournal);
=======
    app.get('/api/journals',  JournalController.getAllJournals);
    app.get('/api/journal/:id', JournalController.getOneJournalById);
>>>>>>> e6b72d8d4f0f24774b55e32f33793fc07495d1f8
}


const JournalController = require('../controller/journal.controller'); 

module.exports = (app) => {
    app.post('/api/journal', JournalController.createJournal);
    app.patch('/api/journals/:id', JournalController.updateJournal);
}


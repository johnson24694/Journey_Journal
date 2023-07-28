const JournalController = require('../controller/journal.controller');
const {authenticate} = require('../config/jwt.config');  

module.exports = (app) => {
    app.get('/api/journals', authenticate, JournalController.getAllJournals);
    app.post('/api/journal', JournalController.createJournal);
    app.patch('/api/journals/:id', JournalController.updateJournal);
    app.delete('/api/journals/:id', JournalController.deleteJournal);app.get('/api/journal/:id', JournalController.getOneJournalById);
}


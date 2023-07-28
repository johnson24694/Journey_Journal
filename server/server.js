const express = require('express');
const app = express();
const cors = require('cors');    
const cookieParser = require('cookie-parser');
require('./config/mongoose.config');
require('dotenv').config();
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cookieParser());
require('./routes/journal.routes')(app);
require('./config/jwt.config');

const UserRoutes = require('./routes/user.routes')(app);
const JournalRoutes = require('./routes/journal.routes')(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})


require('dotenv').config();
const express = require('express');
const cors = require('cors');    
const app = express();
const cookieParser = require('cookie-parser');
app.use(cors({credentials:true, origin:'http://localhost:3000'}));                 

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

require('./config/mongoose.config');
require('./config/jwt.config');
const UserRoutes = require('./routes/user.routes')(app);
const JournalRoutes = require('./routes/journal.routes')(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})


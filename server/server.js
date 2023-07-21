require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');    
const cookieParser = require('cookie-parser');
// app.use(express.json());
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({credentials:true, origin:'http://localhost:3000'}));                 
require('./routes/journal.routes')(app);
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

require('./config/mongoose.config');
require('./config/jwt.config');
const UserRoutes = require('./routes/user.routes')(app);
const Routes = require('./routes/journal.routes')(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})



// require('dotenv').config();
// // const express = require('express');
// const cors = require('cors');    
// const app = express();
// const cookieParser = require('cookie-parser');
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({credentials:true, origin:'http://localhost:3000'}));                 
// require('./routes/journal.routes')(app);
// // app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// require('./config/mongoose.config');
// require('./config/jwt.config');
// const UserRoutes = require('./routes/user.routes')(app);
// const Routes = require('./routes/journal.routes')(app);

// app.listen(8000, () => {
//     console.log("Listening at Port 8000")
// })


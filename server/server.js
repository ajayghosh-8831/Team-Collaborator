const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('../config/database.config.js');
const mongoose = require('mongoose');

// create express app
const app = express();

var cors = require("cors");
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

require('../routes/note.routes.js')(app);
require('../routes/user.routes.js')(app);

app.set('port',process.env.PORT || 4000);
// listen for requests
 app.listen(app.get('port'), function() {
    console.log('App is listening on port '+app.get('port'));
});

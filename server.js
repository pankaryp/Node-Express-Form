// Require dependencies
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const mongoose = require('mongoose');
const path = require('path');

// Init App
const app = express();

// Configure dotenv
require('dotenv').config()

// BodyParser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Bring in routes 
const login = require('./routes/login');
// Use Routes
app.use('/', login);

// Bring in db models
RegisterSchema = require('./models/Register');

// Connect to mongoose
mongoose.connect( process.env.DB_HOST, { useNewUrlParser: true });
const db = mongoose.connection;

// Check Mongo connection
db.once('open', function() {
    console.log(`
    ----------------------------------
    | ✔️  Connected to local Mongo DB |
    ----------------------------------
    `
    );
});
db.on('error', function() {
    console.log(`❌  ${err}`);
});

// Serve static files
app.use(express.static(path.join(__dirname, 'assets')));

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Listen to port 3000 for connection
app.listen(3000 , function() {
    console.log(`
    ----------------------------------
    | ✔️  Server running on port 3000 |
    ----------------------------------
    `);
});


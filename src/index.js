const express = require('express');
const bodyParser = require('body-parser'); 
const morgan = require('morgan');

// Initialization 
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Connection Data Base
require('./database');

// Routes
app.use('/api/users', require('./routes/User'));
app.use('/api/auth', require('./routes/Auth'));


app.listen(4000);

console.log('server on port', 4000);
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// Initializacion
const app = express();

// Setings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Global Variables


// Routes
app.use(require('./routes/login'));

// Public

// Starting the server

app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
});

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

// Initialization
const app = express();

// Settings
app.set('port', process.env.PORT || 4000)

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// Connection Data Base
require('./database');

// Routes
app.use('/api/users', require('./routes/UserHistory'));
app.use('/api/auth', require('./routes/Auth'));
app.use('/api/products', require('./routes/Tickets'));
app.use('/api/projects', require('./routes/Projects'));
app.use('/api/sale', require('./routes/TicketStatus'));

// Handle production
if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(path.join(__dirname, 'public')));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/src/public/index.html'));
}


app.listen(app.get('port'));
console.log('Server on port', app.get('port'));

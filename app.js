const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const urlRoutes = require('./routes/url.routes');

const app = express();

// Error handing middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(400).json({ error: 'Something went wrong!' });
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100 // max number of request within above given time
});

app.use(limiter);

app.use('/api', urlRoutes);

module.exports = app;
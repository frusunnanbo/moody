const status = require('./status.js')
const express = require('express');

const app = express();

app.get('/status', function (req, res) {
    return res.send(status.get());
});
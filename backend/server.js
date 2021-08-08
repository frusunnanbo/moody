const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const rooms = require('./rooms')

const app = express();
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(bodyParser.json({type: 'application/json'}));

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.get('/api/rooms/', function (req, res) {
    rooms.list()
        .then(rooms => res.json(rooms))
});

app.get('/api/rooms/:room', function (req, res) {
    res.json(rooms.moods(req.params.room));
});

app.post('/api/rooms/:room/increase', function (req, res) {
    res.json(rooms.increaseMood(req.params.room, req.body.mood));
});
 
app.listen(process.env.PORT || 8080);
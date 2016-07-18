
const port = process.env.PORT || 3000;
const app = exports.app = require('express')();
const path = require('path');

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.get('/ical', (req, res) => {
	res.sendFile(path.join(__dirname, 'test/data/one_event.ics'));
});

app.listen(port);

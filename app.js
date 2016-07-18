
const port = process.env.PORT || 3000;
const app = exports.app = require('express')();
const path = require('path');
const fs = require('fs');
const request = require('request');

app.get('/', (req, res) => {
	res.send('Welcome');
});

app.get('/ical', (req, res) => {
	var icalUrl = 'https://raw.githubusercontent.com/rhargreaves/ical-sed/master/test/data/one_event.ics';
	request.get(icalUrl, (error, response, body) => {
		if(error) {
			console.log(error);
			return;
		}
		res.send(body);
	});

	res.sendFile(path.join(__dirname, 'test/data/one_event.ics'));
});

app.listen(port);

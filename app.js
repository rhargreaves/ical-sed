
const port = process.env.PORT || 3000;
const app = exports.app = require('express')();
const path = require('path');
const fs = require('fs');
const request = require('request');
const ICalParser = require('cozy-ical').ICalParser;

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

		var parser = new ICalParser();
		parser.parseString(body, function(err, cal) {
			var strCal = cal.toString();
			res.setHeader('content-type', 'text/calendar');
			res.send(strCal);
		});
	});
});

app.listen(port);

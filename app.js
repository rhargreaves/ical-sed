
const port = process.env.PORT || 3000;
const app = exports.app = require('express')();
const path = require('path');
const fs = require('fs');
const request = require('request');
const ICalParser = require('cozy-ical').ICalParser;

function transformCalendar(url, callback) {
	request.get(url, (error, response, body) => {
		if(error) {
			callback(error, null);
			return;
		}

		var parser = new ICalParser();
		parser.parseString(body, function(err, cal) {
			if(err) {
				callback(err, null);
				return;
			}
			var strCal = cal.toString();
			callback(null, strCal);
		});
	});
}

app.get('/', (req, res) => {
	res.send('Welcome');
});

app.get('/ical', (req, res) => {
	var icalUrl = 'https://raw.githubusercontent.com/rhargreaves/ical-sed/master/test/data/one_event.ics';
	transformCalendar(icalUrl, function(err, strCal) {
		res.setHeader('content-type', 'text/calendar');
		res.send(strCal);
	});
});

app.listen(port);

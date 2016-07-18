
const port = process.env.PORT || 3000;
const app = exports.app = require('express')();
const transform = require('./transform');

app.get('/', (req, res) => {
	res.send('Welcome');
});

app.get('/ical', (req, res) => {
	var icalUrl = req.query.url;
	transform.transformCalendar(icalUrl, function(err, strCal) {
		res.setHeader('content-type', 'text/calendar');
		res.send(strCal);
	});
});

app.listen(port);

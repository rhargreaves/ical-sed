const express = require('express');
const expressHbs = require('express-handlebars');
const transform = require('./transform');
const app = exports.app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', expressHbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/ical', (req, res) => {
	var icalUrl = req.query.url;
	var containing = req.query.containing;
	transform.transformCalendar(icalUrl, containing, function(err, strCal) {
		res.setHeader('content-type', 'text/calendar');
		res.send(strCal);
	});
});

app.use('/assets', express.static(__dirname + '/assets'));

app.listen(port);

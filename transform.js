
const request = require('request');
const ICalParser = require('cozy-ical').ICalParser;

module.exports = {

	transformCalendar: function(url, callback) {
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
}

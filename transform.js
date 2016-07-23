const ICAL = require('ical.js');
const request = require('request');

function filter(comp, containing) {
	if(!containing) return;

	var vevents = comp.getAllSubcomponents('vevent');
	vevents.forEach(vevent => {
		var event = new ICAL.Event(vevent);
		var summary = event.summary;

		var containArray = containing.split(',');
		for(i = 0; i < containArray.length; i++) {
			if(summary.toLowerCase().indexOf(containArray[i].toLowerCase()) > -1) {
				return;
			}
		}
		comp.removeSubcomponent(vevent);
	});
}

module.exports = {

	transformCalendar: function(url, containing, callback) {
		request.get(url, (error, response, body) => {
			if(error) {
				callback(error, null);
				return;
			}

			var jCalData = ICAL.parse(body);
			var comp = new ICAL.Component(jCalData);
			filter(comp, containing);
			var strCal = comp.toString();
			callback(null, strCal);
		});
	},

}

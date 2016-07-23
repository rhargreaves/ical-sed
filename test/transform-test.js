var should = require('should');
var transform = require('../transform');

describe('Filter out event with one term', function() {
	it('should remove one event', function(done) {

		var url = 'https://raw.githubusercontent.com/rhargreaves/ical-sed/master/test/data/two_events.ics';
		var containing = "foo";

		transform.transformCalendar(url, containing, function(err, output) {
			output.should.containEql('SUMMARY:Foo Event');
			output.should.not.containEql('SUMMARY:Bar Event');
			done();
		});

	});
});

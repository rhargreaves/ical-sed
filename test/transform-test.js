var should = require('should');
var transform = require('../transform');

describe('Filter out event with one term', function() {

	var url = 'https://raw.githubusercontent.com/rhargreaves/ical-sed/master/test/data/three_events.ics';

	it('should remove one event', function(done) {
		var containing = "foo";

		transform.transformCalendar(url, containing, function(err, output) {
			output.should.containEql('SUMMARY:Foo Event');
			output.should.not.containEql('SUMMARY:Bar Event');
			output.should.not.containEql('SUMMARY:Baz Event');
			done();
		});
	});

	it('should remove two events with two terms', function(done) {
		var containing = "foo,bar";

		transform.transformCalendar(url, containing, function(err, output) {
			output.should.containEql('SUMMARY:Foo Event');
			output.should.containEql('SUMMARY:Bar Event');
			output.should.not.containEql('SUMMARY:Baz Event');
			done();
		});
	});

});

var request = require('supertest');
var should = require('should');
var app = require('../app').app;

describe('Site', function() {
	describe('GET', function() {
		it('should return 200', function(done) {
			request(app)
				.get('/')
				.expect(200)
				.end(function(err,res) {
					done();
				});
		});

		it('should return ical specified on query string', function(done) {
			request(app)
				.get('/ical')
				.query({ url: 'https://raw.githubusercontent.com/rhargreaves/ical-sed/master/test/data/one_event.ics' })
				.expect(200)
				.expect('Content-Type', 'text/calendar')
				.end(function(err,res) {
					res.text.should.startWith('BEGIN:VCALENDAR');
					done();
				});
		});

		it('should return single event containing specified text', function(done) {
			request(app)
				.get('/ical')
				.query({ url: 'https://raw.githubusercontent.com/rhargreaves/ical-sed/master/test/data/two_events.ics', containing: 'foo'})
				.expect(200)
				.expect('Content-Type', 'text/calendar')
				.end(function(err,res) {
					res.text.should.containEql('SUMMARY:Foo Event');
					res.text.should.not.containEql('SUMMARY:Bar Event');
					done();
				});
		});
	});
});



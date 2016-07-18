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
				.expect(200)
				.expect('Content-Type', 'text/calendar')
				.end(function(err,res) {
					res.text.should.startWith('BEGIN:VCALENDAR');
					done();
				});
		});
	});
});



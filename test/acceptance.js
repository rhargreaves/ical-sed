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
  });
});



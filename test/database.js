var assert = require('chai').assert;
var main = require('../main');
var fs = require('fs');

describe('flatfile database', function() {
	describe('open database', function() {
		// does it give error
		it('should error on nonexistent file', function(done) {
			// load
			main.db('./example/nope.json', function(err, data) {
				assert.isObject(err, 'error should be an object');

				assert.isNull(data, 'should not give data');

				done();
			});
		});

		// should not give error on successful load
		it('should not give error on database load', function(done) {
			// load
			main.db('./example/values.json', function(err, data) {
				assert.isNull(err, 'should not have error');

				done();
			});
		});

		// database should have metadata
		it('should have metadata', function(done) {
			// load
			main.db('./example/values.json', function(err, data) {
				assert.isNull(err, 'should not have error');

				assert.isString(data._filename);
				assert.isFunction(data.save);

				done();
			});
		});

		// without modifications, should give same output
		it('should have same output without modifications', function(done) {
			var primary = fs.readFileSync('./example/values.json', {encoding: 'utf8'});

			// load
			main.db('./example/values.json', function(err, data) {
				assert.isNull(err, 'should not have error');

				// save
				data.save(function() {
					// read it up and assert
					var secondary = fs.readFileSync('./example/values.json', {encoding: 'utf8'});

					assert.strictEqual(secondary, primary, 'should be same output as input');

					done();
				});
			});
		});
	});
});

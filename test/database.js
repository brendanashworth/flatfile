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
				assert.isObject(data);

				done();
			});
		});

		// database should have metadata
		it('should have metadata', function(done) {
			// load
			main.db('./example/values.json', function(err, data) {
				assert.isNull(err, 'should not have error');

				assert.isFunction(data.save);

				done();
			});
		});
	});

	describe('save database', function() {
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

		// with modifications, should give updated output
		it('should update output with modifications', function(done) {
			var primary = fs.readFileSync('./example/values.json', {encoding: 'utf8'});

			// load
			main.db('./example/values.json', function(err, data) {
				assert.isNull(err, 'should not have error');

				data.testvalue = 'new';
				data.object['key'] = 'value';

				var modified = JSON.stringify(data);

				// save
				data.save(function(err) {
					if (err) return done(err);

					// read it up and assert
					var secondary = fs.readFileSync('./example/values.json', {encoding: 'utf8'});

					assert.strictEqual(secondary, modified, 'should be same output as input');
					assert.notStrictEqual(secondary, primary, 'should not be same output as beginning');

					// reset for later tests
					fs.writeFileSync('./example/values.json', primary, {encoding: 'utf8'});

					done();
				});
			});
		});
	});
});

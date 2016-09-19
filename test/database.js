var assert = require('chai').assert;
var fs = require('fs');

// We need a special require URL for coverage.
var main = process.env.JSCOV ? require('../src-cov/flatfile') : require('../main');

describe('flatfile database', function() {
	describe('open database', function() {
		it('should instantiate db on non-existent file', function(done) {
			// load
			main.db('./example/nope.json', function(err, data) {
				assert.isNull(err, 'error should be null');
				assert.deepEqual(data, {}, 'data should be empty object');

				done();
			});
		});

		it('should error on open folder', function(done) {
			main.db('./example/', function(err, data) {
				assert.isObject(err, 'error should be an error');
				assert.strictEqual(err.code, 'EISDIR');
				// Older versions of node carry worse error messages; support both.
				assert.match(err.message, /EISDIR, read|illegal operation on a directory/, 'should be read directory error');

				assert.isNull(data, 'data should null');

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
		it('should save db from non-existent file', function(done) {
			// load
			main.db('./example/nope.json', function(err, data) {
				assert.isNull(err, 'error should null');
				assert.deepEqual(data, {}, 'data should be empty object');

				data.save(function(err) {
					assert.isNull(err);

					var result = fs.readFileSync('./example/nope.json', {encoding: 'utf8'});
					assert.strictEqual(result, '{}', 'should be empty object in file');

					fs.unlinkSync('./example/nope.json');

					done();
				});
			});
		});

		it('should not be able to save db into non-existent folder', function(done) {
			main.db('./nofolder/nope.json', function(err, data) {
				// It should instantiate fine.
				assert.isNull(err, 'error should be null');
				assert.deepEqual(data, {}, 'data should be empty object');

				data.save(function(err) {
					assert.isObject(err);
					assert.strictEqual(err.code, 'ENOENT');
					// v0.10 and v0.12 give 'open [filename]' as error message, while later versions give
					// a more verbose message with 'no such file or directory', support both.
					assert.match(err.message, /open|no such file or directory/, 'should be bad directory error');

					done();
				});
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

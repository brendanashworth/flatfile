var fs = require('fs');

// This is the flatfile.db() function. It instantiates a local database asynchronously.
exports.db = function(filename, callback) {
	fs.readFile(filename, {encoding: 'utf8'}, function(err, data) {
		if (err)
			return callback(err, null);

		// Parse data
		data = JSON.parse(data);

		// Adds various library-specific data handles
		data._filename = filename;

		// Adds the save function
		data.save = function(callback) {
			var filename = data._filename;

			// Write to the file
			fs.writeFile(data._filename, JSON.stringify(data), function(err) {
				callback(err);
			});
		};

		// Make _filename and save non-enumerable so that they dont mess up data.length
		Object.defineProperties(data, {
			'_filename': {
				enumerable: false
			},
			'save': {
				enumerable: false
			}
		});

		callback(null, data);
	});
};

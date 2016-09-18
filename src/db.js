var fs = require('fs');

// This is the flatfile.db() function. It instantiates a local database asynchronously.
exports.db = function(filename, callback) {
	fs.readFile(filename, {encoding: 'utf8'}, function(err, data) {
		if (err)
			return callback(err, null);

		// Parse data
		data = JSON.parse(data);

		// Adds the save function
		data.save = function(callback) {
			// Write to the file
			fs.writeFile(filename, JSON.stringify(data), function(err) {
				callback(err);
			});
		};

		// Make `save` non-enumerable so that it doesn't mess up data.length
		Object.defineProperties(data, {
			'save': {
				enumerable: false
			}
		});

		callback(null, data);
	});
};

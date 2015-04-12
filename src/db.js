var fs = require('fs');

// This is the flatfile.db() function. It instantiates a local database asynchronously.
var db = function(filename, callback) {
	fs.readFile(filename, {encoding: 'utf8'}, function(err, data) {
		if (err)
			return callback(err, null);

		// Parse data
		data = JSON.parse(data);

		// Adds various library-specific data handles
		data._filename = filename;

		// Adds the save function
		data.save = function(callback) {
			var filename = data._filename,
				dataCopy = JSON.parse(JSON.stringify(data)); // We have to do it this way in order to clone the object instead of reference it.

			// Remove the library-specific data handles
			delete dataCopy._filename;
			delete dataCopy.save;

			// Get string
			dataCopy = JSON.stringify(dataCopy);

			// Write to the file
			fs.writeFile(filename, dataCopy, function(err) {
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

module.exports = {
	db: db
};

/*eslint no-console: "off"*/
var flatfile = require('./main');

// Example using asynchronous library.
flatfile.db('example/values.json', function(err, localDB) {
	if (err) {
		console.log('Error occurred instantiating flatfile database: ' + err);
		return;
	}

	// Let us see these values
	console.log(localDB);

	// Reading values from database
	console.log('Access variable: ' + localDB.testvalue);
	console.log('Access array: ' + localDB.array[1]);
	console.log('Access object: ' + localDB.object['val2']);

	// Writing values to database
	localDB.testvalue = 'newTestValue';
	localDB.array[1] = 'newArrayValue';
	localDB.object['val2'] = 'newObjectValue';

	// Saving values to database
	localDB.save(function(err) {
		if (err)
			console.log('Error occurred saving flatfile database: ' + err);
	});
});

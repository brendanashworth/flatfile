flatfile [![Build Status](https://travis-ci.org/brendanashworth/flatfile.svg?branch=master)](https://travis-ci.org/brendanashworth/flatfile)
=====

> flatfile is a very simple library for storing, retrieving, and setting JSON data in a flatfile. The library focuses on ease of use and simplicity. Getting up and running is extremely simple and does not require installing any database software.

## Install
```bash
$ npm i flatfile --save
```

## Usage
This example uses ES6 (see [io.js](https://iojs.org/en/index.html)), though the module is compatible up to node v0.10.
```javascript
const flatfile = require('flatfile');

// Load a flatfile database based on file: myfile.json
flatfile.db('data.json', function(err, data) {
    if (err) throw err;

    // Manipulate data like a JS Object
    data.numbers.filter(function(x) {
        return x % 3 == 1;
    }).map(Math.pow).forEach(function(x) {
       data.output[x] = (Math.sin(x) > 0.5); 
    });

    // Save to the file.
    data.save(function(err) {
        if (err) throw err;
    });
});
```

## Documentation

### Init database
```javascript
flatfile.db(filename, function(err, data))
```
This is a very simple, asynchronous function for initiating the database. After reading the file and parsing to an object, it will return the object via the callback data paramater. If an error occurs while reading the file, it will be passed to the callback and *null* will be returned as data.

**Warning**: the `data` object that is passed from this function is not an exact copy from the file, but can be treated as such. The data object is given two extra values: `_filename` and `save`. The `_filename` value is quite simple and simply stores the filename of the read database file. The `save` variable is a function that should be executed when the database should be saved.

### Getting values
```javascript
data.myValue; // Returns the value of key myValue.
```
Getting a value from the `data` is exactly as you think it would be. Simply reference the value as a Javascript object would be referenced and the value will be there. At heart, the `data` object is truly the object representing the file, but it also contains the two special values for the library.

### Saving values
```javascript
data.myValue = 'newValue';
```
Saving a file to the database is inherently easy. Simply reference and set the value as you would with a standard Javascript object. However, do not forget to *save the changes*.

### Saving changes
```javascript
data.save(function(err));
```
Again, this is a very simple function for saving the changes to the database. You can repetitively call this function without having an issue. As a paramater, this function takes a callback function with an error paramater. If an error did not occur, the error will not be defined. Otherwise, you can handle the error to your own delight.

**Warning**: be aware that the data *will not automatically save*. It is necessary to call this function if you want to save the changes.

## License
[MIT](./LICENSE)
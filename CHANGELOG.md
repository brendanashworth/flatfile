## 2.0.0, 2016-9-23
Release filled with small improvements and two breaking changes.

First, `flatfile.db('./data.json', ...)`, when called on a file that does not exist, will return
an empty object (`{}`) rather than erring out.

Second, the object returned by `flatfile.db` used to have a property `_filename`. This property
has been removed.

#### Notable Changes
- [`a372ed016`](https://github.com/brendanashworth/flatfile/commit/a372ed016a5bc7787348e613596f7d02c0707155) - add code coverage (Brendan Ashworth)
- *BREAKING*: [`7e559b05d`](https://github.com/brendanashworth/flatfile/commit/7e559b05d41c198e4dbff317c11d50ae26cae4b5) - initiate new db on no-file open (Brendan Ashworth)
- *BREAKING*: [`bb616f71b`](https://github.com/brendanashworth/flatfile/commit/bb616f71bec531fed127f07120e8ebf6b4264076) - drop db._filename (Brendan Ashworth)
- [`4c8e009d6`](https://github.com/brendanashworth/flatfile/commit/4c8e009d65232d66fb7f8b6e024a8b95d8c9b127) - add eslint for linting (Brendan Ashworth)

## 1.0.0, 2015-4-12
First release on semver.

#### Notable Changes
- [`3b6bb2e40`](https://github.com/brendanashworth/flatfile/commit/3b6bb2e40dc4d000af1e7385206fa18db3cc7590) - Make _filename and save non-enumerable (Mudit Ameta)
- [`cf4161532`](https://github.com/brendanashworth/flatfile/commit/cf4161532d7f7ce49982823e60565452a41fe77e) - add tests, fix error callback (Brendan Ashworth)
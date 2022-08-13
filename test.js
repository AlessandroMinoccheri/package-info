'use strict';
const assert = require('assert');
const info = require('./index');

it('should get the latest info of a package', function (done) {
	info('package-info', function (err, info) {
		assert(!err, err);
		assert(info);
		['name', 'version', 'description', 'license', 'homepage', 'author']
			.forEach(function (field) {
				assert(typeof info[field] == 'string', 'has ' + field);
			});

		done();
	});

	done();
});

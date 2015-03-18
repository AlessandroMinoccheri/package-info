'use strict';
var assert = require('assert');
var info = require('./index');

it('should get the latest info of a package', function (cb) {
	info('pageres', function (err, info) {
		assert(!err, err);
		assert(info);
		['name', 'version', 'description', 'license', 'homepage', 'author']
			.forEach(function (field) {
				assert(typeof info[field] == 'string', 'has ' + field);
			});
		cb();
	});
});

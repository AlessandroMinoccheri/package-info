'use strict';
var assert = require('assert');
var info = require('./index');

it('should get the latest info of a package', function (cb) {
	info('pageres', function (err, version) {
		assert(!err, err);
		assert(version);
		cb();
	});
});

'use strict';
var got = require('got');
var endpoint = 'https://registry.npmjs.org/';

module.exports = function (name, cb) {
	got(endpoint + encodeURIComponent(name) + '/latest', function (err, data) {
		if (err === 404) {
			return cb(new Error('Package doesn\'t exist'));
		}

		if (err) {
			return cb(err);
		}

		var name = JSON.parse(data).name;
		var version = JSON.parse(data).version;
		var description = JSON.parse(data).description;
		var license = JSON.parse(data).license;
		cb(null, 'name: ' + name + ' \nversion: ' + version + ' \ndescription: ' + description + ' \nlicense: ' + license);
	});
};

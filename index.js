'use strict';
var got = require('got');
var registryUrl = require('registry-url');

module.exports = function (name, cb) {
	registryUrl(function (err, url) {
		got(url + encodeURIComponent(name), {method: 'GET'}, function (err, data) {
		    if (err === 404) {
		    	return cb(new Error('Package doesn\'t exist'));
		    }

		    if (err) {
		    	return cb(err);
		    }

		    var data_parsed = JSON.parse(data);
		    var name = data_parsed.name;
		    var version = data_parsed[ 'dist-tags' ].latest;
		    var description = data_parsed.description;
		    var license = data_parsed.license;
		    var homepage = data_parsed.homepage;
		    var author_name = data_parsed.author.name;

		    cb(null, 'name: ' + name + ' \nversion: ' + version + ' \ndescription: ' + description + ' \nlicense: ' + license + ' \nhomepage: ' + homepage + ' \nauthor: ' + author_name);
		});
	});
};

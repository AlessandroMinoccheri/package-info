'use strict';
var got = require('got');
var registryUrl = require('registry-url');
var Promise = require('pinkie-promise');

module.exports = function (name) {
	if (typeof name !== 'string') {
		return Promise.reject(new Error('package name required'));
	}

	return got.head(registryUrl + name.toLowerCase())
		.then(function (data) {
			var name 		= '';
			var version 	= '';
			var description = '';
			var license 	= '';
			var homepage 	= '';
			var authorName = '';

			var dataParsed = JSON.parse(data);
			name 		= dataParsed.name;
			version 	= dataParsed[ 'dist-tags' ].latest;
			description = dataParsed.description;
			license 	= dataParsed.license;

			if(dataParsed.homepage !== undefined){
				homepage 	= dataParsed.homepage;
			}

			if(dataParsed.author !== undefined){
				authorName = dataParsed.author.name;
			}
			else{
				if(dataParsed.maintainers !== undefined){
					for (var i in dataParsed.maintainers) {
						var maintainer = dataParsed.maintainers[i];
						if(authorName === ''){
							authorName = maintainer.name;
						}
						else{
							authorName = authorName + ', ' + maintainer.name;
						}
					}
				}
			}

			return {
				name          	: name,
				version			: version,
				description		: description,
				license			: license,
				homepage		: homepage,
				author			: authorName
			};
		})
		.catch(function (err) {
			if (err.statusCode === 404) {
				err.message = 'Package doesn\'t exist';
			}

			throw err;
		});

	/*return got(url).then(function (res) {
		var $ = cheerio.load(res.body);

		return {
			name: $('.fullname').text() || null,
			email: unobfuscateEmail($('.email [data-email]').attr('data-email')) || null,
			homepage: $('.homepage a').attr('href') || null,
			github: $('.github a').text().slice(1) || null,
			twitter: $('.twitter a').text().slice(1) || null,
			freenode: $('.freenode a').text() || null
		};
	}).catch(function (err) {
		if (err.statusCode === 404) {
			err.message = 'User doesn\'t exist';
		}

		throw err;
	});*/
};

/*function request(name) {
	return got.head(registryUrl + name.toLowerCase())
		.then(() => false)
		.catch(err => {
			if (err.statusCode === 404) {
				return true;
			}

			throw err;
		});
}
/*
module.exports = name => {
	if (!(typeof name === 'string' && name.length !== 0)) {
		return Promise.reject(new Error('Package name required'));
	}

	return request(name);
};*/

/*module.exports = name => {
	//if (!(typeof name === 'string' && name.length !== 0)) {
	//	return Promise.reject(new Error('Package name required'));
	//}

	return request(name);
	/*
	got(registryUrl + encodeURIComponent(name), {method: 'GET'}, function (err, data) {
		var name 		= '';
		var version 	= '';
		var description = '';
		var license 	= '';
		var homepage 	= '';
		var author_name = '';

		if (err === 404) {
			return cb(new Error('Package doesn\'t exist'));
		}

		if (err) {
			return cb(err);
		}

		var data_parsed = JSON.parse(data);
		var name 		= data_parsed.name;
		var version 	= data_parsed[ 'dist-tags' ].latest;
		var description = data_parsed.description;
		var license 	= data_parsed.license;

		if(data_parsed.homepage !== undefined){
			var homepage 	= data_parsed.homepage;
		}

		if(data_parsed.author !== undefined){
			var author_name = data_parsed.author.name;
		}
		else{
			if(data_parsed.maintainers !== undefined){
				for (var i in data_parsed.maintainers) {
					var maintainer = data_parsed.maintainers[i];
					if(author_name == ''){
						author_name = maintainer.name;
					}
					else{
						author_name = author_name + ', ' + maintainer.name;
					}
				}
			}
		}

		cb(null, {
			name          	: name,
			version			: version,
			description		: description,
			license			: license,
			homepage		: homepage,
			author			: author_name
		});
	});*/
//};

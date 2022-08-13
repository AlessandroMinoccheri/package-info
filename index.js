'use strict';
const got = require('got');
const registryUrl = require('registry-url');

module.exports = function (name) {
	if (typeof name !== 'string') {
		return Promise.reject(new Error('package name required'));
	}

	return got(registryUrl + name.toLowerCase())
		.then(function (data) {
			let name 		= '';
			let version 	= '';
			let description = '';
			let license 	= '';
			let homepage 	= '';
			let authorName = '';

			const dataParsed = JSON.parse(data.body);

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
					for (let i in dataParsed.maintainers) {
						const maintainer = dataParsed.maintainers[i];
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
};

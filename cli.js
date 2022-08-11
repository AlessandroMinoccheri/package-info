#!/usr/bin/env node
'use strict';
const pkg = require('./package.json');
const info = require('./');
const argv = process.argv.slice(2);
const input = argv[0];

function help() {
	console.log(pkg.description);
	console.log('');
	console.log('Usage');
	console.log('  $ package-info <package-name>');
	console.log('');
	console.log('Example');
	console.log('  $ package-info pageres');
}

if (!input || argv.indexOf('--help') !== -1) {
	help();
	return;
}

if (process.argv.indexOf('-v') !== -1 || process.argv.indexOf('--version') !== -1) {
	console.log(pkg.version);
	return;
}

info(input)
.then(version => console.log(version))
.catch(err => {
  console.error(err);
  process.exit(1);
});

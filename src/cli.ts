#!/usr/bin/env node
'use strict';
import info from './index.js';
import { readFile } from 'fs/promises';

type PackageJson = {
    description: string
    version: string
}

async function syncReadFile(filename: string): Promise<PackageJson> {
	return JSON.parse(await readFile(filename, 'utf-8'));
}

function readPackageInfo(): Promise<PackageJson> {
	return syncReadFile('./../package.json');
}

async function help(packageInfo: PackageJson): Promise<void> {
	console.log(packageInfo.description);
	console.log('');
	console.log('Usage');
	console.log('  $ package-info <package-name>');
	console.log('');
	console.log('Example');
	console.log('  $ package-info pageres');
}

export default async function cli(
	processArgv: string[] = process.argv
): Promise<void> {
	const argv: string[] = processArgv.slice(2);
	const pkg = await readPackageInfo();
	if (!argv.length || argv.indexOf('--help') !== -1) {
		help(pkg);
		return;
	}

	if (
		processArgv.indexOf('-v') !== -1 ||
		processArgv.indexOf('--version') !== -1
	) {
		console.log(pkg.version);
		return;
	}

	const input = argv[0];
	info(input)
		.then(version => console.log(version))
		.catch(err => {
			console.error(err);
			process.exit(1);
		});
}

cli();

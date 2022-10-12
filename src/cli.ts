#!/usr/bin/env node
'use strict';
import info from './index.js';
import { readFileSync } from 'fs';

type PackageJson = {
    description: string
    version: string
}

const argv: string[] = process.argv.slice(2);
const input = argv[0];


function syncReadFile(filename: string): PackageJson {
    return JSON.parse(readFileSync(filename, 'utf-8'));
}

const pkg = syncReadFile('./../package.json');

function help() {
	console.log(pkg.description);
	console.log('');
	console.log('Usage');
	console.log('  $ package-info <package-name>');
	console.log('');
	console.log('Example');
	console.log('  $ package-info pageres');
}

export default async function cli() {
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
    })
} 
cli();

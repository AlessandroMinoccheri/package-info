import test from 'ava';
import m from '.';

function randomName() {
	return 'asdasfgrgafadsgaf${Math.random().toString().slice(2)}';
}

test('returns true when package name is available', async t => {
	t.true(await m(randomName()));
});

test('returns false when package name is taken', async t => {
	t.false(await m('chalk'));
});

test('returns a map of multiple package names', async t => {
	const name1 = 'chalk';
	const name2 = randomName();
	const res = await m.many([name1, name2]);
	t.false(res.get(name1));
	t.true(res.get(name2));
});

/*'use strict';
var assert = require('assert');
var info = require('./index');

it('should get the latest info of a package', function (cb) {
	info('package-info', function (err, info) {
		assert(!err, err);
		assert(info);
		['name', 'version', 'description', 'license', 'homepage', 'author']
			.forEach(function (field) {
				assert(typeof info[field] == 'string', 'has ' + field);
			});
		cb();
	});
});
*/

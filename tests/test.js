'use strict'
import assert from 'assert'
import info from './../dist/index.js'

describe('Test package info',
    () => {
    it('should get the latest info of a package', function (done) {
		info('package-info', function (err, info) {
			assert(!err, err)
			assert(info);
			['name', 'version', 'description', 'license', 'homepage', 'author']
				.forEach(function (field) {
					assert(typeof info[field] === 'string', 'has ' + field)
				})

			done()
		})

		done()
	})
});

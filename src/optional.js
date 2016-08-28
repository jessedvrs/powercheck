'use strict';

import check from './lib/check';
import _Wrapper from './lib/classes/Wrapper';
import _Failure from './lib/classes/Failure';

/**
 * Wrap anything to make it pass when the value is undefined.
 *
 * @param {Object|Array|Function} validator
 * @returns {Boolean|Failure} Whether the optional value passes the validator
 */
export default function optional(validator) {
    return new _Wrapper('optional', (value) => {
        var result = check(value, validator);

        if (result instanceof _Failure) {
            result.optional = true;
        }

        // Allow 'undefined' and 'null'
        return typeof value === 'undefined' || value === null || result;
    });
};

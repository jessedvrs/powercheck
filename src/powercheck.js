'use strict';

import check from './lib/check';
import Throw from './Throw';
import optional from './optional';
import equals from './equals';
import validate from './validate';

/**
 * Wrap the check function to transform a Failure
 * instance to a "false" boolean
 *
 * @param {any} value
 * @param {Object|Array|Function} validator
 * @returns {Boolean} Whether the value passes the validator
 */
export default function powercheck(value, validator) {
    return !(check(value, validator) instanceof _Failure);
};

export {
    Throw as Throw,
    optional as optional,
    equals as equals,
    validate as validate
};

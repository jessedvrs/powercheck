'use strict';

import check from './lib/check';
import _Failure from './lib/classes/Failure';
import Throw from './Throw';
import optional from './optional';
import equals from './equals';
import validate from './validate';
import oneOf from './oneOf';
import every from './every';

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

// Support ES6 modules
module.exports = powercheck;
module.exports.Throw = Throw;
module.exports.optional = optional;
module.exports.equals = equals;
module.exports.validate = validate;
module.exports.oneOf = oneOf;
module.exports.every = every;

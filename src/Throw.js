'use strict';

import check from './lib/check';
import _Failure from './lib/classes/Failure';
import _getErrorClue from './lib/helpers/getErrorClue';
import optional from './optional';
import equals from './equals';
import validate from './validate';
import oneOf from './oneOf';
import every from './every';

/**
 * Wrap the check function to throw an exception
 * when the check fails.
 *
 * @param {any} value
 * @param {Object|Array|Function} validator
 * @param {any} customError When a function is specified: (value, error) => {any}
 * @returns {Boolean|Exception} Whether the value passes the validator
 */
export default function powercheckThrow(value, validator, customError) {
    var result = check(value, validator);

    if (result instanceof _Failure) {

        // Get an understandable clue about the error.
        result.clue = (0, _getErrorClue)(value, result);

        // The optional `customError` argument can be a function.
        // The given function will then receive the value as first argument
        // and an object with error info as second argument. We expect it
        // to return anything to be thrown.
        if (typeof customError === 'function') {
            customError = customError(value, result);
        }

        if (typeof customError === 'string') {
            customError = new Error(customError);
        }

        // Make the utility throw an exception.
        const error = customError || new Error('Powercheck: validation failed. ' + (result.clue || ''));

        if (error instanceof Error) {
            error._fromPowercheck = true;
        }

        throw error;
    }
};

// Support ES6 modules
module.exports = powercheckThrow;
module.exports.optional = optional;
module.exports.equals = equals;
module.exports.validate = validate;
module.exports.oneOf = oneOf;
module.exports.every = every;

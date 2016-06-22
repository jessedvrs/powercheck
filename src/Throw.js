'use strict';

import check from './lib/check';
import _Failure from './lib/classes/Failure';
import _getErrorClue from './lib/helpers/getErrorClue';

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
        // to return anything to be wrapped in `new Error()`.
        if (typeof customError === 'function') {
            customError = customError(value, result);
        }

        // Make the utility throw an exception.
        throw new Error(customError || 'Powercheck: validation failed. ' + (result.clue || ''));
    }
};
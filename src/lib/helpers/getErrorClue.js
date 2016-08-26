'use strict';

/**
 * Determine information about the failed validation
 * check.
 *
 * @param {any} value
 * @param {Object} result The error object
 * @returns {String} Human readable error message
 */
export default function getErrorClue(value, result) {
    switch(result.type) {
        case 'wrapper.validator':
            return `Custom validator failed for value "${value}".`;
        case 'wrapper.equals':
            return `The given value "${value}" did not strictly equal "${result.info.expectedValue}".`;
        case 'wrapper.oneOf':
            return `The given value "${value}" did not pass one of the ${result.info.amountOfValidators} given validators.`;
        case 'nativetype':
            return `Expected${result.optional ? ` optional` : ``} ${result.info.expectedType}${result.info.key ? ` for key "${result.info.key}"` : ``}, got ${result.info.got}.`;
        case 'instanceof':
            return `Expected${result.optional ? ` optional` : ``} instance of ${result.info.expectedInstance}, got ${result.info.got}.`;
        case 'array-literal':
            return `Expected${result.optional ? ` optional` : ``} array, got ${result.info.got}.`;
        case 'object-literal':
            return `Expected${result.optional ? ` optional` : ``} object, got ${result.info.got}.`;
    }
};

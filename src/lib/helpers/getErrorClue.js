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
    const objectLiteralKeyInfo = result.info.key ? `${result.info.key ? ` for key "${result.info.key}"` : ``}` : ``;

    switch(result.type) {
        case 'wrapper.validator':
            return `Custom validator failed for value "${value}"${objectLiteralKeyInfo}${result.info.errorMessage ? `: "${result.info.errorMessage}"` : `.`}`;
        case 'wrapper.equals':
            return `The given value "${value}" did not strictly equal "${result.info.expectedValue}"${objectLiteralKeyInfo}.`;
        case 'wrapper.oneOf':
            return `The given value "${value}" did not pass one of the ${result.info.amountOfValidators} given validators${objectLiteralKeyInfo}.`;
        case 'nativetype':
            return `Expected${result.optional ? ` optional` : ``} ${result.info.expectedType}${objectLiteralKeyInfo}, got ${result.info.got}.`;
        case 'instanceof':
            return `Expected${result.optional ? ` optional` : ``} instance of ${result.info.expectedInstance}${objectLiteralKeyInfo}, got ${result.info.got}.`;
        case 'array-literal':
            return `Expected${result.optional ? ` optional` : ``} array${objectLiteralKeyInfo}, got ${result.info.got}.`;
        case 'object-literal':
            return `Expected${result.optional ? ` optional` : ``} object${objectLiteralKeyInfo}, got ${result.info.got}.`;
    }
};

'use strict';

/**
 * Helper to determine data type since 'typeof'
 * does not distinguish arrays.
 *
 * @param {any} value
 * @returns {String} Type of the value
 */
export default function determineDataType(value) {
    let type = typeof value;

    if (type === 'object' && Array.isArray(value)) {
        type = 'array';
    }

    return type;
};

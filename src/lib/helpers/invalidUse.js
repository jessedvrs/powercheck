'use strict';

/**
 * Report invalid use of the utility.
 *
 * @param {String} msg Erorr message
 * @returns {Exception}
 */
export default function invalidUse(msg) {
    throw new Error(`Powercheck: ${msg}`);
};

'use strict';

import powercheck from './';
import _invalidUse from './lib/helpers/invalidUse';
import check from './lib/check';
import _Wrapper from './lib/classes/Wrapper';
import _Failure from './lib/classes/Failure';

/**
 * Helper to check whether every of the validators pass.
 *
 * @param {Array} validators
 * @returns {Boolean} Whether the value passes every validator
 */
export default function every(validators) {
    return new _Wrapper('every', (value) => {
        if (!powercheck(validators, Array)) {
            _invalidUse('every() expects an array');
        }

        // Value should pass every validator
        const valid = validators.every((validator) =>
            !(check(value, validator) instanceof _Failure)
        );

        return valid || new _Failure('wrapper.every', {amountOfValidators: validators.length});
    });
};

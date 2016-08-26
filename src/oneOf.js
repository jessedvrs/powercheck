'use strict';

import powercheck from './';
import _invalidUse from './lib/helpers/invalidUse';
import check from './lib/check';
import _Wrapper from './lib/classes/Wrapper';
import _Failure from './lib/classes/Failure';

/**
 * Helper to check whether one of the validators pass.
 *
 * @param {Array} validators
 * @returns {Boolean} Whether the value passes one of the validators
 */
export default function oneOf(validators) {
    return new _Wrapper('oneOf', (value) => {
        if (!powercheck(validators, Array)) {
            _invalidUse('oneOf() expects an array');
        }

        // Value should pass one of the validators
        const valid = validators.some((validator) =>
            !(check(value, validator) instanceof _Failure)
        );

        return valid || new _Failure('wrapper.oneOf', {amountOfValidators: validators.length});
    });
};

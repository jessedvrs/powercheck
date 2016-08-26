'use strict';

import _Wrapper from './lib/classes/Wrapper';
import _Failure from './lib/classes/Failure';

/**
 * A way to provide a custom validator function
 *
 * @param {Function} validator
 * @returns {Boolean|Failure} Whether the value passes the custom validator
 */
export default function validate(validator) {
    return new _Wrapper('validator', (value) => {

        let result;
        try {
            result = validator.call(undefined, value);
        } catch(err) {
            if(err._fromPowercheck && err.message) {
                return new _Failure('wrapper.validator', {errorMessage: err.message});
            }
        }

        return result || new _Failure('wrapper.validator');
    });
};

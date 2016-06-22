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
        return validator.call(undefined, value) || new _Failure('wrapper.validator');
    });
};

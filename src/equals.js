'use strict';

import _Wrapper from './lib/classes/Wrapper';
import _Failure from './lib/classes/Failure';

/**
 * Helper to check whether the value equals the given
 * value.
 *
 * @param {any} compareValue
 * @returns {Boolean} Whether the value strictly equals the compareValue
 */
export default function equals(compareValue) {
    return new _Wrapper('equals', (value) => {

        // Value should strictly equal
        return value === compareValue || new _Failure('wrapper.equals', {expectedValue: compareValue});
    });
};

'use strict';

import powercheck from '../';
import _invalidUse from './helpers/invalidUse';
import _determineDataType from './helpers/determineDataType';
import _Wrapper from './classes/Wrapper';
import _Failure from './classes/Failure';

/**
 * Value checker
 *
 * @param {any} value
 * @param {Object|Array|Function} validator
 * @returns {Boolean|Failure} Whether the value passes the validator
 */
export default function check(value, validator) {

    // The validator is required.
    if (!validator) {
        _invalidUse('invalid validator');
    }

    // When the validator is an object or an array.
    if (typeof validator === 'object') {

        // When the validator is an instance of the internal wrapper,
        // call its run function.
        if (validator instanceof _Wrapper) {
            return validator.run(value);
        }

        // When the validator is an array, the user
        // uses the array-literal syntax to check
        // whether the value is an array-of-'something',
        // where 'something' fires off a recursive check.
        if (Array.isArray(validator)) {
            const itemValidator = validator[0];

            // The literal array must not be empty.
            if (!itemValidator) {
                _invalidUse('invalid validator');
            }

            // So the value must be an array...
            if (!powercheck(value, Array)) { // Using powercheck <3
                return new _Failure('array-literal', {got: _determineDataType(value)});
            }

            // ... and every value must match the given item-validator.
            const results = value.map((val) => check(val, itemValidator));
            return results.every((result) => {
                return !(result instanceof _Failure);
            }) || results.find((result) => result instanceof _Failure);
        }

        // The user uses the object-literal syntax.
        // So the value must be an object.
        if (!powercheck(value, Object)) {
            return new _Failure('object-literal', {got: _determineDataType(value)});
        }

        // Every object property should exist as validator
        // property.
        const unkwownKey = Object.keys(value).find((key) => !validator.hasOwnProperty(key));
        if (unkwownKey) {
            return new _Failure('object-literal-unknown-key', {key: unkwownKey});
        }

        // Every validator property should exist as
        // propery of the given object and be valid.
        const results = Object.keys(validator).map((key) => check(value.hasOwnProperty(key) && value[key], validator[key]));
        return results.every((result) => {
            return !(result instanceof _Failure);
        }) || results.find((result) => result instanceof _Failure);
    }

    // When the validator is a function or constructor
    if (typeof validator === 'function') {

        // Use native constructors to check whether
        // the given value matches a data type.
        const type = _determineDataType(value);
        switch (validator) {
            case String:
                return type === 'string' || new _Failure('nativetype', {expectedType: 'string', got: type});
            case Boolean:
                return type === 'boolean' || new _Failure('nativetype', {expectedType: 'boolean', got: type});
            case Number:
                return type === 'number' || new _Failure('nativetype', {expectedType: 'number', got: type});
            case Object:
                return value && type === 'object' || new _Failure('nativetype', {expectedType: 'object', got: type});
            case Array:
                return value && type === 'array' || new _Failure('nativetype', {expectedType: 'array', got: type});
            case Symbol:
                return value && type === 'symbol' || new _Failure('nativetype', {expectedType: 'object', got: type});
            case Function:
                return value && type === 'function' || new _Failure('nativetype', {expectedType: 'function', got: type});
        }

        // At last, the value could be an 'instance of' the validator.
        return value instanceof validator || new _Failure('instanceof', {expectedInstance: validator.name || 'anonymous constructor', got: type});
    }

    // The validator seems to be invalid
    _invalidUse('invalid validator');
};

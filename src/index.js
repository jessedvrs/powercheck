'use strict';

// This function represents the main utility.
// It wraps the run function below to get rid of the _Failure object
// and make sure the utility just returns a boolean.
const powercheck = function powercheck(value, validator) {
    return !(_run(value, validator) instanceof _Failure);
};

// A way to provide a custom validator function
powercheck.validate = (validator) => {
    return new _Wrapper('validator', (value) => {
        return validator.call(undefined, value) || new _Failure('wrapper.validator');
    });
};

// Wrap anything to make it pass when the value is undefined
powercheck.optional = (validator) => {
    return new _Wrapper('optional', (value) => {

        const result = _run(value, validator);

        if (result instanceof _Failure) {
            result.optional = true;
        }

        // Only allow 'undefined'
        return typeof value === 'undefined' || result;
    });
};

// Helper to check whether the value equals the given value
powercheck.equals = (compareValue) => {
    return new _Wrapper('equals', (value) => {

        // Value should strictly equal
        return value === compareValue || new _Failure('wrapper.equals', {expectedValue: compareValue});
    });
};

// Alternative use of the utility,
// throwing an exception instead of returning a boolean.
powercheck.throw = (value, validator, customError) => {
    const result = _run(value, validator);

    if (result instanceof _Failure) {

        // Get an understandable clue about the error.
        result.clue = _getErrorClue(value, result);

        // The optional `customError` argument can be a function.
        // The given function will then receive the value as first argument
        // and an object with error info as second argument. We expect it
        // to return anything to be wrapped in `new Error()`.
        if (typeof customError === 'function') {
            customError = customError(value, result);
        }

        // Make the utility throw an exception.
        throw new Error(customError || `Powercheck: validation failed. ${result.clue || ''}`);
    }
};

export default powercheck;

// This wrapper is being used internally to identify any of the
// "run.validate", "run.optional" or "run.equals" wrappers
// in the checks.
const _Wrapper = class PowercheckWrapper {
    constructor(type, run) {
        this.type = type;
        this.run = run;
    }
};

// This constructor is being used internally to identify a
// failed validation check.
const _Failure = class PowercheckFailure {
    constructor(type, info) {
        this.type = type;
        this.info = info;
    }
};

// This run function represents the main utility.
const _run = (value, validator) => {

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
            const results = value.map((val) => _run(val, itemValidator));
            return results.every((result) => {
                return !(result instanceof _Failure);
            }) || results.find((result) => result instanceof _Failure);
        }

        // The user uses the object-literal syntax.
        // So the value must be an object...
        if (!powercheck(value, Object)) {
            return new _Failure('object-literal', {got: _determineDataType(value)});
        }

        // ... and every validator property should exist as
        // own (!) propery of the given object and be valid.
        // Not every property of the given object has to
        // exist in the validator object.
        const results = Object.keys(validator).map((key) => _run(value.hasOwnProperty(key) && value[key], validator[key]));
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

// Helper to determine data type since 'typeof' is
// not enough to distinguish arrays
const _determineDataType = (value) => {
    let type = typeof value;

    if (type === 'object' && Array.isArray(value)) {
        type = 'array';
    }

    return type;
};

// Report invalid use of the utility.
const _invalidUse = (msg) => {
    throw new Error(`Powercheck: ${msg}`);
};

// Determine information about the failed validation check.
const _getErrorClue = (value, result) => {
    switch(result.type) {
        case 'wrapper.validator':
            return `Custom validator failed for value "${value}".`;
        case 'wrapper.equals':
            return `The given value "${value}" did not strictly equal "${result.info.expectedValue}".`;
        case 'nativetype':
            return `Expected${result.optional ? `optional ` : ``} ${result.info.expectedType}, got ${result.info.got}.`;
        case 'instanceof':
            return `Expected${result.optional ? `optional ` : ``} instance of ${result.info.expectedInstance}, got ${result.info.got}.`;
        case 'array-literal':
            return `Expected${result.optional ? `optional ` : ``} array, got ${result.info.got}.`;
        case 'object-literal':
            return `Expected${result.optional ? `optional ` : ``} object, got ${result.info.got}.`;
    }
};

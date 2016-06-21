'use strict';

const Wrapper = class CheckWrapper {
    constructor(type, validator) {
        this.type = type;
        this.run = validator;
    }
};

const run = function(value, validator) {
    if (!validator) {
        throw invalidValidator();
    }

    if (typeof validator === 'object') {
        if (validator instanceof Wrapper) {
            return validator.run(value);
        }

        if (Array.isArray(validator)) {
            const arrayItemValidator = validator[0];
            if (!arrayItemValidator) {
                throw invalidValidator();
            }

            return run(value, Array) && value.every((val) => {
                return run(val, arrayItemValidator);
            });
        }

        return Object.keys(validator).every((key) => {
            return run(value[key], validator[key]);
        });
    }

    if (typeof validator !== 'function') {
        throw invalidValidator();
    }

    switch (validator) {
        case String:
            return typeof value === 'string';
        case Boolean:
            return typeof value === 'boolean';
        case Number:
            return typeof value === 'number';
        case Object:
            return value && typeof value === 'object' && !Array.isArray(value);
        case Array:
            return value && Array.isArray(value);
        case Symbol:
            return value && typeof value === 'symbol';
        case Function:
            return value && typeof value === 'function';
    }

    return value instanceof validator;
};

export default run;

run.validate = (validator) => {
    return new Wrapper('validator', (value) => {
        return validator.call(undefined, value);
    });
};

run.equals = (compare) => {
    return new Wrapper('equals', (value) => {
        return value === compare;
    });
};

run.optional = (validator) => {
    return new Wrapper('optional', (value) => {
        return typeof value === 'undefined' || run(value, validator);
    });
};

run.throw = (value, validator, error) => {
    if (!run(value, validator)) {
        throw new Error(error || 'Powercheck: validation failed');
    }
};

const invalidValidator = () => {
    return new Error('Powercheck: invalid validator');
};

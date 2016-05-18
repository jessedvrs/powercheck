'use strict';

const Wrapper = class CheckWrapper {
    constructor(type, validator) {
        this.type = type;
        this.run = validator;
    }
};

let run = function(value, validator) {
    if (!validator) {
        return false;
    }

    if (typeof validator === 'object') {
        return Object.keys(validator).every((key) => {
            return run(value[key], validator[key]);
        });
    }

    if (typeof validator !== 'function') {
        throw false;
    }

    if (validator instanceof Wrapper) {
        return validator.run(value);
    }

    switch (validator) {
        case String:
            return typeof value === 'string';
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
        return !value || run(value, validator);
    });
};

run.throw = (value, validator) => {
    if (!run(value, validator)) {
        throw new Error('Check failed');
    }
};

'use strict';

/**
 * This wrapper is being used internally to identify
 * any of the "run.validate", "run.optional" or "run.equals"
 * wrappers in the checks.
 *
 * @param {String} type Wrapper type used to determine possible-error clue
 * @param {Function} run Validation function to run
 */
export default class Wrapper {
    constructor(type, run) {
        this.type = type;
        this.run = run;
    }
};

'use strict';

/**
 * This class is being used internally to identify
 * a failed validation check.
 *
 * @param {String} type Failure type used to determine error clue
 * @param {Object} info Failure information used to determine error clue
 */
export default class Failure {
    constructor(type, info) {
        this.type = type;
        this.info = info || {};
    }

    addInfo(info) {
        Object.assign(this.info, info);
    }
};

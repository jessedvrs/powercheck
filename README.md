powercheck
==========

[![npm version](https://badge.fury.io/js/powercheck.svg)](https://badge.fury.io/js/powercheck)

Straightforward, light and powerful utility to check types, instances or values. Takes away the dirt, lets you write more solid code and drastically improves code readability.

```
npm install powercheck --save
```

Usage
-----

```js
import check from 'powercheck';

/**
 * Type checking
 */
check('foo', String);
    // -> true

/**
 * Instance checking
 */
check(new Date(), Date);
    // -> true

/**
 * Throw an exception instead
 */
check.throw('foo', Number);
    // -> throws an exception

/**
 * More instance checking
 */
check(new SomeConstructor(), SomeConstructor);
    // -> true

/**
 * Equality checking
 */
check('foo', check.equals('bar'));
    // -> false

/**
 * The "optional" wrapper
 */
check(undefined, check.optional(String));
    // -> true

/**
 * The "optional" wrapper can wrap anything
 */
check('bar', check.optional(check.equals('bar')));
    // -> true

/**
 * Custom validation function
 */
check('foo', check.validate((value) => {
    return ['foo', 'bar'].indexOf(value) > -1;
}));
    // -> true

/**
 * Array literal
 */
check(['foo', 'bar'], [String]);
    // -> true

/**
 * Array literal with incorrect value
 */
check(['foo', 400], [String]);
    // -> false

/**
 * Object literal
 */
check({
    foo: 'bar'
}, {
    foo: String
});
    // -> true

/**
 * Object literal with incorrect value
 */
check({
    foo: 'bar',
    baz: 'kopz'
}, {
    foo: String,
    baz: Number
});
    // -> false

/**
 * Object literal with extra property
 */
check({
    foo: 'bar',
    baz: 'kopz',
    extra: 'boo'
}, {
    foo: String,
    baz: String
});
    // -> true

/**
 * Object literal with missing property
 */
check({
    foo: 'bar',
    baz: 'kopz',
}, {
    foo: String,
    baz: String,
    extra: String
});
    // -> false
```

### API

#### `check(value, validator)` or `check.throw(value, validator)`

`check()` **returns** a boolean and `check.throw()` **throws** an exception.

Key | Value
--- | ----
**value** | Anything you want to check the type, instance and/or value for
**validator** | `String`, `Number`, `Object`, `Array`, `Function`, `Symbol` (ES6), `SomeConstructor`, `check.optional(<validator>)`, `check.validate((value) => trueOrFalse)`, `check.equals(compareValue)`, `[<validator>]`, `{key1: <validator>, ...}`

### Questions

If you have questions, you can ask them on StackOverflow mentioning me [@jessedvrs](http://stackoverflow.com/users/2803759).



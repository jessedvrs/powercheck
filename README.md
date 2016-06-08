powercheck
==========

[![npm version](https://badge.fury.io/js/powercheck.svg)](https://badge.fury.io/js/powercheck)

Lightweight but powerful JavaScript type checking utility.

```
npm install powercheck --save
```

Usage
-----

```js
import check from 'powercheck';

check('foo', String);
    // -> true

check(new Date(), Date);
    // -> true

check(new SomeConstructor(), SomeConstructor);
    // -> true

check('foo', check.equals('bar'));
    // -> false

check(undefined, check.optional(String));
    // -> true

check('foo', check.validate((value) => {
    return ['foo', 'bar'].indexOf(value) > -1;
}));
    // -> true

check.throw('foo', Number);
    // -> throws an exception
```

### API

#### `check(value, validator)` or `check.throw(value, validator)`

`check()` **returns** a boolean and `check.throw()` **throws** an exception.

Key | Value
--- | ----
**value** | Anything you want to check
**validator** | `String`, `Number`, `Object`, `Array`, `Function`, `Symbol` (ES6), `<SomeConstructor>`, `check.optional(<validator>)`, `check.validate((value) => true)`, `check.equals(compareValue)`

### Questions

If you have questions, you can ask them on StackOverflow mentioning me [@jessedvrs](http://stackoverflow.com/users/2803759).



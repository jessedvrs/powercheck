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
import check, {equals, validate, optional, throw as checkThrow} from 'powercheck';

check('foo', String);
    // -> true

check(new Date(), Date);
    // -> true

check(new SomeConstructor(), SomeConstructor);
    // -> true

check('foo', equals('bar'));
    // -> false

check(undefined, optional(String));
    // -> true

check('foo', validate((value) => {
    return ['foo', 'bar'].indexOf(value) > -1;
}));
    // -> true

checkThrow('foo', Number);
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



powercheck
==========

[![npm version](https://badge.fury.io/js/powercheck.svg)](https://badge.fury.io/js/powercheck)

Straightforward, zero-dependencies and powerful utility to check types, instances or values. Takes away the dirt, lets you write more solid code and drastically improves code readability.

```
npm install powercheck --save
```

Usage
-----

#### Basic
```js
import check from 'powercheck';

check('foo', String);
    // -> true
```

#### Optional value
```js
check('foo', check.optional(String));
    // -> true

check('bar', check.optional(check.equals('bar')));
    // -> true
```

**Or:** import "optional" using ES6 modules

```js
import check, { optional } from 'powercheck';

check('foo', optional(String));
    // -> true
```

#### Instance checking
```js
check(new Date(), Date);
    // -> true

check(new SomeConstructor(), SomeConstructor);
    // -> true
```

#### Equality checking
```js
check('foo', check.equals('bar'));
    // -> false
```


#### Validation function
```js
check('foo', check.validate((value) => {
    return ['foo', 'bar'].indexOf(value) > -1;
}));
    // -> true
```

```js
import { isEmail } from 'validator';

check('foo@example.com', check.validate(isEmail));
    // -> true
```

### Array literal
```js
check(['foo', 'bar'], [String]);
    // -> true

check(['foo', 400], [String]);
    // -> false
```

**N.B.:** it's recursive

```js
check([['foo', 'test'], ['bar']], [[String]]);
    // -> true
```

### Object literal
```js
check({
    foo: 'bar'
}, {
    foo: String
});
    // -> true

check({
    foo: 'bar',
    baz: 'kopz'
}, {
    foo: String,
    baz: Number
});
    // -> false
```

**N.B.:** extra properies will be accepted

```
check({
    foo: 'bar',
    baz: 'kopz',
    extra: 'boo'
}, {
    foo: String,
    baz: String
});
    // -> true
```

**N.B.:** mising properies won't be accepted

```js
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


#### Throw exceptions instead
```js
import check, { optional } from 'powercheck/Throw';

check('foo', Number);
    // -> throws an exception

check('foo', Number, new Error('Failed'));
    // -> throws a custom error

check('foo', Number, (value, error) => {
    return new Error('Type ' + error.got + ' is invalid. Should be ' + error.expectedType + '.');
});
    // -> throws a custom error with extra information

check('foo', String);
    // -> undefined

check(undefined, optional(Number));
    // -> undefined
```

### API

#### `check(value, validator)`

`check()` **returns** a boolean and `check.Throw()` **throws** an exception.

Key | Value
--- | ----
**value** | Anything you want to check the type, instance and/or value for
**validator** | `String`, `Number`, `Object`, `Array`, `Function`, `Symbol` (ES6), `SomeConstructor`, `check.optional(<validator>)`, `check.validate((value) => trueOrFalse)`, `check.equals(compareValue)`, `[<validator>]`, `{key1: <validator>, ...}`

### Questions

If you have questions, you can ask them on StackOverflow mentioning me [@jessedvrs](http://stackoverflow.com/users/2803759).



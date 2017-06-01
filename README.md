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
import is, { Throw as check } from 'powercheck';

is('foo', String);
    // -> true

is('foo', Number);
    // -> false

check('foo', String);
    // -> undefined

check('foo', Number);
    // throws an exception
```

#### Optional value
```js
is('foo', is.optional(String));
    // -> true

is('bar', is.optional(is.equals('bar')));
    // -> true
```

**Or:** import "optional" using ES6 modules

```js
import is, { optional } from 'powercheck';

is('foo', optional(String));
    // -> true
```

#### Instance checking
```js
is(new Date(), Date);
    // -> true

is(new SomeConstructor(), SomeConstructor);
    // -> true
```

#### Equality checking
```js
is('foo', is.equals('bar'));
    // -> false
```

#### OneOf-checking
```js
is('foo', is.oneOf([Number, Boolean]));
    // -> false

is('foo', is.oneOf([is.equals(2), String]));
    // -> true

is('foo', is.oneOf([
    is.equals('foo'),
    is.equals('bar')
]));
    // -> true

is('foo', is.oneOf(['foo', 'bar'].map(is.equals)));
    // -> true
```

#### Every-checking

```js
is('foo', is.every([String, is.equals('foo')]));
    // -> true

is(123, is.every([Number, is.validate(n => n < 100)]));
    // -> false
```

**N.B.:** validations will be executed in order. When a validation fails, remaining validations won't be executed. So, in `is.validate()` functions (custom validations), you can rely on the previous validations.

#### Validation function
```js
is('foo', is.validate((value) => {
    return ['foo', 'bar'].indexOf(value) > -1;
}));
    // -> true
```

```js
import { isEmail } from 'validator';

is('foo@example.com', is.validate(isEmail));
    // -> true
```

### Array literal
```js
is(['foo', 'bar'], [String]);
    // -> true

is(['foo', 400], [String]);
    // -> false
```

**N.B.:** it's recursive

```js
is([['foo', 'test'], ['bar']], [[String]]);
    // -> true
```

### Object literal
```js
is({
    foo: 'bar'
}, {
    foo: String
});
    // -> true

is({
    foo: 'bar',
    baz: 'kopz'
}, {
    foo: String,
    baz: Number
});
    // -> false
```

**N.B.:** extra properies won't be accepted

```
is({
    foo: 'bar',
    baz: 'kopz',
    extra: 'boo'
}, {
    foo: String,
    baz: String
});
    // -> false
```

**N.B.:** mising properies won't be accepted

```js
is({
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
import is, { Throw as check } from 'powercheck';

is('foo', Number);
    // -> false (boolean)

check('foo', Number);
    // -> throws an exception

check('foo', Number, new Error('Failed'));
    // -> throws a custom error

check('foo', Number, (value, error) => {
    return new Error('Type ' + error.got + ' is invalid. Should be ' + error.expectedType + '.');
});
    // -> throws a custom error with extra information

check('foo', String);
    // -> undefined (no exception has been thrown, nothing is being returned either)

check(undefined, is.optional(Number));
    // -> undefined (no exception has been thrown, nothing is being returned either)
```

### API

#### `is(value, validator)`

`is()` **returns** a boolean and `check()` **throws** an exception.

Key | Value
--- | ----
**value** | Anything you want to check the type, instance and/or value for
**validator** | `String`, `Number`, `Object`, `Array`, `Function`, `Symbol` (ES6), `SomeConstructor`, `is.optional(<validator>)`, `is.validate((value) => trueOrFalse)`, `is.equals(compareValue)`, `is.oneOf([validators])`, `[<validator>]`, `{key1: <validator>, ...}`

### Questions

If you have questions, you can ask them on StackOverflow mentioning me [@jessedvrs](http://stackoverflow.com/users/2803759).



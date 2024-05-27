# kind

[![Version Badge][version-image]][project-url]
[![License][license-image]][license-url]
[![Build Status][build-image]][build-url]

> Type checking differently

## Install

Download the [CJS](https://github.com/ryanmorr/kind/raw/master/dist/cjs/kind.js), [ESM](https://github.com/ryanmorr/kind/raw/master/dist/esm/kind.js), [UMD](https://github.com/ryanmorr/kind/raw/master/dist/umd/kind.js) versions or install via NPM:

```sh
npm install @ryanmorr/kind
```

## Usage

Rather than relying on the common "is" functions such as `isArray`, `isString`, etc., kind uses type constants to create a versatile approach that supports type assertions, identification, and customization:

```javascript
import { kind, KIND_STRING, KIND_NULL, KIND_UNDEFINED } from '@ryanmorr/kind';

// Assert a type match
kind('foo', KIND_STRING); //=> true

// Assert at least one match from a group of types
kind(null, [KIND_NULL, KIND_UNDEFINED]); //=> true

// Identify a type
kind(123); //=> KIND_NUMBER
```

You can define a custom type via `def`, providing a function to detect that type (must return a boolean):

```javascript
import { def, kind, KIND_FUNCTION } from '@ryanmorr/kind';

const fn = async () => 1;

// Define a custom type for async functions
const KIND_ASYNC_FUNCTION = def((obj) => {}.toString.call(obj) == '[object AsyncFunction]');

// Will return true for the new type
kind(fn, KIND_ASYNC_FUNCTION); //=> true

// Will still return true for any other matching type
kind(fn, KIND_FUNCTION); //=> true

// When identifying an object type, custom types are always tested first
kind(fn); //=> KIND_ASYNC_FUNCTION
```

You can also define type groups by providing an array of sub-types:

```javascript
import { def, kind, KIND_STRING, KIND_NUMBER, KIND_BOOLEAN } from '@ryanmorr/kind';

// Define a custom group type
const KIND_PRIMITIVE = def([KIND_STRING, KIND_NUMBER, KIND_BOOLEAN]);

// Will return true if the object matches at least one of the sub-types
kind(123, KIND_PRIMITIVE); //=> true
kind('foo', KIND_PRIMITIVE); //=> true
kind(false, KIND_PRIMITIVE); //=> true

// Group types will never be identified as an object type
kind(789); //=> KIND_NUMBER
```

## Default Types

Kind comes with the following built-in default types:

- `KIND_NULL`
- `KIND_UNDEFINED`
- `KIND_STRING`
- `KIND_BOOLEAN`
- `KIND_NAN`
- `KIND_NUMBER`
- `KIND_SYMBOL`
- `KIND_PLAIN_OBJECT` 
- `KIND_OBJECT` 
- `KIND_ARRAY`
- `KIND_FUNCTION` 
- `KIND_SET`
- `KIND_WEAK_SET` 
- `KIND_MAP`
- `KIND_WEAK_MAP` 
- `KIND_ITERABLE` 
- `KIND_REGEXP` 
- `KIND_DATE` 
- `KIND_ERROR`
- `KIND_PROMISE` 
- `KIND_GLOBAL` 
- `KIND_UNKNOWN`

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

[project-url]: https://github.com/ryanmorr/kind
[version-image]: https://img.shields.io/github/package-json/v/ryanmorr/kind?color=blue&style=flat-square
[build-url]: https://github.com/ryanmorr/kind/actions
[build-image]: https://img.shields.io/github/actions/workflow/status/ryanmorr/kind/node.js.yml?style=flat-square
[license-image]: https://img.shields.io/github/license/ryanmorr/kind?color=blue&style=flat-square
[license-url]: UNLICENSE
import { expect } from 'chai';
import { 
    kind,
    KIND_NULL,
    KIND_UNDEFINED,
    KIND_STRING,
    KIND_BOOLEAN,
    KIND_NUMBER,
    KIND_NAN,
    KIND_SYMBOL,
    KIND_PLAIN_OBJECT,
    KIND_OBJECT,
    KIND_ARRAY,
    KIND_FUNCTION,
    KIND_REGEXP,
    KIND_DATE,
    KIND_ERROR,
    KIND_MAP,
    KIND_WEAK_MAP,
    KIND_SET,
    KIND_WEAK_SET,
    KIND_PROMISE,
    KIND_GLOBAL,
    KIND_ITERABLE
} from '../../src/kind.js';

describe('assert', () => {
    it('should assert null', () => {
        expect(kind(null, KIND_NULL)).to.equal(true);
    });

    it('should assert undefined', () => {
        expect(kind(undefined, KIND_UNDEFINED)).to.equal(true);
        expect(kind(void 0, KIND_UNDEFINED)).to.equal(true);
    });

    it('should assert strings', () => {
        expect(kind('foo', KIND_STRING)).to.equal(true);
        expect(kind(new String('foo'), KIND_STRING)).to.equal(true);
    });

    it('should assert booleans', () => {
        expect(kind(true, KIND_BOOLEAN)).to.equal(true);
        expect(kind(false, KIND_BOOLEAN)).to.equal(true);
        expect(kind(new Boolean(true), KIND_BOOLEAN)).to.equal(true);
        expect(kind(new Boolean(false), KIND_BOOLEAN)).to.equal(true);
    });

    it('should assert numbers', () => {
        expect(kind(123, KIND_NUMBER)).to.equal(true);
        expect(kind(1.2435, KIND_NUMBER)).to.equal(true);
        expect(kind(0x45, KIND_NUMBER)).to.equal(true);
        expect(kind(new Number(123), KIND_NUMBER)).to.equal(true);
        expect(kind(Infinity, KIND_NUMBER)).to.equal(true);
        expect(kind(Number.POSITIVE_INFINITY, KIND_NUMBER)).to.equal(true);
        expect(kind(Number.NEGATIVE_INFINITY, KIND_NUMBER)).to.equal(true);
    });

    it('should assert NaN', () => {
        expect(kind(NaN, KIND_NAN)).to.equal(true);
        expect(kind(Number.NaN, KIND_NAN)).to.equal(true);
        expect(kind(0 / 0, KIND_NAN)).to.equal(true);
    });

    it('should assert symbols', () => {
        expect(kind(Symbol(), KIND_SYMBOL)).to.equal(true);
        expect(kind(Symbol.for('foo'), KIND_SYMBOL)).to.equal(true);
        expect(kind(Symbol.iterator, KIND_SYMBOL)).to.equal(true);
        expect(kind(Symbol.asyncIterator, KIND_SYMBOL)).to.equal(true);
    });

    it('should assert plain objects', () => {
        expect(kind({}, KIND_PLAIN_OBJECT)).to.equal(true);
        expect(kind(new Object(), KIND_PLAIN_OBJECT)).to.equal(true);
        expect(kind(Object.create(null), KIND_PLAIN_OBJECT)).to.equal(true);
        expect(kind(Object.create(Object.prototype), KIND_PLAIN_OBJECT)).to.equal(true);
    });

    it('should assert objects', () => {
        expect(kind({}, KIND_OBJECT)).to.equal(true);
        expect(kind(new Object(), KIND_OBJECT)).to.equal(true);
        expect(kind(Object.create(null), KIND_OBJECT)).to.equal(true);
        expect(kind(Object.create(Object.prototype), KIND_OBJECT)).to.equal(true);
        expect(kind(new function(){}, KIND_OBJECT)).to.equal(true);
    });

    it('should assert arrays', () => {
        expect(kind([], KIND_ARRAY)).to.equal(true);
        expect(kind(new Array(), KIND_ARRAY)).to.equal(true);
    });

    it('should assert functions', () => {
        expect(kind(() => 1, KIND_FUNCTION)).to.equal(true);
        expect(kind(function() {}, KIND_FUNCTION)).to.equal(true);
        expect(kind(new Function(), KIND_FUNCTION)).to.equal(true);
        expect(kind(async () => 1, KIND_FUNCTION)).to.equal(true);
        expect(kind(async function() {}, KIND_FUNCTION)).to.equal(true);
        expect(kind(function* generator() {}, KIND_FUNCTION)).to.equal(true);
    });

    it('should assert regular expressions', () => {
        expect(kind(/foo/, KIND_REGEXP)).to.equal(true);
        expect(kind(new RegExp('foo'), KIND_REGEXP)).to.equal(true);
    });

    it('should assert dates', () => {
        expect(kind(new Date(), KIND_DATE)).to.equal(true);
    });

    it('should assert errors', () => {
        expect(kind(new Error(), KIND_ERROR)).to.equal(true);
        expect(kind(new TypeError(), KIND_ERROR)).to.equal(true);
        expect(kind(new RangeError(), KIND_ERROR)).to.equal(true);
        expect(kind(new ReferenceError(), KIND_ERROR)).to.equal(true);
        expect(kind(new EvalError(), KIND_ERROR)).to.equal(true);
        expect(kind(new SyntaxError(), KIND_ERROR)).to.equal(true);
        expect(kind(new URIError(), KIND_ERROR)).to.equal(true);
    });

    it('should assert maps', () => {
        expect(kind(new Map(), KIND_MAP)).to.equal(true);
    });

    it('should assert weak maps', () => {
        expect(kind(new WeakMap(), KIND_WEAK_MAP)).to.equal(true);
    });

    it('should assert sets', () => {
        expect(kind(new Set(), KIND_SET)).to.equal(true);
    });

    it('should assert weak sets', () => {
        expect(kind(new WeakSet(), KIND_WEAK_SET)).to.equal(true);
    });

    it('should assert iterables', () => {
        expect(kind([], KIND_ITERABLE)).to.equal(true);
        expect(kind(new Array(), KIND_ITERABLE)).to.equal(true);
        expect(kind(new Map(), KIND_ITERABLE)).to.equal(true);
        expect(kind(new Set(), KIND_ITERABLE)).to.equal(true);
        expect(kind('foo', KIND_ITERABLE)).to.equal(true);
        expect(kind(new String('bar'), KIND_ITERABLE)).to.equal(true);

        function* generator() {
            yield 1;
        }

        expect(kind(generator(), KIND_ITERABLE)).to.equal(true);

        const iterable = Object.create(null, {
            [Symbol.iterator]: {}
        });

        expect(kind(iterable, KIND_ITERABLE)).to.equal(true);
    });

    it('should assert promises', () => {
        expect(kind(Promise.resolve(), KIND_PROMISE)).to.equal(true);
    });

    it('should assert the global object', () => {
        expect(kind(global, KIND_GLOBAL)).to.equal(true);
        expect(kind(global.global, KIND_GLOBAL)).to.equal(true);
        expect(kind(globalThis, KIND_GLOBAL)).to.equal(true);
        expect(kind(globalThis.globalThis, KIND_GLOBAL)).to.equal(true);
    });
    
    it('should assert an array of types', () => {
        const types = [
            KIND_STRING, 
            KIND_NUMBER,
            KIND_BOOLEAN
        ];

        expect(kind('foo', types)).to.equal(true);
        expect(kind(123, types)).to.equal(true);
        expect(kind(true, types)).to.equal(true);

        expect(kind(null, types)).to.equal(false);
        expect(kind([], types)).to.equal(false);
        expect(kind({}, types)).to.equal(false);
    });
});

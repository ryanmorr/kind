import { expect } from 'chai';
import sinon from 'sinon';
import { 
    kind,
    KIND_NULL,
    KIND_UNDEFINED,
    KIND_STRING,
    KIND_BOOLEAN,
    KIND_NUMBER,
    KIND_NAN,
    KIND_SYMBOL,
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
    KIND_GLOBAL
} from '../../src/kind.js';

describe('identify', () => {
    it('should identify null', () => {
        expect(kind(null)).to.equal(KIND_NULL);
    });

    it('should identify undefined', () => {
        expect(kind(undefined)).to.equal(KIND_UNDEFINED);
        expect(kind(void 0)).to.equal(KIND_UNDEFINED);
    });

    it('should identify strings', () => {
        expect(kind('foo')).to.equal(KIND_STRING);
        expect(kind(new String('foo'))).to.equal(KIND_STRING);
    });

    it('should identify booleans', () => {
        expect(kind(true)).to.equal(KIND_BOOLEAN);
        expect(kind(false)).to.equal(KIND_BOOLEAN);
        expect(kind(new Boolean(true))).to.equal(KIND_BOOLEAN);
        expect(kind(new Boolean(false))).to.equal(KIND_BOOLEAN);
    });

    it('should identify numbers', () => {
        expect(kind(123)).to.equal(KIND_NUMBER);
        expect(kind(1.2435)).to.equal(KIND_NUMBER);
        expect(kind(0x45)).to.equal(KIND_NUMBER);
        expect(kind(new Number(123))).to.equal(KIND_NUMBER);
        expect(kind(Infinity)).to.equal(KIND_NUMBER);
        expect(kind(Number.POSITIVE_INFINITY)).to.equal(KIND_NUMBER);
        expect(kind(Number.NEGATIVE_INFINITY)).to.equal(KIND_NUMBER);
    });

    it('should identify NaN', () => {
        expect(kind(NaN)).to.equal(KIND_NAN);
        expect(kind(Number.NaN)).to.equal(KIND_NAN);
        expect(kind(0 / 0)).to.equal(KIND_NAN);
    });

    it('should identify symbols', () => {
        expect(kind(Symbol())).to.equal(KIND_SYMBOL);
        expect(kind(Symbol.for('foo'))).to.equal(KIND_SYMBOL);
        expect(kind(Symbol.iterator)).to.equal(KIND_SYMBOL);
        expect(kind(Symbol.asyncIterator,)).to.equal(KIND_SYMBOL);
    });

    it('should identify objects', () => {
        expect(kind({})).to.equal(KIND_OBJECT);
        expect(kind(new Object(),)).to.equal(KIND_OBJECT);
        expect(kind(Object.create(null))).to.equal(KIND_OBJECT);
        expect(kind(Object.create(Object.prototype))).to.equal(KIND_OBJECT);
        expect(kind(new function(){})).to.equal(KIND_OBJECT);
    });

    it('should identify arrays', () => {
        expect(kind([])).to.equal(KIND_ARRAY);
        expect(kind(new Array())).to.equal(KIND_ARRAY);
    });

    it('should identify functions', () => {
        expect(kind(() => 1)).to.equal(KIND_FUNCTION);
        expect(kind(function() {})).to.equal(KIND_FUNCTION);
        expect(kind(new Function())).to.equal(KIND_FUNCTION);
        expect(kind(async () => 1)).to.equal(KIND_FUNCTION);
        expect(kind(async function() {})).to.equal(KIND_FUNCTION);
        expect(kind(function* generator() {})).to.equal(KIND_FUNCTION);
    });

    it('should identify regular expressions', () => {
        expect(kind(/foo/)).to.equal(KIND_REGEXP);
        expect(kind(new RegExp('foo'))).to.equal(KIND_REGEXP);
    });

    it('should identify dates', () => {
        expect(kind(new Date())).to.equal(KIND_DATE);
    });

    it('should identify errors', () => {
        expect(kind(new Error())).to.equal(KIND_ERROR);
        expect(kind(new TypeError())).to.equal(KIND_ERROR);
        expect(kind(new RangeError())).to.equal(KIND_ERROR);
        expect(kind(new ReferenceError())).to.equal(KIND_ERROR);
        expect(kind(new EvalError())).to.equal(KIND_ERROR);
        expect(kind(new SyntaxError(),)).to.equal(KIND_ERROR);
        expect(kind(new URIError())).to.equal(KIND_ERROR);
    });

    it('should identify maps', () => {
        expect(kind(new Map())).to.equal(KIND_MAP);
    });

    it('should identify weak maps', () => {
        expect(kind(new WeakMap())).to.equal(KIND_WEAK_MAP);
    });

    it('should identify sets', () => {
        expect(kind(new Set())).to.equal(KIND_SET);
    });

    it('should identify weak sets', () => {
        expect(kind(new WeakSet())).to.equal(KIND_WEAK_SET);
    });

    it('should identify promises', () => {
        expect(kind(Promise.resolve())).to.equal(KIND_PROMISE);
    });

    it('should identify the global object', () => {
        expect(kind(global)).to.equal(KIND_GLOBAL);
        expect(kind(global.global)).to.equal(KIND_GLOBAL);
        expect(kind(globalThis)).to.equal(KIND_GLOBAL);
        expect(kind(globalThis.globalThis)).to.equal(KIND_GLOBAL);
    });
});

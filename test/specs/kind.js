import { expect } from 'chai';
import sinon from 'sinon';
import { kind, KIND_STRING, KIND_NUMBER, KIND_BOOLEAN, KIND_ARRAY, KIND_FUNCTION } from '../../src/kind.js';

describe('kind', () => {
    it('should detect a string', () => {
        expect(kind('foo', KIND_STRING)).to.equal(true);
        expect(kind(new String('foo'), KIND_STRING)).to.equal(true);
    });

    it('should detect a number', () => {
        expect(kind(123, KIND_NUMBER)).to.equal(true);
        expect(kind(new Number(123), KIND_NUMBER)).to.equal(true);
        expect(kind(1.2435, KIND_NUMBER)).to.equal(true);
    });

    it('should detect a boolean', () => {
        expect(kind(true, KIND_BOOLEAN)).to.equal(true);
        expect(kind(false, KIND_BOOLEAN)).to.equal(true);
        expect(kind(new Boolean(true), KIND_BOOLEAN)).to.equal(true);
        expect(kind(new Boolean(false), KIND_BOOLEAN)).to.equal(true);
    });

    it('should detect an array', () => {
        expect(kind([], KIND_ARRAY)).to.equal(true);
        expect(kind(new Array(), KIND_ARRAY)).to.equal(true);
    });

    it('should detect a function', () => {
        expect(kind(() => 1, KIND_FUNCTION)).to.equal(true);
        expect(kind(function() {}, KIND_FUNCTION)).to.equal(true);
        expect(kind(new Function(), KIND_FUNCTION)).to.equal(true);
        expect(kind(async () => 1, KIND_FUNCTION)).to.equal(true);
        expect(kind(async function() {}, KIND_FUNCTION)).to.equal(true);
        expect(kind(function* generator() {}, KIND_FUNCTION)).to.equal(true);
    });
});

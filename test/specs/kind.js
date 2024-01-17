import { expect } from 'chai';
import sinon from 'sinon';
import { kind, KIND_STRING, KIND_NUMBER, KIND_BOOLEAN, KIND_ARRAY, KIND_FUNCTION} from '../../src/kind.js';

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
});

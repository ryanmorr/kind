import { expect } from 'chai';
import sinon from 'sinon';
import { def, kind } from '../../src/kind.js';

describe('def', () => {
    it('should support custom types', () => {
        const KIND_FOO = def((obj) => obj != null && typeof obj === 'object' && 'foo' in obj);

        expect(kind({}, KIND_FOO)).to.equal(false);
        expect(kind({foo: 1}, KIND_FOO)).to.equal(true);
        expect(kind({foo: 2})).to.equal(KIND_FOO);
    });

    it('should test custom types in the order they are defined', () => {
        const KIND_BAR = def((obj) => obj != null && typeof obj === 'object' && 'bar' in obj);

        expect(kind({}, KIND_BAR)).to.equal(false);
        expect(kind({foo: 1}, KIND_BAR)).to.equal(false);
        expect(kind({foo: 1, bar: 2}, KIND_BAR)).to.equal(true);
        expect(kind({bar: 2}, KIND_BAR)).to.equal(true);
        expect(kind({foo: 1, bar: 2})).to.not.equal(KIND_BAR);
        expect(kind({bar: 2})).to.equal(KIND_BAR);
    });
});

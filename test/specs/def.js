import { expect } from 'chai';
import sinon from 'sinon';
import { def, kind, KIND_BOOLEAN, KIND_NUMBER, KIND_STRING, KIND_ARRAY } from '../../src/kind.js';

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

    it('should support custom group types composed of default types', () => {
        const KIND_PRIMITIVE = def([KIND_STRING, KIND_BOOLEAN, KIND_NUMBER]);

        expect(kind('', KIND_PRIMITIVE)).to.equal(true);
        expect(kind(123, KIND_PRIMITIVE)).to.equal(true);
        expect(kind(true, KIND_PRIMITIVE)).to.equal(true);

        expect(kind(null, KIND_PRIMITIVE)).to.equal(false);
        expect(kind(Symbol(), KIND_PRIMITIVE)).to.equal(false);
    });

    it('should support custom groups types composed of custom types', () => {
        const KIND_10 = def((obj) => obj === 10);
        const KIND_20 = def((obj) => obj === 20);
        const KIND_10_OR_20 = def([KIND_10, KIND_20]);

        expect(kind(10, KIND_10_OR_20)).to.equal(true);
        expect(kind(20, KIND_10_OR_20)).to.equal(true);

        expect(kind(30, KIND_10_OR_20)).to.equal(false);
    });

    it('should support custom groups types composed of group types', () => {
        const KIND_A = def((obj) => obj === 'a');
        const KIND_B = def((obj) => obj === 'b');
        const KIND_A_B = def([KIND_A, KIND_B]);

        const KIND_C = def((obj) => obj === 'c');
        const KIND_D = def((obj) => obj === 'd');
        const KIND_C_D = def([KIND_C, KIND_D]);

        const KIND_A_B_C_D  = def([KIND_A_B, KIND_C_D]);

        expect(kind('a', KIND_A_B_C_D)).to.equal(true);
        expect(kind('b', KIND_A_B_C_D)).to.equal(true);
        expect(kind('c', KIND_A_B_C_D)).to.equal(true);
        expect(kind('d', KIND_A_B_C_D)).to.equal(true);

        expect(kind('aa', KIND_A_B_C_D)).to.equal(false);
        expect(kind('bb', KIND_A_B_C_D)).to.equal(false);
        expect(kind('cc', KIND_A_B_C_D)).to.equal(false);
        expect(kind('dd', KIND_A_B_C_D)).to.equal(false);
    });

    it('should support custom groups types composed of a mix of default, custom, and group types', () => {
        const KIND_ABC = def((obj) => obj === 'abc');
        const KIND_XYZ = def((obj) => obj === 'xyz');
        const KIND_ABC_XYZ = def([KIND_ABC, KIND_XYZ]);

        const KIND_789 = def((obj) => obj === 789);

        const KIND_MIX = def([KIND_ABC_XYZ, KIND_789, KIND_ARRAY]);

        expect(kind('abc', KIND_MIX)).to.equal(true);
        expect(kind('xyz', KIND_MIX)).to.equal(true);
        expect(kind(789, KIND_MIX)).to.equal(true);
        expect(kind([], KIND_MIX)).to.equal(true);

        expect(kind('ab', KIND_MIX)).to.equal(false);
        expect(kind('xy', KIND_MIX)).to.equal(false);
        expect(kind(78, KIND_MIX)).to.equal(false);
        expect(kind({}, KIND_MIX)).to.equal(false);
    });
});

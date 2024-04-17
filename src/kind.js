const types = new Map();

function getClass(obj) {
    return {}.toString.call(obj).slice(8, -1).toLowerCase();
}

export function kind(obj, type) {
    const check = types.get(type);
    return check(obj);
}

export function def(check) {
    const type = Symbol();
    types.set(type, check);
    return type;
}

export const KIND_NULL = def((obj) => obj === null);
export const KIND_UNDEFINED = def((obj) => obj === undefined);
export const KIND_STRING = def((obj) => getClass(obj) === 'string');
export const KIND_BOOLEAN = def((obj) => getClass(obj) === 'boolean');
export const KIND_NUMBER = def((obj) => getClass(obj) === 'number');
export const KIND_NAN = def((obj) => Number.isNaN(obj));
export const KIND_SYMBOL = def((obj) => getClass(obj) === 'symbol');
export const KIND_OBJECT = def((obj) => getClass(obj) === 'object');
export const KIND_ARRAY = def(Array.isArray);
export const KIND_FUNCTION = def((obj) => typeof obj === 'function');
export const KIND_REGEXP = def((obj) => getClass(obj) === 'regexp');
export const KIND_DATE = def((obj) => getClass(obj) === 'date');
export const KIND_ERROR = def((obj) => getClass(obj) === 'error');
export const KIND_PROMISE = def((obj) => getClass(obj) === 'promise');
export const KIND_SET = def((obj) => getClass(obj) === 'set');
export const KIND_WEAK_SET = def((obj) => getClass(obj) === 'weakset');
export const KIND_MAP = def((obj) => getClass(obj) === 'map');
export const KIND_WEAK_MAP = def((obj) => getClass(obj) === 'weakmap');
export const KIND_GLOBAL = def((obj) => obj === globalThis);

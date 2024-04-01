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

export const KIND_STRING = def((obj) => getClass(obj) === 'string');
export const KIND_NUMBER = def((obj) => getClass(obj) === 'number');
export const KIND_BOOLEAN = def((obj) => getClass(obj) === 'boolean');
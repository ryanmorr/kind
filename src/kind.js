const types = new Map();

function getClass(obj) {
    return {}.toString.call(obj).slice(8, -1).toLowerCase();
}

export function kind(obj, type) {
    const check = types.get(type);
    return check(obj);
}

export function def(name, check) {
    const type = Symbol.for(name);
    types.set(type, check);
    return type;
}

export const KIND_STRING = def('string', (obj) => getClass(obj) === 'string');
export const KIND_NUMBER = def('number', (obj) => getClass(obj) === 'number');
export const KIND_BOOLEAN = def('boolean', (obj) => getClass(obj) === 'boolean');
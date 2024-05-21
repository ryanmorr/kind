const types = new Map();

function getClass(obj) {
    return {}.toString.call(obj).slice(8, -1).toLowerCase();
}

function getClassChecker(cls) {
    return (obj) => getClass(obj) == cls;
}

export function kind(obj, type) {
    if (type !== undefined) {
        const check = types.get(type);
        return check(obj);
    }
    for (const [type, check] of types) {
        if (check(obj)) {
            return type;
        }
    }
}

export function def(check) {
    const type = Symbol();
    types.set(type, check);
    return type;
}

export const KIND_NULL = def((obj) => obj === null);
export const KIND_UNDEFINED = def((obj) => obj === undefined);
export const KIND_STRING = def(getClassChecker('string'));
export const KIND_BOOLEAN = def(getClassChecker('boolean'));
export const KIND_NAN = def(Number.isNaN);
export const KIND_NUMBER = def(getClassChecker('number'));
export const KIND_SYMBOL = def(getClassChecker('symbol'));
export const KIND_OBJECT = def(getClassChecker('object'));
export const KIND_ARRAY = def(Array.isArray);
export const KIND_FUNCTION = def((obj) => typeof obj === 'function');
export const KIND_SET = def(getClassChecker('set'));
export const KIND_WEAK_SET = def(getClassChecker('weakset'));
export const KIND_MAP = def(getClassChecker('map'));
export const KIND_WEAK_MAP = def(getClassChecker('weakmap'));
export const KIND_ITERABLE = def((obj) => Symbol.iterator in obj);
export const KIND_REGEXP = def(getClassChecker('regexp'));
export const KIND_DATE = def(getClassChecker('date'));
export const KIND_ERROR = def(getClassChecker('error'));
export const KIND_PROMISE = def(getClassChecker('promise'));
export const KIND_GLOBAL = def((obj) => obj === globalThis);

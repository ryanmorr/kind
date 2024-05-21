const defaultTypes = new Map();
const customTypes = new Map();

function getClass(obj) {
    return {}.toString.call(obj).slice(8, -1).toLowerCase();
}

function getClassChecker(cls) {
    return (obj) => getClass(obj) == cls;
}

function defaultType(check) {
    const type = Symbol();
    defaultTypes.set(type, check);
    return type;
}

export function kind(obj, type) {
    if (type !== undefined) {
        let check = customTypes.get(type);
        if (check) {
            return check(obj);
        }
        check = defaultTypes.get(type);
        if (check) {
            return check(obj);
        }
        return false;
    }
    for (const [type, check] of customTypes) {
        if (check(obj)) {
            return type;
        }
    }
    for (const [type, check] of defaultTypes) {
        if (check(obj)) {
            return type;
        }
    }
    return KIND_UNKNOWN;
}

export function def(check) {
    const type = Symbol();
    customTypes.set(type, check);
    return type;
}

export const KIND_NULL = defaultType((obj) => obj === null);
export const KIND_UNDEFINED = defaultType((obj) => obj === undefined);
export const KIND_STRING = defaultType(getClassChecker('string'));
export const KIND_BOOLEAN = defaultType(getClassChecker('boolean'));
export const KIND_NAN = defaultType(Number.isNaN);
export const KIND_NUMBER = defaultType(getClassChecker('number'));
export const KIND_SYMBOL = defaultType(getClassChecker('symbol'));
export const KIND_OBJECT = defaultType(getClassChecker('object'));
export const KIND_ARRAY = defaultType(Array.isArray);
export const KIND_FUNCTION = defaultType((obj) => typeof obj === 'function');
export const KIND_SET = defaultType(getClassChecker('set'));
export const KIND_WEAK_SET = defaultType(getClassChecker('weakset'));
export const KIND_MAP = defaultType(getClassChecker('map'));
export const KIND_WEAK_MAP = defaultType(getClassChecker('weakmap'));
export const KIND_ITERABLE = defaultType((obj) => Symbol.iterator in obj);
export const KIND_REGEXP = defaultType(getClassChecker('regexp'));
export const KIND_DATE = defaultType(getClassChecker('date'));
export const KIND_ERROR = defaultType(getClassChecker('error'));
export const KIND_PROMISE = defaultType(getClassChecker('promise'));
export const KIND_GLOBAL = defaultType((obj) => obj === globalThis);
export const KIND_UNKNOWN = Symbol();

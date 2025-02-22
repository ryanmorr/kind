const defaultTypes = new Map();
const customTypes = new Map();
const groupTypes = new Map();

function getClass(obj) {
    return {}.toString.call(obj).slice(8, -1).toLowerCase();
}

function isPlainObject(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }
    const prototype = Object.getPrototypeOf(obj);
    return prototype === null || prototype === Object.getPrototypeOf({});
}

function getClassChecker(cls) {
    return (obj) => getClass(obj) == cls;
}

function getGroupTypeChecker(groupType) {
    return (obj) => some(obj, groupType);
}

function some(obj, types) {
    return types.some((type) => kind(obj, type));
}

function defaultType(check) {
    const type = Symbol();
    defaultTypes.set(type, check);
    return type;
}

function assertType(obj, type, types) {
    const check = types.get(type);
    return check ? check(obj) : false;
}

function identifyType(obj, types) {
    for (const [type, check] of types) {
        if (check(obj)) {
            return type;
        }
    }
    return null;
}

export function kind(obj, type) {
    if (type !== undefined) {
        if (Array.isArray(type)) {
            return some(obj, type);
        }
        return assertType(obj, type, customTypes) || 
            assertType(obj, type, defaultTypes) || 
            assertType(obj, type, groupTypes);
    }
    return identifyType(obj, customTypes) || 
        identifyType(obj, defaultTypes) || 
        KIND_UNKNOWN;
}

export function def(check) {
    const type = Symbol();
    if (Array.isArray(check)) {
        groupTypes.set(type, getGroupTypeChecker(check));
    } else {
        customTypes.set(type, check);
    }
    return type;
}

export const KIND_NULL = defaultType((obj) => obj === null);
export const KIND_UNDEFINED = defaultType((obj) => obj === undefined);
export const KIND_STRING = defaultType(getClassChecker('string'));
export const KIND_BOOLEAN = defaultType(getClassChecker('boolean'));
export const KIND_NAN = defaultType(Number.isNaN);
export const KIND_NUMBER = defaultType(getClassChecker('number'));
export const KIND_SYMBOL = defaultType(getClassChecker('symbol'));
export const KIND_PLAIN_OBJECT = defaultType(isPlainObject);
export const KIND_OBJECT = defaultType(getClassChecker('object'));
export const KIND_ARRAY = defaultType(Array.isArray);
export const KIND_FUNCTION = defaultType((obj) => typeof obj === 'function');
export const KIND_SET = defaultType(getClassChecker('set'));
export const KIND_WEAK_SET = defaultType(getClassChecker('weakset'));
export const KIND_MAP = defaultType(getClassChecker('map'));
export const KIND_WEAK_MAP = defaultType(getClassChecker('weakmap'));
export const KIND_ITERABLE = defaultType((obj) => Symbol.iterator in Object(obj));
export const KIND_REGEXP = defaultType(getClassChecker('regexp'));
export const KIND_DATE = defaultType(getClassChecker('date'));
export const KIND_ERROR = defaultType(getClassChecker('error'));
export const KIND_PROMISE = defaultType(getClassChecker('promise'));
export const KIND_GLOBAL = defaultType((obj) => obj === globalThis);
export const KIND_UNKNOWN = Symbol();

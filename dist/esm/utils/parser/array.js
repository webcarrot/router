import { make } from "./make";
import { ERR_NO_VALUE, ERR_INVALID_VALUE } from "./constants";
export const handleArray = (payload, required, nullable, _, defaultValue, type) => {
    if (nullable && payload === null) {
        return null;
    }
    if (payload === undefined) {
        if (required) {
            throw new Error(ERR_NO_VALUE);
        }
        else {
            return defaultValue;
        }
    }
    if (payload instanceof Array) {
        return payload.map(v => type(v));
    }
    else {
        throw new Error(ERR_INVALID_VALUE);
    }
};
export const makeArray = (type) => (payload, required, nullable, convert, defaultValue) => handleArray(payload, required, nullable, convert, defaultValue, type);
export const array = (type) => make(makeArray(type));
//# sourceMappingURL=array.js.map
import { make } from "./make";
import { ERR_NO_VALUE, ERR_INVALID_VALUE } from "./constants";
export const isPlainObject = (e) => e !== null && typeof e === "object" && e.constructor === Object;
export const handleShape = (payload, required, nullable, _, defaultValue, data) => {
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
    if (!isPlainObject(payload)) {
        throw new Error(ERR_INVALID_VALUE);
    }
    const out = {};
    for (let i in data) {
        const v = data[i](payload[i]);
        if (v !== undefined) {
            out[i] = v;
        }
    }
    return out;
};
export const makeShape = (data) => (payload, required, nullable, convert, defaultValue) => handleShape(payload, required, nullable, convert, defaultValue, data);
export const shape = (data) => make(makeShape(data));
//# sourceMappingURL=shape.js.map
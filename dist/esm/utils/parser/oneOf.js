import { make } from "./make";
import { ERR_NO_VALUE, ERR_INVALID_VALUE } from "./constants";
export const handleOnOf = (payload, required, nullable, defaultValue, types) => {
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
    for (let i in types) {
        try {
            return types[i](payload);
        }
        catch (_) { }
    }
    throw new Error(ERR_INVALID_VALUE);
};
export const makeOnOf = (types) => (payload, required, nullable, defaultValue) => handleOnOf(payload, required, nullable, defaultValue, types);
export const oneOf = (types) => make(makeOnOf(types));
//# sourceMappingURL=oneOf.js.map
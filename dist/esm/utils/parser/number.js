import { make } from "./make";
import { ERR_INVALID_VALUE, ERR_NO_VALUE } from "./constants";
export const handleNumber = (payload, required, nullable, convert, defaultValue) => {
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
    if (typeof payload === "number") {
        return payload;
    }
    else if (convert &&
        typeof payload === "string" &&
        /^-?\d+(\.\d+)?$/.test(payload)) {
        return parseFloat(payload);
    }
    else {
        throw new Error(ERR_INVALID_VALUE);
    }
};
export const number = () => make(handleNumber);
//# sourceMappingURL=number.js.map
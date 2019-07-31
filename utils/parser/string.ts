import { ParserFunction } from "./types";
import { make } from "./make";
import { ERR_NO_VALUE, ERR_INVALID_VALUE } from "./constants";

export const handleString: ParserFunction<string> = (
  payload,
  required,
  nullable,
  convert,
  defaultValue
) => {
  if (nullable && payload === null) {
    return null;
  }
  if (payload === undefined) {
    if (required) {
      throw new Error(ERR_NO_VALUE);
    } else {
      return defaultValue;
    }
  }
  if (!convert && typeof payload !== "string") {
    throw new Error(ERR_INVALID_VALUE);
  }
  return (payload || "").toString();
};

export const string = () => make(handleString);

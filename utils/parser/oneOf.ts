import { ParserFunction, MakeParserOut } from "./types";
import { make } from "./make";
import { ERR_NO_VALUE, ERR_INVALID_VALUE } from "./constants";

export const handleOnOf = <T extends MakeParserOut<any>>(
  payload: any,
  required: boolean,
  nullable: boolean,
  defaultValue: ReturnType<T>,
  types: T[]
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
  for (let i in types) {
    try {
      return types[i](payload);
    } catch (_) {}
  }
  throw new Error(ERR_INVALID_VALUE);
};

export const makeOnOf = <T extends MakeParserOut<any>>(
  types: T[]
): ParserFunction<ReturnType<T>> => (
  payload: any,
  required: boolean,
  nullable: boolean,
  defaultValue: ReturnType<T>
) => handleOnOf(payload, required, nullable, defaultValue, types);

export const oneOf = <T extends MakeParserOut<any>>(
  types: T[]
): MakeParserOut<ParserFunction<ReturnType<T>>> => make(makeOnOf(types));

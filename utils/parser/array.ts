import { ParserFunction, MakeParserOut } from "./types";
import { make } from "./make";
import { ERR_NO_VALUE, ERR_INVALID_VALUE } from "./constants";

export const handleArray = <T extends MakeParserOut<any>>(
  payload: any,
  required: boolean,
  nullable: boolean,
  _: boolean,
  defaultValue: Array<ReturnType<T>>,
  type: T
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
  if (payload instanceof Array) {
    return payload.map(v => type(v));
  } else {
    throw new Error(ERR_INVALID_VALUE);
  }
};

export const makeArray = <T extends MakeParserOut<any>>(
  type: T
): ParserFunction<Array<ReturnType<T>>> => (
  payload: any,
  required: boolean,
  nullable: boolean,
  convert: boolean,
  defaultValue: Array<ReturnType<T>>
) => handleArray(payload, required, nullable, convert, defaultValue, type);

export const array = <T extends MakeParserOut<any>>(type: T) =>
  make(makeArray(type));

import { ParserFunction, MakeParserOut } from "./types";
import { make } from "./make";
import { ERR_NO_VALUE, ERR_INVALID_VALUE } from "./constants";

export const isPlainObject = (e: any): boolean =>
  e !== null && typeof e === "object" && e.constructor === Object;

export const handleShape = <
  T extends MakeParserOut<any>,
  S extends { [key: string]: T }
>(
  payload: any,
  required: boolean,
  nullable: boolean,
  _: boolean,
  defaultValue: ReturnType<T>,
  data: S
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
  if (!isPlainObject(payload)) {
    throw new Error(ERR_INVALID_VALUE);
  }
  const out = {} as ShapeReturnType<typeof data>;
  for (let i in data) {
    const v = data[i](payload[i]);
    if (v !== undefined) {
      out[i] = v;
    }
  }
  return out;
};

type ShapeReturnType<S extends { [key: string]: MakeParserOut<any> }> = {
  [K in keyof S]: ReturnType<S[K]>
};

export const makeShape = <
  T extends MakeParserOut<any>,
  S extends { [key: string]: T }
>(
  data: S
): ParserFunction<ShapeReturnType<typeof data>> => (
  payload: any,
  required: boolean,
  nullable: boolean,
  convert: boolean,
  defaultValue: ShapeReturnType<typeof data>
) => handleShape(payload, required, nullable, convert, defaultValue, data);

export const shape = <
  T extends MakeParserOut<any>,
  S extends { [key: string]: T }
>(
  data: S
) => make(makeShape(data));

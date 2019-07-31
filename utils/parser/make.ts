import { ParserFunction, MakeParserOut } from "./types";

export const make = <PF extends ParserFunction<any>>(
  fn: PF
): MakeParserOut<typeof fn> => {
  let required: boolean = false;
  let nullable: boolean = false;
  let convert: boolean = false;
  let defaultValue: any;
  const handler = ((payload: any) =>
    fn(payload, required, nullable, convert, defaultValue)) as MakeParserOut<
    typeof fn
  >;
  Object.defineProperties(handler, {
    r: {
      get() {
        required = true;
        return handler;
      }
    },
    n: {
      get() {
        nullable = true;
        return handler;
      }
    },
    c: {
      get() {
        convert = true;
        return handler;
      }
    },
    d: {
      value: (defaultValue?: any) => {
        defaultValue = defaultValue;
        return handler;
      }
    }
  });
  return handler;
};

export type ParserFunction<T> = (
  payload: any,
  required: boolean,
  nullable: boolean,
  convert: boolean,
  defaultValue: T
) => T;

export type MakeParserOut<Fn extends ParserFunction<any>> = {
  (payload: any): ReturnType<Fn>;
  /** Make it optional */
  o: MakeParserOut<ParserFunction<ReturnType<Fn> | void>>;
  /** Make it nullable */
  n: MakeParserOut<ParserFunction<ReturnType<Fn> | void>>;
  /** Enable conversion */
  c: MakeParserOut<Fn>;
  /** Set default value */
  d: (v?: ReturnType<Fn>) => MakeParserOut<Fn>;
};

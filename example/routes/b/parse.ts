import {
  shape,
  eq,
  string,
  oneOf,
  MakeParserOut
} from "@webcarrot/router/utils/parser";
import { Match } from "./types";

const matchBase = <
  M extends string,
  T extends MakeParserOut<any>,
  S extends { [key: string]: T }
>(
  method: M,
  additional: S = {} as S
) =>
  shape({
    method: eq(method).d(method),
    params: shape({ bb: string() }),
    query: shape({ id: string() }),
    ...additional
  });

export const parse = oneOf([
  matchBase("GET"),
  matchBase("POST", {
    body: shape({
      jasio: string()
    })
  })
]);

const b: Match = parse({
  method: "GET"
});

if (b.method === "GET") {
  if (b.params.bb) {
    b.params.bb;
  }
} else if (b.method === "POST") {
  b.body.jasio;
}

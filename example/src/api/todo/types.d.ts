import { ApiResolver, ActionFunction } from "@webcarrot/api";
import { actions } from "./actions";

export type TodoApiActions = {
  foo: (p: { x: string }) => Promise<string>;
};

export type TodoApiContextValue = ApiResolver<TodoApiActions>;

export type TodoApiContext = void;

export type TodoActionFunction<P, O> = ActionFunction<P, O, TodoApiContext>;

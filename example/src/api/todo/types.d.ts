import { ApiResolver, ActionFunction } from "@webcarrot/api";
import { actions } from "./actions";

export type TodoApiActions = {};

export type TodoApiContextValue = ApiResolver<TodoApiActions>;

export type TodoApiContext = void;

export type TodoActionFunction<P, O> = ActionFunction<P, O, TodoApiContext>;

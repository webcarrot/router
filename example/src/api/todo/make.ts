import { TodoApiActions, TodoApiContext, TodoApiContextValue } from "./types";
import { makeApi } from "@webcarrot/api/node";
import { actions } from "./actions";

export const make = async (): Promise<TodoApiContextValue> =>
  makeApi<TodoApiActions, TodoApiContext>({
    actions,
    context: undefined
  });

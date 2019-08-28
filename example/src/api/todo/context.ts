import { makeContext } from "@webcarrot/api/context";
import { TodoApiActions } from "./types";

export const ReactTodoApiContext = makeContext<TodoApiActions>();

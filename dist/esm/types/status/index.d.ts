import { ClientError } from "./ClientError";
import { Informational } from "./Informational";
import { Redirection } from "./Redirection";
import { ServerError } from "./ServerError";
import { Success } from "./Success";

export type Status =
  | number
  | Informational
  | Success
  | Redirection
  | ClientError
  | ServerError;

export { ClientError, Informational, Redirection, ServerError, Success };

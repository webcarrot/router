import { Action } from "./types";

export const action: Action = async (payload, match, context) => {
  return {
    url: payload.url,
    status: 200,
    titleB:
      `${match.params && match.params.bb}` +
      context.foo() +
      context.route.makeLink("b", {})
  };
};

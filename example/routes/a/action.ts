import { Action } from "./types";

export const action: Action = async (payload, match) => {
  return {
    url: payload.url,
    status: 200,
    titleA: `${match.params && match.params.aa}`
  };
};

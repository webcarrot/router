import { Action } from "./types";

export const action: Action = async payload => {
  return {
    url: payload.url,
    status: 200,
    title: "TODO"
  };
};

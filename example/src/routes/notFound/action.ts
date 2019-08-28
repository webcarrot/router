import { Action } from "./types";

export const action: Action = async payload => {
  return {
    url: payload.url,
    status: 404,
    title: "Not Found"
  };
};

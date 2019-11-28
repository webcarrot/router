import * as React from "react";
import { ServerStyleSheets } from "@material-ui/styles";
import { AppState } from "./types";

export const Html = ({

}: {
  sheets: ServerStyleSheets;
  init: string;
  state: AppState;
  html: string;
}) => {
  return <p>html</p>;
};

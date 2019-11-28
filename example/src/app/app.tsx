import * as React from "react";
import { AppProps } from "./types";

export const App = (props: AppProps) => {
  return <p>{props.route.id}</p>;
};

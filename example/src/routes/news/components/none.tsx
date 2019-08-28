import * as React from "react";
import { ComponentNone } from "../types";
import { Typography } from "@material-ui/core";

export const Component: ComponentNone = ({ output: { title } }) => {
  return <Typography variant="h1">{title}</Typography>;
};

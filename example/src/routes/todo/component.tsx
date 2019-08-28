import * as React from "react";
import { Component as RouteComponent } from "./types";
import { Typography } from "@material-ui/core";

export const Component: RouteComponent = ({ output: { title } }) => {
  return <Typography variant="h1">{title}</Typography>;
};

import * as React from "react";
import { Component as ComponentInt } from "./types";

export const Component: ComponentInt = ({ foo, route, output }) => {
  return (
    <span>
      {route.id}
      {foo} {output.titleA}
    </span>
  );
};

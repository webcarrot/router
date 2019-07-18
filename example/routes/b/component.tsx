import * as React from "react";
import { Component as ComponentInt } from "./types";

export const Component: ComponentInt = ({ foo, route, match, output }) => {
  return (
    <span>
      {route.id}
      {foo} {match.params && match.params.bb} {output.titleB}
    </span>
  );
};

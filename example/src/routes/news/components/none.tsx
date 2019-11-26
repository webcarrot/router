import * as React from "react";
import { ComponentNone } from "../types";
import { Typography } from "@material-ui/core";
import { Link } from "../../components";

export const Component: ComponentNone = ({ output: { title } }) => {
  return (
    <>
      <Typography variant="h1">{title}</Typography>
      <Link translate="yes" route="home" match={{ type: "everything" }}>
        asas
      </Link>
    </>
  );
};

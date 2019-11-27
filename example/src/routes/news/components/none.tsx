import * as React from "react";
import { ComponentNone } from "../types";
import { Typography } from "@material-ui/core";
import {} from "@webcarrot/router";
import { Link } from "../../components";

export const Component: ComponentNone = ({ output: { title } }) => {
  return (
    <>
      <Typography variant="h1">{title}</Typography>
      <Link route="home" match={{ jasio: 2 }}>
        news
      </Link>
      <Link route="news" match={{}}>
        home
      </Link>
      <Link route="news" match={{ type: "everything" }}>
        news
      </Link>
      <Link route="home" match={{ jasio: 2 }}>
        home
      </Link>
    </>
  );
};

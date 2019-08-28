import * as React from "react";
import { ComponentSources } from "../types";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";

export const Component: ComponentSources = ({ output: { data, title } }) => {
  switch (data.status) {
    case "ok":
      return (
        <section>
          <Typography variant="h1">{title}</Typography>
          <List>
            {data.sources.map(({ id, name, description, url }) => (
              <ListItem component="a" href={url} button divider key={id}>
                <ListItemText primary={name} secondary={description} />
              </ListItem>
            ))}
          </List>
        </section>
      );
    case "error":
      return <p>{data.message}</p>;
  }
};

import * as React from "react";
import { ComponentEverything } from "../types";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from "@material-ui/core";

export const Component: ComponentEverything = ({ output: { data, title } }) => {
  switch (data.status) {
    case "ok":
      return (
        <section>
          <Typography variant="h1">{title}</Typography>
          <List>
            {data.articles.map(
              ({ title, url, urlToImage, description, content }) => (
                <ListItem component="a" href={url} button divider key={url}>
                  <ListItemAvatar>
                    <Avatar src={urlToImage} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={title}
                    secondary={description || content}
                  />
                </ListItem>
              )
            )}
          </List>
        </section>
      );
    case "error":
      return <p>{data.message}</p>;
  }
};

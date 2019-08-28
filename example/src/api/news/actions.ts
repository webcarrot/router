import { NewsApiActions } from "./types";
import { everything } from "./everything";
import { sources } from "./sources";
import { topHeadlines } from "./topHeadlines";

export const actions: NewsApiActions = {
  everything,
  sources,
  topHeadlines
};

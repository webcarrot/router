import { Routes } from "./types";
import { route as home } from "./home";
import { route as news } from "./news";
import { route as todo } from "./todo";
import { route as notFound } from "./notFound";

export const routes: Routes = {
  home,
  news,
  todo,
  notFound
};

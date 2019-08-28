import { NewsTopHeadlinesActionFunction, NewsArticlesResponse } from "./types";
import axios from "axios";

export const topHeadlines: NewsTopHeadlinesActionFunction = async (
  params,
  { apiUrl, apiKey }
) =>
  (await axios.get<NewsArticlesResponse>(`${apiUrl}/top-headlines`, {
    params,
    headers: {
      "X-Api-Key": apiKey
    }
  })).data;

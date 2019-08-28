import { NewsEverythingActionFunction, NewsArticlesResponse } from "./types";
import axios from "axios";

export const everything: NewsEverythingActionFunction = async (
  params,
  { apiUrl, apiKey }
) =>
  (await axios.get<NewsArticlesResponse>(`${apiUrl}/everything`, {
    params,
    headers: {
      "X-Api-Key": apiKey
    }
  })).data;

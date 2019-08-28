import { NewsSourcesActionFunction, NewsSourcesResponse } from "./types";
import axios from "axios";

export const sources: NewsSourcesActionFunction = async (
  params,
  { apiUrl, apiKey }
) =>
  (await axios.get<NewsSourcesResponse>(`${apiUrl}/sources`, {
    params,
    headers: {
      "X-Api-Key": apiKey
    }
  })).data;

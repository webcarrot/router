import { Context } from "koa";

import { make as makeApi } from "../api/news/make";
import { getJsonBody } from "./utils";
import { NewsApiContext } from "../api/news/types";

export const newsApiHandler = async (
  ctx: Context,
  newsApiContext: NewsApiContext
) => {
  try {
    const { action, payload } = await getJsonBody(ctx);
    const callApi = await makeApi(newsApiContext);
    const data = await callApi(action, payload);
    ctx.type = "json";
    ctx.status = 200;
    ctx.body = JSON.stringify(data);
  } catch (err) {
    ctx.type = "json";
    ctx.status = 500;
    ctx.body = JSON.stringify(err);
  }
};

import { Context } from "koa";

import { make as makeApi } from "../api/todo/make";
import { getJsonBody } from "./utils";

export const todoApiHandler = async (ctx: Context) => {
  try {
    const { action, payload } = await getJsonBody(ctx);
    const callApi = await makeApi();
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

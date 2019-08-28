import { Context } from "koa";
import * as BodyParse from "co-body";

export const getBody = async (ctx: Context) => {
  if (ctx.method === "POST") {
    if ("body" in ctx.req) {
      return (ctx.req as any).body;
    } else {
      return (await BodyParse.form(ctx)) || {};
    }
  }
};

export const getJsonBody = async (ctx: Context) => {
  if (ctx.method === "POST") {
    if ("body" in ctx.req) {
      return (ctx.req as any).body;
    } else {
      return (await BodyParse.json(ctx)) || {};
    }
  }
};

import * as Koa from "koa";
import { Context } from "koa";
import * as Compress from "koa-compress";
import { buildHandler } from "./build";
import { newsApiHandler } from "./news";
import { todoApiHandler } from "./todo";
import { pageHandler } from "./page";
import { AppConfiguration } from "./types";

export const startServer = async (appConfiguration: AppConfiguration) => {
  const app = new Koa();
  app
    .use(buildHandler)
    .use(Compress())
    .use(async (ctx: Context, next) => {
      ctx.set({
        "Cache-Control": "private, no-cache, no-store, must-revalidate"
      });
      ctx.compress = true;
      if (ctx.path.startsWith("/api") && ctx.method === "POST") {
        if (ctx.path === "/api/news") {
          return await newsApiHandler(ctx, appConfiguration.news);
        } else if (ctx.path === "/api/todo") {
          return await todoApiHandler(ctx);
        }
      }
      try {
        return await pageHandler(ctx, appConfiguration, next);
      } catch (error) {
        return next();
      }
    })
    .use(ctx => {
      ctx.status = 500;
      ctx.body = "Server error";
    });

  app.listen(appConfiguration.port);
};

import * as yargs from "yargs";

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "production";
}

import { addAlias } from "module-alias";
addAlias("@webcarrot/router-example", __dirname);

import { startServer } from "./server";

const argv = yargs
  .scriptName("@webcarrot/router-example")
  // port
  .number("port")
  .default("port", 3000)
  .require("port")
  .describe("port", "HTTP port")
  // news-api-url
  .string("news-api-url")
  .default("news-api-url", "https://newsapi.org/v2")
  .require("news-api-url")
  .describe("news-api-url", "News api url")
  // news-api-key
  .string("news-api-key")
  .default("news-api-key", "https://newsapi.org/v2")
  .require("news-api-key")
  .describe("news-api-key", "News api key")
  // misc
  .help().argv;

(async () => {
  const args = await argv;
  startServer({
    port: args.port,
    news: {
      apiUrl: args["news-api-url"],
      apiKey: args["news-api-key"],
    },
  });
})();

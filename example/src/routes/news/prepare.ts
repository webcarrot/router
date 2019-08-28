import { Output } from "./types";

export const prepare = async (output: Output) => {
  switch (output.type) {
    case "none":
      return import("./components/none").then(({ Component }) => Component);
    case "everything":
      return import("./components/everything").then(
        ({ Component }) => Component
      );
    case "sources":
      return import("./components/sources").then(({ Component }) => Component);
    case "topHeadlines":
      return import("./components/topHeadlines").then(
        ({ Component }) => Component
      );
  }
};

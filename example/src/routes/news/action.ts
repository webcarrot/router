import {
  Action,
  MatchEverything,
  MatchSources,
  MatchTopHeadlines
} from "./types";

export const action: Action = async (payload, match, { newsApi }) => {
  if (match.params && match.params.type) {
    switch (match.params.type) {
      case "everything":
        return {
          url: payload.url,
          status: 200,
          title: "News API Everything demo",
          type: "everything",
          data: await newsApi(
            "everything",
            (<MatchEverything>match).query || {}
          )
        };
      case "sources":
        return {
          url: payload.url,
          status: 200,
          title: "News API Sources demo",
          type: "sources",
          data: await newsApi("sources", (<MatchSources>match).query || {})
        };
      case "topHeadlines":
        return {
          url: payload.url,
          status: 200,
          title: "News API Everything demo",
          type: "topHeadlines",
          data: await newsApi(
            "topHeadlines",
            (<MatchTopHeadlines>match).query || {}
          )
        };
    }
  }
  return {
    url: payload.url,
    status: 200,
    title: "News API demo",
    type: "none"
  };
};

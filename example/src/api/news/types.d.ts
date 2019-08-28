import { ApiResolver, ActionFunction } from "@webcarrot/api";
import { actions } from "./actions";

import { NewsEverythingActionFunction } from "./everything/types";
import { NewsSourcesActionFunction } from "./sources/types";
import { NewsTopHeadlinesActionFunction } from "./topHeadlines/types";

export type NewsApiActions = {
  everything: NewsEverythingActionFunction;
  sources: NewsSourcesActionFunction;
  topHeadlines: NewsTopHeadlinesActionFunction;
};

export type NewsApiContextValue = ApiResolver<NewsApiActions>;

export type NewsApiContext = {
  apiUrl: string;
  apiKey: string;
};

export type NewsActionFunction<
  P,
  O extends NewsErrorResponse | { status: NewsStatus }
> = ActionFunction<P, O, NewsApiContext>;

export type NewsCategory =
  | "business"
  | "entertainment"
  | "general"
  | "health"
  | "science"
  | "sports"
  | "technology";

export type NewsLanguage =
  | "ar"
  | "de"
  | "en"
  | "es"
  | "fr"
  | "he"
  | "it"
  | "nl"
  | "no"
  | "pt"
  | "ru"
  | "se"
  | "ud"
  | "zh";

export type NewsCountry =
  | "ae"
  | "ar"
  | "at"
  | "au"
  | "be"
  | "bg"
  | "br"
  | "ca"
  | "ch"
  | "cn"
  | "co"
  | "cu"
  | "cz"
  | "de"
  | "eg"
  | "fr"
  | "gb"
  | "gr"
  | "hk"
  | "hu"
  | "id"
  | "ie"
  | "il"
  | "in"
  | "it"
  | "jp"
  | "kr"
  | "lt"
  | "lv"
  | "ma"
  | "mx"
  | "my"
  | "ng"
  | "nl"
  | "no"
  | "nz"
  | "ph"
  | "pl"
  | "pt"
  | "ro"
  | "rs"
  | "ru"
  | "sa"
  | "se"
  | "sg"
  | "si"
  | "sk"
  | "th"
  | "tr"
  | "tw"
  | "ua"
  | "us"
  | "ve"
  | "za";

export type NewsSortBy =
  | "relevancy" /** articles more closely related to q come first. */
  | "popularity" /** articles from popular sources and publishers come first. */
  | "publishedAt" /** newest articles come first. */;

export type NewsStatus = "ok" | "error";

export type NewsErrorCode =
  | "apiKeyDisabled" /** Your API key has been disabled. */
  | "apiKeyExhausted" /** Your API key has no more requests available. */
  | "apiKeyInvalid" /** Your API key hasn't been entered correctly. Double check it and try again. */
  | "apiKeyMissing" /** Your API key is missing from the request. Append it to the request with one of these methods. */
  | "parameterInvalid" /** You've included a parameter in your request which is currently not supported. Check the message property for more details. */
  | "parametersMissing" /** Required parameters are missing from the request and it cannot be completed. Check the message property for more details. */
  | "rateLimited" /** You have been rate limited. Back off for a while before trying the request again. */
  | "sourcesTooMany" /** You have requested too many sources in a single request. Try splitting the request into 2 smaller requests. */
  | "sourceDoesNotExist" /** You have requested a source which does not exist. */
  | "unexpectedError"; /** This shouldn't happen, and if it does then it's our fault, not yours. Try the request again shortly. */

export type NewsErrorResponse = {
  status: "error";
  code: NewsErrorCode;
  message: string;
};

export type NewsArticle = {
  /** The identifier id and a display name name for the source this article came from. */
  source: {
    id: string | null;
    name: string;
  };
  /** The author of the article */
  author: string;
  /** The headline or title of the article. */
  title: string;
  /** A description or snippet from the article. */
  description: string;
  /** The direct URL to the article. */
  url: string;
  /** The URL to a relevant image for the article. */
  urlToImage: string;
  /** The date and time that the article was published, in UTC (+000) */
  publishedAt: string;
  /** The unformatted content of the article, where available. This is truncated to 260 chars for Developer plan users. */
  content: string;
};

export type NewsSource = {
  /** The identifier of the news source. You can use this with our other endpoints. */
  id: string;
  /** The name of the news source */
  name: string;
  /** A description of the news source */
  description: string;
  /** The URL of the homepage. */
  url: string;
  /** The type of news to expect from this news source. */
  category: NewsCategory;
  /** The language that this news source writes in. */
  language: NewsLanguage;
  /** The country this news source is based in (and primarily writes about). */
  country: NewsCountry;
};

export type NewsSourcesResponse =
  | NewsErrorResponse
  | {
      status: "ok";
      sources: ReadonlyArray<NewsSource>;
    };

export type NewsArticlesResponse =
  | NewsErrorResponse
  | {
      status: "ok";
      totalResults: number;
      articles: ReadonlyArray<NewsArticle>;
    };

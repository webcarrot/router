import {
  NewsActionFunction,
  NewsCategory,
  NewsLanguage,
  NewsCountry,
  NewsSourcesResponse
} from "../types";

export type NewsSourcesPayload = {
  /** Find sources that display news of this category. */
  category?: NewsCategory;
  /** Find sources that display news in a specific language. */
  language?: NewsLanguage;
  /** Find sources that display news in a specific country. */
  country?: NewsCountry;
};

export { NewsSourcesResponse };

export type NewsSourcesActionFunction = NewsActionFunction<
  NewsSourcesPayload,
  NewsSourcesResponse
>;

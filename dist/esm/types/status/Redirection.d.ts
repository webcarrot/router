export type Redirection =
  | number
  | 300 /** Multiple Choices */
  | 301 /** Moved Permanently */
  | 302 /** Found */
  | 303 /** See Other */
  | 304 /** Not Modified */
  | 305 /** Use Proxy */
  | 306 /** (Unused) */
  | 307 /** Temporary Redirect */
  | 308; /** Permanent Redirect (experimental) */

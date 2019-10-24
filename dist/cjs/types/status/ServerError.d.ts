export type ServerError =
  | number
  | 500 /** Internal Server Error */
  | 501 /** Not Implemented */
  | 502 /** Bad Gateway */
  | 503 /** Service Unavailable */
  | 504 /** Gateway Timeout */
  | 505 /** HTTP Version Not Supported */
  | 506 /** Variant Also Negotiates (Experimental) */
  | 507 /** Insufficient Storage (WebDAV) */
  | 508 /** Loop Detected (WebDAV) */
  | 509 /** Bandwidth Limit Exceeded (Apache) */
  | 510 /** Not Extended */
  | 511 /** Network Authentication Required */
  | 598 /** Network read timeout error */
  | 599; /** Network connect timeout error */

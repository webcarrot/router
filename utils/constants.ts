import { NavigationMode } from "./enums";

let NAVIGATION_MODE: NavigationMode;

if (typeof history !== "undefined") {
  if (history.pushState) {
    NAVIGATION_MODE = NavigationMode.MODERN;
  } else {
    NAVIGATION_MODE = NavigationMode.LEGACY;
  }
} else {
  NAVIGATION_MODE = NavigationMode.NONE;
}

export { NAVIGATION_MODE };

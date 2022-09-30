import { NavigationMode } from "./enums";

export const NAVIGATION_MODE: NavigationMode =
  typeof history !== "undefined" ? NavigationMode.MODERN : NavigationMode.NONE;

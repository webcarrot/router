import { join } from "path";

export const ROOT_DIR = process.env.ROOT_DIR || join(__dirname, "../../");
export const BUILD_DIR = join(ROOT_DIR, "./build");
export const LEGACY_MANIFEST = join(BUILD_DIR, "manifest.legacy.json");
export const MODERN_MANIFEST = join(BUILD_DIR, "manifest.modern.json");
export const STATIC_MANIFEST = join(BUILD_DIR, "manifest.static.json");

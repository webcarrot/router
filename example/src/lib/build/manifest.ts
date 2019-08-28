import { watchFile, unwatchFile } from "fs";
import { exist, read } from "./utils";
import { LEGACY_MANIFEST, MODERN_MANIFEST, STATIC_MANIFEST } from "./constants";

type BuildCache = Map<string, string>;
type Cache = {
  flat: ReadonlyArray<string>;
  manifests: Map<string, BuildCache>;
};
let CACHE: Cache = null;

export const getManifestFile = async (path: string): Promise<BuildCache> => {
  try {
    if (await exist(path)) {
      const mainfets: { [key: string]: string } = JSON.parse(
        (await read(path)).toString()
      );
      const data: BuildCache = new Map();
      Object.keys(mainfets).forEach(name => {
        data.set(name, mainfets[name]);
      });
      watchFile(
        path,
        {
          persistent: false
        },
        () => {
          CACHE = null;
          unwatchFile(path);
        }
      );
      return data;
    }
  } catch (_) {
    return null;
  }
};

export const getManifests = async (): Promise<Cache> => {
  if (CACHE) {
    return CACHE;
  } else {
    const legacy = await getManifestFile(LEGACY_MANIFEST);
    const modern = await getManifestFile(MODERN_MANIFEST);
    const stati = await getManifestFile(STATIC_MANIFEST);
    const manifests = new Map();
    manifests.set("legacy", legacy);
    manifests.set("modern", modern);
    manifests.set("static", stati);
    const flat: Array<string> = [];
    if (legacy) {
      legacy.forEach(value => flat.push(value));
    }
    if (modern) {
      modern.forEach(value => flat.push(value));
    }
    if (stati) {
      stati.forEach(value => flat.push(value));
    }
    CACHE = {
      flat,
      manifests
    };
    return CACHE;
  }
};

import { PromiseOrNot } from "../types";
export declare const promisfy: <T>(action: () => PromiseOrNot<T>) => Promise<T>;

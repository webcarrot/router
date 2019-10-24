import { PromiseOrNot } from "../types";

export const promisfy = <T>(action: () => PromiseOrNot<T>): Promise<T> => {
  try {
    const value = action();
    if (value instanceof Promise) {
      return value;
    } else {
      return Promise.resolve(value);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

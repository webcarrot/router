export const promisfy = <T>(action: () => T | Promise<T>): Promise<T> => {
  try {
    const value = action();
    if (value instanceof Promise) {
      return value;
    } else {
      return Promise.resolve(value);
    }
  } catch (err) {
    Promise.reject(err);
  }
};

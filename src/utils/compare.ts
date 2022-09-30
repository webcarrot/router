export function isPlainObject(e: any): boolean {
  return e !== null && typeof e === "object" && e.constructor === Object;
}

export function compare<T = any>(a: T, b: T): boolean {
  if (a === b) {
    return true;
  } else if (a instanceof Array) {
    if (!(b instanceof Array) || a.length !== b.length) {
      return false;
    }
    return a.findIndex((v, no) => !compare(v, b[no])) === -1;
  } else if (isPlainObject(a)) {
    if (!isPlainObject(b)) {
      return false;
    }
    return (
      Object.keys(a as any).findIndex(
        (k) => !compare((a as any)[k], (b as any)[k])
      ) === -1
    );
  } else {
    return false;
  }
}

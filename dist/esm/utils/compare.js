export const isPlainObject = (e) => e !== null && typeof e === "object" && e.constructor === Object;
export const compare = (a, b) => {
    if (a === b) {
        return true;
    }
    else if (a instanceof Array) {
        if (!(b instanceof Array) || a.length !== b.length) {
            return false;
        }
        return a.findIndex((v, no) => !compare(v, b[no])) === -1;
    }
    else if (isPlainObject(a)) {
        if (!isPlainObject(b)) {
            return false;
        }
        return (Object.keys(a).findIndex(k => !compare(a[k], b[k])) ===
            -1);
    }
    else {
        return false;
    }
};
//# sourceMappingURL=compare.js.map
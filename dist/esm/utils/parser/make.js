export const make = (fn) => {
    let required = false;
    let nullable = false;
    let convert = false;
    let defaultValue;
    const handler = ((payload) => fn(payload, required, nullable, convert, defaultValue));
    Object.defineProperties(handler, {
        r: {
            get() {
                required = true;
                return handler;
            }
        },
        n: {
            get() {
                nullable = true;
                return handler;
            }
        },
        c: {
            get() {
                convert = true;
                return handler;
            }
        },
        d: {
            value: (defaultValue) => {
                defaultValue = defaultValue;
                return handler;
            }
        }
    });
    return handler;
};
//# sourceMappingURL=make.js.map
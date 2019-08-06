import { isRedirect } from "../../utils/isRedirect";
export const make = (id, match, build, init) => {
    let _initialization;
    let _prepare;
    let _action;
    const initialization = () => {
        if (!_initialization) {
            _initialization = init().then(config => {
                _prepare = config.prepare;
                _action = config.action;
            });
        }
        return _initialization;
    };
    const prepare = (output) => initialization().then(() => _prepare(output));
    const action = (props, match, context) => initialization().then(() => _action(props, match, context));
    const execute = async (url, payload, context, doPrepare = true, onStart, onError) => {
        try {
            const m = await match(url, payload, context);
            if (m) {
                if (onStart && onStart(payload.no) === false) {
                    return;
                }
                const o = (await action(payload, m, context));
                const Component = !doPrepare || isRedirect(o.status) ? null : await prepare(o);
                return {
                    id,
                    route,
                    payload,
                    match: m,
                    output: o,
                    Component
                };
            }
        }
        catch (err) {
            if (onError && onError(payload.no, err)) {
                throw err;
            }
        }
        return null;
    };
    const route = {
        id,
        match,
        build,
        prepare,
        action,
        execute
    };
    return route;
};
//# sourceMappingURL=index.js.map
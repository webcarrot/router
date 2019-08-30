import { isRedirect } from "../../utils/isRedirect";
import { promisfy } from "../../utils/promisfy";
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
    const execute = (url, payload, context, doPrepare = true, onStart, onError) => promisfy(() => match(url, payload, context))
        .then(m => {
        if (m) {
            if (onStart && onStart(payload.no) === false) {
                return;
            }
            return action(payload, m, context).then((o) => (!doPrepare || isRedirect(o.status)
                ? Promise.resolve(null)
                : prepare(o)).then(Component => ({
                id,
                route,
                payload,
                match: m,
                output: o,
                Component
            })));
        }
    })
        .catch(err => {
        if (onError && onError(payload.no, err)) {
            throw err;
        }
        return null;
    });
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
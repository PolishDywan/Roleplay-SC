import injectable from "./injectable";
import { instance as globalContainer } from "../dependency-container";
/**
 * Class decorator factory that registers the class as a scoped dependency within
 * the global container.
 *
 * @return The class decorator
 */
export default function scoped(lifecycle, token) {
    return function (target) {
        injectable()(target);
        globalContainer.register(token || target, target, {
            lifecycle
        });
    };
}
//# sourceMappingURL=scoped.js.map
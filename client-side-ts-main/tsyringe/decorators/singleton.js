import injectable from "./injectable";
import { instance as globalContainer } from "../dependency-container";
/**
 * Class decorator factory that registers the class as a singleton within
 * the global container.
 *
 * @return {Function} The class decorator
 */
function singleton() {
    return function (target) {
        injectable()(target);
        globalContainer.registerSingleton(target);
    };
}
export default singleton;
//# sourceMappingURL=singleton.js.map
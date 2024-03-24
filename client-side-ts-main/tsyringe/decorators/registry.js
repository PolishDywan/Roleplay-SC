import { instance as globalContainer } from "../dependency-container";
/**
 * Class decorator factory that allows constructor dependencies to be registered at runtime.
 *
 * @return {Function} The class decorator
 */
function registry(registrations = []) {
    return function (target) {
        registrations.forEach(({ token, options, ...provider }) => globalContainer.register(token, provider, options));
        return target;
    };
}
export default registry;
//# sourceMappingURL=registry.js.map
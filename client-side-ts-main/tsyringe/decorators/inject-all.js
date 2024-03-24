import { defineInjectionTokenMetadata } from "../reflection-helpers";
/**
 * Parameter decorator factory that allows for interface information to be stored in the constructor's metadata
 *
 * @return {Function} The parameter decorator
 */
function injectAll(token) {
    const data = { token, multiple: true };
    return defineInjectionTokenMetadata(data);
}
export default injectAll;
//# sourceMappingURL=inject-all.js.map
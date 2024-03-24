import { defineInjectionTokenMetadata } from "../reflection-helpers";
/**
 * Parameter decorator factory that allows for interface information to be stored in the constructor's metadata
 *
 * @return {Function} The parameter decorator
 */
function injectAllWithTransform(token, transformer, ...args) {
    const data = {
        token,
        multiple: true,
        transform: transformer,
        transformArgs: args
    };
    return defineInjectionTokenMetadata(data);
}
export default injectAllWithTransform;
//# sourceMappingURL=inject-all-with-transform.js.map
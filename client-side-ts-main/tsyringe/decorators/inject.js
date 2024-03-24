import { defineInjectionTokenMetadata } from "../reflection-helpers";
/**
 * Parameter decorator factory that allows for interface information to be stored in the constructor's metadata
 *
 * @return {Function} The parameter decorator
 */
function inject(token) {
    return defineInjectionTokenMetadata(token);
}
export default inject;
//# sourceMappingURL=inject.js.map
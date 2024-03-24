import { getParamInfo } from "../reflection-helpers";
import { typeInfo } from "../dependency-container";
/**
 * Class decorator factory that allows the class' dependencies to be injected
 * at runtime.
 *
 * @return {Function} The class decorator
 */
function injectable() {
    return function (target) {
        typeInfo.set(target, getParamInfo(target));
    };
}
export default injectable;
//# sourceMappingURL=injectable.js.map
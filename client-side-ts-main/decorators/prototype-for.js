/**
 * Extend given proto class with the target
 *
 * @param {Function} protoClass
 * @returns {ClassDecorator}
 * @constructor
 */
export const PrototypeFor = (protoClass) => {
    return (target) => {
        protoClass.prototype = target.prototype;
    };
};
//# sourceMappingURL=prototype-for.js.map
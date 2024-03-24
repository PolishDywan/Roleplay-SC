import { Reflection as Reflect } from "@abraham/reflection";
import { container } from "tsyringe";
/**
 * Helper for adding events to meta data
 *
 * @param target
 * @param {string} type
 * @param {string} name
 * @param {string} propertyKey
 */
function validateEventExistsAndPush(target, type, name, propertyKey) {
    let eventName = name || propertyKey;
    const convertToEventName = container.resolve('convertToEventName');
    eventName = convertToEventName(eventName);
    if (!Reflect.hasMetadata('events', target.constructor)) {
        Reflect.defineMetadata('events', [], target.constructor);
    }
    const events = Reflect.getMetadata('events', target.constructor);
    events.push({
        type, name: eventName, method: propertyKey
    });
    Reflect.defineMetadata('events', events, target.constructor);
}
/**
 * Add on event listener
 *
 * @param {string} name
 * @returns {MethodDecorator}
 */
export const on = (name) => {
    return (target, propertyKey) => {
        validateEventExistsAndPush(target, 'on', name, propertyKey);
    };
};
/**
 * Add onServer event listener
 *
 * @param {string} name
 * @returns {MethodDecorator}
 */
export const onServer = (name) => {
    return (target, propertyKey) => {
        validateEventExistsAndPush(target, 'onServer', name, propertyKey);
    };
};
/**
 * Add onClient event listener
 *
 * @param {string} name
 * @returns {MethodDecorator}
 */
export const onClient = (name) => {
    return (target, propertyKey) => {
        validateEventExistsAndPush(target, 'onClient', name, propertyKey);
    };
};
/**
 * Add onGui event listener
 *
 * @param {string} name
 * @returns {MethodDecorator}
 */
export const onGui = (name) => {
    return (target, propertyKey) => {
        validateEventExistsAndPush(target, 'onGui', name, propertyKey);
    };
};
//# sourceMappingURL=events.js.map
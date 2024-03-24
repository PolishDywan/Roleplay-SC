import { Reflection as Reflect } from '@abraham/reflection';
import { container } from 'tsyringe';
/**
 * Provide the ability to use method decorators
 *
 * @returns {ClassDecorator}
 * @constructor
 */
export const foundation = () => {
    return function (target) {
        let currentInstance = container.resolve(target);
        addEvents(target, currentInstance);
        addKeyEvents(target, currentInstance);
    };
};
/**
 * Register event listener as decorator
 *
 * @param target
 * @param currentInstance
 */
function addEvents(target, currentInstance) {
    if (Reflect.hasMetadata('events', target)) {
        let eventModule = container.resolve('EventModule');
        let events = Reflect.getMetadata('events', target) || [];
        events.forEach((event) => {
            eventModule.listener(event.type, event.name, currentInstance[event.method].bind(currentInstance));
        });
    }
}
/**
 * Add key events
 *
 * @param target
 * @param currentInstance
 */
function addKeyEvents(target, currentInstance) {
    if (Reflect.hasMetadata('keyup', target) || Reflect.hasMetadata('keydown', target)) {
        let keyEventModule = container.resolve('KeyEventModule');
        let keyupEvents = Reflect.getMetadata('keyup', target) || [];
        let keydownEvents = Reflect.getMetadata('keydown', target) || [];
        keyupEvents.forEach((keyup) => {
            keyEventModule.keyup(keyup.key, currentInstance[keyup.callback].bind(currentInstance));
        });
        keydownEvents.forEach((keydown) => {
            keyEventModule.keydown(keydown.key, currentInstance[keydown.callback].bind(currentInstance));
        });
    }
}
//# sourceMappingURL=foundation.js.map
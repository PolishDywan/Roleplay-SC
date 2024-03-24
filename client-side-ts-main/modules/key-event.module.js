var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { singleton } from "tsyringe";
let KeyEventModule = class KeyEventModule {
    /**
     * Contains all keyup events
     * @type {Map<any, any>}
     */
    keyupEvents = new Map();
    /**
     * Contains all keydown events
     * @type {Map<any, any>}
     */
    keydownEvents = new Map();
    /**
     * Contains available listener types
     * @type {string[]}
     */
    availableListeners = ['keyup', 'keydown'];
    /**
     * Add listener helper for decorators
     *
     * @param {string} type
     * @param {number} key
     * @param {Function} callback
     */
    listener(type, key, callback) {
        if (this.availableListeners.includes(type)) {
            this[type](key, callback);
        }
    }
    /**
     * Register keyup events
     *
     * @param {number} key
     * @param {Function} callback
     */
    keyup(key, callback) {
        if (this.keyupEvents.has(key)) {
            // throw some errors
            return;
        }
        this.keyupEvents.set(key, callback);
    }
    /**
     * Register keydown events
     *
     * @param {number} key
     * @param {Function} callback
     */
    keydown(key, callback) {
        if (this.keydownEvents.has(key)) {
            // throw some errors
            return;
        }
        this.keydownEvents.set(key, callback);
    }
    /**
     * Run available key commands
     *
     * @param {string} type
     * @param {number} key
     */
    run(type, key) {
        if (this.availableListeners.includes(type)) {
            const eventMap = this[`${type}Events`];
            if (eventMap.has(key)) {
                eventMap.get(key).apply(this);
            }
        }
    }
};
KeyEventModule = __decorate([
    singleton()
], KeyEventModule);
export { KeyEventModule };
//# sourceMappingURL=key-event.module.js.map
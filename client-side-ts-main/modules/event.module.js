var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { singleton } from "tsyringe";
import * as alt from "alt-client";
import { LoggerModule } from "./logger.module";
let EventModule = class EventModule {
    logger;
    /**
     * Available listener types for client
     *
     * @type {string[]}
     */
    availableListenerTypes = ['on', 'onServer', 'onGui'];
    constructor(logger) {
        this.logger = logger;
    }
    /**
     * Register listener
     *
     * @param {string} type
     * @param {string} name
     * @param {Function} callback
     */
    listener(type, name, callback) {
        if (this.availableListenerTypes.includes(type)) {
            this[type](name, callback);
        }
    }
    /**
     * Receive event from client
     *
     * @param {string} name
     * @param {(...args: any[]) => void} callback
     */
    on(name, callback) {
        alt.on(name, callback);
    }
    /**
     * Receive event from gui
     *
     * @param name
     * @param {(...args: any[]) => void} callback
     */
    onGui(name, callback) {
        alt.emit('webview:on', name, callback);
    }
    /**
     * Receive event from server
     *
     * @param {string} name
     * @param {(...args: any[]) => void} callback
     */
    onServer(name, callback) {
        alt.onServer(name, callback);
    }
    /**
     * Emit event to server
     *
     * @param {string} name
     * @param args
     */
    emit(name, ...args) {
        //this.logger.info("EventModule: Emit event '" + name + "' with args: " + args);
        alt.emit(name, ...args);
    }
    /**
     * Emit event to server
     *
     * @param {string} name
     * @param args
     */
    emitServer(name, ...args) {
        // this.logger.info("EventModule: Emit server event '" + name + "' with args: " + args);
        alt.emitServer(name, ...args);
    }
    /**
     * Emit event to gui
     *
     * @param {string} name
     * @param args
     */
    emitGui(name, ...args) {
        //this.logger.info("EventModule: Emit gui event '" + name + "' with args: " + JSON.stringify(args));
        alt.emit('webview:emit', name, ...args);
    }
};
EventModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [LoggerModule])
], EventModule);
export { EventModule };
//# sourceMappingURL=event.module.js.map
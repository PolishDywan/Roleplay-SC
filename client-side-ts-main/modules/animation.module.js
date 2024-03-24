var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as alt from "alt-client";
import * as native from "natives";
import { singleton } from "tsyringe";
import { AnimationOptions } from "@enums/animation.options";
let AnimationModule = class AnimationModule {
    dicts = new Map();
    cancelable = false;
    constructor() {
    }
    /**
     * Load and cache animations
     *
     * @param {string} dict
     * @returns {Promise<boolean>}
     */
    load(dict) {
        return new Promise((resolve) => {
            if (this.dicts.has(dict)) {
                return resolve(true);
            }
            native.requestAnimDict(dict);
            let interval = alt.setInterval(() => {
                if (native.hasAnimDictLoaded(dict)) {
                    this.dicts.set(dict, true);
                    alt.clearInterval(interval);
                    return resolve(true);
                }
            }, 10);
        });
    }
    /**
     * Play Animation for current player
     */
    play(dict, clip, options = {}, cancelable = true) {
        const defaultOptions = new AnimationOptions();
        options = { ...defaultOptions, ...options };
        this.cancelable = cancelable;
        native.taskPlayAnim(alt.Player.local.scriptID, dict, clip, options.speed, options.speedMultiplier, options.duration, options.flag, options.playbackRate, options.lockX, options.lockY, options.lockZ);
    }
    clear(force = false) {
        if (!this.cancelable && !force) {
            return;
        }
        native.clearPedTasks(alt.Player.local.scriptID);
    }
    isPlaying(dict, clip) {
        return native.isEntityPlayingAnim(alt.Player.local.scriptID, dict, clip, 3);
    }
};
AnimationModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], AnimationModule);
export { AnimationModule };
//# sourceMappingURL=animation.module.js.map
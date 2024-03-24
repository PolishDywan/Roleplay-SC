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
import { foundation } from "../decorators/foundation";
import { onServer } from "../decorators/events";
import { EventModule } from "../modules/event.module";
import { AnimationModule } from "../modules/animation.module";
import { AnimationOptions } from "@enums/animation.options";
let AnimationsHandler = class AnimationsHandler {
    event;
    animation;
    constructor(event, animation) {
        this.event = event;
        this.animation = animation;
    }
    async onPlay(dictionary, clip, options = {}) {
        const loaded = await this.animation.load(dictionary);
        if (loaded) {
            this.animation.play(dictionary, clip, options);
        }
    }
    onClear() {
        this.animation.clear();
    }
};
__decorate([
    onServer("animation:play"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, AnimationOptions]),
    __metadata("design:returntype", Promise)
], AnimationsHandler.prototype, "onPlay", null);
__decorate([
    onServer("animation:clear"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnimationsHandler.prototype, "onClear", null);
AnimationsHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, AnimationModule])
], AnimationsHandler);
export { AnimationsHandler };
//# sourceMappingURL=animations.handler.js.map
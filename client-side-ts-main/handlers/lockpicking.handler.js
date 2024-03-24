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
import alt from "alt-client";
import { AnimationModule } from "modules/animation.module";
import { AnimationFlag } from "@enums/animation.flag";
let LockpickingHandler = class LockpickingHandler {
    event;
    animation;
    constructor(event, animation) {
        this.event = event;
        this.animation = animation;
    }
    async onStart(dbId) {
        await this.animation.load("amb@medic@standing@kneel@idle_a");
        this.animation.play("amb@medic@standing@kneel@idle_a", "idle_a", {
            flag: AnimationFlag.Loop
        }, false);
        alt.setTimeout(() => {
            this.animation.clear(true);
            this.event.emitServer("lockpicking:requestpick", dbId);
        }, 3000);
    }
};
__decorate([
    onServer("lockpicking:start"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LockpickingHandler.prototype, "onStart", null);
LockpickingHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, AnimationModule])
], LockpickingHandler);
export { LockpickingHandler };
//# sourceMappingURL=lockpicking.handler.js.map
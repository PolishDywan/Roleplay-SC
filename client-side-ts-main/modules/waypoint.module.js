var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as native from "natives";
import * as alt from "alt-client";
import { singleton } from "tsyringe";
import { MathModule } from "./math.module";
import { BlipModule } from "./blip.module";
import { UpdateModule } from "./update.module";
import { LoggerModule } from "./logger.module";
let WaypointModule = class WaypointModule {
    logger;
    update;
    blip;
    math;
    updateId;
    currentWaypointBlip;
    currentTargetPos;
    constructor(logger, update, blip, math) {
        this.logger = logger;
        this.update = update;
        this.blip = blip;
        this.math = math;
    }
    set(x, y, z, color, sprite) {
        if (this.currentWaypointBlip !== undefined) {
            this.destroy();
        }
        this.currentTargetPos = new alt.Vector3(x, y, z);
        this.currentWaypointBlip = this.blip.createBlip(this.currentTargetPos, color, sprite, "", true);
        native.setBlipRoute(this.currentWaypointBlip, true);
        native.setBlipRouteColour(this.currentWaypointBlip, color);
        this.updateId = this.update.add(() => this.tick());
    }
    destroy() {
        this.update.remove(this.updateId);
        this.blip.destroyBlip(this.currentWaypointBlip);
    }
    tick() {
        if (this.math.distance(alt.Player.local.pos, this.currentTargetPos) < 4) {
            this.destroy();
        }
    }
};
WaypointModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [LoggerModule, UpdateModule, BlipModule, MathModule])
], WaypointModule);
export { WaypointModule };
//# sourceMappingURL=waypoint.module.js.map
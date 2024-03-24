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
import { BlipModule } from "../modules/blip.module";
import { UpdateModule } from "../modules/update.module";
import { WaypointModule } from "../modules/waypoint.module";
let WaypointHandler = class WaypointHandler {
    blip;
    update;
    waypoint;
    constructor(blip, update, waypoint) {
        this.blip = blip;
        this.update = update;
        this.waypoint = waypoint;
    }
    onSet(x, y, z, color, sprite) {
        this.waypoint.set(x, y, z, color, sprite);
    }
    onClear() {
        this.waypoint.destroy();
    }
};
__decorate([
    onServer("waypoint:set"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number, Number]),
    __metadata("design:returntype", void 0)
], WaypointHandler.prototype, "onSet", null);
__decorate([
    onServer("waypoint:clear"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WaypointHandler.prototype, "onClear", null);
WaypointHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [BlipModule, UpdateModule, WaypointModule])
], WaypointHandler);
export { WaypointHandler };
//# sourceMappingURL=waypoint.handler.js.map
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
import { foundation } from "../../decorators/foundation";
import { LoggerModule } from "../logger.module";
import * as alt from "alt-client";
import { EventModule } from "../event.module";
import { MathModule } from "../math.module";
let VehicleMenu = class VehicleMenu {
    logger;
    event;
    math;
    constructor(logger, event, math) {
        this.logger = logger;
        this.event = event;
        this.math = math;
    }
    interact(coords) {
        let closestVehicle;
        let lastDistance = 5;
        alt.Vehicle.all.forEach(vehicle => {
            const vehiclePosition = vehicle.pos;
            const distance = this.math.distance(coords, vehiclePosition);
            if (distance < lastDistance) {
                closestVehicle = vehicle;
                lastDistance = distance;
            }
        });
        if (closestVehicle === undefined) {
            return;
        }
        if (closestVehicle.hasSyncedMeta("ID")) {
            const id = closestVehicle.getSyncedMeta("ID");
            this.event.emitServer("vehicleactions:get", id);
        }
    }
};
VehicleMenu = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [LoggerModule, EventModule, MathModule])
], VehicleMenu);
export { VehicleMenu };
//# sourceMappingURL=vehicle.menu.js.map
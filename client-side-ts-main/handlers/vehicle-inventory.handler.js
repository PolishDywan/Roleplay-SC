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
import { singleton } from "tsyringe";
import { foundation } from "../decorators/foundation";
import { on, onServer } from "../decorators/events";
import { InventoryModule } from "../modules/inventory.module";
import { KeyCodes } from "@enums/keycode.type";
import { Player } from "@extensions/player.extensions";
import { VehicleModule } from "../modules/vehicle.module";
import { LoggerModule } from "../modules/logger.module";
import { UpdateModule } from "../modules/update.module";
import { MathModule } from "../modules/math.module";
import { EventModule } from "../modules/event.module";
import { NotificationModule } from "../modules/notification.module";
import { NotificationTypes } from "@enums/notification.types";
let VehicleInventoryHandler = class VehicleInventoryHandler {
    inventory;
    player;
    vehicle;
    logger;
    update;
    math;
    notification;
    event;
    currentVehicle;
    constructor(inventory, player, vehicle, logger, update, math, notification, event) {
        this.inventory = inventory;
        this.player = player;
        this.vehicle = vehicle;
        this.logger = logger;
        this.update = update;
        this.math = math;
        this.notification = notification;
        this.event = event;
    }
    onKeydown(key) {
        if (key === KeyCodes.ESCAPE || key === KeyCodes.I) {
            if (this.currentVehicle === undefined) {
                return;
            }
            this.close();
        }
    }
    onInteract(vehicle) {
        if (this.math.distance(this.math.getEntityRearPosition(vehicle.scriptID), alt.Player.local.pos) > 1) {
            this.notification.sendNotification({
                type: NotificationTypes.ERROR, text: "Dein Charakter befindet sich nicht am Kofferraum."
            });
            return;
        }
        this.currentVehicle = vehicle;
        this.vehicle.setTrunkState(vehicle, true);
        this.inventory.open();
    }
    close() {
        this.vehicle.setTrunkState(this.currentVehicle, false);
        this.currentVehicle = undefined;
        this.event.emitServer("vehicleinventory:close");
    }
};
__decorate([
    on('keydown'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VehicleInventoryHandler.prototype, "onKeydown", null);
__decorate([
    onServer("vehicleinventory:interact"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [alt.Vehicle]),
    __metadata("design:returntype", void 0)
], VehicleInventoryHandler.prototype, "onInteract", null);
VehicleInventoryHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [InventoryModule, Player, VehicleModule, LoggerModule, UpdateModule, MathModule, NotificationModule, EventModule])
], VehicleInventoryHandler);
export { VehicleInventoryHandler };
//# sourceMappingURL=vehicle-inventory.handler.js.map
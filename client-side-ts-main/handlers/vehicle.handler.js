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
import { foundation } from "../decorators/foundation";
import { EventModule } from "../modules/event.module";
import { Player } from "@extensions/player.extensions";
import { KeyCodes } from "@enums/keycode.type";
import { UpdateModule } from "../modules/update.module";
import { on, onGui, onServer } from "../decorators/events";
import { InputType } from "@enums/input.type";
import { TextModule } from "../modules/text.module";
import { LoggerModule } from "../modules/logger.module";
import { VehicleModule } from "../modules/vehicle.module";
import { GuiModule } from "../modules/gui.module";
let VehicleHandler = class VehicleHandler {
    player;
    event;
    update;
    text;
    logger;
    vehicle;
    gui;
    drivingTickId;
    tickId;
    maxFuel;
    wasLastFrameInVehicle;
    constructor(player, event, update, text, logger, vehicle, gui) {
        this.player = player;
        this.event = event;
        this.update = update;
        this.text = text;
        this.logger = logger;
        this.vehicle = vehicle;
        this.gui = gui;
        this.tickId = this.update.add(() => this.tick());
    }
    onKeydown(key) {
        const vehicle = alt.Player.local.vehicle;
        if (vehicle instanceof alt.Vehicle) {
            if (key === KeyCodes.Y) {
                if (this.player.getIsAnyTextOpen || native.getVehicleClass(vehicle.scriptID) === 13 || !this.player.isControlsEnabled) {
                    return;
                }
                this.event.emitServer("vehicle:toggleengine");
            }
        }
    }
    onEnteringVehicle(vehicle) {
        if (native.getVehicleDoorLockStatus(vehicle.scriptID) === 2) {
            let i = 0;
            const interval = alt.setInterval(() => {
                if (i === 15) {
                    alt.clearInterval(interval);
                    return;
                }
                if (native.getVehicleDoorLockStatus(vehicle.scriptID) === 1) {
                    this.overrideVehicleEntrance();
                    alt.clearInterval(interval);
                    return;
                }
                i++;
            }, 200);
        }
    }
    onEnteredVehicle(vehicle, oldSeat, seat) {
        if (vehicle.hasSyncedMeta("MAX_FUEL")) {
            this.maxFuel = vehicle.getSyncedMeta("MAX_FUEL");
        }
        else {
            this.maxFuel = 0;
        }
        this.updateUI(vehicle);
        this.drivingTickId = this.update.add(() => this.drivingTick(vehicle));
        if (!this.player.getIsInventoryOpen && native.getVehicleClass(vehicle.scriptID) != 13) {
            this.event.emitGui("speedo:toggleui", true);
            this.player.showRadar();
        }
        this.wasLastFrameInVehicle = true;
    }
    onLeftVehicle(vehicle, seat) {
        this.update.remove(this.drivingTickId);
        this.event.emitGui("speedo:toggleui", false);
        this.player.hideRadar();
    }
    repairVehicle(vehicle, vehicleDbId, amount, fixCosmetics) {
        if (vehicle === undefined) {
            return;
        }
        this.vehicle.fix(vehicle, amount, fixCosmetics);
    }
    onSellVehicleMenuShow(hasBankAccount, isInGroup) {
        this.player.openMenu();
        this.player.freeze();
        this.player.showCursor();
        this.gui.focusView();
        this.event.emitGui("vehiclesellmenu:show", hasBankAccount, isInGroup);
    }
    onSellVehicleMenuClose() {
        this.player.closeMenu();
        this.player.unfreeze();
        this.player.hideCursor();
        this.gui.unfocusView();
    }
    overrideVehicleEntrance() {
        const vehicle = this.vehicle.getClosestVehicle();
        if (!vehicle) {
            return;
        }
        const vehicleDoor = this.vehicle.getClosestVehicleDoor(vehicle);
        if (vehicleDoor > -1) {
            native.taskEnterVehicle(alt.Player.local, vehicle, -1, vehicleDoor - 1, 1, 1, null);
        }
    }
    drivingTick(vehicle) {
        if (vehicle == null) {
            return;
        }
        if (!vehicle.valid) {
            return;
        }
        this.blockPlayerVehicleRollingOver(vehicle);
        this.updateUI(vehicle);
    }
    tick() {
        alt.Vehicle.all.forEach((vehicle) => {
            this.drawAdminDebug(vehicle);
        });
        if (this.wasLastFrameInVehicle) {
            if (alt.Player.local.vehicle === undefined) {
                this.event.emitGui("speedo:toggleui", false);
                this.wasLastFrameInVehicle = false;
            }
        }
    }
    updateUI(vehicle) {
        if (vehicle == null || !vehicle.valid) {
            return;
        }
        if (native.getVehicleClass(vehicle.scriptID) === 13) {
            return;
        }
        let fuelPercentage = 1;
        let drivenKilometre = -1;
        if (vehicle.hasSyncedMeta("FUEL")) {
            const fuel = vehicle.getSyncedMeta("FUEL");
            fuelPercentage = fuel / this.maxFuel;
        }
        if (vehicle.hasSyncedMeta("DRIVEN_KILOMETRE")) {
            drivenKilometre = vehicle.getSyncedMeta("DRIVEN_KILOMETRE");
        }
        this.event.emitGui("speedo:getinformation", {
            speed: this.vehicle.getCurrentSpeed(vehicle),
            rpm: vehicle.rpm,
            gear: vehicle.gear,
            fuelPercentage: fuelPercentage,
            engine: native.getIsVehicleEngineRunning(vehicle.scriptID),
            drivenKilometre: drivenKilometre,
        });
    }
    blockPlayerVehicleRollingOver(vehicle) {
        const roll = native.getEntityRoll(vehicle.scriptID);
        if (roll > 75 || roll < -75) {
            native.disableControlAction(2, InputType.VEH_MOVE_LR, true);
            native.disableControlAction(2, InputType.VEH_MOVE_UD, true);
        }
    }
    drawAdminDebug(vehicle) {
        if (!this.player.isAduty || !vehicle.hasSyncedMeta("ID")) {
            return;
        }
        const id = vehicle.getSyncedMeta("ID");
        const owner = vehicle.getSyncedMeta("OWNER");
        const engineHealth = native.getVehicleEngineHealth(vehicle.scriptID);
        const bodyHealth = native.getVehicleBodyHealth(vehicle.scriptID);
        this.text.drawText3dWithDistance(`Id: ${id}\nEigentümer: ${owner}\nEngine Health: ${engineHealth.toFixed(2)}\nBody Health: ${bodyHealth.toFixed(2)}`, vehicle.pos.x, vehicle.pos.y, vehicle.pos.z + 0.5, 0.4, 0, 41, 128, 185, 255, false, true, 5);
    }
};
__decorate([
    on('keydown'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VehicleHandler.prototype, "onKeydown", null);
__decorate([
    onServer("vehicle:entering"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [alt.Vehicle]),
    __metadata("design:returntype", void 0)
], VehicleHandler.prototype, "onEnteringVehicle", null);
__decorate([
    on("enteredVehicle"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [alt.Vehicle, Number, Number]),
    __metadata("design:returntype", void 0)
], VehicleHandler.prototype, "onEnteredVehicle", null);
__decorate([
    on("leftVehicle"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [alt.Vehicle, Number]),
    __metadata("design:returntype", void 0)
], VehicleHandler.prototype, "onLeftVehicle", null);
__decorate([
    onServer("vehicle:repair"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [alt.Vehicle, Number, Number, Boolean]),
    __metadata("design:returntype", void 0)
], VehicleHandler.prototype, "repairVehicle", null);
__decorate([
    onServer("vehiclesellmenu:show"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Boolean]),
    __metadata("design:returntype", void 0)
], VehicleHandler.prototype, "onSellVehicleMenuShow", null);
__decorate([
    onServer("vehiclesellmenu:close"),
    onGui("vehiclesellmenu:close"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VehicleHandler.prototype, "onSellVehicleMenuClose", null);
VehicleHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [Player, EventModule, UpdateModule, TextModule, LoggerModule, VehicleModule, GuiModule])
], VehicleHandler);
export { VehicleHandler };
//# sourceMappingURL=vehicle.handler.js.map
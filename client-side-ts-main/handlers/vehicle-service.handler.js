var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import alt from "alt-client";
import native from "natives";
import { singleton } from "tsyringe";
import { foundation } from "../decorators/foundation";
import { onGui, onServer } from "../decorators/events";
import { CameraModule } from "modules/camera.module";
import { Player } from "@extensions/player.extensions";
import { EventModule } from "modules/event.module";
import { GuiModule } from "modules/gui.module";
import { VehicleModType } from "@enums/vehicle-mod.type";
import { LoggerModule } from "modules/logger.module";
import { UpdateModule } from "modules/update.module";
import { InputType } from "@enums/input.type";
import { VehicleModule } from "modules/vehicle.module";
import { loadModel } from "helpers";
let VehicleServiceHandler = class VehicleServiceHandler {
    camera;
    player;
    event;
    logger;
    update;
    gui;
    vehicle;
    data;
    primColor = 0;
    secColor = 0;
    isRotating;
    dir;
    everyTickRef;
    showcaseVehicle = undefined;
    constructor(camera, player, event, logger, update, gui, vehicle) {
        this.camera = camera;
        this.player = player;
        this.event = event;
        this.logger = logger;
        this.update = update;
        this.gui = gui;
        this.vehicle = vehicle;
    }
    async onStart(data) {
        this.data = data;
        this.player.isSpawnedCharacter = false;
        this.player.showCursor();
        this.player.hideRadarAndHud(true);
        this.event.emitGui("gui:routeto", "vehicleservice");
        this.gui.focusView();
        await this.createVehicle(data);
        this.update.remove(this.everyTickRef);
        this.everyTickRef = this.update.add(() => this.tick());
    }
    onUpdateProducts(products) {
        this.data.productCount = products;
        this.event.emitGui("vehicleservice:updateproducts", products);
    }
    onReady() {
        this.event.emitGui("vehicleservice:setup", this.data);
    }
    onClose() {
        this.close();
        this.event.emitServer("vehicleservice:close");
    }
    onRequestPurchase(orderJson) {
        this.close();
        this.event.emitServer("vehicleservice:requestpurchase", orderJson);
    }
    onUpdateTuningPart(type, value) {
        if (this.showcaseVehicle === undefined) {
            return;
        }
        if (type === VehicleModType.Colour1) {
            this.primColor = value;
        }
        if (type === VehicleModType.Colour2) {
            this.secColor = value;
        }
        if (type === VehicleModType.Colour1 || type === VehicleModType.Colour2) {
            native.setVehicleColours(this.showcaseVehicle, this.primColor, this.secColor);
        }
        native.setVehicleMod(this.showcaseVehicle, type, value, false);
    }
    onRotate(dir) {
        this.isRotating = true;
        this.dir = dir;
    }
    onRotateStop() {
        this.isRotating = false;
    }
    tick() {
        if (this.isRotating) {
            if (this.showcaseVehicle === undefined) {
                return;
            }
            let heading = native.getEntityHeading(this.showcaseVehicle);
            const newHeading = (heading += this.dir);
            native.setEntityHeading(this.showcaseVehicle, newHeading);
        }
        const scriptID = alt.Player.local.scriptID;
        native.setEntityAlpha(scriptID, 0, false);
        native.setEntityCollision(scriptID, false, false);
        native.freezeEntityPosition(scriptID, true);
        native.setPedCanBeTargetted(scriptID, false);
        native.removeAllPedWeapons(scriptID, true);
        native.disableControlAction(0, InputType.NEXT_CAMERA, true);
        const rightClicked = native.getDisabledControlNormal(0, InputType.AIM);
        if (rightClicked) {
            this.player.hideCursor();
        }
        else {
            this.player.showCursor();
        }
    }
    async createVehicle(data) {
        if (this.showcaseVehicle) {
            return;
        }
        const hash = alt.hash(data.vehicleModelName);
        await loadModel(hash);
        const pos = alt.Player.local.pos;
        this.showcaseVehicle = this.vehicle.createShowcaseVehicle(hash, pos.x, pos.y, pos.z, 0, data.primaryColor, data.secondaryColor);
        native.networkSetInSpectatorMode(true, this.showcaseVehicle);
    }
    close() {
        this.camera.destroyCamera();
        this.player.isSpawnedCharacter = true;
        this.player.hideCursor();
        this.player.showRadarAndHud(true);
        native.resetEntityAlpha(alt.Player.local.scriptID);
        native.setEntityCollision(alt.Player.local.scriptID, true, true);
        native.freezeEntityPosition(alt.Player.local.scriptID, false);
        this.event.emitGui("gui:routeto", "game");
        this.gui.unfocusView();
        native.deleteVehicle(this.showcaseVehicle);
        this.showcaseVehicle = undefined;
        this.update.remove(this.everyTickRef);
    }
};
__decorate([
    onServer("vehicleservice:start"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VehicleServiceHandler.prototype, "onStart", null);
__decorate([
    onServer("vehicleservice:updateproducts"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VehicleServiceHandler.prototype, "onUpdateProducts", null);
__decorate([
    onGui("vehicleservice:ready"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VehicleServiceHandler.prototype, "onReady", null);
__decorate([
    onGui("vehicleservice:close"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VehicleServiceHandler.prototype, "onClose", null);
__decorate([
    onGui("vehicleservice:requestpurchase"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VehicleServiceHandler.prototype, "onRequestPurchase", null);
__decorate([
    onGui("vehicleservice:updatetuningpart"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], VehicleServiceHandler.prototype, "onUpdateTuningPart", null);
__decorate([
    onGui("vehicleservice:rotate"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VehicleServiceHandler.prototype, "onRotate", null);
__decorate([
    onGui("vehicleservice:rotatestop"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VehicleServiceHandler.prototype, "onRotateStop", null);
VehicleServiceHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [CameraModule,
        Player,
        EventModule,
        LoggerModule,
        UpdateModule,
        GuiModule,
        VehicleModule])
], VehicleServiceHandler);
export { VehicleServiceHandler };
//# sourceMappingURL=vehicle-service.handler.js.map
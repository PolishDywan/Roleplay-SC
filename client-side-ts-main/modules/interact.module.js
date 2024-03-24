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
import { EventModule } from "./event.module";
import { InputType } from "@enums/input.type";
import { Player } from "@extensions/player.extensions";
import { UpdateModule } from "./update.module";
import { MathModule } from "./math.module";
import { LoggerModule } from "./logger.module";
import { CameraModule } from "./camera.module";
import { GuiModule } from "./gui.module";
import { InVehicleMenu } from "./contextmenus/inVehicle.menu";
import { PlayerMenu } from "./contextmenus/player.menu";
import { PedMenu } from "./contextmenus/ped.menu";
import { ObjectMenu } from "./contextmenus/object.menu";
import { VehicleMenu } from "./contextmenus/vehicle.menu";
import { ContextModule } from "./context.module";
let InteractModule = class InteractModule {
    event;
    player;
    update;
    math;
    camera;
    gui;
    logger;
    inVehicleMenu;
    playerMenu;
    pedMenu;
    objectMenu;
    vehicleMenu;
    contextMenu;
    MAX_DISTANCE = 2;
    everyTickRef;
    endPoint;
    lastRaycast = Date.now();
    clickCooldown = Date.now();
    currentPlayerPos;
    constructor(event, player, update, math, camera, gui, logger, inVehicleMenu, playerMenu, pedMenu, objectMenu, vehicleMenu, contextMenu) {
        this.event = event;
        this.player = player;
        this.update = update;
        this.math = math;
        this.camera = camera;
        this.gui = gui;
        this.logger = logger;
        this.inVehicleMenu = inVehicleMenu;
        this.playerMenu = playerMenu;
        this.pedMenu = pedMenu;
        this.objectMenu = objectMenu;
        this.vehicleMenu = vehicleMenu;
        this.contextMenu = contextMenu;
    }
    startInteract() {
        this.player.showCursor();
        if (this.everyTickRef) {
            this.update.remove(this.everyTickRef);
            this.everyTickRef = null;
        }
        this.everyTickRef = this.update.add(() => this.tick());
        this.player.hasInteractionOpen = true;
    }
    stopInteraction() {
        this.contextMenu.close();
        this.player.hasInteractionOpen = false;
        if (this.everyTickRef) {
            this.update.remove(this.everyTickRef);
            this.everyTickRef = null;
        }
    }
    tick() {
        this.drawMenu();
        if (!alt.isKeyDown(18) || (this.contextMenu.getIsOpen && this.player.getIsAnyTextOpen)) {
            this.stopInteraction();
        }
    }
    drawMenu() {
        const x = alt.getCursorPos().x;
        const y = alt.getCursorPos().y;
        if (Date.now() > this.lastRaycast) {
            this.lastRaycast = Date.now();
            const result = this.math.screenToWorld(x, y, 22);
            const entityType = native.getEntityType(result.entity);
            if (!result.isHit || entityType === 0) {
                this.endPoint = undefined;
                return;
            }
            this.endPoint = result.pos;
        }
        this.drawVisualLine();
        if (native.isDisabledControlJustPressed(0, InputType.AIM)) {
            if (Date.now() < this.clickCooldown) {
                return;
            }
            this.clickCooldown = Date.now() + 100;
            const result = this.math.screenToWorld(x, y, 22);
            const entityType = native.getEntityType(result.entity);
            if (!result.isHit || entityType === 0) {
                this.endPoint = undefined;
                return;
            }
            const rayCastInfo = {
                isHit: result.isHit, pos: result.pos, normal: result.normal, entity: result.entity,
            };
            if (this.math.distance(alt.Player.local.pos, rayCastInfo.pos) > this.MAX_DISTANCE) {
                return;
            }
            // We have to reset the ui.
            this.event.emitGui("contextmenu:close");
            this.gui.focusView();
            this.currentPlayerPos = alt.Player.local.pos;
            switch (entityType) {
                case 1:
                    this.openPedMenu(rayCastInfo.entity, rayCastInfo.pos);
                    break;
                case 2:
                    this.openVehicleMenu(rayCastInfo.entity, rayCastInfo.pos);
                    break;
                case 3:
                    this.openObjectMenu(rayCastInfo.entity, rayCastInfo.pos);
                    break;
            }
        }
        if (this.currentPlayerPos !== undefined) {
            if (this.math.distance(alt.Player.local.pos, this.currentPlayerPos) > 1) {
                this.event.emitGui("contextmenu:close");
            }
        }
    }
    drawVisualLine() {
        if (this.endPoint === undefined) {
            return;
        }
        let lineColor;
        if (this.math.distance(alt.Player.local.pos, this.endPoint) > this.MAX_DISTANCE) {
            lineColor = { red: 255, green: 25, blue: 25 };
        }
        else {
            lineColor = { red: 255, green: 255, blue: 255 };
        }
        native.drawLine(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, this.endPoint.x, this.endPoint.y, this.endPoint.z, lineColor.red, lineColor.green, lineColor.blue, 50);
    }
    openPedMenu(entityId, coords) {
        if (entityId === alt.Player.local.scriptID) {
            this.playerMenu.interact(entityId);
            return;
        }
        else {
            this.pedMenu.interact(entityId);
            return;
        }
    }
    openObjectMenu(entityId, coords) {
        if (alt.Player.local.vehicle) {
            return;
        }
        this.objectMenu.interact(entityId);
    }
    openVehicleMenu(entityId, coords) {
        if (alt.Player.local.vehicle) {
            this.inVehicleMenu.interact(alt.Player.local.vehicle);
            return;
        }
        this.vehicleMenu.interact(coords);
    }
};
InteractModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [EventModule, Player, UpdateModule, MathModule, CameraModule, GuiModule, LoggerModule, InVehicleMenu, PlayerMenu, PedMenu, ObjectMenu, VehicleMenu, ContextModule])
], InteractModule);
export { InteractModule };
//# sourceMappingURL=interact.module.js.map
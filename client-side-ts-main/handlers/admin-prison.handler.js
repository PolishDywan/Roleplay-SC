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
import { onGui, onServer } from "../decorators/events";
import { EventModule } from "../modules/event.module";
import { Player } from "@extensions/player.extensions";
import { LoggerModule } from "../modules/logger.module";
import { CameraModule } from "../modules/camera.module";
import { GuiModule } from "../modules/gui.module";
import { MarkerModule } from "../modules/marker.module";
import { BlipModule } from "../modules/blip.module";
import { UpdateModule } from "../modules/update.module";
import { MathModule } from "../modules/math.module";
let AdminPrisonHandler = class AdminPrisonHandler {
    event;
    logger;
    camera;
    gui;
    marker;
    blip;
    update;
    math;
    player;
    checkpointPositions = [{ x: 395.86813, y: 6493.1343, z: 27.049805 }, {
            x: 394.6022,
            y: 6546.58,
            z: 26.460083
        }, { x: 309.25714, y: 6546.5933, z: 28.111328 }, { x: 306.30328, y: 6492.949, z: 28.380981 }, {
            x: 303.3231,
            y: 6447.798,
            z: 31.161133
        }, { x: 392.84836, y: 6458.492, z: 29.189697 }];
    index = 0;
    currentCheckpointPos;
    tickId;
    reachedCheckpoint;
    currentBlip;
    totalCheckpoints;
    constructor(event, logger, camera, gui, marker, blip, update, math, player) {
        this.event = event;
        this.logger = logger;
        this.camera = camera;
        this.gui = gui;
        this.marker = marker;
        this.blip = blip;
        this.update = update;
        this.math = math;
        this.player = player;
    }
    onStart(totalCheckpoints) {
        this.player.isInAPrison = true;
        this.event.emitGui("gui:routeto", "adminprison");
        this.player.fadeIn(500);
        this.player.unblurScreen(500);
        this.player.showRadar();
        this.player.hideHud();
        this.player.hideCursor();
        this.player.unfreeze();
        this.player.lockCamera(false);
        this.player.setVisible(true);
        this.player.blockGameControls(false);
        this.camera.destroyCamera();
        this.gui.unfocusView();
        this.index = 0;
        this.reachedCheckpoint = false;
        this.currentCheckpointPos = this.checkpointPositions[this.index];
        if (this.tickId != undefined) {
            this.update.remove(this.tickId);
        }
        this.tickId = this.update.add(() => this.tick());
        if (this.currentBlip != undefined) {
            this.blip.destroyBlip(this.currentBlip);
        }
        this.currentBlip = this.blip.createBlip(this.checkpointPositions[this.index], 1, 1, "", true);
        this.totalCheckpoints = totalCheckpoints;
    }
    onStop() {
        this.blip.destroyBlip(this.currentBlip);
        this.currentBlip = undefined;
        this.currentCheckpointPos = undefined;
        this.update.remove(this.tickId);
        this.tickId = undefined;
        this.player.isInAPrison = false;
    }
    onSendNextCheckpoint(leftCheckpoints) {
        this.reachedCheckpoint = false;
        this.index++;
        if (this.index >= this.checkpointPositions.length) {
            this.index = 0;
        }
        this.currentCheckpointPos = this.checkpointPositions[this.index];
        this.blip.destroyBlip(this.currentBlip);
        this.currentBlip = this.blip.createBlip(this.checkpointPositions[this.index], 1, 1, "", true);
        this.event.emitGui("adminprison:update", leftCheckpoints);
    }
    OnUiReady() {
        this.event.emitGui("adminprison:start", this.totalCheckpoints);
    }
    tick() {
        if (this.currentCheckpointPos !== undefined && !this.reachedCheckpoint) {
            if (this.math.distance(alt.Player.local.pos, this.currentCheckpointPos) <= 1) {
                this.event.emitServer("adminprison:requestnextcheckpoint");
                this.reachedCheckpoint = true;
            }
            this.marker.drawMarker({
                positionX: this.currentCheckpointPos.x,
                positionY: this.currentCheckpointPos.y,
                positionZ: this.currentCheckpointPos.z,
                sizeX: 1,
                sizeY: 1,
                sizeZ: 1,
                text: "",
                hasText: false,
                red: 192,
                green: 57,
                blue: 43,
                alpha: 100,
                type: 1,
                bobUpAndDown: false
            });
        }
    }
};
__decorate([
    onServer("adminprison:start"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminPrisonHandler.prototype, "onStart", null);
__decorate([
    onServer("adminprison:stop"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminPrisonHandler.prototype, "onStop", null);
__decorate([
    onServer("adminprison:sendnextcheckpoint"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminPrisonHandler.prototype, "onSendNextCheckpoint", null);
__decorate([
    onGui("adminprison:ready"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminPrisonHandler.prototype, "OnUiReady", null);
AdminPrisonHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, LoggerModule, CameraModule, GuiModule, MarkerModule, BlipModule, UpdateModule, MathModule, Player])
], AdminPrisonHandler);
export { AdminPrisonHandler };
//# sourceMappingURL=admin-prison.handler.js.map
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
let PrisonHandler = class PrisonHandler {
    event;
    logger;
    camera;
    gui;
    marker;
    blip;
    update;
    math;
    player;
    int;
    jailedUntilDateJson;
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
    onStart(jailedUntilDateJson) {
        this.jailedUntilDateJson = jailedUntilDateJson;
        this.event.emitGui("gui:routeto", "prison");
        this.gui.focusView();
        this.player.fadeIn(500);
        this.player.unblurScreen(500);
        this.player.hideRadarAndHud();
        this.player.hideCursor();
        this.player.freeze();
        this.player.showCursor();
        this.player.lockCamera(true);
        this.player.setVisible(false);
        this.player.blockGameControls(true);
        this.camera.createCamera(new alt.Vector3(373.87396, -1564.259, 46.396183), new alt.Vector3(-23.543306, -0, 175.2406));
        this.player.isInAPrison = true;
        this.int = alt.setInterval(() => {
            this.event.emitServer("prison:checktime");
        }, 30000);
    }
    onStop() {
        this.event.emitGui("gui:routeto", "game");
        this.gui.unfocusView();
        this.player.lockCamera(false);
        this.player.unfreeze();
        this.player.hideCursor();
        this.player.setVisible(true);
        this.player.blockGameControls(false);
        this.camera.destroyCamera();
        this.player.isInAPrison = false;
        if (this.int === undefined) {
            alt.clearInterval(this.int);
            this.int = undefined;
        }
    }
    OnUiReady() {
        this.event.emitGui("prison:start", this.jailedUntilDateJson);
    }
    onRequestCharacterSelection() {
        this.event.emitServer("prison:requestcharacterselection");
    }
};
__decorate([
    onServer("prison:start"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PrisonHandler.prototype, "onStart", null);
__decorate([
    onServer("prison:stop"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PrisonHandler.prototype, "onStop", null);
__decorate([
    onGui("prison:ready"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PrisonHandler.prototype, "OnUiReady", null);
__decorate([
    onGui("prison:requestcharacterselection"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PrisonHandler.prototype, "onRequestCharacterSelection", null);
PrisonHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, LoggerModule, CameraModule, GuiModule, MarkerModule, BlipModule, UpdateModule, MathModule, Player])
], PrisonHandler);
export { PrisonHandler };
//# sourceMappingURL=prison.handler.js.map
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
import { onServer } from "../decorators/events";
import { EventModule } from "../modules/event.module";
import { Player } from "@extensions/player.extensions";
import { LoggerModule } from "../modules/logger.module";
import { CameraModule } from "../modules/camera.module";
import { GuiModule } from "../modules/gui.module";
import { MarkerModule } from "../modules/marker.module";
import { BlipModule } from "../modules/blip.module";
import { UpdateModule } from "../modules/update.module";
import { MathModule } from "../modules/math.module";
let FriskHandler = class FriskHandler {
    event;
    logger;
    camera;
    gui;
    marker;
    blip;
    update;
    math;
    player;
    tickId;
    searchedByPlayerId;
    openPosition;
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
    onStart(searchedByPlayerId) {
        if (this.tickId !== undefined) {
            this.update.remove(this.tickId);
            this.tickId = undefined;
        }
        this.searchedByPlayerId = searchedByPlayerId;
        this.tickId = this.update.add(() => this.tick());
        this.openPosition = alt.Player.local.pos;
    }
    tick() {
        if (this.math.distance(alt.Player.local.pos, this.openPosition) > 0.5) {
            this.close();
        }
    }
    close() {
        this.event.emitServer("frisk:interrupt", this.searchedByPlayerId);
    }
};
__decorate([
    onServer("frisk:start"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FriskHandler.prototype, "onStart", null);
FriskHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, LoggerModule, CameraModule, GuiModule, MarkerModule, BlipModule, UpdateModule, MathModule, Player])
], FriskHandler);
export { FriskHandler };
//# sourceMappingURL=frisk.handler.js.map
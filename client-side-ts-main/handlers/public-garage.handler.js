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
import { LoggerModule } from "../modules/logger.module";
import { UpdateModule } from "../modules/update.module";
import { TextModule } from "../modules/text.module";
import { BlipModule } from "../modules/blip.module";
import { EventModule } from "../modules/event.module";
import { Player } from "@extensions/player.extensions";
import { GuiModule } from "../modules/gui.module";
let PublicGarageHandler = class PublicGarageHandler {
    text;
    update;
    blip;
    logger;
    event;
    player;
    gui;
    constructor(text, update, blip, logger, event, player, gui) {
        this.text = text;
        this.update = update;
        this.blip = blip;
        this.logger = logger;
        this.event = event;
        this.player = player;
        this.gui = gui;
    }
    onSetupUnpark(vehicles) {
        this.player.openMenu();
        this.player.blockGameControls(true);
        this.player.showCursor();
        this.gui.focusView();
        this.event.emitGui("publicgarage:setupunpark", vehicles);
    }
    onShowRespawnVehicleList(vehicles) {
        this.player.openMenu();
        this.player.blockGameControls(true);
        this.player.showCursor();
        this.gui.focusView();
        this.event.emitGui("publicgarage:showrespawnvehiclelist", vehicles);
    }
};
__decorate([
    onServer("publicgarage:setupunpark"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], PublicGarageHandler.prototype, "onSetupUnpark", null);
__decorate([
    onServer("publicgarage:showrespawnvehiclelist"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], PublicGarageHandler.prototype, "onShowRespawnVehicleList", null);
PublicGarageHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [TextModule, UpdateModule, BlipModule, LoggerModule, EventModule, Player, GuiModule])
], PublicGarageHandler);
export { PublicGarageHandler };
//# sourceMappingURL=public-garage.handler.js.map
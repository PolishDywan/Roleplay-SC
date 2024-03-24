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
import { LoggerModule } from "../../modules/logger.module";
import { onGui, onServer } from "../../decorators/events";
import { Player } from "../../extensions/player.extensions";
import { GuiModule } from "../../modules/gui.module";
import { EventModule } from "../../modules/event.module";
import { NotificationModule } from "../../modules/notification.module";
import { MathModule } from "../../modules/math.module";
import alt from "alt-client";
let GasStationHandler = class GasStationHandler {
    logger;
    notification;
    player;
    gui;
    event;
    math;
    distanceCheckInt = 0;
    constructor(logger, notification, player, gui, event, math) {
        this.logger = logger;
        this.notification = notification;
        this.player = player;
        this.gui = gui;
        this.event = event;
        this.math = math;
    }
    onOpenRefuelMenu(maxPossibleFuel, fuelPrice) {
        this.player.openMenu();
        this.player.freeze();
        this.player.showCursor();
        this.gui.focusView();
        this.event.emitGui("gasstation:openrefuelmenu", maxPossibleFuel, fuelPrice);
    }
    onStartDistanceCheck() {
        const cachedPlayerPos = alt.Player.local.pos;
        this.distanceCheckInt = alt.setInterval(() => {
            if (this.math.distance(alt.Player.local.pos, cachedPlayerPos) > 30) {
                // If player is to far away from gas station.
                this.event.emitServer("gasstation:playerleftarea");
                alt.clearInterval(this.distanceCheckInt);
            }
        }, 1000);
    }
    onStopDistanceCheck() {
        alt.clearInterval(this.distanceCheckInt);
    }
    onCloseMenu() {
        this.player.closeMenu();
        this.player.unfreeze();
        this.player.hideCursor();
        this.gui.unfocusView();
    }
};
__decorate([
    onServer("gasstation:openrefuelmenu"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], GasStationHandler.prototype, "onOpenRefuelMenu", null);
__decorate([
    onServer("gasstation:startdistancecheck"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GasStationHandler.prototype, "onStartDistanceCheck", null);
__decorate([
    onServer("gasstation:stopdistancecheck"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GasStationHandler.prototype, "onStopDistanceCheck", null);
__decorate([
    onGui("gasstation:close"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GasStationHandler.prototype, "onCloseMenu", null);
GasStationHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [LoggerModule, NotificationModule, Player, GuiModule, EventModule, MathModule])
], GasStationHandler);
export { GasStationHandler };
//# sourceMappingURL=gas-station.handler.js.map
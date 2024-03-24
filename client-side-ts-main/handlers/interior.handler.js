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
import { LoggerModule } from "../modules/logger.module";
import { Player } from "@extensions/player.extensions";
import { GuiModule } from "../modules/gui.module";
import { EventModule } from "../modules/event.module";
import { NotificationModule } from "../modules/notification.module";
import { onServer } from "../decorators/events";
let InteriorHandler = class InteriorHandler {
    logger;
    notification;
    player;
    gui;
    event;
    oldInterior = 0;
    intervalId;
    constructor(logger, notification, player, gui, event) {
        this.logger = logger;
        this.notification = notification;
        this.player = player;
        this.gui = gui;
        this.event = event;
    }
    startTracking() {
        if (this.intervalId) {
            alt.clearInterval(this.intervalId);
        }
        this.intervalId = alt.setInterval(() => this.interval(), 500);
    }
    interval() {
        const currInterior = native.getInteriorFromEntity(alt.Player.local.scriptID);
        // this.logger.info("currInterior: " + currInterior);
        if (!this.player.getIsInInterior && currInterior !== 0) {
            this.player.setIsInInterior = true;
            this.event.emitServer("interior:enter", currInterior);
            this.oldInterior = currInterior;
        }
        else {
            if (currInterior != this.oldInterior) {
                this.player.setIsInInterior = false;
                this.event.emitServer("interior:left", currInterior);
                this.oldInterior = 0;
            }
        }
    }
};
__decorate([
    onServer("character:spawn"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InteriorHandler.prototype, "startTracking", null);
InteriorHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [LoggerModule, NotificationModule, Player, GuiModule, EventModule])
], InteriorHandler);
export { InteriorHandler };
//# sourceMappingURL=interior.handler.js.map
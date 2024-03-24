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
import { LoggerModule } from "../logger.module";
import * as alt from "alt-client";
import * as native from "natives";
import { EventModule } from "../event.module";
let PedMenu = class PedMenu {
    logger;
    event;
    constructor(logger, event) {
        this.logger = logger;
        this.event = event;
    }
    interact(entityId) {
        const targetPlayer = alt.Player.all.find(x => x.scriptID === entityId);
        let targetPlayerId = -1;
        if (targetPlayer) {
            targetPlayerId = targetPlayer.getSyncedMeta("ID");
        }
        this.event.emitServer("pedactions:get", native.getEntityModel(entityId), targetPlayerId);
    }
};
PedMenu = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [LoggerModule, EventModule])
], PedMenu);
export { PedMenu };
//# sourceMappingURL=ped.menu.js.map
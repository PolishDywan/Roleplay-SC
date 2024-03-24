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
import { EventModule } from "../event.module";
let PlayerMenu = class PlayerMenu {
    logger;
    event;
    constructor(logger, event) {
        this.logger = logger;
        this.event = event;
    }
    interact(entityId) {
        this.event.emitServer("playeractions:get");
    }
};
PlayerMenu = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [LoggerModule, EventModule])
], PlayerMenu);
export { PlayerMenu };
//# sourceMappingURL=player.menu.js.map
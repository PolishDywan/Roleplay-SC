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
import { EventModule } from "../modules/event.module";
import { onServer } from "../decorators/events";
import { foundation } from "../decorators/foundation";
import { Player } from "@extensions/player.extensions";
import { LoggerModule } from "../modules/logger.module";
let DefinedJobHandler = class DefinedJobHandler {
    player;
    event;
    logger;
    constructor(player, event, logger) {
        this.player = player;
        this.event = event;
        this.logger = logger;
    }
    openMenu(jobs, playerDefinedJob) {
        this.event.emitGui("jobmenu:setup", jobs, playerDefinedJob);
    }
};
__decorate([
    onServer("definedjob:openmenu"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", void 0)
], DefinedJobHandler.prototype, "openMenu", null);
DefinedJobHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [Player, EventModule, LoggerModule])
], DefinedJobHandler);
export { DefinedJobHandler };
//# sourceMappingURL=defined-job.handler.js.map
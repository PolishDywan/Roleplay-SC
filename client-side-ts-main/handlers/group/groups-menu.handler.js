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
import { onGui } from "../../decorators/events";
import { EventModule } from "../../modules/event.module";
import { Player } from "../../extensions/player.extensions";
let GroupsMenuHandler = class GroupsMenuHandler {
    event;
    player;
    constructor(event, player) {
        this.event = event;
        this.player = player;
    }
    onLeaveCompany(id) {
        this.event.emitServer("companymenu:leavegroup", id);
    }
};
__decorate([
    onGui("companymenu:leavegroup"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GroupsMenuHandler.prototype, "onLeaveCompany", null);
GroupsMenuHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, Player])
], GroupsMenuHandler);
export { GroupsMenuHandler };
//# sourceMappingURL=groups-menu.handler.js.map
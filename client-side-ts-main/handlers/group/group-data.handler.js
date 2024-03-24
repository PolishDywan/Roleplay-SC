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
import { foundation } from "../../decorators/foundation";
import { onServer } from "../../decorators/events";
import { EventModule } from "../../modules/event.module";
import { HouseModule } from "../../modules/house.module";
import { LoggerModule } from "../../modules/logger.module";
import { GroupModule } from "../../modules/group.module";
let GroupDataHandler = class GroupDataHandler {
    event;
    house;
    logger;
    group;
    constructor(event, house, logger, group) {
        this.event = event;
        this.house = house;
        this.logger = logger;
        this.group = group;
    }
    onSetup(allGroups, groups, company, faction) {
        for (let i = 0; i < allGroups.length; i++) {
            const group = allGroups[i];
            for (let g = 0; g < group.houses.length; g++) {
                group.houses[g].streetName = this.house.getStreet(group.houses[g].streetDirection, new alt.Vector3(group.houses[g].positionX, group.houses[g].positionY, group.houses[g].positionZ));
            }
        }
        if (company !== null) {
            for (let g = 0; g < company.houses.length; g++) {
                company.houses[g].streetName = this.house.getStreet(company.houses[g].streetDirection, new alt.Vector3(company.houses[g].positionX, company.houses[g].positionY, company.houses[g].positionZ));
            }
        }
        if (faction !== null) {
            for (let g = 0; g < faction.houses.length; g++) {
                faction.houses[g].streetName = this.house.getStreet(faction.houses[g].streetDirection, new alt.Vector3(faction.houses[g].positionX, faction.houses[g].positionY, faction.houses[g].positionZ));
            }
        }
        this.group.setup(allGroups, groups, company, faction);
        this.event.emitGui("group:setup", allGroups, groups, company, faction);
    }
};
__decorate([
    onServer("group:setup"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Array, Object, Object]),
    __metadata("design:returntype", void 0)
], GroupDataHandler.prototype, "onSetup", null);
GroupDataHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, HouseModule, LoggerModule, GroupModule])
], GroupDataHandler);
export { GroupDataHandler };
//# sourceMappingURL=group-data.handler.js.map
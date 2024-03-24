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
import { EntityType } from "@enums/entity.type";
import { PedSyncModule } from "../../modules/ped-sync.module";
import { on } from "../../decorators/events";
let PedSyncHandler = class PedSyncHandler {
    pedSync;
    constructor(pedSync) {
        this.pedSync = pedSync;
        alt.onServer("entitySync:create", (id, entityType, position, currEntityData) => {
            if (currEntityData) {
                const data = currEntityData;
                if (data != undefined) {
                    if (entityType === EntityType.Ped) {
                        pedSync.add(id, data.model, position, data.heading, data.vehicle, data.seat, data.characterModel);
                    }
                }
            }
            else {
                if (entityType === EntityType.Ped) {
                    pedSync.restore(id);
                }
            }
        });
        alt.onServer("entitySync:remove", (id, entityType) => {
            if (entityType === EntityType.Ped) {
                pedSync.remove(id);
            }
        });
        alt.onServer("entitySync:updatePosition", (id, entityType, position) => {
            if (entityType === EntityType.Ped) {
                pedSync.setPosition(id, position);
            }
        });
        alt.onServer("entitySync:clearCache", (id, entityType) => {
            if (entityType === EntityType.Ped) {
                pedSync.clear(id);
            }
        });
        alt.onServer("entitySync:updateData", (id, entityType, newEntityData) => {
            if (entityType === EntityType.Ped) {
                if (newEntityData.hasOwnProperty("heading")) {
                    pedSync.setHeading(id, newEntityData.heading);
                }
            }
        });
    }
    onPlayerDisconnect() {
        this.pedSync.clearAll();
    }
};
__decorate([
    on("disconnect"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PedSyncHandler.prototype, "onPlayerDisconnect", null);
PedSyncHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [PedSyncModule])
], PedSyncHandler);
export { PedSyncHandler };
//# sourceMappingURL=ped-sync.handler.js.map
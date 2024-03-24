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
import { DoorSyncModule } from "../../modules/door-sync.module";
import { on } from "../../decorators/events";
let DoorSyncHandler = class DoorSyncHandler {
    doorSync;
    constructor(doorSync) {
        this.doorSync = doorSync;
        alt.onServer("entitySync:create", (id, entityType, position, currEntityData) => {
            if (currEntityData) {
                const data = currEntityData;
                if (data != undefined) {
                    if (entityType === EntityType.Door) {
                        doorSync.add(id, position, data.heading, data.hash, data.locked);
                    }
                }
            }
            else {
                if (entityType === EntityType.Door) {
                    doorSync.restore(id);
                }
            }
        });
        alt.onServer("entitySync:remove", (id, entityType) => {
            if (entityType === EntityType.Door) {
                doorSync.remove(id);
            }
        });
        alt.onServer("entitySync:clearCache", (id, entityType) => {
            if (entityType === EntityType.Door) {
                doorSync.remove(id);
            }
        });
        alt.onServer("entitySync:updatePosition", (id, entityType, position) => {
            if (entityType === EntityType.Door) {
                doorSync.setPosition(id, position);
            }
        });
        alt.onServer("entitySync:updateData", (id, entityType, newEntityData) => {
            if (entityType === EntityType.Door) {
                if (newEntityData.hasOwnProperty("locked")) {
                    doorSync.setLockState(id, newEntityData.locked);
                }
            }
        });
    }
    onPlayerDisconnect() {
        this.doorSync.clearAll();
    }
};
__decorate([
    on("disconnect"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DoorSyncHandler.prototype, "onPlayerDisconnect", null);
DoorSyncHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [DoorSyncModule])
], DoorSyncHandler);
export { DoorSyncHandler };
//# sourceMappingURL=door-sync.handler.js.map
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
import { BlipSyncModule } from "../../modules/blip-sync.module";
import { on } from "../../decorators/events";
let BlipSyncHandler = class BlipSyncHandler {
    blipSync;
    constructor(blipSync) {
        this.blipSync = blipSync;
        alt.onServer("entitySync:create", (id, entityType, position, currEntityData) => {
            if (currEntityData) {
                const data = currEntityData;
                if (data != undefined) {
                    if (entityType === EntityType.Blip) {
                        blipSync.add(id, position, data.name, data.sprite, data.color, data.scale, data.shortRange, data.player, data.blipType, data.radius, data.alpha);
                    }
                }
            }
            else {
                if (entityType === EntityType.Blip) {
                    blipSync.restore(id);
                }
            }
        });
        alt.onServer("entitySync:remove", (id, entityType) => {
            if (entityType === EntityType.Blip) {
                blipSync.remove(id);
            }
        });
        alt.onServer("entitySync:clearCache", (id, entityType) => {
            if (entityType === EntityType.Blip) {
                blipSync.clear(id);
            }
        });
        alt.onServer("entitySync:updatePosition", (id, entityType, position) => {
            if (entityType === EntityType.Blip) {
                blipSync.setPosition(id, position);
            }
        });
        alt.onServer("entitySync:updateData", (id, entityType, newEntityData) => {
            if (entityType === EntityType.Blip) {
                // if (newEntityData.hasOwnProperty("locked")) {
                //     blipSync.setLockState(id, newEntityData.locked);
                // }
            }
        });
    }
    onPlayerDisconnect() {
        this.blipSync.clearAll();
    }
};
__decorate([
    on("disconnect"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlipSyncHandler.prototype, "onPlayerDisconnect", null);
BlipSyncHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [BlipSyncModule])
], BlipSyncHandler);
export { BlipSyncHandler };
//# sourceMappingURL=blip-sync.handler.js.map
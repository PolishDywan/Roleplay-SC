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
import { ObjectSyncModule } from "../../modules/object-sync.module";
import { on } from "../../decorators/events";
let ObjectSyncHandler = class ObjectSyncHandler {
    objectSync;
    constructor(objectSync) {
        this.objectSync = objectSync;
        alt.onServer("entitySync:create", (id, entityType, position, currEntityData) => {
            if (currEntityData) {
                const data = currEntityData;
                if (data != undefined) {
                    if (entityType === EntityType.Object) {
                        objectSync.add(id, data.model, data.name, position, data.rotation, data.freeze, data.onFire, data.itemId, data.ownerName, data.createdAtJson);
                    }
                }
            }
            else {
                if (entityType === EntityType.Object) {
                    objectSync.restore(id);
                }
            }
        });
        alt.onServer("entitySync:remove", (id, entityType) => {
            if (entityType === EntityType.Object) {
                objectSync.remove(id);
            }
        });
        alt.onServer("entitySync:clearCache", (id, entityType) => {
            if (entityType === EntityType.Object) {
                objectSync.clear(id);
            }
        });
    }
    onPlayerDisconnect() {
        this.objectSync.clearAll();
    }
};
__decorate([
    on("disconnect"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ObjectSyncHandler.prototype, "onPlayerDisconnect", null);
ObjectSyncHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [ObjectSyncModule])
], ObjectSyncHandler);
export { ObjectSyncHandler };
//# sourceMappingURL=object-sync.handler.js.map
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
import { foundation } from "../../decorators/foundation";
import { EventModule } from "../event.module";
import { ObjectSyncModule } from "../object-sync.module";
import { LoggerModule } from "../logger.module";
import { Player } from "../../extensions/player.extensions";
let ObjectMenu = class ObjectMenu {
    event;
    objectSync;
    logger;
    player;
    constructor(event, objectSync, logger, player) {
        this.event = event;
        this.objectSync = objectSync;
        this.logger = logger;
        this.player = player;
    }
    interact(entityId) {
        const model = native.getEntityModel(entityId);
        if (this.player.isAduty) {
            alt.logWarning("Id: " + model + ", Position: " + JSON.stringify(native.getEntityCoords(entityId, false)));
        }
        let droppedObjId = undefined;
        const object = this.objectSync.getObjectByEntity(entityId);
        if (object) {
            droppedObjId = object.id;
        }
        this.event.emitServer("objectactions:get", entityId, model, droppedObjId);
    }
};
ObjectMenu = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, ObjectSyncModule, LoggerModule, Player])
], ObjectMenu);
export { ObjectMenu };
//# sourceMappingURL=object.menu.js.map
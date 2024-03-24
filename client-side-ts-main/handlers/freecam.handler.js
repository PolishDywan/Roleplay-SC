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
import { foundation } from "../decorators/foundation";
import { on, onServer } from "../decorators/events";
import { FreeCamModule } from "../modules/free-cam.module";
let FreeCamHandler = class FreeCamHandler {
    freecam;
    constructor(freecam) {
        this.freecam = freecam;
    }
    onStreamSyncedMetaChange(entity, key, value, oldValue) {
        native.setEntityAlpha(entity.scriptID, entity.hasStreamSyncedMeta("FREECAM") ? 0 : 255, false);
        native.setEntityCollision(entity.scriptID, !entity.hasStreamSyncedMeta("FREECAM"), false);
        native.freezeEntityPosition(entity.scriptID, entity.hasStreamSyncedMeta("FREECAM"));
        native.setPedCanBeTargetted(entity.scriptID, !entity.hasStreamSyncedMeta("FREECAM"));
        native.removeAllPedWeapons(entity.scriptID, true);
    }
    onGameEntityCreate(entity) {
        native.setEntityAlpha(entity.scriptID, entity.hasStreamSyncedMeta("FREECAM") ? 0 : 255, false);
        native.setEntityCollision(entity.scriptID, !entity.hasStreamSyncedMeta("FREECAM"), false);
        native.freezeEntityPosition(entity.scriptID, entity.hasStreamSyncedMeta("FREECAM"));
        native.setPedCanBeTargetted(entity.scriptID, !entity.hasStreamSyncedMeta("FREECAM"));
    }
    onOpen() {
        const camPos = alt.Player.local.pos;
        const camRot = alt.Player.local.rot;
        this.freecam.start(camPos, camRot);
    }
    onSetPos(pos) {
        this.freecam.setPos(pos);
    }
    onClose(teleportToPosition) {
        this.freecam.stop(teleportToPosition);
    }
};
__decorate([
    on("streamSyncedMetaChange"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [alt.Entity, String, Object, Object]),
    __metadata("design:returntype", void 0)
], FreeCamHandler.prototype, "onStreamSyncedMetaChange", null);
__decorate([
    on("gameEntityCreate"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [alt.Entity]),
    __metadata("design:returntype", void 0)
], FreeCamHandler.prototype, "onGameEntityCreate", null);
__decorate([
    onServer("freecam:open"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FreeCamHandler.prototype, "onOpen", null);
__decorate([
    onServer("freecam:setpos"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [alt.Vector3]),
    __metadata("design:returntype", void 0)
], FreeCamHandler.prototype, "onSetPos", null);
__decorate([
    onServer("freecam:close"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], FreeCamHandler.prototype, "onClose", null);
FreeCamHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [FreeCamModule])
], FreeCamHandler);
export { FreeCamHandler };
//# sourceMappingURL=freecam.handler.js.map
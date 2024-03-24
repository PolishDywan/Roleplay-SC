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
import { foundation } from "../decorators/foundation";
import { on } from "../decorators/events";
import alt from "alt-client";
import native from "natives";
import { EventModule } from "../modules/event.module";
import { KeyCodes } from "@enums/keycode.type";
import { Player } from "@extensions/player.extensions";
import { METAKEY_STREAM_SYNC } from "data/custom-player-stream-synced-meta.interface";
let VehicleSirenHandler = class VehicleSirenHandler {
    event;
    player;
    constructor(event, player) {
        this.event = event;
        this.player = player;
    }
    keydown(key) {
        if (!alt.Player.local.vehicle || this.player.getIsAnyMenuOpen) {
            return;
        }
        if (key === KeyCodes.G) {
            this.event.emitServer("vehiclesiren:toggle");
        }
    }
    onStreamSyncedMetaChange(entity, key, value, oldValue) {
        if (!entity.hasStreamSyncedMeta("SIREN_MUTED")) {
            return;
        }
        const muted = entity.getStreamSyncedMeta(METAKEY_STREAM_SYNC.SIREN_MUTED);
        native.setVehicleHasMutedSirens(entity.scriptID, muted);
    }
};
__decorate([
    on("keydown"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VehicleSirenHandler.prototype, "keydown", null);
__decorate([
    on("streamSyncedMetaChange"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [alt.Entity, String, Object, Object]),
    __metadata("design:returntype", void 0)
], VehicleSirenHandler.prototype, "onStreamSyncedMetaChange", null);
VehicleSirenHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, Player])
], VehicleSirenHandler);
export { VehicleSirenHandler };
//# sourceMappingURL=vehicle-siren.handler.js.map
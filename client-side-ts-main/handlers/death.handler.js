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
import { EventModule } from "../modules/event.module";
import { AnimationModule } from "../modules/animation.module";
import { on, onServer } from "../decorators/events";
import alt from "alt-client";
import native from "natives";
import { UpdateModule } from "../modules/update.module";
import { LoggerModule } from "../modules/logger.module";
import { METAKEY_STREAM_SYNC } from "data/custom-player-stream-synced-meta.interface";
let DeathHandler = class DeathHandler {
    event;
    animation;
    update;
    logger;
    tick;
    constructor(event, animation, update, logger) {
        this.event = event;
        this.animation = animation;
        this.update = update;
        this.logger = logger;
    }
    async onStreamSyncedMetaChange(entity, key, value, oldValue) {
        if (!entity.hasStreamSyncedMeta("DEATH_STATE")) {
            return;
        }
        const deathState = alt.Player.local.getStreamSyncedMeta(METAKEY_STREAM_SYNC.DEATH_STATE);
    }
    async onStart() {
        native.setPedCanBeTargetted(alt.Player.local.scriptID, false);
        native.setEntityInvincible(alt.Player.local.scriptID, true);
        native.setPedCanRagdoll(alt.Player.local.scriptID, true);
        alt.setTimeout(() => {
            native.freezeEntityPosition(alt.Player.local.scriptID, true);
        }, 1000);
    }
    async onRevive() {
        native.setPedCanBeTargetted(alt.Player.local.scriptID, true);
        native.setEntityInvincible(alt.Player.local.scriptID, false);
        native.setPedCanRagdoll(alt.Player.local.scriptID, true);
        alt.setTimeout(() => {
            native.freezeEntityPosition(alt.Player.local.scriptID, false);
        }, 1000);
    }
};
__decorate([
    on("streamSyncedMetaChange"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [alt.Entity, String, Object, Object]),
    __metadata("design:returntype", Promise)
], DeathHandler.prototype, "onStreamSyncedMetaChange", null);
__decorate([
    onServer("death:start"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeathHandler.prototype, "onStart", null);
__decorate([
    onServer("death:revive"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeathHandler.prototype, "onRevive", null);
DeathHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, AnimationModule, UpdateModule, LoggerModule])
], DeathHandler);
export { DeathHandler };
//# sourceMappingURL=death.handler.js.map
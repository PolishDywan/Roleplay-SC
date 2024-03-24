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
import { LoggerModule } from "./logger.module";
import { BlipType } from "@enums/blip.type";
let BlipSyncModule = class BlipSyncModule {
    logger;
    blips = new Map();
    constructor(logger) {
        this.logger = logger;
    }
    add(id, position, name, sprite, color, scale, shortRange, player, blipType, radius, alpha) {
        if (player !== null && player.id !== alt.Player.local.id) {
            return;
        }
        let handle = null;
        switch (blipType) {
            case BlipType.POINT:
                handle = new alt.PointBlip(position.x, position.y, position.z);
                handle.sprite = sprite;
                handle.scale = scale;
                break;
            case BlipType.RADIUS:
                handle = new alt.RadiusBlip(position.x, position.y, position.z, radius);
                break;
        }
        if (handle === null) {
            return;
        }
        handle.alpha = alpha;
        handle.color = color;
        handle.name = name;
        handle.shortRange = shortRange;
        this.blips.set(id, {
            id: id,
            handle: handle,
            position: position,
            sprite: sprite,
            color: color,
            scale: scale,
            name: name,
            shortRange: shortRange,
            blipType: blipType,
            player: player,
            radius: radius
        });
    }
    get(entityId) {
        if (this.blips.has(entityId)) {
            return this.blips[entityId];
        }
        else {
            return null;
        }
    }
    restore(id) {
        if (this.blips.has(id)) {
            const blip = this.blips.get(id);
            if (blip.player !== null && blip.player.id !== alt.Player.local.id) {
                return;
            }
            let handle = null;
            switch (blip.blipType) {
                case BlipType.POINT:
                    handle = new alt.PointBlip(blip.position.x, blip.position.y, blip.position.z);
                    handle.sprite = blip.sprite;
                    handle.scale = blip.scale;
                    break;
                case BlipType.RADIUS:
                    handle = new alt.RadiusBlip(blip.position.x, blip.position.y, blip.position.z, blip.radius);
                    break;
            }
            if (handle === null) {
                return;
            }
            blip.handle.sprite = blip.sprite;
            blip.handle.color = blip.color;
            blip.handle.scale = blip.scale;
            blip.handle.name = blip.name;
            blip.handle.shortRange = blip.shortRange;
        }
    }
    remove(id) {
        if (this.blips.has(id)) {
            this.blips.get(id).handle.destroy();
            this.blips.get(id).handle = null;
            this.blips.delete(id);
        }
    }
    clear(id) {
        if (this.blips.has(id)) {
            this.blips.get(id).handle.destroy();
            this.blips.get(id).handle = null;
            this.blips.delete(id);
        }
    }
    clearAll() {
        this.blips.forEach((blip) => {
            blip.handle.destroy();
        });
        this.blips = new Map();
    }
    setPosition(id, position) {
        if (this.blips.has(id)) {
            this.blips.get(id).handle.pos = position;
            this.blips.get(id).position = position;
        }
    }
};
BlipSyncModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [LoggerModule])
], BlipSyncModule);
export { BlipSyncModule };
//# sourceMappingURL=blip-sync.module.js.map
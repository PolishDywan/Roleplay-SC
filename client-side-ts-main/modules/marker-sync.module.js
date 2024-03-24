var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as native from "natives";
import { singleton } from "tsyringe";
import { UpdateModule } from "./update.module";
import { Player } from "@extensions/player.extensions";
import { TextModule } from "./text.module";
import { DateModule } from "./date.module";
import { LoggerModule } from "./logger.module";
let MarkerSyncModule = class MarkerSyncModule {
    update;
    player;
    text;
    date;
    logger;
    markers = [];
    constructor(update, player, text, date, logger) {
        this.update = update;
        this.player = player;
        this.text = text;
        this.date = date;
        this.logger = logger;
        this.update.add(() => {
            for (const key in this.markers) {
                const marker = this.markers[key];
                if (marker.onDisplay) {
                    native.drawMarker(marker.markerType, marker.position.x, marker.position.y, marker.position.z, marker.direction.x, marker.direction.y, marker.direction.z, marker.rotation.x, marker.rotation.y, marker.rotation.z, marker.scale.x, marker.scale.y, marker.scale.z, marker.color.red, marker.color.green, marker.color.blue, marker.color.alpha, marker.bobUpDown, false, 2, false, undefined, undefined, false);
                    if (marker.text.length !== 0) {
                        this.text.drawText3dWithDistance(marker.text, marker.position.x, marker.position.y, marker.position.z + 1, 0.4, 0, 255, 255, 255, 175, false, true, 10);
                    }
                    if (this.player.isAduty && marker.ownerName && marker.createdAtJson) {
                        this.text.drawText3dWithDistance(`Erstellt von: ${marker.ownerName}\nErstellt um: ${this.date.getDate(marker.createdAtJson)}`, marker.position.x, marker.position.y, marker.position.z + 0.5, 0.4, 0, marker.color.red, marker.color.green, marker.color.blue, 255, false, true, 5);
                    }
                }
            }
        });
    }
    add(id, markerType, position, direction, rotation, scale, color, bobUpDown, text, ownerName, createdAtJson) {
        this.remove(id);
        this.clear(id);
        this.markers[id] = {
            id: id,
            markerType: markerType,
            position: position,
            direction: direction,
            rotation: rotation,
            scale: scale,
            color: color,
            onDisplay: true,
            bobUpDown: bobUpDown,
            text: text,
            ownerName: ownerName,
            createdAtJson: createdAtJson
        };
    }
    restore(id) {
        if (this.markers.hasOwnProperty(id)) {
            this.markers[id].onDisplay = true;
        }
    }
    remove(id) {
        if (this.markers.hasOwnProperty(id)) {
            this.markers[id].onDisplay = false;
        }
    }
    clear(id) {
        if (this.markers.hasOwnProperty(id)) {
            delete this.markers[id];
        }
    }
    clearAll() {
        this.markers = [];
    }
    setBobUpDown(id, bobUpDown = false) {
        if (this.markers.hasOwnProperty(id)) {
            this.markers[id].bobUpDown = bobUpDown;
        }
    }
    setColor(id, color) {
        if (this.markers.hasOwnProperty(id)) {
            this.markers[id].color = color;
        }
    }
    setScale(id, scale) {
        if (this.markers.hasOwnProperty(id)) {
            this.markers[id].scale = scale;
        }
    }
    setDirection(id, direction) {
        if (this.markers.hasOwnProperty(id)) {
            this.markers[id].direction = direction;
        }
    }
    setRotation(id, rotation) {
        if (this.markers.hasOwnProperty(id)) {
            this.markers[id].rotation = rotation;
        }
    }
    setPosition(id, position) {
        if (this.markers.hasOwnProperty(id)) {
            this.markers[id].position = position;
        }
    }
};
MarkerSyncModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [UpdateModule, Player, TextModule, DateModule, LoggerModule])
], MarkerSyncModule);
export { MarkerSyncModule };
//# sourceMappingURL=marker-sync.module.js.map
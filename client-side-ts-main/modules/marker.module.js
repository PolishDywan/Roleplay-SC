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
import { MathModule } from "./math.module";
import { Player } from "@extensions/player.extensions";
let MarkerModule = class MarkerModule {
    math;
    player;
    constructor(math, player) {
        this.math = math;
        this.player = player;
    }
    drawMarkerWithDistance(marker, distance = 5) {
        if (this.math.distance(alt.Player.local.pos, new alt.Vector3(marker.positionX, marker.positionY, marker.positionZ)) <= distance) {
            this.drawMarker(marker);
        }
    }
    drawMarker(marker) {
        native.drawMarker(marker.type, marker.positionX, marker.positionY, marker.positionZ, 0, 0, 0, 0, 0, 0, marker.sizeX, marker.sizeY, marker.sizeZ, marker.red, marker.green, marker.blue, marker.alpha, marker.bobUpAndDown, false, 2, false, undefined, undefined, false);
    }
};
MarkerModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [MathModule, Player])
], MarkerModule);
export { MarkerModule };
//# sourceMappingURL=marker.module.js.map
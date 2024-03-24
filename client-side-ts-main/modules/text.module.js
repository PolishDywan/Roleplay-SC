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
import { Vector3 } from "@extensions/vector3.extensions";
import { Player } from "@extensions/player.extensions";
let TextModule = class TextModule {
    math;
    player;
    constructor(math, player) {
        this.math = math;
        this.player = player;
    }
    drawText2d(message, posX, posY, scale, fontType, align, r, g, b, a, useOutline = true, useDropShadow = true) {
        native.beginTextCommandDisplayText('STRING');
        native.addTextComponentSubstringPlayerName(message);
        native.setTextFont(fontType);
        native.setTextScale(1, scale);
        native.setTextWrap(0.0, 1.0);
        native.setTextCentre(true);
        native.setTextColour(r, g, b, a);
        native.setTextJustification(align);
        if (useOutline)
            native.setTextOutline();
        if (useDropShadow)
            native.setTextDropShadow();
        native.endTextCommandDisplayText(posX, posY, 0);
    }
    drawText3d(message, posX, posY, posZ, scale, fontType, r, g, b, a, useOutline = true, useDropShadow = true) {
        native.setDrawOrigin(posX, posY, posZ, null);
        native.beginTextCommandDisplayText('STRING');
        native.addTextComponentSubstringPlayerName(message);
        native.setTextFont(fontType);
        native.setTextScale(1, scale);
        native.setTextWrap(0.0, 1.0);
        native.setTextCentre(true);
        native.setTextColour(r, g, b, a);
        if (useOutline) {
            native.setTextOutline();
        }
        if (useDropShadow) {
            native.setTextDropShadow();
        }
        native.endTextCommandDisplayText(0, 0, 0);
        native.clearDrawOrigin();
    }
    drawText3dWithDistance(message, posX, posY, posZ, scale, fontType, r, g, b, a, useOutline = true, useDropShadow = true, distance = 20) {
        if (this.math.distance(alt.Player.local.pos, new Vector3(posX, posY, posZ)) <= distance) {
            this.drawText3d(message, posX, posY, posZ, scale, fontType, r, g, b, a, useOutline, useDropShadow);
        }
    }
};
TextModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [MathModule, Player])
], TextModule);
export { TextModule };
//# sourceMappingURL=text.module.js.map
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
let BlipModule = class BlipModule {
    constructor() {
    }
    createBlip(position, color, sprite, text, longRangeVisible = true) {
        const blip = native.addBlipForCoord(position.x, position.y, position.z);
        native.setBlipSprite(blip, sprite);
        native.setBlipNameFromTextFile(blip, text);
        native.setBlipColour(blip, color);
        native.setBlipDisplay(blip, longRangeVisible ? 2 : 8);
        native.setBlipAsShortRange(blip, !longRangeVisible);
        return blip;
    }
    createBlipForEntity(target, color, sprite, text = null, longRangeVisible = true) {
        const blip = native.addBlipForEntity(target);
        native.setBlipSprite(blip, sprite);
        native.setBlipNameFromTextFile(blip, text);
        native.setBlipColour(blip, color);
        native.setBlipDisplay(blip, longRangeVisible ? 2 : 8);
        return blip;
    }
    destroyBlipForEntity(target) {
        const blip = native.getBlipFromEntity(target);
        if (native.doesBlipExist(blip)) {
            native.removeBlip(blip);
        }
    }
    destroyBlip(blipId) {
        if (native.doesBlipExist(blipId)) {
            native.removeBlip(blipId);
        }
    }
};
BlipModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], BlipModule);
export { BlipModule };
//# sourceMappingURL=blip.module.js.map
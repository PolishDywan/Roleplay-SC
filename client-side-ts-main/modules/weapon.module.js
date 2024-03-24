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
import { EventModule } from "./event.module";
import { LoggerModule } from "./logger.module";
let WeaponModule = class WeaponModule {
    event;
    logger;
    constructor(event, logger) {
        this.event = event;
        this.logger = logger;
    }
    static getWeaponOfAmmoType(name) {
        switch (name) {
            case "AMMO_PISTOL":
                return 0x1B06D571; // pistol
            case "AMMO_MACHINE_GUN":
                return 0x2BE6766B; // smg
            case "AMMO_ASSAULT":
                return 0xBFEFFF6D; // assault rifle
            case "AMMO_SNIPER":
                return 0x05FC3C11; // sniper
            case "AMMO_SHOTGUN":
                return 0x1D073A89; // shotgun
            case "AMMO_LIGHT_MACHINE_GUN":
                return 0x7FD62962; // combatmg
            default: {
                alt.logError("Kein Waffentyp mit den Namen " + name + " gefunden.");
                break;
            }
        }
    }
};
WeaponModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [EventModule, LoggerModule])
], WeaponModule);
export { WeaponModule };
//# sourceMappingURL=weapon.module.js.map
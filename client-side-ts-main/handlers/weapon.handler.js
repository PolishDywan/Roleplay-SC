var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import alt from "alt-client";
import native from "natives";
import { singleton } from "tsyringe";
import { foundation } from "../decorators/foundation";
import { GuiModule } from "../modules/gui.module";
import { EventModule } from "../modules/event.module";
import { onServer } from "../decorators/events";
import { WeaponModule } from "../modules/weapon.module";
import { Player } from "@extensions/player.extensions";
import { UpdateModule } from "../modules/update.module";
import { LoggerModule } from "../modules/logger.module";
let WeaponHandler = class WeaponHandler {
    gui;
    event;
    player;
    update;
    logger;
    wasShooting = false;
    constructor(gui, event, player, update, logger) {
        this.gui = gui;
        this.event = event;
        this.player = player;
        this.update = update;
        this.logger = logger;
        this.update.add(() => this.tick());
    }
    onGiveAmmo(name, ammo) {
        native.addAmmoToPed(alt.Player.local.scriptID, WeaponModule.getWeaponOfAmmoType(name), ammo);
    }
    onRemoveAmmo(name, ammo) {
        native.addAmmoToPed(alt.Player.local.scriptID, WeaponModule.getWeaponOfAmmoType(name), -ammo);
    }
    tick() {
        if (native.isPedShooting(alt.Player.local)) {
            this.wasShooting = true;
        }
        else {
            if (this.wasShooting) {
                this.wasShooting = false;
                this.updateAmmoMeta();
            }
        }
    }
    updateAmmoMeta() {
        let pistolAmmo = native.getAmmoInPedWeapon(alt.Player.local, WeaponModule.getWeaponOfAmmoType("AMMO_PISTOL"));
        let machineGunAmmo = native.getAmmoInPedWeapon(alt.Player.local, WeaponModule.getWeaponOfAmmoType("AMMO_MACHINE_GUN"));
        let assaultAmmo = native.getAmmoInPedWeapon(alt.Player.local, WeaponModule.getWeaponOfAmmoType("AMMO_ASSAULT"));
        let sniperAmmo = native.getAmmoInPedWeapon(alt.Player.local, WeaponModule.getWeaponOfAmmoType("AMMO_SNIPER"));
        let shotgunAmmo = native.getAmmoInPedWeapon(alt.Player.local, WeaponModule.getWeaponOfAmmoType("AMMO_SHOTGUN"));
        let lightMachineGunAmmo = native.getAmmoInPedWeapon(alt.Player.local, WeaponModule.getWeaponOfAmmoType("AMMO_LIGHT_MACHINE_GUN"));
        // thorwables 
        let baseballAmmo = native.getAmmoInPedWeapon(alt.Player.local, 0x23C9F95C);
        let bzgasAmmo = native.getAmmoInPedWeapon(alt.Player.local, 0xA0973D5E);
        let flareAmmo = native.getAmmoInPedWeapon(alt.Player.local, 0x497FACC3);
        let grenadeAmmo = native.getAmmoInPedWeapon(alt.Player.local, 0x93E220BD);
        let molotovAmmo = native.getAmmoInPedWeapon(alt.Player.local, 0x24B17070);
        let snowballAmmo = native.getAmmoInPedWeapon(alt.Player.local, 0x787F0BB);
        this.event.emitServer("weapon:sendammo", JSON.stringify({
            PistolAmmo: pistolAmmo,
            MachineGunAmmo: machineGunAmmo,
            AssaultAmmo: assaultAmmo,
            SniperAmmo: sniperAmmo,
            ShotgunAmmo: shotgunAmmo,
            LightMachineGunAmmo: lightMachineGunAmmo,
            BaseballAmmo: baseballAmmo,
            BzgasAmmo: bzgasAmmo,
            FlareAmmo: flareAmmo,
            GrenadeAmmo: grenadeAmmo,
            MolotovAmmo: molotovAmmo,
            SnowballAmmo: snowballAmmo,
        }));
    }
};
__decorate([
    onServer("weapon:giveammo"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], WeaponHandler.prototype, "onGiveAmmo", null);
__decorate([
    onServer("weapon:removeammo"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], WeaponHandler.prototype, "onRemoveAmmo", null);
WeaponHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [GuiModule, EventModule, Player, UpdateModule, LoggerModule])
], WeaponHandler);
export { WeaponHandler };
//# sourceMappingURL=weapon.handler.js.map
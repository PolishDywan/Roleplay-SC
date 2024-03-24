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
import { container, singleton } from "tsyringe";
import { PrototypeFor } from "../decorators/prototype-for";
import { UpdateModule } from "../modules/update.module";
import { EventModule } from "../modules/event.module";
import { LoggerModule } from "../modules/logger.module";
import { CameraModule } from "../modules/camera.module";
import { InputType } from "@enums/input.type";
let Player = class Player extends alt.Player {
    update;
    event;
    logger;
    characterId;
    isFreezed;
    adminFreezed;
    isCrouched;
    isSpawnedCharacter;
    isAduty;
    isDuty;
    isInAPrison = false;
    isInHouse;
    isControlsEnabled = true;
    hasInteractionOpen = false;
    isInvBlocked;
    directions = [0, 45, 90, 135, 180, 225, 270, 315, 360];
    directionNames = ["N", "NW", "W", "SW", "S", "SO", "O", "NO", "N"];
    directionNamesLong = ["Nördlich", "Nord-westlich", "Westlich", "Süd-westlich", "Südlich", "Süd-westlich", "Östlich", "Nord-östlich", "Nördlich"];
    oldStreet = null;
    oldDirection = null;
    oldHealth = null;
    oldArmour = null;
    isInInterior = false;
    isCursorVisible;
    isChatting;
    isInventoryOpen;
    isPhoneOpen;
    isAnyTextFieldFocused;
    openMenuCount = 0;
    cameraLocked = true;
    escBlocked = false;
    constructor(update, event, logger) {
        super();
        this.update = update;
        this.event = event;
        this.logger = logger;
        this.update.add(() => this.tick());
    }
    set setIsInInterior(isInInterior) {
        this.isInInterior = isInInterior;
    }
    get getIsInInterior() {
        return this.isInInterior;
    }
    set setIsChatting(state) {
        this.isChatting = state;
    }
    ;
    get getIsChatting() {
        return this.isChatting;
    }
    ;
    set setIsInventoryOpen(state) {
        this.isInventoryOpen = state;
        this.event.emitServer("player:setinventorystate", this.isInventoryOpen);
    }
    get getIsInventoryOpen() {
        return this.isInventoryOpen;
    }
    set setIsPhoneOpen(state) {
        this.isPhoneOpen = state;
        this.event.emitServer("player:setphonestate", this.isPhoneOpen);
    }
    get getIsPhoneOpen() {
        return this.isPhoneOpen;
    }
    set setIsAnyTextFieldFocused(state) {
        this.isAnyTextFieldFocused = state;
        this.blockGameControls(state);
    }
    get getIsAnyTextOpen() {
        return this.isAnyTextFieldFocused || this.isChatting;
    }
    get getIsCursorVisible() {
        return this.isCursorVisible;
    }
    get getIsAnyMenuOpen() {
        return this.openMenuCount > 0 || this.getIsInventoryOpen;
    }
    openMenu() {
        this.openMenuCount++;
    }
    closeMenu() {
        this.openMenuCount--;
        if (this.openMenuCount < 0) {
            this.openMenuCount = 0;
        }
    }
    setVisible(state) {
        native.setEntityVisible(alt.Player.local.scriptID, state, false);
    }
    showCursor() {
        if (this.isCursorVisible)
            return;
        alt.showCursor(true);
        const [, x, y] = native.getActualScreenResolution(0, 0);
        const pos = new alt.Vector3(x * 0.5, y * 0.5, 0);
        alt.setCursorPos(pos);
        this.isCursorVisible = true;
    }
    hideCursor(force = false) {
        if (!force) {
            if (!this.isCursorVisible || this.getIsInventoryOpen || this.getIsPhoneOpen || this.getIsAnyMenuOpen) {
                return;
            }
        }
        alt.showCursor(false);
        this.isCursorVisible = false;
    }
    blurScreen(time = 0) {
        native.triggerScreenblurFadeIn(time);
        const int = alt.setInterval(() => {
            if (!native.isScreenblurFadeRunning()) {
                native.triggerScreenblurFadeIn(time);
                alt.clearInterval(int);
            }
        }, 1);
    }
    unblurScreen(time = 0) {
        native.triggerScreenblurFadeOut(time);
        const int = alt.setInterval(() => {
            if (!native.isScreenblurFadeRunning()) {
                native.triggerScreenblurFadeOut(time);
                alt.clearInterval(int);
            }
        }, 1);
    }
    fadeOut(time = 0) {
        native.doScreenFadeOut(time);
        alt.setTimeout(() => {
            this.event.emitGui("screen:disable");
        }, time);
    }
    fadeIn(time = 0) {
        native.doScreenFadeIn(time);
        alt.setTimeout(() => {
            this.event.emitGui("screen:enable");
        }, time * 0.9);
    }
    showRadarAndHud(force = false) {
        if (alt.Player.local.vehicle !== null || this.isAduty || force) {
            this.event.emitGui("hud:moveup");
            native.displayRadar(true);
        }
        native.displayHud(true);
    }
    hideRadarAndHud(force = false) {
        if (this.isAduty && !force || alt.Player.local.vehicle !== null && !force) {
            return;
        }
        native.displayRadar(false);
        native.displayHud(false);
    }
    showHud() {
        native.displayHud(true);
        this.event.emitGui("hud:toggleui", true);
    }
    hideHud() {
        native.displayHud(false);
    }
    showRadar() {
        this.event.emitGui("hud:moveup");
        native.displayRadar(true);
    }
    hideRadar() {
        if (this.isAduty || alt.Player.local.vehicle !== null) {
            return;
        }
        native.displayRadar(false);
        this.event.emitGui("hud:movedown");
    }
    blockGameControls(state) {
        this.logger.info(`Blocking game controls: ${state}`);
        if (!state && this.getIsAnyTextOpen) {
            return;
        }
        this.isControlsEnabled = !state;
        alt.toggleGameControls(!state);
    }
    lockCamera(state, force = false) {
        if (!force) {
            if (!state && (this.getIsInventoryOpen || this.getIsPhoneOpen)) {
                return;
            }
        }
        this.cameraLocked = state;
    }
    blockESC(state) {
        if (!state && (this.getIsInventoryOpen || this.getIsPhoneOpen)) {
            return;
        }
        this.escBlocked = state;
    }
    freeze(administrative = false) {
        this.isFreezed = true;
        if (!administrative && this.adminFreezed) {
            return;
        }
        if (administrative) {
            this.adminFreezed = true;
        }
        alt.toggleGameControls(false);
        native.freezeEntityPosition(alt.Player.local.scriptID, true);
        if (alt.Player.local.vehicle) {
            native.freezeEntityPosition(alt.Player.local.vehicle.scriptID, true);
        }
    }
    unfreeze(administrative = false) {
        this.isFreezed = false;
        if (!administrative && this.adminFreezed) {
            return;
        }
        if (administrative) {
            this.adminFreezed = false;
        }
        alt.toggleGameControls(true);
        native.freezeEntityPosition(alt.Player.local.scriptID, false);
        if (alt.Player.local.vehicle) {
            native.freezeEntityPosition(alt.Player.local.vehicle.scriptID, false);
        }
    }
    switchOut() {
        native.freezeEntityPosition(alt.Player.local.scriptID, true);
        native.switchToMultiFirstpart(alt.Player.local.scriptID, 0, 1);
    }
    switchIn() {
        native.switchToMultiSecondpart(alt.Player.local.scriptID);
        native.freezeEntityPosition(alt.Player.local.scriptID, true);
    }
    getBoneIndex(boneID) {
        return native.getPedBoneIndex(alt.Player.local.scriptID, boneID);
    }
    loadPlayerHead() {
        return new Promise(resolve => {
            const interval = alt.setInterval(() => {
                if (native.isPedheadshotReady(this.scriptID) && native.isPedheadshotValid(this.scriptID)) {
                    alt.clearInterval(interval);
                    return resolve(native.getPedheadshotTxdString(this.scriptID));
                }
            }, 0);
        });
    }
    showLoginCam() {
        const camera = container.resolve(CameraModule);
        camera.createCamera(new alt.Vector3(-102, -1315, 60), new alt.Vector3(0, 0, 208));
        native.setEntityCoords(alt.Player.local.scriptID, -124.1021, -1298.052, 29.37553, false, false, false, false);
    }
    updatePositionInHUD(force = false) {
        const getStreet = native.getStreetNameAtCoord(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, 0, 0);
        const streetName = native.getStreetNameFromHashKey(getStreet[1]);
        const crossingStreetName = native.getStreetNameFromHashKey(getStreet[2]);
        const zone = native.getFilenameForAudioConversation(native.getNameOfZone(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z));
        let direction = null;
        for (let index = 0; index < this.directions.length; index++) {
            const element = this.directions[index];
            const heading = native.getEntityHeading(alt.Player.local.scriptID);
            if (Math.abs(heading - element) < 22.5) {
                direction = this.directionNamesLong[index];
            }
        }
        if (force || this.oldStreet !== streetName || this.oldDirection !== direction) {
            this.oldDirection = direction;
            this.oldStreet = streetName;
            this.event.emitGui("hud:sendposition", zone, direction, streetName, crossingStreetName);
        }
    }
    updateHealthInHUD(force = false) {
        if (force || this.oldHealth != alt.Player.local.health || this.oldArmour != alt.Player.local.armour) {
            this.oldHealth = alt.Player.local.health;
            this.oldArmour = alt.Player.local.armour;
            this.event.emitGui("hud:updatehealth", this.oldHealth, this.oldArmour);
        }
    }
    clearTasksImmediately() {
        native.clearPedTasksImmediately(alt.Player.local.scriptID);
    }
    tick() {
        if (this.cameraLocked) {
            native.disableControlAction(0, InputType.LOOK_LR, true);
            native.disableControlAction(0, InputType.LOOK_UD, true);
        }
        if (this.isCursorVisible) {
            native.disableControlAction(0, InputType.LOOK_LR, true);
            native.disableControlAction(0, InputType.LOOK_UD, true);
            native.disableControlAction(0, InputType.SCRIPT_RIGHT_AXIS_X, true);
            native.disableControlAction(0, InputType.SCRIPT_RIGHT_AXIS_Y, true);
            native.disableControlAction(0, InputType.WEAPON_WHEEL_NEXT, true);
            native.disableControlAction(0, InputType.WEAPON_WHEEL_PREV, true);
            native.disableControlAction(0, InputType.SELECT_NEXT_WEAPON, true);
            native.disableControlAction(0, InputType.SELECT_PREV_WEAPON, true);
            native.disableControlAction(0, InputType.SELECT_WEAPON, true);
            native.disableControlAction(0, InputType.NEXT_WEAPON, true);
            native.disableControlAction(0, InputType.PREV_WEAPON, true);
            native.disableControlAction(0, InputType.AIM, true);
            native.disableControlAction(0, InputType.ATTACK, true);
            native.disableControlAction(0, InputType.ATTACK2, true);
            native.disableControlAction(0, InputType.MELEE_ATTACK_LIGHT, true);
            native.disableControlAction(0, InputType.MELEE_ATTACK_HEAVY, true);
            native.disableControlAction(0, InputType.MELEE_ATTACK_ALTERNATE, true);
            native.disableControlAction(0, InputType.RADIO_WHEEL_LR, true);
            native.disableControlAction(0, InputType.RADIO_WHEEL_UD, true);
            native.disableControlAction(0, InputType.VEH_NEXT_RADIO_TRACK, true);
            native.disableControlAction(0, InputType.VEH_PREV_RADIO_TRACK, true);
            native.disableControlAction(0, InputType.VEH_RADIO_WHEEL, true);
            native.disableControlAction(0, InputType.ENTER, true);
            native.disableControlAction(0, InputType.VEH_EXIT, true);
        }
        native.setPedCanSwitchWeapon(alt.Player.local.scriptID, !this.isCursorVisible);
        if (this.escBlocked) {
            native.disableControlAction(0, InputType.FRONTEND_PAUSE, true);
            native.disableControlAction(0, InputType.FRONTEND_PAUSE_ALTERNATE, true);
        }
    }
};
Player = __decorate([
    PrototypeFor(alt.Player),
    singleton(),
    __metadata("design:paramtypes", [UpdateModule, EventModule, LoggerModule])
], Player);
export { Player };
//# sourceMappingURL=player.extensions.js.map
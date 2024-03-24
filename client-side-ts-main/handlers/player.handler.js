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
import { EventModule } from "../modules/event.module";
import { Player } from "@extensions/player.extensions";
import { KeyCodes } from "@enums/keycode.type";
import { AnimationModule } from "../modules/animation.module";
import { UpdateModule } from "../modules/update.module";
import { InputType } from "@enums/input.type";
import { CameraModule } from "../modules/camera.module";
import { on, onGui, onServer } from "../decorators/events";
import { foundation } from "../decorators/foundation";
import { MathModule } from "../modules/math.module";
import { ChatModule } from "../modules/chat.module";
import { BlipModule } from "../modules/blip.module";
import { PericoIslandModule } from "../modules/perico-island.module";
import { singleton } from "tsyringe";
import { HouseModule } from "../modules/house.module";
import { Vector3 } from "@extensions/vector3.extensions";
import { LoggerModule } from "../modules/logger.module";
import { AnimationFlag } from "@enums/animation.flag";
let PlayerHandler = class PlayerHandler {
    event;
    player;
    animation;
    update;
    math;
    camera;
    chat;
    blip;
    pericoIsland;
    house;
    logger;
    cuffTick;
    lastSeatShuffle = Date.now();
    adutyPlayerBlips = [];
    dutyInterval;
    constructor(event, player, animation, update, math, camera, chat, blip, pericoIsland, house, logger) {
        this.event = event;
        this.player = player;
        this.animation = animation;
        this.update = update;
        this.math = math;
        this.camera = camera;
        this.chat = chat;
        this.blip = blip;
        this.pericoIsland = pericoIsland;
        this.house = house;
        this.logger = logger;
        this.update.add(() => this.tick());
        alt.setInterval(() => {
            native.invalidateIdleCam();
            native.invalidateIdleCam();
        }, 20000);
        alt.setInterval(() => {
            this.pericoIsland.loadIsland();
        }, 1000);
    }
    onKeydown(key) {
        if (key === KeyCodes.G) {
            if (this.player.getIsAnyTextOpen) {
                return;
            }
            if (alt.Player.local.vehicle) {
                if (Date.now() < this.lastSeatShuffle)
                    return;
                if (native.canShuffleSeat(alt.Player.local.vehicle.scriptID, 0)) {
                    this.lastSeatShuffle = Date.now() + 5;
                }
            }
            else {
                const playerPos = alt.Player.local.pos;
                let closestVehicle;
                let lastDistance = 5;
                alt.Vehicle.all.forEach(vehicle => {
                    const vehiclePosition = vehicle.pos;
                    const distance = this.math.distance(playerPos, vehiclePosition);
                    if (distance < lastDistance) {
                        closestVehicle = vehicle;
                        lastDistance = distance;
                    }
                });
                if (closestVehicle === undefined)
                    return;
                const vehicle = closestVehicle.scriptID;
                const seats = native.getVehicleModelNumberOfSeats(closestVehicle.model);
                for (let i = 0; i < seats; i++) {
                    if (native.isVehicleSeatFree(vehicle, i, false)) {
                        break;
                    }
                    return;
                }
                const boneFRDoor = native.getEntityBoneIndexByName(vehicle, 'door_pside_f'); //Front right
                const posFRDoor = native.getWorldPositionOfEntityBone(vehicle, boneFRDoor);
                const distFRDoor = this.math.distance(new alt.Vector3(posFRDoor.x, posFRDoor.y, posFRDoor.z), alt.Player.local.pos);
                const boneBLDoor = native.getEntityBoneIndexByName(vehicle, 'door_dside_r'); //Back Left
                const posBLDoor = native.getWorldPositionOfEntityBone(vehicle, boneBLDoor);
                const distBLDoor = this.math.distance(new alt.Vector3(posBLDoor.x, posBLDoor.y, posBLDoor.z), alt.Player.local.pos);
                const boneBRDoor = native.getEntityBoneIndexByName(vehicle, 'door_pside_r'); //Back Right
                const posBRDoor = native.getWorldPositionOfEntityBone(vehicle, boneBRDoor);
                const distBRDoor = this.math.distance(new alt.Vector3(posBRDoor.x, posBRDoor.y, posBRDoor.z), alt.Player.local.pos);
                let minDist = Math.min(distFRDoor, distBLDoor, distBRDoor);
                if (minDist == distFRDoor) {
                    if (minDist > 1.8)
                        return;
                    if (native.isVehicleSeatFree(vehicle, 0, false)) {
                        native.taskEnterVehicle(alt.Player.local.scriptID, vehicle, 5000, 0, 2, 1, null);
                    }
                    else if (native.isVehicleSeatFree(vehicle, 2, false)) {
                        native.taskEnterVehicle(alt.Player.local.scriptID, vehicle, 5000, 2, 2, 1, null);
                    }
                }
                if (minDist == distBLDoor) {
                    if (minDist > 1.8)
                        return;
                    if (native.isVehicleSeatFree(vehicle, 1, false)) {
                        native.taskEnterVehicle(alt.Player.local.scriptID, vehicle, 5000, 1, 2, 1, null);
                    }
                }
                if (minDist == distBRDoor) {
                    if (minDist > 1.8)
                        return;
                    if (native.isVehicleSeatFree(vehicle, 2, false)) {
                        native.taskEnterVehicle(alt.Player.local.scriptID, vehicle, 5000, 2, 2, 1, null);
                    }
                    else if (native.isVehicleSeatFree(vehicle, 0, false)) {
                        native.taskEnterVehicle(alt.Player.local.scriptID, vehicle, 5000, 0, 2, 1, null);
                    }
                }
            }
        }
    }
    onGameEntityCreate(entity) {
        if (entity instanceof alt.Player) {
            if (this.player.isAduty) {
                this.updateBlips();
            }
        }
    }
    onGameEntityDestroy(entity) {
        if (entity instanceof alt.Player) {
            if (this.player.isAduty) {
                this.updateBlips();
            }
        }
    }
    onSetAduty(state) {
        this.player.isAduty = state;
        native.setPedCanRagdoll(alt.Player.local.scriptID, !state);
        if (state) {
            this.showDebugBlips();
            this.player.showRadar();
        }
        else {
            this.destroyDebugBlips();
            this.player.hideRadar();
        }
    }
    onSetDuty(state, houseId) {
        this.player.isDuty = state;
        if (state) {
            const house = this.house.getHouses.find(h => h.id === houseId);
            this.dutyInterval = alt.setInterval(() => {
                if (this.math.distance(alt.Player.local.pos, new Vector3(house.positionX, house.positionY, house.positionZ)) > 30) {
                    // To far away from lease company house.
                    this.event.emitServer("player:clearduty", house.id);
                    this.player.isDuty = false;
                    alt.clearInterval(this.dutyInterval);
                }
            }, 1000);
        }
        else {
            alt.clearInterval(this.dutyInterval);
        }
    }
    onSetInHouse(state) {
        this.player.isInHouse = state;
    }
    onFadeScreenIn(fadeTime) {
        this.player.fadeIn(fadeTime);
    }
    onFadeScreenOut(fadeTime) {
        this.player.fadeOut(fadeTime);
    }
    onClearTasksImmediately() {
        this.player.clearTasksImmediately();
    }
    onToggleControls(state) {
        this.player.blockGameControls(state);
    }
    onFreeze(state) {
        if (state) {
            this.player.freeze(true);
        }
        else {
            this.player.unfreeze(true);
        }
    }
    onToggleCamera(state) {
        this.player.lockCamera(state);
    }
    switchOut() {
        this.player.freeze();
        this.player.switchOut();
    }
    switchIn() {
        this.player.switchIn();
        this.player.unfreeze();
    }
    async onCuffPlayer() {
        await this.animation.load("mp_arresting");
        native.setPedComponentVariation(alt.Player.local.scriptID, 7, 41, 0, 5);
        native.setPedCanSwitchWeapon(alt.Player.local.scriptID, false);
        native.setPlayerCanDoDriveBy(alt.Player.local.scriptID, false);
        native.setCurrentPedWeapon(alt.Player.local.scriptID, 0xA2719263, true);
        this.cuffTick = this.update.add(() => {
            if (!this.animation.isPlaying("mp_arresting", "idle")) {
                this.animation.play("mp_arresting", "idle", {
                    flag: AnimationFlag.Loop | AnimationFlag.OnlyAnimateUpperBody | AnimationFlag.AllowPlayerControl
                });
            }
            native.disableControlAction(0, InputType.ENTER, true);
            native.disableControlAction(0, InputType.ATTACK, true);
            native.disableControlAction(0, InputType.ATTACK2, true);
            native.disableControlAction(0, InputType.AIM, true);
            native.disableControlAction(0, InputType.JUMP, true);
        });
    }
    onUncuffPlayer() {
        this.animation.clear();
        native.setPedComponentVariation(alt.Player.local.scriptID, 7, -1, 0, 5);
        native.setPedCanSwitchWeapon(alt.Player.local.scriptID, true);
        native.setPlayerCanDoDriveBy(alt.Player.local.scriptID, true);
        this.update.remove(this.cuffTick);
    }
    getCameraInfo(name) {
        const pos = this.camera.camPos;
        const rot = this.camera.camRot;
        this.event.emitServer("data:sendcamerainfo", name, pos.x, pos.y, pos.z, rot.x, rot.y, rot.z);
    }
    onBlockGameControls(state) {
        this.player.blockGameControls(state);
    }
    onFocusInput(state) {
        this.player.setIsAnyTextFieldFocused = state;
    }
    updateBlips() {
        this.destroyDebugBlips();
        this.showDebugBlips();
    }
    showDebugBlips() {
        alt.Player.all.forEach((otherPlayer) => {
            if (otherPlayer !== alt.Player.local) {
                this.adutyPlayerBlips.push(this.blip.createBlipForEntity(otherPlayer.scriptID, 5, 1, "", true));
            }
        });
    }
    destroyDebugBlips() {
        this.adutyPlayerBlips.forEach((blip) => {
            this.blip.destroyBlip(blip);
        });
    }
    tick() {
        //Marker and Webview Fix:
        native.drawRect(0, 0, 0, 0, 0, 0, 0, 0, false);
        if (!this.player.isSpawnedCharacter) {
            return;
        }
        this.player.updatePositionInHUD();
        this.player.updateHealthInHUD();
        this.disableOneHitMelee();
        this.leftClickOnlyWithRightClick();
        // hide default health bar
        alt.beginScaleformMovieMethodMinimap('SETUP_HEALTH_ARMOUR');
        native.scaleformMovieMethodAddParamInt(3);
        native.endScaleformMovieMethod();
        native.hideHudComponentThisFrame(6);
        native.hideHudComponentThisFrame(7);
        native.hideHudComponentThisFrame(8);
        native.hideHudComponentThisFrame(9);
    }
    disableOneHitMelee() {
        if (native.isPedArmed(alt.Player.local.scriptID, 6)) {
            native.disableControlAction(0, InputType.MELEE_ATTACK_LIGHT, true);
            native.disableControlAction(0, InputType.MELEE_ATTACK_HEAVY, true);
            native.disableControlAction(0, InputType.MELEE_ATTACK_ALTERNATE, true);
        }
    }
    leftClickOnlyWithRightClick() {
        native.disableControlAction(0, InputType.ATTACK, true);
        native.disableControlAction(0, InputType.MELEE_ATTACK_LIGHT, true);
        if (native.isControlPressed(0, InputType.AIM)) {
            native.enableControlAction(0, InputType.ATTACK, true);
            native.enableControlAction(0, InputType.MELEE_ATTACK_LIGHT, true);
        }
    }
};
__decorate([
    on("keydown"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlayerHandler.prototype, "onKeydown", null);
__decorate([
    on("gameEntityCreate"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [alt.Entity]),
    __metadata("design:returntype", void 0)
], PlayerHandler.prototype, "onGameEntityCreate", null);
__decorate([
    on("gameEntityDestroy"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [alt.Entity]),
    __metadata("design:returntype", void 0)
], PlayerHandler.prototype, "onGameEntityDestroy", null);
__decorate([
    onServer("player:setaduty"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], PlayerHandler.prototype, "onSetAduty", null);
__decorate([
    onServer("player:setduty"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Number]),
    __metadata("design:returntype", void 0)
], PlayerHandler.prototype, "onSetDuty", null);
__decorate([
    onServer("player:setinhouse"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], PlayerHandler.prototype, "onSetInHouse", null);
__decorate([
    onServer("player:fadescreenin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlayerHandler.prototype, "onFadeScreenIn", null);
__decorate([
    onServer("player:fadescreenout"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlayerHandler.prototype, "onFadeScreenOut", null);
__decorate([
    onServer("player:cleartaskimmediately"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlayerHandler.prototype, "onClearTasksImmediately", null);
__decorate([
    onGui("player:blockcontrols"),
    onServer("player:blockcontrols"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], PlayerHandler.prototype, "onToggleControls", null);
__decorate([
    onServer("player:adminfreeze"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], PlayerHandler.prototype, "onFreeze", null);
__decorate([
    onGui("player:togglecamera"),
    onServer("player:togglecamera"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], PlayerHandler.prototype, "onToggleCamera", null);
__decorate([
    onServer("player:switchout"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlayerHandler.prototype, "switchOut", null);
__decorate([
    onServer("player:switchin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlayerHandler.prototype, "switchIn", null);
__decorate([
    onServer("player:cuff"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlayerHandler.prototype, "onCuffPlayer", null);
__decorate([
    onServer("player:uncuff"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlayerHandler.prototype, "onUncuffPlayer", null);
__decorate([
    onServer("player:getcamerainfo"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlayerHandler.prototype, "getCameraInfo", null);
__decorate([
    onServer("player:blockgamecontrols"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], PlayerHandler.prototype, "onBlockGameControls", null);
__decorate([
    onGui("player:focusinput"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], PlayerHandler.prototype, "onFocusInput", null);
PlayerHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, Player, AnimationModule, UpdateModule, MathModule, CameraModule, ChatModule, BlipModule, PericoIslandModule, HouseModule, LoggerModule])
], PlayerHandler);
export { PlayerHandler };
//# sourceMappingURL=player.handler.js.map
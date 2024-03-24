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
import { InputType } from "@enums/input.type";
import { MathModule } from "./math.module";
import { KeyCodes } from "@enums/keycode.type";
import { singleton } from "tsyringe";
import { UpdateModule } from "./update.module";
import { Player } from "@extensions/player.extensions";
import { EventModule } from "./event.module";
import { LoggerModule } from "./logger.module";
import { CameraModule } from "./camera.module";
let FreeCamModule = class FreeCamModule {
    math;
    camera;
    update;
    player;
    event;
    logger;
    freezed;
    actions = {
        moveF: false, moveB: false, moveL: false, moveR: false, moveU: false, moveD: false,
    };
    speed = {
        move: 2.0, turn: 1.5
    };
    everyTickRef;
    updatePosInterval;
    isFreeCamActive;
    leftMouseClicked;
    spectatingTarget;
    constructor(math, camera, update, player, event, logger) {
        this.math = math;
        this.camera = camera;
        this.update = update;
        this.player = player;
        this.event = event;
        this.logger = logger;
    }
    get isActive() {
        return this.isFreeCamActive;
    }
    start(pos, rot = new alt.Vector3(0, 0, 0)) {
        this.camera.createCamera(pos, rot);
        this.isFreeCamActive = true;
        this.player.freeze();
        this.unfreeze();
        native.setEntityAlpha(alt.Player.local.scriptID, 0, false);
        native.setEntityCollision(alt.Player.local.scriptID, false, false);
        native.freezeEntityPosition(alt.Player.local.scriptID, true);
        native.setPedCanBeTargetted(alt.Player.local.scriptID, false);
        alt.toggleGameControls(true);
        native.networkSetEntityOnlyExistsForParticipants(alt.Player.local.scriptID, true);
        alt.on('keydown', (key) => this.keydown(key));
        alt.on('keyup', (key) => this.keyup(key));
        if (this.everyTickRef) {
            this.update.remove(this.everyTickRef);
            this.everyTickRef = undefined;
        }
        this.everyTickRef = this.update.add(() => this.tick());
        this.updatePosInterval = alt.setInterval(() => {
            if (!this.spectatingTarget) {
                if (this.camera.getCamera) {
                    this.event.emitServer("freecam:update", this.camera.camPos.x, this.camera.camPos.y, this.camera.camPos.z);
                }
            }
            else {
                const coords = native.getEntityCoords(this.spectatingTarget, true);
                this.event.emitServer("freecam:update", coords.x, coords.y, coords.z + 2);
            }
        }, 500);
        this.event.emitGui("hud:setfreecam", true);
    }
    setPos(pos) {
        if (this.everyTickRef) {
            this.update.remove(this.everyTickRef);
            this.everyTickRef = undefined;
        }
        this.camera.setPos(pos);
        alt.setTimeout(() => {
            this.everyTickRef = this.update.add(() => this.tick());
        }, 100);
    }
    stop(teleportToPosition) {
        if (teleportToPosition) {
            if (this.spectatingTarget) {
                const coords = native.getEntityCoords(this.spectatingTarget, true);
                this.event.emitServer("freecam:stop", coords.x, coords.y, coords.z + 2);
            }
            else {
                this.event.emitServer("freecam:stop", this.camera.camPos.x, this.camera.camPos.y, this.camera.camPos.z);
            }
        }
        this.camera.destroyCamera();
        this.isFreeCamActive = false;
        this.player.unfreeze();
        if (this.spectatingTarget) {
            this.spectatingTarget = undefined;
            native.networkSetInSpectatorMode(false, undefined);
        }
        native.resetEntityAlpha(alt.Player.local.scriptID);
        native.setEntityCollision(alt.Player.local.scriptID, true, true);
        native.freezeEntityPosition(alt.Player.local.scriptID, false);
        native.setPedCanBeTargetted(alt.Player.local.scriptID, true);
        native.networkGetEntityIsNetworked(alt.Player.local.scriptID);
        alt.off('keydown', (key) => this.keydown(key));
        alt.off('keyup', (key) => this.keyup(key));
        if (this.everyTickRef) {
            this.update.remove(this.everyTickRef);
            this.everyTickRef = undefined;
        }
        if (this.updatePosInterval !== undefined) {
            alt.clearInterval(this.updatePosInterval);
        }
        this.event.emitGui("hud:setfreecam", false);
    }
    tick() {
        if (!this.spectatingTarget) {
            if (!this.freezed) {
                this.executeActions();
            }
            this.blockActionsWhileFreecam();
        }
        else {
            const coords = native.getEntityCoords(this.spectatingTarget, true);
            native.setEntityCoords(alt.Player.local.scriptID, coords.x, coords.y, coords.z, false, false, false, false);
            this.blockActionsWhileSpectating();
        }
        this.handleMouseClicks();
    }
    freeze() {
        if (this.freezed)
            return;
        this.freezed = true;
    }
    unfreeze() {
        if (!this.freezed)
            return;
        this.freezed = false;
    }
    keydown(key) {
        if (key == KeyCodes.W) {
            this.actions.moveF = true;
        }
        if (key == KeyCodes.A) {
            this.actions.moveL = true;
        }
        if (key == KeyCodes.D) {
            this.actions.moveR = true;
        }
        if (key == KeyCodes.S) {
            this.actions.moveB = true;
        }
        if (key == KeyCodes.SPACE) {
            this.actions.moveU = true;
        }
        if (key == KeyCodes.SHIFT) {
            this.actions.moveD = true;
        }
    }
    keyup(key) {
        if (key == KeyCodes.W) {
            this.actions.moveF = false;
        }
        if (key == KeyCodes.A) {
            this.actions.moveL = false;
        }
        if (key == KeyCodes.D) {
            this.actions.moveR = false;
        }
        if (key == KeyCodes.S) {
            this.actions.moveB = false;
        }
        if (key == KeyCodes.SPACE) {
            this.actions.moveU = false;
        }
        if (key == KeyCodes.SHIFT) {
            this.actions.moveD = false;
        }
    }
    executeActions() {
        let camPos = native.getCamCoord(this.camera.getCamera);
        let camRot = native.getCamRot(this.camera.getCamera, 2);
        let camDir = this.math.rotationToDirection(camRot);
        if (this.actions.moveF) {
            let x = camPos.x + (camDir.x * this.speed.move);
            let y = camPos.y + (camDir.y * this.speed.move);
            let z = camPos.z + (camDir.z * this.speed.move);
            camPos = new alt.Vector3(x, y, z);
        }
        if (this.actions.moveB) {
            let x = camPos.x - (camDir.x * this.speed.move);
            let y = camPos.y - (camDir.y * this.speed.move);
            let z = camPos.z - (camDir.z * this.speed.move);
            camPos = new alt.Vector3(x, y, z);
        }
        if (this.actions.moveR) {
            let camDir = this.calcCameraDirectionRight(camRot);
            let x = camPos.x + (camDir.x * this.speed.move);
            let y = camPos.y + (camDir.y * this.speed.move);
            let z = camPos.z;
            camPos = new alt.Vector3(x, y, z);
        }
        if (this.actions.moveL) {
            let camDir = this.calcCameraDirectionRight(camRot);
            let x = camPos.x - (camDir.x * this.speed.move);
            let y = camPos.y - (camDir.y * this.speed.move);
            let z = camPos.z;
            camPos = new alt.Vector3(x, y, z);
        }
        if (this.actions.moveU) {
            let z = camPos.z + this.speed.move;
            camPos = new alt.Vector3(camPos.x, camPos.y, z);
        }
        if (this.actions.moveD) {
            let z = camPos.z - this.speed.move;
            camPos = new alt.Vector3(camPos.x, camPos.y, z);
        }
        const rightAxisX = native.getDisabledControlNormal(0, InputType.SCRIPT_RIGHT_AXIS_X);
        const rightAxisY = native.getDisabledControlNormal(0, InputType.SCRIPT_RIGHT_AXIS_Y);
        let x = camRot.x + rightAxisY * -5.0;
        let z = camRot.z + rightAxisX * -5.0;
        // Clamp the value between 80 and negative 80.
        x = Math.min(Math.max(x, -80), 80);
        camRot = new alt.Vector3(x, 0, z);
        native.setCamRot(this.camera.getCamera, camRot.x, camRot.y, camRot.z, 2);
        let scrollWheel = -native.getDisabledControlNormal(0, InputType.WEAPON_WHEEL_NEXT);
        scrollWheel += native.getDisabledControlNormal(0, InputType.WEAPON_WHEEL_PREV);
        if (scrollWheel != 0) {
            this.speed.move += scrollWheel * 0.25;
            this.speed.move = Math.min(Math.max(this.speed.move, 0.001), 20);
        }
        this.camera.setPos({ x: camPos.x, y: camPos.y, z: camPos.z });
    }
    handleMouseClicks() {
        const attack = native.getDisabledControlNormal(0, InputType.ATTACK);
        if (attack > 0) {
            if (this.leftMouseClicked) {
                return;
            }
            this.leftMouseClicked = true;
            if (this.spectatingTarget) {
                this.spectatingTarget = undefined;
                this.camera.createCamera(alt.Player.local.pos, alt.Player.local.rot);
                native.networkSetInSpectatorMode(false, undefined);
            }
            else {
                const entity = this.getEntiyAroundMouse();
                if (!entity) {
                    return;
                }
                this.camera.destroyCamera();
                this.spectatingTarget = entity;
                const coords = native.getEntityCoords(this.spectatingTarget, true);
                native.setEntityCoords(alt.Player.local.scriptID, coords.x, coords.y, coords.z, false, false, false, false);
                native.setHdArea(coords.x, coords.y, coords.z, 30);
                native.requestCollisionAtCoord(coords.x, coords.y, coords.z);
                alt.nextTick(() => {
                    native.networkSetInSpectatorMode(true, this.spectatingTarget);
                });
            }
        }
        else {
            this.leftMouseClicked = false;
        }
    }
    blockActionsWhileFreecam() {
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
    }
    blockActionsWhileSpectating() {
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
    }
    calcCameraDirectionRight(camRot) {
        let rotInRad = {
            x: camRot.x * (Math.PI / 180), y: camRot.y * (Math.PI / 180), z: camRot.z * (Math.PI / 180)
        };
        let camDir = {
            x: Math.cos(rotInRad.z), y: Math.sin(rotInRad.z), z: Math.sin(rotInRad.x)
        };
        return camDir;
    }
    getEntiyAroundMouse() {
        const [, x, y] = native.getScreenResolution(0, 0);
        const pos = new alt.Vector3(x * 0.5, y * 0.5, 0);
        const worldCord = this.math.screenToWorld(pos.x, pos.y, -1, this.camera.getCamera, 5000);
        if (worldCord.isHit) {
            const closestVehicle = this.getClosestVehicle(worldCord.pos);
            if (closestVehicle) {
                return closestVehicle.scriptID;
            }
            const player = this.getClosestPlayer(worldCord.pos);
            if (player) {
                return player.scriptID;
            }
            return undefined;
        }
    }
    getClosestVehicle(pos) {
        let radius = 5;
        let closestDistance = -1;
        let closestVehicle = undefined;
        for (let i = 0; i < alt.Vehicle.all.length; i++) {
            const veh = alt.Vehicle.all[i];
            const distance = veh.pos.distanceTo(pos);
            if (distance <= radius && (distance < closestDistance || closestDistance == -1)) {
                closestDistance = distance;
                closestVehicle = veh;
            }
        }
        return closestVehicle;
    }
    getClosestPlayer(pos) {
        let radius = 5;
        let closestDistance = -1;
        let closestPlayer = undefined;
        for (let i = 0; i < alt.Player.all.length; i++) {
            const player = alt.Player.all[i];
            if (player.scriptID === alt.Player.local.scriptID) {
                continue;
            }
            const distance = player.pos.distanceTo(pos);
            if (distance <= radius && (distance < closestDistance || closestDistance == -1)) {
                closestDistance = distance;
                closestPlayer = player;
            }
        }
        return closestPlayer;
    }
};
FreeCamModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [MathModule, CameraModule, UpdateModule, Player, EventModule, LoggerModule])
], FreeCamModule);
export { FreeCamModule };
//# sourceMappingURL=free-cam.module.js.map
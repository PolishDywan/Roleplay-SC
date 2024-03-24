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
import { Vector3 } from "alt-client";
import { singleton } from "tsyringe";
import { foundation } from "../../decorators/foundation";
import { EventModule } from "../../modules/event.module";
import { CameraModule } from "../../modules/camera.module";
import { LoggerModule } from "../../modules/logger.module";
import { NotificationModule } from "../../modules/notification.module";
import { on, onGui, onServer } from "../../decorators/events";
import { MathModule } from "../../modules/math.module";
import { CharCreatorModule } from "../../modules/char-creator.module";
let SpawnSelectorHandler = class SpawnSelectorHandler {
    camera;
    notification;
    logger;
    event;
    math;
    charCreator;
    spawns = [];
    currentIndex = 0;
    currentSpawnIndex = 0;
    helicopterCamInt = 0;
    constructor(camera, notification, logger, event, math, charCreator) {
        this.camera = camera;
        this.notification = notification;
        this.logger = logger;
        this.event = event;
        this.math = math;
        this.charCreator = charCreator;
    }
    onReset() {
        this.currentIndex = 0;
        this.currentSpawnIndex = this.currentIndex;
        if (this.helicopterCamInt) {
            alt.clearInterval(this.helicopterCamInt);
            this.helicopterCamInt = null;
        }
        this.camera.destroyCamera();
    }
    onOpen(spawns) {
        this.spawns = spawns;
        this.event.emitGui("spawnselector:defaultselect", this.spawns[this.currentIndex]);
        this.selectSpawn(this.spawns[this.currentIndex]);
    }
    onChange(direction) {
        this.currentIndex += direction;
        if (this.currentIndex < 0) {
            this.currentIndex = this.spawns.length - 1;
        }
        if (this.currentIndex > this.spawns.length - 1) {
            this.currentIndex = 0;
        }
        this.selectSpawn(this.spawns[this.currentIndex]);
    }
    onClose() {
        if (this.helicopterCamInt) {
            alt.clearInterval(this.helicopterCamInt);
            this.helicopterCamInt = null;
        }
    }
    onSelect(spawnId) {
        this.currentSpawnIndex = this.currentIndex;
        this.event.emitServer("charcreatorspawn:select", spawnId);
    }
    onShow() {
        this.currentIndex = this.currentSpawnIndex;
        this.selectSpawn(this.spawns[this.currentIndex]);
    }
    selectSpawn(spawn) {
        let pos = new alt.Vector3(spawn.x, spawn.y, spawn.z);
        if (spawn.id === 0) { // LS Airport
            pos = new alt.Vector3(spawn.x, spawn.y, spawn.z + 25);
        }
        this.charCreator.setSpawn(spawn.id);
        this.event.emitGui("spawnselector:setinfo", spawn);
        this.updateCamera(pos);
    }
    updateCamera(spawnPos) {
        if (this.helicopterCamInt) {
            alt.clearInterval(this.helicopterCamInt);
            this.helicopterCamInt = null;
        }
        this.createHelicopterCam(spawnPos);
    }
    createHelicopterCam(pos) {
        let angle = 0;
        const p = this.math.getPointAtPoint(pos, 25, angle);
        this.camera.createCamera(new Vector3(p.x, p.y, pos.z + 15), new Vector3(0, 0, 0));
        this.camera.pointAt(new Vector3(pos.x, pos.y, pos.z - 5));
        this.helicopterCamInt = alt.setInterval(() => {
            const p = this.math.getPointAtPoint(pos, 25, angle);
            this.camera.setPos(new Vector3(p.x, p.y, pos.z + 15));
            this.camera.pointAt(new Vector3(pos.x, pos.y, pos.z - 5));
            angle += 0.0009;
        }, 10);
    }
};
__decorate([
    onServer("spawnselector:reset"),
    on("disconnect"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SpawnSelectorHandler.prototype, "onReset", null);
__decorate([
    onServer("spawnselector:open"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], SpawnSelectorHandler.prototype, "onOpen", null);
__decorate([
    onGui("spawnselector:change"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SpawnSelectorHandler.prototype, "onChange", null);
__decorate([
    onGui("spawnselector:close"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SpawnSelectorHandler.prototype, "onClose", null);
__decorate([
    onGui("spawnselector:select"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SpawnSelectorHandler.prototype, "onSelect", null);
__decorate([
    onGui("spawnselector:show"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SpawnSelectorHandler.prototype, "onShow", null);
SpawnSelectorHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [CameraModule, NotificationModule, LoggerModule, EventModule, MathModule, CharCreatorModule])
], SpawnSelectorHandler);
export { SpawnSelectorHandler };
//# sourceMappingURL=spawn-selector.handler.js.map
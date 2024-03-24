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
import { LoggerModule } from "./logger.module";
let CameraModule = class CameraModule {
    logger;
    camera;
    isCamMoving;
    constructor(logger) {
        this.logger = logger;
    }
    get hasCamera() {
        return this.camera !== undefined;
    }
    get getCamera() {
        return this.camera;
    }
    get camPos() {
        return native.getCamCoord(this.camera);
    }
    get camRot() {
        return native.getCamRot(this.camera, 0);
    }
    createCamera(pos, rot = new alt.Vector3(0, 0, 0), fov = 70) {
        if (this.camera) {
            this.destroyCamera();
        }
        native.setFocusPosAndVel(pos.x, pos.y, pos.z, 0.0, 0.0, 0.0);
        native.setHdArea(pos.x, pos.y, pos.z, 30);
        this.camera = native.createCam("DEFAULT_SCRIPTED_CAMERA", true);
        native.setCamActive(this.camera, true);
        native.renderScriptCams(true, true, 0, false, false, 0);
        native.setCamCoord(this.camera, pos.x, pos.y, pos.z);
        native.setCamRot(this.camera, rot.x, rot.y, rot.z, 0);
        native.setCamFov(this.camera, fov);
    }
    destroyCamera() {
        native.renderScriptCams(false, false, 0, false, false, 0);
        if (this.camera !== undefined && native.doesCamExist(this.camera)) {
            native.destroyCam(this.camera, true);
        }
        native.setFollowPedCamViewMode(1);
        native.clearFocus();
        native.clearHdArea();
        this.camera = undefined;
    }
    moveCamera(pos, rot = new alt.Vector3(0, 0, 0), duration = 1000, override = false) {
        if (this.isCamMoving && !override)
            return;
        const targetPosCam = native.createCam("DEFAULT_SCRIPTED_CAMERA", true);
        native.setCamCoord(targetPosCam, pos.x, pos.y, pos.z);
        native.setCamRot(targetPosCam, rot.x, rot.y, rot.z, 0);
        native.setFocusPosAndVel(pos.x, pos.y, pos.z, 0.0, 0.0, 0.0);
        native.setHdArea(pos.x, pos.y, pos.z, 30);
        native.setCamActiveWithInterp(targetPosCam, this.camera, duration, 0, 0);
        this.isCamMoving = true;
        alt.setTimeout(() => {
            native.setCamCoord(this.camera, pos.x, pos.y, pos.z);
            native.setCamRot(this.camera, rot.x, rot.y, rot.z, 0);
            native.destroyCam(targetPosCam, true);
            this.isCamMoving = false;
        }, duration + 10);
    }
    setPos(pos) {
        native.setCamCoord(this.camera, pos.x, pos.y, pos.z);
        native.setFocusPosAndVel(pos.x, pos.y, pos.z, 0.0, 0.0, 0.0);
        native.setHdArea(pos.x, pos.y, pos.z, 30);
    }
    pointAt(pos) {
        native.pointCamAtCoord(this.camera, pos.x, pos.y, pos.z);
    }
};
CameraModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [LoggerModule])
], CameraModule);
export { CameraModule };
//# sourceMappingURL=camera.module.js.map
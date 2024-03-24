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
import { RaycastModule } from "./raycast.module";
import { CameraModule } from "./camera.module";
import { LoggerModule } from "./logger.module";
let MathModule = class MathModule {
    raycast;
    camera;
    logger;
    constructor(raycast, camera, logger) {
        this.raycast = raycast;
        this.camera = camera;
        this.logger = logger;
    }
    // Get the direction based on rotation.
    rotationToDirection(rotation) {
        const z = this.degToRad(rotation.z);
        const x = this.degToRad(rotation.x);
        const num = Math.abs(Math.cos(x));
        return new alt.Vector3(-Math.sin(z) * num, Math.cos(z) * num, Math.sin(x));
    }
    // Get the distance between to vectors.
    distance(vector1, vector2) {
        const x = vector1.x - vector2.x;
        const y = vector1.y - vector2.y;
        const z = vector1.z - vector2.z;
        return Math.sqrt(x * x + y * y + z * z);
    }
    screenToWorld(x, y, flags, ignore = 0, distance = 1000) {
        const camera = this.camera.getCamera;
        let camPos;
        if (camera) {
            camPos = native.getCamCoord(this.camera.getCamera);
        }
        else {
            camPos = native.getGameplayCamCoord();
        }
        const processedCoords = this.processCoordinates(x, y);
        const target = this.s2w(camPos, processedCoords.x, processedCoords.y);
        const dir = this.subVector3(target, camPos);
        return this.raycast.line(camPos, dir, distance, flags, ignore);
    }
    getEntityFrontPosition(entityHandle, distance = 0) {
        const modelDimensions = native.getModelDimensions(native.getEntityModel(entityHandle), undefined, undefined);
        return this.getOffsetPositionInWorldCoords(entityHandle, new alt.Vector3(0, modelDimensions[2].y + distance, 0));
    }
    getEntityRearPosition(entityHandle) {
        const modelDimensions = native.getModelDimensions(native.getEntityModel(entityHandle), undefined, undefined);
        return this.getOffsetPositionInWorldCoords(entityHandle, new alt.Vector3(0, modelDimensions[1].y, 0));
    }
    getOffsetPositionInWorldCoords(entityHandle, offset) {
        return native.getOffsetFromEntityInWorldCoords(entityHandle, offset.x, offset.y, offset.z);
    }
    worldToScreen(position) {
        let result = native.getScreenCoordFromWorldCoord(position.x, position.y, position.z, undefined, undefined);
        if (!result[0]) {
            return undefined;
        }
        return new alt.Vector3((result[1] - 0.5) * 2, (result[2] - 0.5) * 2, 0);
    }
    degToRad(deg) {
        return (deg * Math.PI) / 180.0;
    }
    radToDeg(rad) {
        return (rad * 180.0) / Math.PI;
    }
    addVector3(vector1, vector2) {
        return new alt.Vector3(vector1.x + vector2.x, vector1.y + vector2.y, vector1.z + vector2.z);
    }
    subVector3(vector1, vector2) {
        return new alt.Vector3(vector1.x - vector2.x, vector1.y - vector2.y, vector1.z - vector2.z);
    }
    mulVector(vector1, value) {
        return new alt.Vector3(vector1.x * value, vector1.y * value, vector1.z * value);
    }
    dot(vector1, vector2) {
        return (vector1.x * vector2.x) + (vector1.y * vector2.y) + (vector1.z * vector2.z);
    }
    normalize2d(x, y) {
        const t = native.sqrt(x * x + y * y);
        if (t > 0.000001) {
            let fRcpt = 1 / t;
            x *= fRcpt;
            y *= fRcpt;
        }
        return new alt.Vector3(x, y, 0);
    }
    getPointAtPoint(pos, radius, angle) {
        const p = {
            x: 0, y: 0
        };
        let s = radius * Math.sin(angle);
        let c = radius * Math.cos(angle);
        p.x = pos.x + s;
        p.y = pos.y + c;
        return p;
    }
    processCoordinates(x, y) {
        var res = native.getActualScreenResolution(0, 0);
        let screenX = res[1];
        let screenY = res[2];
        let relativeX = 1 - (x / screenX) * 1.0 * 2;
        let relativeY = 1 - (y / screenY) * 1.0 * 2;
        if (relativeX > 0.0) {
            relativeX = -relativeX;
        }
        else {
            relativeX = Math.abs(relativeX);
        }
        if (relativeY > 0.0) {
            relativeY = -relativeY;
        }
        else {
            relativeY = Math.abs(relativeY);
        }
        return { x: relativeX, y: relativeY };
    }
    s2w(camPos, relX, relY) {
        let camRot;
        const camera = this.camera.getCamera;
        if (camera)
            camRot = native.getCamRot(this.camera.getCamera, 2);
        else
            camRot = native.getGameplayCamRot(2);
        const camForward = this.rotationToDirection(camRot);
        const rotUp = this.addVector3(camRot, new alt.Vector3(10, 0, 0));
        const rotDown = this.addVector3(camRot, new alt.Vector3(-10, 0, 0));
        const rotLeft = this.addVector3(camRot, new alt.Vector3(0, 0, -10));
        const rotRight = this.addVector3(camRot, new alt.Vector3(0, 0, 10));
        let camRight = this.subVector3(this.rotationToDirection(rotRight), this.rotationToDirection(rotLeft));
        let camUp = this.subVector3(this.rotationToDirection(rotUp), this.rotationToDirection(rotDown));
        let rollRad = -this.degToRad(camRot.y);
        let camRightRoll = this.subVector3(this.mulVector(camRight, Math.cos(rollRad)), this.mulVector(camUp, Math.sin(rollRad)));
        let camUpRoll = this.addVector3(this.mulVector(camRight, Math.sin(rollRad)), this.mulVector(camUp, Math.cos(rollRad)));
        let point3D = this.addVector3(this.addVector3(this.addVector3(camPos, this.mulVector(camForward, 10.0)), camRightRoll), camUpRoll);
        let point2D = this.worldToScreen(point3D);
        if (point2D === undefined) {
            return this.addVector3(camPos, this.mulVector(camForward, 10.0));
        }
        let point3DZero = this.addVector3(camPos, this.mulVector(camForward, 10.0));
        let point2DZero = this.worldToScreen(point3DZero);
        if (point2DZero === undefined) {
            return this.addVector3(camPos, this.mulVector(camForward, 10.0));
        }
        let eps = 0.001;
        if (Math.abs(point2D.x - point2DZero.x) < eps || Math.abs(point2D.y - point2DZero.y) < eps) {
            return this.addVector3(camPos, this.mulVector(camForward, 10.0));
        }
        let scaleX = (relX - point2DZero.x) / (point2D.x - point2DZero.x);
        let scaleY = (relY - point2DZero.y) / (point2D.y - point2DZero.y);
        let point3Dret = this.addVector3(this.addVector3(this.addVector3(camPos, this.mulVector(camForward, 10.0)), this.mulVector(camRightRoll, scaleX)), this.mulVector(camUpRoll, scaleY));
        return point3Dret;
    }
};
MathModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [RaycastModule, CameraModule, LoggerModule])
], MathModule);
export { MathModule };
//# sourceMappingURL=math.module.js.map
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
import { foundation } from "../decorators/foundation";
import { onServer } from "../decorators/events";
import { EventModule } from "../modules/event.module";
import { LoggerModule } from "../modules/logger.module";
import { CameraModule } from "../modules/camera.module";
import { GuiModule } from "../modules/gui.module";
import { MarkerModule } from "../modules/marker.module";
import { UpdateModule } from "../modules/update.module";
import { MathModule } from "../modules/math.module";
import { WaypointModule } from "../modules/waypoint.module";
import { VehicleModule } from "../modules/vehicle.module";
let DrivingSchoolHandler = class DrivingSchoolHandler {
    event;
    logger;
    camera;
    gui;
    marker;
    waypoint;
    update;
    math;
    vehicle;
    checkpointPositions = [{ x: 262.02197, y: -1859.6176, z: 25.864 }, {
            x: 413.2879,
            y: -1717.2395,
            z: 28.274
        }, { x: 445.37143, y: -1605.2307, z: 28.24 }, { x: 385.91208, y: -1553.6044, z: 28.206 }, {
            x: 348.72528,
            y: -1529.9473,
            z: 28.324
        }, { x: 142.86594, y: -1380, z: 28.308 }, { x: -204.87033, y: -1418.6373, z: 30.33 }, {
            x: -150.48792,
            y: -1518.2373,
            z: 33.093
        }, { x: -51.929672, y: -1601.4725, z: 28.274 }, { x: -96.87033, y: -1685.1296, z: 28.324 }, {
            x: -97.094505,
            y: -1773.4813,
            z: 28.358
        }, { x: -55.806595, y: -1809.4945, z: 26.016 }, { x: -7.1340637, y: -1790.0967, z: 27.179 }, {
            x: -50.228573,
            y: -1733.5253,
            z: 28.274
        }, { x: 30.276924, y: -1692.4352, z: 28.206 }, { x: 90.14506, y: -1720.8, z: 27.92 },];
    MAX_SPEED = 80;
    index = 0;
    currentCheckpointPos;
    startPos;
    tickId;
    reachedCheckpoint;
    speedingReported;
    speedingReports = 0;
    lastCheckpoint;
    constructor(event, logger, camera, gui, marker, waypoint, update, math, vehicle) {
        this.event = event;
        this.logger = logger;
        this.camera = camera;
        this.gui = gui;
        this.marker = marker;
        this.waypoint = waypoint;
        this.update = update;
        this.math = math;
        this.vehicle = vehicle;
    }
    onStart(startX, startY, startZ) {
        this.onRestart(startX, startY, startZ, 0);
    }
    onStop() {
        this.waypoint.destroy();
        this.currentCheckpointPos = undefined;
        this.update.remove(this.tickId);
        this.speedingReports = 0;
    }
    onRestart(startX, startY, startZ, index) {
        this.startPos = { x: startX, y: startY, z: startZ };
        this.index = index;
        this.reachedCheckpoint = false;
        this.lastCheckpoint = false;
        this.speedingReported = false;
        if (this.index >= this.checkpointPositions.length) {
            this.currentCheckpointPos = this.startPos;
            this.lastCheckpoint = true;
        }
        else {
            this.currentCheckpointPos = this.checkpointPositions[this.index];
        }
        this.tickId = this.update.add(() => this.tick());
        this.waypoint.set(this.checkpointPositions[this.index].x, this.checkpointPositions[this.index].y, this.checkpointPositions[this.index].z, 1, 1);
    }
    onSendNextCheckpoint() {
        this.reachedCheckpoint = false;
        this.index++;
        if (this.index >= this.checkpointPositions.length) {
            this.currentCheckpointPos = this.startPos;
            this.lastCheckpoint = true;
        }
        else {
            this.currentCheckpointPos = this.checkpointPositions[this.index];
        }
        this.waypoint.set(this.currentCheckpointPos.x, this.currentCheckpointPos.y, this.currentCheckpointPos.z, 1, 1);
    }
    onResetLastCheckpoint() {
        this.reachedCheckpoint = false;
    }
    onResetReportSpeeding() {
        if (!this.speedingReported) {
            return;
        }
        alt.setTimeout(() => {
            this.speedingReported = false;
        }, 3000);
    }
    tick() {
        if (alt.Player.local.vehicle) {
            if (this.vehicle.getCurrentSpeed(alt.Player.local.vehicle) > this.MAX_SPEED && !this.speedingReported) {
                this.speedingReports++;
                this.event.emitServer("drivingschool:reportspeeding", this.speedingReports);
                this.speedingReported = true;
            }
            if (this.currentCheckpointPos !== undefined && !this.reachedCheckpoint) {
                if (this.math.distance(alt.Player.local.pos, this.currentCheckpointPos) <= 4) {
                    this.event.emitServer("drivingschool:requestnextcheckpoint", this.index, this.lastCheckpoint);
                    this.reachedCheckpoint = true;
                }
                // ped sync for driving school ped
                if (this.math.distance(alt.Player.local.pos, this.currentCheckpointPos) > 500) {
                    this.event.emitServer("drivingschool:forcestop");
                }
                this.marker.drawMarker({
                    positionX: this.currentCheckpointPos.x,
                    positionY: this.currentCheckpointPos.y,
                    positionZ: this.currentCheckpointPos.z,
                    sizeX: 3,
                    sizeY: 3,
                    sizeZ: 1,
                    text: "",
                    hasText: false,
                    red: 192,
                    green: 57,
                    blue: 43,
                    alpha: 100,
                    type: 1,
                    bobUpAndDown: false
                });
            }
        }
    }
};
__decorate([
    onServer("drivingschool:start"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], DrivingSchoolHandler.prototype, "onStart", null);
__decorate([
    onServer("drivingschool:stop"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DrivingSchoolHandler.prototype, "onStop", null);
__decorate([
    onServer("drivingschool:restart"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number]),
    __metadata("design:returntype", void 0)
], DrivingSchoolHandler.prototype, "onRestart", null);
__decorate([
    onServer("drivingschool:sendnextcheckpoint"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DrivingSchoolHandler.prototype, "onSendNextCheckpoint", null);
__decorate([
    onServer("drivingschool:resetlastcheckpoint"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DrivingSchoolHandler.prototype, "onResetLastCheckpoint", null);
__decorate([
    onServer("drivingschool:resetreportspeeding"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DrivingSchoolHandler.prototype, "onResetReportSpeeding", null);
DrivingSchoolHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, LoggerModule, CameraModule, GuiModule, MarkerModule, WaypointModule, UpdateModule, MathModule, VehicleModule])
], DrivingSchoolHandler);
export { DrivingSchoolHandler };
//# sourceMappingURL=driving-school.handler.js.map
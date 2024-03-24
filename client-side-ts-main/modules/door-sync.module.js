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
import { LoggerModule } from "./logger.module";
let DoorSyncModule = class DoorSyncModule {
    logger;
    doors = new Map();
    constructor(logger) {
        this.logger = logger;
    }
    add(id, position, heading, hash, locked) {
        this.remove(id);
        this.doors.set(id, {
            hash: hash, locked: locked, position: position, heading: heading, id: id,
        });
        this.setLockState(id, locked);
    }
    restore(id) {
        if (this.doors.has(id)) {
            let door = this.doors.get(id);
            this.setLockState(id, door.locked);
        }
    }
    remove(id) {
        if (this.doors.has(id)) {
            this.doors.delete(id);
        }
    }
    clearAll() {
        this.doors = new Map();
    }
    setPosition(id, position) {
        if (this.doors.has(id)) {
            this.doors.get(id).position = position;
        }
    }
    setLockState(id, locked) {
        if (this.doors.has(id)) {
            this.doors.get(id).locked = locked;
            let door = this.doors.get(id);
            native.setStateOfClosestDoorOfType(door.hash, door.position.x, door.position.y, door.position.z, door.locked, door.heading, false);
            native.setLockedUnstreamedInDoorOfType(door.hash, door.position.x, door.position.y, door.position.z, door.locked, 0.0, door.heading, 0.0);
        }
    }
};
DoorSyncModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [LoggerModule])
], DoorSyncModule);
export { DoorSyncModule };
//# sourceMappingURL=door-sync.module.js.map
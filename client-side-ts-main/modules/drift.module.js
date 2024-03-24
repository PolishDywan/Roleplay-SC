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
import { UpdateModule } from "./update.module";
import { MathModule } from "./math.module";
var DriftEndReason;
(function (DriftEndReason) {
    DriftEndReason[DriftEndReason["LowSpeed"] = 0] = "LowSpeed";
    DriftEndReason[DriftEndReason["LowAngle"] = 1] = "LowAngle";
    DriftEndReason[DriftEndReason["DamageDetected"] = 2] = "DamageDetected";
    DriftEndReason[DriftEndReason["OutOfVehicle"] = 3] = "OutOfVehicle";
})(DriftEndReason || (DriftEndReason = {}));
var DriftTypes;
(function (DriftTypes) {
    DriftTypes[DriftTypes["Drifting"] = 0] = "Drifting";
    DriftTypes[DriftTypes["GoodDrift"] = 1] = "GoodDrift";
    DriftTypes[DriftTypes["PerfectDrift"] = 2] = "PerfectDrift";
    DriftTypes[DriftTypes["PowerSlide"] = 3] = "PowerSlide";
})(DriftTypes || (DriftTypes = {}));
let DriftModule = class DriftModule {
    update;
    math;
    healthSnapshot;
    startTime;
    isDrifting;
    updateId;
    badAngleSince;
    driftType = 0;
    driftScore = 0;
    MIN_ANGLE = 20.0;
    MAX_ANGLE = 80.0;
    MIN_SPEED = 6.0;
    constructor(update, math) {
        this.update = update;
        this.math = math;
    }
    get getDriftType() {
        return this.driftType;
    }
    get getDriftScore() {
        return this.driftScore;
    }
    startTracking(vehicle) {
        if (!this.updateId) {
            this.updateId = this.update.add(() => this.tick(vehicle));
        }
    }
    stopTracking() {
        this.update.remove(this.updateId);
        this.updateId = null;
    }
    tick(vehicle) {
        const velocity = native.getEntityVelocity(vehicle.scriptID);
        const speed = native.getEntitySpeed(vehicle.scriptID);
        const health = native.getEntityHealth(vehicle.scriptID);
        const forward = native.getEntityForwardVector(vehicle.scriptID);
        const normalForward = this.math.normalize2d(forward.x, forward.y);
        const normalVelocity = this.math.normalize2d(velocity.x, velocity.y);
        const driftAngle = native.getAngleBetween2dVectors(normalForward.x, normalForward.y, normalVelocity.x, normalVelocity.y);
        const angleOk = (driftAngle >= this.MIN_ANGLE && driftAngle <= this.MAX_ANGLE);
        const speedOk = (speed >= this.MIN_SPEED);
        const damageOk = this.isDrifting ? (health >= this.healthSnapshot) : true;
        const isDriftingNow = (angleOk && speedOk && damageOk);
        if (this.isDrifting) {
            if (isDriftingNow) {
                this.badAngleSince = 0;
                this.driftProcessed(driftAngle, speed, true);
            }
            else {
                let end = true;
                let treshhold = false;
                if (!angleOk && speedOk && damageOk) {
                    if (this.badAngleSince === 0) {
                        this.badAngleSince = Date.now();
                        end = false;
                    }
                    else if ((Date.now() - this.badAngleSince) < 2000) {
                        end = false;
                        treshhold = true;
                    }
                }
                if (end) {
                    this.driftEnded(!angleOk ? DriftEndReason.LowAngle : (!speedOk ? DriftEndReason.LowSpeed : DriftEndReason.DamageDetected));
                }
                else {
                    this.driftProcessed(driftAngle, speed, false, treshhold);
                }
            }
        }
        else if (isDriftingNow) {
            this.driftStarted(vehicle);
        }
        else if (this.isDrifting) {
            this.driftEnded(DriftEndReason.OutOfVehicle);
        }
    }
    driftStarted(vehicle) {
        this.healthSnapshot = native.getEntityHealth(vehicle.scriptID);
        this.startTime = new Date();
        this.isDrifting = true;
    }
    driftProcessed(angle, speed, init, trehshold = false) {
        if (trehshold)
            return;
        const currentDate = new Date();
        const diff = currentDate.getTime() - this.startTime.getTime();
        const activeSeconds = Math.floor(diff / 1000);
        if (activeSeconds <= 2) {
            this.driftType = DriftTypes.Drifting;
            this.driftScore += 1;
        }
        else if (activeSeconds <= 4) {
            this.driftType = DriftTypes.GoodDrift;
            this.driftScore += 2;
        }
        else if (activeSeconds <= 5) {
            this.driftType = DriftTypes.PerfectDrift;
            this.driftScore += 5;
        }
        if (activeSeconds >= 4) {
            if (speed >= 50) {
                this.driftType = DriftTypes.PowerSlide;
                this.driftScore += 10;
            }
        }
    }
    driftEnded(reason) {
        this.isDrifting = false;
        this.driftScore = 0;
        const currentDate = new Date();
        const diff = currentDate.getTime() - this.startTime.getTime();
        const seconds = Math.floor(diff / 1000);
    }
};
DriftModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [UpdateModule, MathModule])
], DriftModule);
export { DriftModule };
//# sourceMappingURL=drift.module.js.map
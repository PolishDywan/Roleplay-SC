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
let RaycastModule = class RaycastModule {
    constructor() {
    }
    /**
     * Shoots a line racast and returns a result object.
     * @param startPos The start position from the raycast.
     * @param dir The direction from the raycast.
     * @param dist The max distance for the raycast, be carefull Number.MAX_VALUE dosen't work.
     * @param flags The diffrent flags for this raycast, see wiki for more informations.
     * @param ignoredEntity The entity that get ignored when the raycast got fired.
     */
    line(startPos, dir, dist, flags, ignoredEntity) {
        let targetPos = this.getTargetPos(startPos, new alt.Vector3(dir.x * dist, dir.y * dist, dir.z * dist));
        let ray = native.startExpensiveSynchronousShapeTestLosProbe(startPos.x, startPos.y, startPos.z, targetPos.x, targetPos.y, targetPos.z, flags, ignoredEntity, // entity that get ignored from raycast.
        0);
        return this.result(ray);
    }
    getTargetPos(entityVector, forwardVector) {
        return new alt.Vector3(entityVector.x + forwardVector.x, entityVector.y + forwardVector.y, entityVector.z + forwardVector.z);
    }
    result(ray) {
        let result = native.getShapeTestResult(ray, undefined, undefined, undefined, undefined);
        let hitEntity = result[4];
        return {
            isHit: result[1],
            pos: new alt.Vector3(result[2].x, result[2].y, result[2].z),
            normal: new alt.Vector3(result[3].x, result[3].y, result[3].z),
            entity: hitEntity
        };
    }
    getModel(entity) {
        if (!native.isModelValid(entity))
            return null;
        native.getEntityModel(entity);
    }
};
RaycastModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], RaycastModule);
export { RaycastModule };
//# sourceMappingURL=raycast.module.js.map
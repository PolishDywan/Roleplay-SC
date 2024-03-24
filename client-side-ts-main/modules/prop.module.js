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
import { AttachEntityOptions } from "@enums/attachentity.options";
import { singleton } from "tsyringe";
let PropModule = class PropModule {
    propID;
    constructor() {
    }
    /**
     * Create new prop object
     *
     * @param {string} name
     * @returns {this}
     */
    create(name) {
        let model = native.getHashKey(name);
        let pPos = alt.Player.local.pos;
        this.propID = native.createObject(model, pPos.x, pPos.y, pPos.z, true, true, false);
        return this;
    }
    /**
     * Attach created prop to entity
     *
     * @param {number} entity
     * @param {number} bone
     * @param {AttachEntityOptions} options
     */
    attachToEntity(entity, bone, options = {}) {
        let defaultOptions = new AttachEntityOptions();
        options = { ...defaultOptions, ...options };
        native.attachEntityToEntity(this.propID, entity, bone, options.xPos, options.yPos, options.zPos, options.xRot, options.yRot, options.zRot, options.p9, options.useSoftPinning, options.collision, options.isPed, options.vertexIndex, options.fixedRot, 0);
    }
};
PropModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], PropModule);
export { PropModule };
//# sourceMappingURL=prop.module.js.map
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
import { MathModule } from "./math.module";
let PericoIslandModule = class PericoIslandModule {
    math;
    islandPos = new alt.Vector3(4895.28, -5744.58, 26.351);
    loaded = false;
    constructor(math) {
        this.math = math;
    }
    loadIsland() {
        //let dist = this.math.distance(this.islandPos, alt.Player.local.pos);
        //if (dist <= 2000 && !this.loaded) {
        //    // @ts-ignore
        //    native.setIplSetEnabled('HeistIsland', true);
        //    this.loaded = true;
        //}
        //else if (dist > 2000 && this.loaded) {
        //    // @ts-ignore
        //    native.setIplSetEnabled('HeistIsland', false);
        //    this.loaded = false;
        //}
    }
};
PericoIslandModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [MathModule])
], PericoIslandModule);
export { PericoIslandModule };
//# sourceMappingURL=perico-island.module.js.map
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
import { foundation } from "../decorators/foundation";
import { singleton } from "tsyringe";
import { onGui, onServer } from "../decorators/events";
import { EventModule } from "../modules/event.module";
let HudHandler = class HudHandler {
    event;
    ready;
    money = 0;
    constructor(event) {
        this.event = event;
    }
    onLoaded() {
        this.ready = true;
        this.event.emitGui("hud:setmoney", this.money);
        this.event.emitGui("hud:updatehealth", alt.Player.local.health, alt.Player.local.armour);
    }
    setMoney(amount) {
        this.money = amount;
        if (this.ready) {
            this.event.emitGui("hud:setmoney", this.money);
        }
    }
};
__decorate([
    onGui("hud:ready"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HudHandler.prototype, "onLoaded", null);
__decorate([
    onServer("hud:setmoney"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HudHandler.prototype, "setMoney", null);
HudHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule])
], HudHandler);
export { HudHandler };
//# sourceMappingURL=hud.handler.js.map
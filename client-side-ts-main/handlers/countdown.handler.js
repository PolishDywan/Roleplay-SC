var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { singleton } from "tsyringe";
import { foundation } from "../decorators/foundation";
import { onServer } from "../decorators/events";
import { CountdownModule } from "../modules/countdown.module";
let CountdownHandler = class CountdownHandler {
    countdown;
    constructor(countdown) {
        this.countdown = countdown;
    }
    onCreate(idString, serverEvent, duration) {
        this.countdown.create(idString, serverEvent, duration);
    }
    onDestroy(idString) {
        this.countdown.destroy(idString);
    }
};
__decorate([
    onServer("countdown:create"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", void 0)
], CountdownHandler.prototype, "onCreate", null);
__decorate([
    onServer("countdown:destroy"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CountdownHandler.prototype, "onDestroy", null);
CountdownHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [CountdownModule])
], CountdownHandler);
export { CountdownHandler };
//# sourceMappingURL=countdown.handler.js.map
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
import { SubTitleModule } from "../modules/sub-title.module";
import { onServer } from "../decorators/events";
let SubTitleHandler = class SubTitleHandler {
    subtitle;
    constructor(subtitle) {
        this.subtitle = subtitle;
    }
    draw(message, durationInMs) {
        this.subtitle.draw(message, durationInMs);
    }
    clear() {
        this.subtitle.clear();
    }
};
__decorate([
    onServer("subtitle:draw"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], SubTitleHandler.prototype, "draw", null);
__decorate([
    onServer("subtitle:clera"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubTitleHandler.prototype, "clear", null);
SubTitleHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [SubTitleModule])
], SubTitleHandler);
export { SubTitleHandler };
//# sourceMappingURL=sub-title.handler.js.map
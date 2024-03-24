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
import { EventModule } from "./event.module";
let CountdownModule = class CountdownModule {
    event;
    countdowns = new Map();
    constructor(event) {
        this.event = event;
    }
    create(id, serverEvent, duration) {
        this.countdowns.set(id, alt.setTimeout(() => {
            this.event.emitServer(serverEvent);
        }, duration));
    }
    destroy(id) {
        const timeout = this.countdowns.get(id);
        alt.clearTimeout(timeout);
        this.countdowns.delete(id);
    }
};
CountdownModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [EventModule])
], CountdownModule);
export { CountdownModule };
//# sourceMappingURL=countdown.module.js.map
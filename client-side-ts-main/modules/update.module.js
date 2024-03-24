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
import { UUIDV4 } from "../helpers";
import * as alt from 'alt-client';
let UpdateModule = class UpdateModule {
    updates = [];
    constructor() {
        alt.everyTick(() => {
            for (const update of this.updates) {
                if (update === undefined)
                    continue;
                update.f();
            }
        });
    }
    add(func) {
        const r = { f: func, uuid: UUIDV4() };
        this.updates.push(r);
        return r.uuid;
    }
    remove(uuid) {
        this.updates = this.updates.filter(m => m.uuid !== uuid);
    }
    disconnect() {
        this.updates = [];
    }
};
UpdateModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], UpdateModule);
export { UpdateModule };
//# sourceMappingURL=update.module.js.map
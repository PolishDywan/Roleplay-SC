var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable, registry } from "../../decorators";
import { A03 } from "./03-test-case-A03-lazy-injects-B03-interface";
import { delay } from "../../lazy-helpers";
let B03 = class B03 {
    a;
    name = "B03";
    constructor(a) {
        this.a = a;
    }
};
B03 = __decorate([
    injectable(),
    registry([
        {
            token: "Ia03",
            useToken: delay(() => A03)
        }
    ]),
    __param(0, inject("Ia03")),
    __metadata("design:paramtypes", [Object])
], B03);
export { B03 };
//# sourceMappingURL=03-test-case-B03-lazy-injects-A03-interface.js.map
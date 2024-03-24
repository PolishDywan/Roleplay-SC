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
import { B03 } from "./03-test-case-B03-lazy-injects-A03-interface";
import { delay } from "../../lazy-helpers";
let A03 = class A03 {
    b;
    name = "A03";
    constructor(b) {
        this.b = b;
    }
};
A03 = __decorate([
    injectable(),
    registry([
        {
            token: "Ib03",
            useToken: delay(() => B03)
        }
    ]),
    __param(0, inject("Ib03")),
    __metadata("design:paramtypes", [Object])
], A03);
export { A03 };
//# sourceMappingURL=03-test-case-A03-lazy-injects-B03-interface.js.map
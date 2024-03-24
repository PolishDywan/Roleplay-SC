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
import { B02 } from "./02-test-case-B02-lazy-injects-A02";
import { injectable, inject } from "../../decorators";
import { delay } from "../../lazy-helpers";
let A02 = class A02 {
    b;
    constructor(b) {
        this.b = b;
    }
};
A02 = __decorate([
    injectable(),
    __param(0, inject(delay(() => B02))),
    __metadata("design:paramtypes", [B02])
], A02);
export { A02 };
//# sourceMappingURL=02-test-case-A02-lazy-injects-B02.js.map
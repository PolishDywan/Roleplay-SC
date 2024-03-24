var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { A01 } from "./01-test-case-A01-injects-B01";
import { injectable } from "../../decorators";
let B01 = class B01 {
    a;
    constructor(a) {
        this.a = a;
    }
};
B01 = __decorate([
    injectable(),
    __metadata("design:paramtypes", [A01])
], B01);
export { B01 };
//# sourceMappingURL=01-test-case-B01-injects-A01.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as alt from "alt-client";
import { PrototypeFor } from "../decorators/prototype-for";
let Vector3 = class Vector3 extends alt.Vector3 {
};
Vector3 = __decorate([
    PrototypeFor(alt.Vector3)
], Vector3);
export { Vector3 };
//# sourceMappingURL=vector3.extensions.js.map
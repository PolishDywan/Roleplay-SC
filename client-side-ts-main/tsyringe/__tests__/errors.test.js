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
import { instance as globalContainer } from "../dependency-container";
import { inject, injectable } from "../decorators";
import { A01 } from "./fixtures/01-test-case-A01-injects-B01";
import errorMatch from "./utils/error-match";
afterEach(() => {
    globalContainer.reset();
});
test("Error message composition", () => {
    class Ok {
    }
    let C = class C {
        s;
        constructor(s) {
            this.s = s;
        }
    };
    C = __decorate([
        injectable(),
        __metadata("design:paramtypes", [Object])
    ], C);
    let B = class B {
        c;
        constructor(c) {
            this.c = c;
        }
    };
    B = __decorate([
        injectable(),
        __metadata("design:paramtypes", [C])
    ], B);
    let A = class A {
        d;
        b;
        constructor(d, b) {
            this.d = d;
            this.b = b;
        }
    };
    A = __decorate([
        injectable(),
        __metadata("design:paramtypes", [Ok, B])
    ], A);
    expect(() => {
        globalContainer.resolve(A);
    }).toThrow(errorMatch([
        /Cannot inject the dependency "b" at position #1 of "A" constructor\. Reason:/,
        /Cannot inject the dependency "c" at position #0 of "B" constructor\. Reason:/,
        /Cannot inject the dependency "s" at position #0 of "C" constructor\. Reason:/,
        /TypeInfo not known for "Object"/
    ]));
});
test("Param position", () => {
    let A = class A {
        j;
        constructor(j) {
            this.j = j;
        }
    };
    A = __decorate([
        injectable(),
        __param(0, inject("missing")),
        __metadata("design:paramtypes", [Object])
    ], A);
    expect(() => {
        globalContainer.resolve(A);
    }).toThrow(errorMatch([
        /Cannot inject the dependency "j" at position #0 of "A" constructor\. Reason:/,
        /Attempted to resolve unregistered dependency token: "missing"/
    ]));
});
test("Detect circular dependency", () => {
    expect(() => {
        globalContainer.resolve(A01);
    }).toThrow(errorMatch([
        /Cannot inject the dependency "b" at position #0 of "A01" constructor\. Reason:/,
        /Cannot inject the dependency "a" at position #0 of "B01" constructor\. Reason:/,
        /Attempted to construct an undefined constructor. Could mean a circular dependency problem. Try using `delay` function./
    ]));
});
//# sourceMappingURL=errors.test.js.map
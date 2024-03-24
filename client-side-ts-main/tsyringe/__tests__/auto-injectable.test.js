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
import { autoInjectable, injectable, singleton } from "../decorators";
import { instance as globalContainer } from "../dependency-container";
import injectAll from "../decorators/inject-all";
afterEach(() => {
    globalContainer.reset();
});
test("@autoInjectable allows for injection to be performed without using .resolve()", () => {
    class Bar {
    }
    let Foo = class Foo {
        myBar;
        constructor(myBar) {
            this.myBar = myBar;
        }
    };
    Foo = __decorate([
        autoInjectable(),
        __metadata("design:paramtypes", [Bar])
    ], Foo);
    const myFoo = new Foo();
    expect(myFoo.myBar instanceof Bar).toBeTruthy();
});
test("@autoInjectable allows for parameters to be specified manually", () => {
    class Bar {
    }
    let Foo = class Foo {
        myBar;
        constructor(myBar) {
            this.myBar = myBar;
        }
    };
    Foo = __decorate([
        autoInjectable(),
        __metadata("design:paramtypes", [Bar])
    ], Foo);
    const myBar = new Bar();
    const myFoo = new Foo(myBar);
    expect(myFoo.myBar).toBe(myBar);
});
test("@autoInjectable injects parameters beyond those specified manually", () => {
    class Bar {
    }
    class FooBar {
    }
    let Foo = class Foo {
        myFooBar;
        myBar;
        constructor(myFooBar, myBar) {
            this.myFooBar = myFooBar;
            this.myBar = myBar;
        }
    };
    Foo = __decorate([
        autoInjectable(),
        __metadata("design:paramtypes", [FooBar, Bar])
    ], Foo);
    const myFooBar = new FooBar();
    const myFoo = new Foo(myFooBar);
    expect(myFoo.myFooBar).toBe(myFooBar);
    expect(myFoo.myBar instanceof Bar).toBeTruthy();
});
test("@autoInjectable works when the @autoInjectable is a polymorphic ancestor", () => {
    class Foo {
        constructor() { }
    }
    let Ancestor = class Ancestor {
        myFoo;
        constructor(myFoo) {
            this.myFoo = myFoo;
        }
    };
    Ancestor = __decorate([
        autoInjectable(),
        __metadata("design:paramtypes", [Foo])
    ], Ancestor);
    class Child extends Ancestor {
        constructor() {
            super();
        }
    }
    const instance = new Child();
    expect(instance.myFoo instanceof Foo).toBeTruthy();
});
test("@autoInjectable classes keep behavior from their ancestor's constructors", () => {
    const a = 5;
    const b = 4;
    class Foo {
        constructor() { }
    }
    let Ancestor = class Ancestor {
        myFoo;
        a;
        constructor(myFoo) {
            this.myFoo = myFoo;
            this.a = a;
        }
    };
    Ancestor = __decorate([
        autoInjectable(),
        __metadata("design:paramtypes", [Foo])
    ], Ancestor);
    class Child extends Ancestor {
        b;
        constructor() {
            super();
            this.b = b;
        }
    }
    const instance = new Child();
    expect(instance.a).toBe(a);
    expect(instance.b).toBe(b);
});
test("@autoInjectable classes resolve their @injectable dependencies", () => {
    class Foo {
    }
    let Bar = class Bar {
        myFoo;
        constructor(myFoo) {
            this.myFoo = myFoo;
        }
    };
    Bar = __decorate([
        injectable(),
        __metadata("design:paramtypes", [Foo])
    ], Bar);
    let FooBar = class FooBar {
        myBar;
        constructor(myBar) {
            this.myBar = myBar;
        }
    };
    FooBar = __decorate([
        autoInjectable(),
        __metadata("design:paramtypes", [Bar])
    ], FooBar);
    const myFooBar = new FooBar();
    expect(myFooBar.myBar.myFoo instanceof Foo).toBeTruthy();
});
test("@autoInjectable throws a clear error if a dependency can't be resolved.", () => {
    let Foo = class Foo {
        myBar;
        constructor(myBar) {
            this.myBar = myBar;
        }
    };
    Foo = __decorate([
        autoInjectable(),
        __metadata("design:paramtypes", [Object])
    ], Foo);
    expect(() => new Foo()).toThrow(/Cannot inject the dependency "myBar" at position #0 of "Foo" constructor\. Reason:\s+TypeInfo/);
});
test("@autoInjectable works with @singleton", () => {
    class Bar {
    }
    let Foo = class Foo {
        bar;
        constructor(bar) {
            this.bar = bar;
        }
    };
    Foo = __decorate([
        singleton(),
        autoInjectable(),
        __metadata("design:paramtypes", [Bar])
    ], Foo);
    const instance1 = globalContainer.resolve(Foo);
    const instance2 = globalContainer.resolve(Foo);
    expect(instance1).toBe(instance2);
    expect(instance1.bar).toBe(instance2.bar);
});
test("@autoInjectable resolves multiple registered dependencies", () => {
    let FooBar = class FooBar {
        str = "";
    };
    FooBar = __decorate([
        injectable()
    ], FooBar);
    globalContainer.register("Bar", { useClass: FooBar });
    let Foo = class Foo {
        bar;
        constructor(bar) {
            this.bar = bar;
        }
    };
    Foo = __decorate([
        autoInjectable(),
        __param(0, injectAll("Bar")),
        __metadata("design:paramtypes", [Array])
    ], Foo);
    const foo = new Foo();
    expect(Array.isArray(foo.bar)).toBeTruthy();
    expect(foo.bar.length).toBe(1);
    expect(foo.bar[0]).toBeInstanceOf(FooBar);
});
test("@autoInjectable resolves multiple transient dependencies", () => {
    class Foo {
    }
    let Bar = class Bar {
        foo;
        constructor(foo) {
            this.foo = foo;
        }
    };
    Bar = __decorate([
        autoInjectable(),
        __param(0, injectAll(Foo)),
        __metadata("design:paramtypes", [Array])
    ], Bar);
    const bar = new Bar();
    expect(Array.isArray(bar.foo)).toBeTruthy();
    expect(bar.foo.length).toBe(1);
    expect(bar.foo[0]).toBeInstanceOf(Foo);
});
//# sourceMappingURL=auto-injectable.test.js.map
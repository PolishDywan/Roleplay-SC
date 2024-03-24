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
import { autoInjectable, container } from "..";
import { injectable } from "../decorators";
import injectAllWithTransform from "../decorators/inject-all-with-transform";
import injectWithTransform from "../decorators/inject-with-transform";
afterEach(() => {
    container.reset();
});
test("Injecting with transform should work", () => {
    class Bar {
    }
    class BarTransform {
        transform() {
            return "Transformed from bar";
        }
    }
    let Foo = class Foo {
        value;
        constructor(value) {
            this.value = value;
        }
    };
    Foo = __decorate([
        injectable(),
        __param(0, injectWithTransform(Bar, BarTransform)),
        __metadata("design:paramtypes", [String])
    ], Foo);
    const result = container.resolve(Foo);
    expect(result.value).toEqual("Transformed from bar");
});
test("Injecting with transform should work passing a parameter from the decorator", () => {
    class Bar {
        repeat(str) {
            return str + str;
        }
    }
    class BarTransform {
        transform(bar, str) {
            return bar.repeat(str);
        }
    }
    let Foo = class Foo {
        value;
        constructor(value) {
            this.value = value;
        }
    };
    Foo = __decorate([
        injectable(),
        __param(0, injectWithTransform(Bar, BarTransform, "b")),
        __metadata("design:paramtypes", [String])
    ], Foo);
    const result = container.resolve(Foo);
    expect(result.value).toEqual("bb");
});
test("Injecting with transform should work passing parameters from the decorator", () => {
    class Bar {
        concat(str1, str2) {
            return str1 + str2;
        }
    }
    class BarTransform {
        transform(bar, str1, str2) {
            return bar.concat(str1, str2);
        }
    }
    let Foo = class Foo {
        value;
        constructor(value) {
            this.value = value;
        }
    };
    Foo = __decorate([
        injectable(),
        __param(0, injectWithTransform(Bar, BarTransform, "a", "b")),
        __metadata("design:paramtypes", [String])
    ], Foo);
    const result = container.resolve(Foo);
    expect(result.value).toEqual("ab");
});
test("Transformation works with @autoInjectable", () => {
    class Bar {
    }
    class BarTransform {
        transform() {
            return "Transformed from bar";
        }
    }
    let Foo = class Foo {
        value;
        constructor(value) {
            this.value = value;
        }
    };
    Foo = __decorate([
        autoInjectable(),
        __param(0, injectWithTransform(Bar, BarTransform)),
        __metadata("design:paramtypes", [String])
    ], Foo);
    const myFoo = new Foo();
    expect(myFoo.value).toBe("Transformed from bar");
});
test("Injecting all with transform should work", () => {
    class Bar {
    }
    class BarTransform {
        transform() {
            return "Transformed from bar";
        }
    }
    let Foo = class Foo {
        value;
        constructor(value) {
            this.value = value;
        }
    };
    Foo = __decorate([
        injectable(),
        __param(0, injectAllWithTransform(Bar, BarTransform)),
        __metadata("design:paramtypes", [String])
    ], Foo);
    const result = container.resolve(Foo);
    expect(result.value).toEqual("Transformed from bar");
});
test("Injecting all with transform should allow the transformer to act over an array", () => {
    class FooOne {
        bar = "foo1";
    }
    class FooTwo {
        bar = "foo2";
    }
    container.register("FooInterface", { useClass: FooOne });
    container.register("FooInterface", { useClass: FooTwo });
    class FooTransform {
        transform(foos) {
            return foos.map(f => f.bar).reduce((acc, f) => acc + f);
        }
    }
    let Bar = class Bar {
        value;
        constructor(value) {
            this.value = value;
        }
    };
    Bar = __decorate([
        injectable(),
        __param(0, injectAllWithTransform("FooInterface", FooTransform, "!!")),
        __metadata("design:paramtypes", [String])
    ], Bar);
    const result = container.resolve(Bar);
    expect(result.value).toEqual("foo1foo2");
});
test("Injecting all with transform should work with a decorator parameter", () => {
    class FooOne {
        bar = "foo1";
    }
    class FooTwo {
        bar = "foo2";
    }
    container.register("FooInterface", { useClass: FooOne });
    container.register("FooInterface", { useClass: FooTwo });
    class FooTransform {
        transform(foos, suffix) {
            return foos.map(f => f.bar + suffix).reduce((acc, f) => acc + f);
        }
    }
    let Bar = class Bar {
        value;
        constructor(value) {
            this.value = value;
        }
    };
    Bar = __decorate([
        injectable(),
        __param(0, injectAllWithTransform("FooInterface", FooTransform, "!!")),
        __metadata("design:paramtypes", [String])
    ], Bar);
    const result = container.resolve(Bar);
    expect(result.value).toEqual("foo1!!foo2!!");
});
test("Injecting all with transform should allow multiple decorator params", () => {
    class FooOne {
        bar = "foo1";
    }
    class FooTwo {
        bar = "foo2";
    }
    container.register("FooInterface", { useClass: FooOne });
    container.register("FooInterface", { useClass: FooTwo });
    class FooTransform {
        transform(foos, delimiter, suffix) {
            return (foos.map(f => f.bar + delimiter).reduce((acc, f) => acc + f) + suffix);
        }
    }
    let Bar = class Bar {
        value;
        constructor(value) {
            this.value = value;
        }
    };
    Bar = __decorate([
        injectable(),
        __param(0, injectAllWithTransform("FooInterface", FooTransform, ",", "!!")),
        __metadata("design:paramtypes", [String])
    ], Bar);
    const result = container.resolve(Bar);
    expect(result.value).toEqual("foo1,foo2,!!");
});
test("@autoInjectable should work with transforms", () => {
    class FooOne {
        bar = "foo1";
    }
    class FooTwo {
        bar = "foo2";
    }
    container.register("FooInterface", { useClass: FooOne });
    container.register("FooInterface", { useClass: FooTwo });
    class FooTransform {
        transform(foos, delimiter, suffix) {
            return (foos.map(f => f.bar + delimiter).reduce((acc, f) => acc + f) + suffix);
        }
    }
    let Bar = class Bar {
        value;
        constructor(value) {
            this.value = value;
        }
    };
    Bar = __decorate([
        autoInjectable(),
        __param(0, injectAllWithTransform("FooInterface", FooTransform, ",", "!!")),
        __metadata("design:paramtypes", [String])
    ], Bar);
    const result = new Bar();
    expect(result.value).toEqual("foo1,foo2,!!");
});
//# sourceMappingURL=transform.test.js.map
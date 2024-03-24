/* eslint-disable @typescript-eslint/interface-name-prefix */
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
import { inject, injectable, registry, singleton } from "../decorators";
import { instanceCachingFactory, predicateAwareClassFactory } from "../factories";
import { instance as globalContainer } from "../dependency-container";
import injectAll from "../decorators/inject-all";
import Lifecycle from "../types/lifecycle";
afterEach(() => {
    globalContainer.reset();
});
// --- registerSingleton() ---
test("a singleton registration can be redirected", () => {
    let MyService = class MyService {
    };
    MyService = __decorate([
        singleton()
    ], MyService);
    class MyServiceMock {
    }
    let MyClass = class MyClass {
        myService;
        constructor(myService) {
            this.myService = myService;
        }
    };
    MyClass = __decorate([
        injectable(),
        __metadata("design:paramtypes", [MyService])
    ], MyClass);
    globalContainer.registerSingleton(MyService, MyServiceMock);
    const myClass = globalContainer.resolve(MyClass);
    expect(myClass.myService).toBeInstanceOf(MyServiceMock);
});
// --- resolve() ---
test("fails to resolve unregistered dependency by name", () => {
    expect(() => {
        globalContainer.resolve("NotRegistered");
    }).toThrow();
});
test("allows arrays to be registered by value provider", () => {
    class Bar {
    }
    const value = [new Bar()];
    globalContainer.register("BarArray", { useValue: value });
    const barArray = globalContainer.resolve("BarArray");
    expect(Array.isArray(barArray)).toBeTruthy();
    expect(value === barArray).toBeTruthy();
});
test("allows arrays to be registered by factory provider", () => {
    class Bar {
    }
    globalContainer.register(Bar, { useClass: Bar });
    globalContainer.register("BarArray", {
        useFactory: (container) => {
            return [container.resolve(Bar)];
        }
    });
    const barArray = globalContainer.resolve("BarArray");
    expect(Array.isArray(barArray)).toBeTruthy();
    expect(barArray.length).toBe(1);
    expect(barArray[0]).toBeInstanceOf(Bar);
});
test("resolves transient instances when not registered", () => {
    class Bar {
    }
    const myBar = globalContainer.resolve(Bar);
    const myBar2 = globalContainer.resolve(Bar);
    expect(myBar instanceof Bar).toBeTruthy();
    expect(myBar2 instanceof Bar).toBeTruthy();
    expect(myBar).not.toBe(myBar2);
});
test("resolves a transient instance when registered by class provider", () => {
    class Bar {
    }
    globalContainer.register("Bar", { useClass: Bar });
    const myBar = globalContainer.resolve("Bar");
    const myBar2 = globalContainer.resolve("Bar");
    expect(myBar instanceof Bar).toBeTruthy();
    expect(myBar2 instanceof Bar).toBeTruthy();
    expect(myBar).not.toBe(myBar2);
});
test("resolves a singleton instance when class provider registered as singleton", () => {
    class Bar {
    }
    globalContainer.register("Bar", { useClass: Bar }, { lifecycle: Lifecycle.Singleton });
    const myBar = globalContainer.resolve("Bar");
    const myBar2 = globalContainer.resolve("Bar");
    expect(myBar instanceof Bar).toBeTruthy();
    expect(myBar).toBe(myBar2);
});
test("resolves a transient instance when using token alias", () => {
    class Bar {
    }
    globalContainer.register("Bar", { useClass: Bar });
    globalContainer.register("BarAlias", { useToken: "Bar" });
    const myBar = globalContainer.resolve("BarAlias");
    const myBar2 = globalContainer.resolve("BarAlias");
    expect(myBar instanceof Bar).toBeTruthy();
    expect(myBar).not.toBe(myBar2);
});
test("resolves a singleton instance when token alias registered as singleton", () => {
    class Bar {
    }
    globalContainer.register("Bar", { useClass: Bar });
    globalContainer.register("SingletonBar", { useToken: "Bar" }, { lifecycle: Lifecycle.Singleton });
    const myBar = globalContainer.resolve("SingletonBar");
    const myBar2 = globalContainer.resolve("SingletonBar");
    expect(myBar instanceof Bar).toBeTruthy();
    expect(myBar).toBe(myBar2);
});
test("resolves same instance when registerInstance() is used with a class", () => {
    class Bar {
    }
    const instance = new Bar();
    globalContainer.registerInstance(Bar, instance);
    expect(globalContainer.resolve(Bar)).toBe(instance);
});
test("resolves same instance when registerInstance() is used with a name", () => {
    class Bar {
    }
    const instance = new Bar();
    globalContainer.registerInstance("Test", instance);
    expect(globalContainer.resolve("Test")).toBe(instance);
});
test("registerType() allows for classes to be swapped", () => {
    class Bar {
    }
    class Foo {
    }
    globalContainer.registerType(Bar, Foo);
    expect(globalContainer.resolve(Bar) instanceof Foo).toBeTruthy();
});
test("registerType() allows for names to be registered for a given type", () => {
    class Bar {
    }
    globalContainer.registerType("CoolName", Bar);
    expect(globalContainer.resolve("CoolName") instanceof Bar).toBeTruthy();
});
test("registerType() doesn't allow tokens to point to themselves", () => {
    expect(() => globalContainer.registerType("Bar", "Bar")).toThrowError("Token registration cycle detected!");
});
test("registerType() doesn't allow registration cycles", () => {
    globalContainer.registerType("Bar", "Foo");
    globalContainer.registerType("Foo", "FooBar");
    expect(() => globalContainer.registerType("FooBar", "Bar")).toThrowError("Token registration cycle detected!");
});
test("executes a registered factory each time resolve is called", () => {
    const factoryMock = jest.fn();
    globalContainer.register("Test", { useFactory: factoryMock });
    globalContainer.resolve("Test");
    globalContainer.resolve("Test");
    expect(factoryMock.mock.calls.length).toBe(2);
});
test("resolves to factory result each time resolve is called", () => {
    const factoryMock = jest.fn();
    globalContainer.register("Test", { useFactory: factoryMock });
    const value1 = 1;
    const value2 = 2;
    factoryMock.mockReturnValue(value1);
    const result1 = globalContainer.resolve("Test");
    factoryMock.mockReturnValue(value2);
    const result2 = globalContainer.resolve("Test");
    expect(result1).toBe(value1);
    expect(result2).toBe(value2);
});
test("resolves anonymous classes separately", () => {
    const ctor1 = (() => class {
    })();
    const ctor2 = (() => class {
    })();
    globalContainer.registerInstance(ctor1, new ctor1());
    globalContainer.registerInstance(ctor2, new ctor2());
    expect(globalContainer.resolve(ctor1) instanceof ctor1).toBeTruthy();
    expect(globalContainer.resolve(ctor2) instanceof ctor2).toBeTruthy();
});
test("resolves dependencies of superclass with no constructor", () => {
    class Dependency {
    }
    let SuperClass = class SuperClass {
        dependency;
        constructor(dependency) {
            this.dependency = dependency;
        }
    };
    SuperClass = __decorate([
        injectable(),
        __metadata("design:paramtypes", [Dependency])
    ], SuperClass);
    let SubClass = class SubClass extends SuperClass {
    };
    SubClass = __decorate([
        injectable()
    ], SubClass);
    expect(globalContainer.resolve(SubClass).dependency).toBeInstanceOf(Dependency);
});
// --- resolveAll() ---
test("fails to resolveAll unregistered dependency by name", () => {
    expect(() => {
        globalContainer.resolveAll("NotRegistered");
    }).toThrow();
});
test("resolves an array of transient instances bound to a single interface", () => {
    class FooOne {
        bar = "foo1";
    }
    class FooTwo {
        bar = "foo2";
    }
    globalContainer.register("FooInterface", { useClass: FooOne });
    globalContainer.register("FooInterface", { useClass: FooTwo });
    const fooArray = globalContainer.resolveAll("FooInterface");
    expect(Array.isArray(fooArray)).toBeTruthy();
    expect(fooArray[0]).toBeInstanceOf(FooOne);
    expect(fooArray[1]).toBeInstanceOf(FooTwo);
});
test("resolves all transient instances when not registered", () => {
    class Foo {
    }
    const foo1 = globalContainer.resolveAll(Foo);
    const foo2 = globalContainer.resolveAll(Foo);
    expect(Array.isArray(foo1)).toBeTruthy();
    expect(Array.isArray(foo2)).toBeTruthy();
    expect(foo1[0]).toBeInstanceOf(Foo);
    expect(foo2[0]).toBeInstanceOf(Foo);
    expect(foo1[0]).not.toBe(foo2[0]);
});
// --- isRegistered() ---
test("returns true for a registered singleton class", () => {
    let Bar = class Bar {
        value = "";
    };
    Bar = __decorate([
        injectable()
    ], Bar);
    let Foo = class Foo {
        myBar;
        constructor(myBar) {
            this.myBar = myBar;
        }
    };
    Foo = __decorate([
        injectable(),
        __metadata("design:paramtypes", [Bar])
    ], Foo);
    globalContainer.registerSingleton(Foo);
    expect(globalContainer.isRegistered(Foo)).toBeTruthy();
});
test("returns true for a registered class provider", () => {
    let Bar = class Bar {
        value = "";
    };
    Bar = __decorate([
        injectable()
    ], Bar);
    let Foo = class Foo {
        myBar;
        constructor(myBar) {
            this.myBar = myBar;
        }
    };
    Foo = __decorate([
        injectable(),
        __metadata("design:paramtypes", [Bar])
    ], Foo);
    globalContainer.register(Foo, { useClass: Foo });
    expect(globalContainer.isRegistered(Foo)).toBeTruthy();
});
test("returns true for a registered value provider", () => {
    let Bar = class Bar {
        value = "";
    };
    Bar = __decorate([
        injectable()
    ], Bar);
    let Foo = class Foo {
        myBar;
        constructor(myBar) {
            this.myBar = myBar;
        }
    };
    Foo = __decorate([
        injectable(),
        __metadata("design:paramtypes", [Bar])
    ], Foo);
    globalContainer.register(Foo, { useValue: {} });
    expect(globalContainer.isRegistered(Foo)).toBeTruthy();
});
test("returns true for a registered token provider", () => {
    let Bar = class Bar {
        value = "";
    };
    Bar = __decorate([
        injectable()
    ], Bar);
    let Foo = class Foo {
        myBar;
        constructor(myBar) {
            this.myBar = myBar;
        }
    };
    Foo = __decorate([
        injectable(),
        __metadata("design:paramtypes", [Bar])
    ], Foo);
    globalContainer.register(Foo, { useToken: "Bar" });
    expect(globalContainer.isRegistered(Foo)).toBeTruthy();
});
// --- clearInstances() ---
test("clears ValueProvider registrations", () => {
    class Foo {
    }
    const instance1 = new Foo();
    globalContainer.registerInstance("Test", instance1);
    expect(globalContainer.resolve("Test")).toBeInstanceOf(Foo);
    globalContainer.clearInstances();
    expect(() => {
        globalContainer.resolve("Test");
    }).toThrow();
});
test("clears cached instances from container.resolve() calls", () => {
    let Foo = class Foo {
    };
    Foo = __decorate([
        singleton()
    ], Foo);
    const instance1 = globalContainer.resolve(Foo);
    globalContainer.clearInstances();
    // Foo should still be registered as singleton
    const instance2 = globalContainer.resolve(Foo);
    const instance3 = globalContainer.resolve(Foo);
    expect(instance1).not.toBe(instance2);
    expect(instance2).toBe(instance3);
    expect(instance3).toBeInstanceOf(Foo);
});
// --- @injectable ---
test("@injectable resolves when not using DI", () => {
    let Bar = class Bar {
        value = "";
    };
    Bar = __decorate([
        injectable()
    ], Bar);
    let Foo = class Foo {
        myBar;
        constructor(myBar) {
            this.myBar = myBar;
        }
    };
    Foo = __decorate([
        injectable(),
        __metadata("design:paramtypes", [Bar])
    ], Foo);
    const myValue = "test";
    const myBar = new Bar();
    myBar.value = myValue;
    const myFoo = new Foo(myBar);
    expect(myFoo.myBar.value).toBe(myValue);
});
test("@injectable resolves when using DI", () => {
    let Bar = class Bar {
        value = "";
    };
    Bar = __decorate([
        injectable()
    ], Bar);
    let Foo = class Foo {
        myBar;
        constructor(myBar) {
            this.myBar = myBar;
        }
    };
    Foo = __decorate([
        injectable(),
        __metadata("design:paramtypes", [Bar])
    ], Foo);
    const myFoo = globalContainer.resolve(Foo);
    expect(myFoo.myBar.value).toBe("");
});
test("@injectable resolves nested dependencies when using DI", () => {
    let Bar = class Bar {
        value = "";
    };
    Bar = __decorate([
        injectable()
    ], Bar);
    let Foo = class Foo {
        myBar;
        constructor(myBar) {
            this.myBar = myBar;
        }
    };
    Foo = __decorate([
        injectable(),
        __metadata("design:paramtypes", [Bar])
    ], Foo);
    let FooBar = class FooBar {
        myFoo;
        constructor(myFoo) {
            this.myFoo = myFoo;
        }
    };
    FooBar = __decorate([
        injectable(),
        __metadata("design:paramtypes", [Foo])
    ], FooBar);
    const myFooBar = globalContainer.resolve(FooBar);
    expect(myFooBar.myFoo.myBar.value).toBe("");
});
test("@injectable preserves static members", () => {
    const value = "foobar";
    let MyStatic = class MyStatic {
        static testVal = value;
        static testFunc() {
            return value;
        }
    };
    MyStatic = __decorate([
        injectable()
    ], MyStatic);
    expect(MyStatic.testFunc()).toBe(value);
    expect(MyStatic.testVal).toBe(value);
});
test("@injectable handles optional params", () => {
    let Bar = class Bar {
        value = "";
    };
    Bar = __decorate([
        injectable()
    ], Bar);
    let Foo = class Foo {
        myBar;
        constructor(myBar) {
            this.myBar = myBar;
        }
    };
    Foo = __decorate([
        injectable(),
        __metadata("design:paramtypes", [Bar])
    ], Foo);
    let MyOptional = class MyOptional {
        myFoo;
        constructor(myFoo) {
            this.myFoo = myFoo;
        }
    };
    MyOptional = __decorate([
        injectable(),
        __metadata("design:paramtypes", [Foo])
    ], MyOptional);
    const myOptional = globalContainer.resolve(MyOptional);
    expect(myOptional.myFoo instanceof Foo).toBeTruthy();
});
test("@singleton registers class as singleton with the global container", () => {
    let Bar = class Bar {
    };
    Bar = __decorate([
        singleton()
    ], Bar);
    const myBar = globalContainer.resolve(Bar);
    const myBar2 = globalContainer.resolve(Bar);
    expect(myBar instanceof Bar).toBeTruthy();
    expect(myBar).toBe(myBar2);
});
test("dependencies of an @singleton can be resolved", () => {
    class Foo {
    }
    let Bar = class Bar {
        foo;
        constructor(foo) {
            this.foo = foo;
        }
    };
    Bar = __decorate([
        singleton(),
        __metadata("design:paramtypes", [Foo])
    ], Bar);
    const myBar = globalContainer.resolve(Bar);
    expect(myBar.foo instanceof Foo).toBeTruthy();
});
test("passes through the given params", () => {
    let MyViewModel = class MyViewModel {
        a;
        b;
        c;
        constructor(a, b, c) {
            this.a = a;
            this.b = b;
            this.c = c;
        }
    };
    MyViewModel = __decorate([
        injectable(),
        __metadata("design:paramtypes", [Object, Object, Object])
    ], MyViewModel);
    const a = {};
    const b = {};
    const c = {};
    const instance = new MyViewModel(a, b, c);
    expect(instance.a).toBe(a);
    expect(instance.b).toBe(b);
    expect(instance.c).toBe(c);
});
// --- @registry ---
test("doesn't blow up with empty args", () => {
    let RegisteringFoo = class RegisteringFoo {
    };
    RegisteringFoo = __decorate([
        registry()
    ], RegisteringFoo);
    expect(() => new RegisteringFoo()).not.toThrow();
});
test("registers by type provider", () => {
    let Bar = class Bar {
        value = "";
    };
    Bar = __decorate([
        injectable()
    ], Bar);
    let RegisteringFoo = class RegisteringFoo {
    };
    RegisteringFoo = __decorate([
        registry([{ token: Bar, useClass: Bar }])
    ], RegisteringFoo);
    new RegisteringFoo();
    expect(globalContainer.isRegistered(Bar)).toBeTruthy();
});
test("registers by class provider", () => {
    let Bar = class Bar {
        value = "";
    };
    Bar = __decorate([
        injectable()
    ], Bar);
    const registration = {
        token: "IBar",
        useClass: Bar
    };
    let RegisteringFoo = class RegisteringFoo {
    };
    RegisteringFoo = __decorate([
        registry([registration])
    ], RegisteringFoo);
    new RegisteringFoo();
    expect(globalContainer.isRegistered(registration.token)).toBeTruthy();
});
test("registers by value provider", () => {
    const registration = {
        token: "IBar",
        useValue: {}
    };
    let RegisteringFoo = class RegisteringFoo {
    };
    RegisteringFoo = __decorate([
        registry([registration])
    ], RegisteringFoo);
    new RegisteringFoo();
    expect(globalContainer.isRegistered(registration.token)).toBeTruthy();
});
test("registers by token provider", () => {
    const registration = {
        token: "IBar",
        useToken: "IFoo"
    };
    let RegisteringFoo = class RegisteringFoo {
    };
    RegisteringFoo = __decorate([
        registry([registration])
    ], RegisteringFoo);
    new RegisteringFoo();
    expect(globalContainer.isRegistered(registration.token)).toBeTruthy();
});
test("registers by factory provider", () => {
    let Bar = class Bar {
        value = "";
    };
    Bar = __decorate([
        injectable()
    ], Bar);
    const registration = {
        token: "IBar",
        useFactory: (globalContainer) => globalContainer.resolve(Bar)
    };
    let RegisteringFoo = class RegisteringFoo {
    };
    RegisteringFoo = __decorate([
        registry([registration])
    ], RegisteringFoo);
    new RegisteringFoo();
    expect(globalContainer.isRegistered(registration.token)).toBeTruthy();
});
test("registers mixed types", () => {
    let Bar = class Bar {
        value = "";
    };
    Bar = __decorate([
        injectable()
    ], Bar);
    let Foo = class Foo {
        myBar;
        constructor(myBar) {
            this.myBar = myBar;
        }
    };
    Foo = __decorate([
        injectable(),
        __metadata("design:paramtypes", [Bar])
    ], Foo);
    const registration = {
        token: "IBar",
        useClass: Bar
    };
    let RegisteringFoo = class RegisteringFoo {
    };
    RegisteringFoo = __decorate([
        registry([registration, { token: Foo, useClass: Foo }])
    ], RegisteringFoo);
    new RegisteringFoo();
    expect(globalContainer.isRegistered(registration.token)).toBeTruthy();
    expect(globalContainer.isRegistered(Foo)).toBeTruthy();
});
test("registers by symbol token provider", () => {
    const registration = {
        token: Symbol("obj1"),
        useValue: {}
    };
    let RegisteringFoo = class RegisteringFoo {
    };
    RegisteringFoo = __decorate([
        registry([registration])
    ], RegisteringFoo);
    new RegisteringFoo();
    expect(globalContainer.isRegistered(registration.token)).toBeTruthy();
    expect(globalContainer.resolve(registration.token)).toEqual(registration.useValue);
});
// --- @inject ---
test("allows interfaces to be resolved from the constructor with injection token", () => {
    let Bar = class Bar {
        value = "";
    };
    Bar = __decorate([
        injectable()
    ], Bar);
    let FooWithInterface = class FooWithInterface {
        myBar;
        constructor(myBar) {
            this.myBar = myBar;
        }
    };
    FooWithInterface = __decorate([
        injectable(),
        registry([{ token: Bar, useClass: Bar }]),
        __param(0, inject(Bar)),
        __metadata("design:paramtypes", [Object])
    ], FooWithInterface);
    const myFoo = globalContainer.resolve(FooWithInterface);
    expect(myFoo.myBar instanceof Bar).toBeTruthy();
});
test("allows interfaces to be resolved from the constructor with just a name", () => {
    let Bar = class Bar {
        value = "";
    };
    Bar = __decorate([
        injectable()
    ], Bar);
    let FooWithInterface = class FooWithInterface {
        myBar;
        constructor(myBar) {
            this.myBar = myBar;
        }
    };
    FooWithInterface = __decorate([
        injectable(),
        registry([
            {
                token: "IBar",
                useClass: Bar
            }
        ]),
        __param(0, inject("IBar")),
        __metadata("design:paramtypes", [Object])
    ], FooWithInterface);
    const myFoo = globalContainer.resolve(FooWithInterface);
    expect(myFoo.myBar instanceof Bar).toBeTruthy();
});
test("allows explicit array dependencies to be resolved by inject decorator", () => {
    let Foo = class Foo {
    };
    Foo = __decorate([
        injectable()
    ], Foo);
    let Bar = class Bar {
        foo;
        constructor(foo) {
            this.foo = foo;
        }
    };
    Bar = __decorate([
        injectable(),
        __param(0, inject("FooArray")),
        __metadata("design:paramtypes", [Array])
    ], Bar);
    const fooArray = [new Foo()];
    globalContainer.register("FooArray", { useValue: fooArray });
    globalContainer.register(Bar, { useClass: Bar });
    const bar = globalContainer.resolve(Bar);
    expect(bar.foo === fooArray).toBeTruthy();
});
// --- @injectAll ---
test("injects all dependencies bound to a given interface", () => {
    class FooImpl1 {
        str = "foo1";
    }
    class FooImpl2 {
        str = "foo2";
    }
    let Bar = class Bar {
        foo;
        constructor(foo) {
            this.foo = foo;
        }
    };
    Bar = __decorate([
        injectable(),
        __param(0, injectAll("Foo")),
        __metadata("design:paramtypes", [Array])
    ], Bar);
    globalContainer.register("Foo", { useClass: FooImpl1 });
    globalContainer.register("Foo", { useClass: FooImpl2 });
    const bar = globalContainer.resolve(Bar);
    expect(Array.isArray(bar.foo)).toBeTruthy();
    expect(bar.foo.length).toBe(2);
    expect(bar.foo[0]).toBeInstanceOf(FooImpl1);
    expect(bar.foo[1]).toBeInstanceOf(FooImpl2);
});
test("allows array dependencies to be resolved if a single instance is in the container", () => {
    let Foo = class Foo {
    };
    Foo = __decorate([
        injectable()
    ], Foo);
    let Bar = class Bar {
        foo;
        constructor(foo) {
            this.foo = foo;
        }
    };
    Bar = __decorate([
        injectable(),
        __param(0, injectAll(Foo)),
        __metadata("design:paramtypes", [Array])
    ], Bar);
    globalContainer.register(Foo, { useClass: Foo });
    globalContainer.register(Bar, { useClass: Bar });
    const bar = globalContainer.resolve(Bar);
    expect(bar.foo.length).toBe(1);
});
// --- factories ---
test("instanceCachingFactory caches the returned instance", () => {
    const factory = instanceCachingFactory(() => { });
    expect(factory(globalContainer)).toBe(factory(globalContainer));
});
test("instanceCachingFactory caches the returned instance even when there is branching logic in the factory", () => {
    const instanceA = {};
    const instanceB = {};
    let useA = true;
    const factory = instanceCachingFactory(() => (useA ? instanceA : instanceB));
    expect(factory(globalContainer)).toBe(instanceA);
    useA = false;
    expect(factory(globalContainer)).toBe(instanceA);
});
test("predicateAwareClassFactory correctly switches the returned instance with caching on", () => {
    class A {
    }
    class B {
    }
    let useA = true;
    const factory = predicateAwareClassFactory(() => useA, A, B);
    expect(factory(globalContainer) instanceof A).toBeTruthy();
    useA = false;
    expect(factory(globalContainer) instanceof B).toBeTruthy();
});
test("predicateAwareClassFactory returns the same instance each call with caching on", () => {
    class A {
    }
    class B {
    }
    const factory = predicateAwareClassFactory(() => true, A, B);
    expect(factory(globalContainer)).toBe(factory(globalContainer));
});
test("predicateAwareClassFactory correctly switches the returned instance with caching off", () => {
    class A {
    }
    class B {
    }
    let useA = true;
    const factory = predicateAwareClassFactory(() => useA, A, B, false);
    expect(factory(globalContainer) instanceof A).toBeTruthy();
    useA = false;
    expect(factory(globalContainer) instanceof B).toBeTruthy();
});
test("predicateAwareClassFactory returns new instances each call with caching off", () => {
    class A {
    }
    class B {
    }
    const factory = predicateAwareClassFactory(() => true, A, B, false);
    expect(factory(globalContainer)).not.toBe(factory(globalContainer));
});
//# sourceMappingURL=global-container.test.js.map
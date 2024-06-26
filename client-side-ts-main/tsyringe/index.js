if (typeof Reflect === "undefined" || !Reflect.getMetadata) {
    throw new Error(`tsyringe requires a reflect polyfill. Please add 'import "reflect-metadata"' to the top of your entry point.`);
}
export { Lifecycle } from "./types";
export * from "./decorators";
export * from "./factories";
export * from "./providers";
export { delay } from "./lazy-helpers";
export { instance as container } from "./dependency-container";
//# sourceMappingURL=index.js.map
import RegistryBase from "./registry-base";
export class PreResolutionInterceptors extends RegistryBase {
}
export class PostResolutionInterceptors extends RegistryBase {
}
export default class Interceptors {
    preResolution = new PreResolutionInterceptors();
    postResolution = new PostResolutionInterceptors();
}
//# sourceMappingURL=interceptors.js.map
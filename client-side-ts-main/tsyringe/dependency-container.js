import { isClassProvider, isFactoryProvider, isNormalToken, isTokenProvider, isValueProvider } from "./providers";
import { isProvider } from "./providers/provider";
import { isConstructorToken, isTokenDescriptor, isTransformDescriptor } from "./providers/injection-token";
import Registry from "./registry";
import Lifecycle from "./types/lifecycle";
import ResolutionContext from "./resolution-context";
import { formatErrorCtor } from "./error-helpers";
import { DelayedConstructor } from "./lazy-helpers";
import Interceptors from "./interceptors";
export const typeInfo = new Map();
/** Dependency Container */
class InternalDependencyContainer {
    parent;
    _registry = new Registry();
    interceptors = new Interceptors();
    constructor(parent) {
        this.parent = parent;
    }
    register(token, providerOrConstructor, options = { lifecycle: Lifecycle.Transient }) {
        let provider;
        if (!isProvider(providerOrConstructor)) {
            provider = { useClass: providerOrConstructor };
        }
        else {
            provider = providerOrConstructor;
        }
        // Search the token graph for cycles
        if (isTokenProvider(provider)) {
            const path = [token];
            let tokenProvider = provider;
            while (tokenProvider != null) {
                const currentToken = tokenProvider.useToken;
                if (path.includes(currentToken)) {
                    throw new Error(`Token registration cycle detected! ${[...path, currentToken].join(" -> ")}`);
                }
                path.push(currentToken);
                const registration = this._registry.get(currentToken);
                if (registration && isTokenProvider(registration.provider)) {
                    tokenProvider = registration.provider;
                }
                else {
                    tokenProvider = null;
                }
            }
        }
        if (options.lifecycle === Lifecycle.Singleton ||
            options.lifecycle == Lifecycle.ContainerScoped ||
            options.lifecycle == Lifecycle.ResolutionScoped) {
            if (isValueProvider(provider) || isFactoryProvider(provider)) {
                throw new Error(`Cannot use lifecycle "${Lifecycle[options.lifecycle]}" with ValueProviders or FactoryProviders`);
            }
        }
        this._registry.set(token, { provider, options });
        return this;
    }
    registerType(from, to) {
        if (isNormalToken(to)) {
            return this.register(from, {
                useToken: to
            });
        }
        return this.register(from, {
            useClass: to
        });
    }
    registerInstance(token, instance) {
        return this.register(token, {
            useValue: instance
        });
    }
    registerSingleton(from, to) {
        if (isNormalToken(from)) {
            if (isNormalToken(to)) {
                return this.register(from, {
                    useToken: to
                }, { lifecycle: Lifecycle.Singleton });
            }
            else if (to) {
                return this.register(from, {
                    useClass: to
                }, { lifecycle: Lifecycle.Singleton });
            }
            throw new Error('Cannot register a type name as a singleton without a "to" token');
        }
        let useClass = from;
        if (to && !isNormalToken(to)) {
            useClass = to;
        }
        return this.register(from, {
            useClass
        }, { lifecycle: Lifecycle.Singleton });
    }
    resolve(token, context = new ResolutionContext()) {
        const registration = this.getRegistration(token);
        if (!registration && isNormalToken(token)) {
            throw new Error(`Attempted to resolve unregistered dependency token: "${token.toString()}"`);
        }
        this.executePreResolutionInterceptor(token, "Single");
        if (registration) {
            const result = this.resolveRegistration(registration, context);
            this.executePostResolutionInterceptor(token, result, "Single");
            return result;
        }
        // No registration for this token, but since it's a constructor, return an instance
        if (isConstructorToken(token)) {
            const result = this.construct(token, context);
            this.executePostResolutionInterceptor(token, result, "Single");
            return result;
        }
        throw new Error("Attempted to construct an undefined constructor. Could mean a circular dependency problem. Try using `delay` function.");
    }
    executePreResolutionInterceptor(token, resolutionType) {
        if (this.interceptors.preResolution.has(token)) {
            const remainingInterceptors = [];
            for (const interceptor of this.interceptors.preResolution.getAll(token)) {
                if (interceptor.options.frequency != "Once") {
                    remainingInterceptors.push(interceptor);
                }
                interceptor.callback(token, resolutionType);
            }
            this.interceptors.preResolution.setAll(token, remainingInterceptors);
        }
    }
    executePostResolutionInterceptor(token, result, resolutionType) {
        if (this.interceptors.postResolution.has(token)) {
            const remainingInterceptors = [];
            for (const interceptor of this.interceptors.postResolution.getAll(token)) {
                if (interceptor.options.frequency != "Once") {
                    remainingInterceptors.push(interceptor);
                }
                interceptor.callback(token, result, resolutionType);
            }
            this.interceptors.postResolution.setAll(token, remainingInterceptors);
        }
    }
    resolveRegistration(registration, context) {
        // If we have already resolved this scoped dependency, return it
        if (registration.options.lifecycle === Lifecycle.ResolutionScoped &&
            context.scopedResolutions.has(registration)) {
            return context.scopedResolutions.get(registration);
        }
        const isSingleton = registration.options.lifecycle === Lifecycle.Singleton;
        const isContainerScoped = registration.options.lifecycle === Lifecycle.ContainerScoped;
        const returnInstance = isSingleton || isContainerScoped;
        let resolved;
        if (isValueProvider(registration.provider)) {
            resolved = registration.provider.useValue;
        }
        else if (isTokenProvider(registration.provider)) {
            resolved = returnInstance
                ? registration.instance ||
                    (registration.instance = this.resolve(registration.provider.useToken, context))
                : this.resolve(registration.provider.useToken, context);
        }
        else if (isClassProvider(registration.provider)) {
            resolved = returnInstance
                ? registration.instance ||
                    (registration.instance = this.construct(registration.provider.useClass, context))
                : this.construct(registration.provider.useClass, context);
        }
        else if (isFactoryProvider(registration.provider)) {
            resolved = registration.provider.useFactory(this);
        }
        else {
            resolved = this.construct(registration.provider, context);
        }
        // If this is a scoped dependency, store resolved instance in context
        if (registration.options.lifecycle === Lifecycle.ResolutionScoped) {
            context.scopedResolutions.set(registration, resolved);
        }
        return resolved;
    }
    resolveAll(token, context = new ResolutionContext()) {
        const registrations = this.getAllRegistrations(token);
        if (!registrations && isNormalToken(token)) {
            throw new Error(`Attempted to resolve unregistered dependency token: "${token.toString()}"`);
        }
        this.executePreResolutionInterceptor(token, "All");
        if (registrations) {
            const result = registrations.map(item => this.resolveRegistration(item, context));
            this.executePostResolutionInterceptor(token, result, "All");
            return result;
        }
        // No registration for this token, but since it's a constructor, return an instance
        const result = [this.construct(token, context)];
        this.executePostResolutionInterceptor(token, result, "All");
        return result;
    }
    isRegistered(token, recursive = false) {
        return (this._registry.has(token) ||
            (recursive &&
                (this.parent || false) &&
                this.parent.isRegistered(token, true)));
    }
    reset() {
        this._registry.clear();
        this.interceptors.preResolution.clear();
        this.interceptors.postResolution.clear();
    }
    clearInstances() {
        for (const [token, registrations] of this._registry.entries()) {
            this._registry.setAll(token, registrations
                // Clear ValueProvider registrations
                .filter(registration => !isValueProvider(registration.provider))
                // Clear instances
                .map(registration => {
                registration.instance = undefined;
                return registration;
            }));
        }
    }
    createChildContainer() {
        const childContainer = new InternalDependencyContainer(this);
        for (const [token, registrations] of this._registry.entries()) {
            // If there are any ContainerScoped registrations, we need to copy
            // ALL registrations to the child container, if we were to copy just
            // the ContainerScoped registrations, we would lose access to the others
            if (registrations.some(({ options }) => options.lifecycle === Lifecycle.ContainerScoped)) {
                childContainer._registry.setAll(token, registrations.map(registration => {
                    if (registration.options.lifecycle === Lifecycle.ContainerScoped) {
                        return {
                            provider: registration.provider,
                            options: registration.options
                        };
                    }
                    return registration;
                }));
            }
        }
        return childContainer;
    }
    beforeResolution(token, callback, options = { frequency: "Always" }) {
        this.interceptors.preResolution.set(token, {
            callback: callback,
            options: options
        });
    }
    afterResolution(token, callback, options = { frequency: "Always" }) {
        this.interceptors.postResolution.set(token, {
            callback: callback,
            options: options
        });
    }
    getRegistration(token) {
        if (this.isRegistered(token)) {
            return this._registry.get(token);
        }
        if (this.parent) {
            return this.parent.getRegistration(token);
        }
        return null;
    }
    getAllRegistrations(token) {
        if (this.isRegistered(token)) {
            return this._registry.getAll(token);
        }
        if (this.parent) {
            return this.parent.getAllRegistrations(token);
        }
        return null;
    }
    construct(ctor, context) {
        if (ctor instanceof DelayedConstructor) {
            return ctor.createProxy((target) => this.resolve(target, context));
        }
        const paramInfo = typeInfo.get(ctor);
        if (!paramInfo || paramInfo.length === 0) {
            if (ctor.length === 0) {
                return new ctor();
            }
            else {
                throw new Error(`TypeInfo not known for "${ctor.name}"`);
            }
        }
        const params = paramInfo.map(this.resolveParams(context, ctor));
        return new ctor(...params);
    }
    resolveParams(context, ctor) {
        return (param, idx) => {
            try {
                if (isTokenDescriptor(param)) {
                    if (isTransformDescriptor(param)) {
                        return param.multiple
                            ? this.resolve(param.transform).transform(this.resolveAll(param.token), ...param.transformArgs)
                            : this.resolve(param.transform).transform(this.resolve(param.token, context), ...param.transformArgs);
                    }
                    else {
                        return param.multiple
                            ? this.resolveAll(param.token)
                            : this.resolve(param.token, context);
                    }
                }
                else if (isTransformDescriptor(param)) {
                    return this.resolve(param.transform, context).transform(this.resolve(param.token, context), ...param.transformArgs);
                }
                return this.resolve(param, context);
            }
            catch (e) {
                throw new Error(formatErrorCtor(ctor, idx, e));
            }
        };
    }
}
export const instance = new InternalDependencyContainer();
export default instance;
//# sourceMappingURL=dependency-container.js.map
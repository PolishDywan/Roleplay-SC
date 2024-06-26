export default function instanceCachingFactory(factoryFunc) {
    let instance;
    return (dependencyContainer) => {
        if (instance == undefined) {
            instance = factoryFunc(dependencyContainer);
        }
        return instance;
    };
}
//# sourceMappingURL=instance-caching-factory.js.map
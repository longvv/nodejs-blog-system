class VersionedBase {
    constructor(handlers = {}) {
        this.versionHandlers = new Map();
        this.registerHandlers(handlers);
    }

    registerHandlers () {
        Object.entries(handlers).forEach(([version, methods]) => {
            Object.entries(methods).forEach(([method, handler]) => {
                this.addVersionHandler(version, method, handler.bind(this));
            });
        });
    }

    addVersionHandler (version, method, handler) {
        const _version = version.toLowerCase();
        if (!this.versionHandlers.has(_version)) {
            this.versionHandlers.set(_version, new Map());
        }
        this.versionHandlers.get(_version).set(method, handler);
    }

    getHandler (version, method) {
        const _version = version.toLowerCase();
        if (!this.versionHandlers.has(_version)) {
            throw new Error('getHandler must be implemented');
        }
        const versionMap = this.versionHandlers.get(_version);
        if (! versionMap.has(method)) {
            throw new Error(`Method ${method} not supported in version ${version}`);
        }
        return versionMap.get(method);
    }

    async execute(version, method, ...args) {
        const handler = this.getHandler(version, method);
        return await handler.apply(this, args);
    }

    destroy() {
        // Cleanup logic
    }
}

module.exports = VersionedBase;
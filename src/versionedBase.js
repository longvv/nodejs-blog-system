class VersionedBase {
    constructor(handlers = {}) {
        this.versionHandlers = new Map();
        this.deprecatedVersions = new Map();
        this.activeVersions = new Map();
        this.removedVersions = new Map();

        this.defaultVersion = 'v1'
        this.markAsSupported(this.defaultVersion);

        this.registerHandlers(handlers);
    }

    registerHandlers () {
        Object.entries(handlers).forEach(([version, methods]) => {
            Object.entries(methods).forEach(([method, handlerDict]) => {
                Object.entries(handlerDict).forEach(([handler, status]) => {
                    this.#addVersionHandler(version, status, method, handler.bind(this));
                });
            });
        });
    }

    #addVersionHandler (version, status, method, handler) {
        const _version = version.toLowerCase();
        switch (status) {
            case API_STATUS.ACTIVE:
                this.#markVersionAsActive(_version, method, handler);
                break;
            case API_STATUS.DEPRECATED:
                this.#markVersionAsDeprecated(_version, method, handler);
                break;
            case API_STATUS.REMOVED:
                this.#markVersionAsRemoved(_version, method, handler);
            default:
                throw new Error(`Invalid status for method ${method} in version ${version}`);
        }
        if (status === API_STATUS.ACTIVE || status === API_STATUS.DEPRECATED) {
            if (!this.versionHandlers.has(_version)) {
                this.versionHandlers.set(_version, new Map());
            }
            this.versionHandlers.get(_version).set(method, handler);
        }
    }

    getHandler (version, method) {
        const _version = version.toLowerCase();
        if (!this.versionHandlers.has(_version)) {
            throw new Error('getHandler must be implemented');
        }
        const versionMap = this.versionHandlers.get(_version);
        if (! versionMap.has(method)) {
            if (this.removedVersions.get(_version).has(method)) {
                throw new Error(`Method ${method} was removed in version ${version}`);
            }
            throw new Error(`Method ${method} not supported in version ${version}`);
        }
        return versionMap.get(method);
    }

    async execute(version, method, ...args) {
        validateVersion(version);
        const handler = this.getHandler(version, method);
        return await handler.apply(this, args);
    }

    validateVersion(version, res) {
        const _version = version.toLowerCase();
        // Check if version is supported
        if (!this.activeVersions.has(_version) && !this.deprecatedVersions.has(_version)) {
            return res.status(400).json({
                status: 'error',
                message: `Unsupported API version: ${version}`,
                supportedVersions: Array.from(this.activeVersions)
            });
        }
    }

    removeVersion(version, method, handler) {
        this.#markVersionAsRemoved(version, method, handler);
        const controller = this.controllers.get(version);
        if (controller?.destroy) controller.destroy();
        this.controllers.delete(version);
        this.activeVersions.delete(version);
        this.deprecatedVersions.delete(version);
    }

    #markVersionAsDeprecated(version) {
        if (!version) {
            throw new Error('Version must be provided');
        }
        const _version = version.toLowerCase();
        if (!this.deprecatedVersions.has(_version)) {
            this.deprecatedVersions.set(_version, new Map());
        }
        this.deprecatedVersions.get(_version).set(method, handler);
    }

    #markVersionAsRemoved(version) {
        if (!version) {
            throw new Error('Version must be provided');
        }
        const _version = version.toLowerCase();
        if (!this.removedVersions.has(_version)) {
            this.removedVersions.set(_version, new Map());
        }
        this.removedVersions.get(_version).set(method, handler);
    }

    #markVersionAsActive(version, method, handler) {
        if (!version) {
            throw new Error('Version must be provided');
        }
        const _version = version.toLowerCase();
        if (!this.activeVersions.has(_version)) {
            this.activeVersions.set(_version, new Map());
        }
        this.activeVersions.get(_version).set(method, handler);
    }

    destroy() {
        this.versionHandlers = null;
        this.deprecatedVersions = null;
        this.activeVersions = null;
        this.removedVersions = null;
    }
}

const API_STATUS = {
    DEPRECATED: 'deprecated',
    ACTIVE: 'active',
    REMOVED: 'removed',
}

module.exports = VersionedBase;
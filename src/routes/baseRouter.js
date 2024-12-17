const express = require('express');

class BaseRouter {
    constructor(ControllerClass,...dependencies) {
        this.router = express.Router();
        this.deprecatedVersions = new Set();
        this.supportedVersions = new Set();
        this.defaultVersion = 'v1';

        this.ControllerClass = ControllerClass;
        this.dependencies = dependencies;
        this.controller = null;

        this.router.use(this.versionCheck.bind(this));
    }

    markAsDeprecated(version) {
        this.deprecatedVersions.add(version);
    }

    markAsSupported(version) {
        this.supportedVersions.add(version);
    }

    versionCheck(req, res, next) {
        const version = (req.headers['accept-version'] || this.defaultVersion).toLowerCase();
        // Check if version is supported
        if (!this.supportedVersions.has(version)) {
            return res.status(400).json({
                status: 'error',
                message: `Unsupported API version: ${version}`,
                supportedVersions: Array.from(this.supportedVersions)
            });
        }

        // Add deprecation warning header if needed
        if (this.deprecatedVersions.has(version)) {
            res.set('Warning', `299 - "Version ${version} is deprecated"`);
        }

        try {
            const controller = this.getController(version);
            req.controller = controller;
            next();
        } catch (error) {
            console.error(`Error checking version: ${e.message}`);
            next(error);
        }
    }

    registerVersion(version, controllerOrFactory) {
        if (!version) {
            throw new Error('Version is required');
        }
        const _version = version.toLowerCase();
        switch (typeof controllerOrFactory) {
            case 'function':
                this.controllerFactories.set(_version, controllerOrFactory);
                break;
            case 'object':
                this.controllers.set(_version, controllerOrFactory);
                break;
            default:
                throw new Error('Controller must be either a factory function or controller instance');
        }

    }

    getController() {
        if (!this.controller) {
            this.controller = new this.ControllerClass(...this.dependencies);
        }
        return controller;
    }

    async handleRequest(version, method, ...args) {
        try {
            const controller = this.getController();
            await controller.execute(version, method, ...args);
        } catch (error) {
            next(error);
        }
    }

    removeVersion(version) {
        const controller = this.controllers.get(version);
        if (controller?.destroy) controller.destroy();

        this.controllers.delete(version);
        this.controllerFactories.delete(version); 
        this.supportedVersions.delete(version);
        this.deprecatedVersions.delete(version);
    }

    getAcceptVersion(req) {
        const version = req.headers['accept-version'] || this.defaultVersion;
        return version.toLowerCase();
    }

    destroy() {
        if (this.controller?.destroy) {
            this.controller.destroy();
        }
        this.controller = null;
    }
}

module.exports = BaseRouter;
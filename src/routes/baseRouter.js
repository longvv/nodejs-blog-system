const express = require('express');

class BaseRouter {
    constructor() {
        this.router = express.Router();
        this.deprecatedVersions = new Set();
        this.supportedVersions = new Set();

        this.controllers = new Map();
        this.controllerFactories = new Map();
        this.defaultVersion = 'V1';

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
        const version = version.toLowerCase();
        switch (typeof controllerOrFactory) {
            case 'function':
                this.controllerFactories.set(version, controllerOrFactory);
                break;
            case 'object':
                this.controllers.set(version, controllerOrFactory);
                break;
            default:
                throw new Error('Controller must be either a factory function or controller instance');
        }

    }

    getController(version) {
        if (!this.supportedVersions.get(version)) {
            res.status(404).json({
                error: `API version "${version}" is not supported`,
                supportedVersions: [...this.supportedVersions],
            });
        }

        if (this.controllers.has(version)) {
            return this.controllers.get(version);
        }

        const controllerFactory = this.controllerFactories.get(version);
        if (!controllerFactory) {
            throw new Error(`No controller factory registered for version ${version}`);
        }
        const controller = controllerFactory();
        controllers.set(version, controller);
        return controller;
    }

    removeVersion(version) {
        const controller = this.controllers.get(version);
        if (controller?.destroy) controller.destroy();

        this.controllers.delete(version);
        this.controllerFactories.delete(version); 
        this.supportedVersions.delete(version);
        this.deprecatedVersions.delete(version);
    }
    

    route(method, path, handler, middlewares = []) {
        this.router[method](path, ...middlewares, async (req, res, next) => {
            try {
                if (!req.controller[handler]) {
                    throw new Error(`Handler ${handler} not found in ${controller.constructor.name}`);
                }
                await req.controller[handler](req, res, next);
            } catch (error) {
                next(error);
            }
        });
    }

    get(path, handler, middlewares = []) {
        this.route('get', path, handler, middlewares);
    }

    post(path, handler, middlewares = []) {
        this.route('post', path, handler, middlewares);
    }

    put(path, handler, middlewares = []) {
        this.route('put', path, handler, middlewares);
    }

    delete(path, handler, middleware = []) {
        this.route('delete', path, handler, middleware);
    }

    destroy() {
        this.controllers.forEach(controller => {
            if (typeof controller.destroy === 'function') {
                controller.destroy();
            }
        });
        this.controllers.clear();
        this.controllerFactories.clear();
    }
}

module.exports = BaseRouter;
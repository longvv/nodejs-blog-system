const express = require('express');

class BaseRouter {
    constructor(ControllerClass,...dependencies) {
        this.router = express.Router();

        this.ControllerClass = ControllerClass;
        this.dependencies = dependencies;
        this.controller = null;
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
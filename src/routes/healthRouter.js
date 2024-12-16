const HealthCheckController = require('../controllers/health/healthCheckController');
class HealthCheckRouter extends BaseRouter {
    constructor() {
        const controller = new HealthCheckController();
        this.markAsSupported('v1');
        this.registerVersion('v1', () => controller);
        this.defineRoutes();
    }

    defineRoutes() {
        this.get('/health-check', 'healthCheck');
    }
}
const BaseRouter = require('./baseRouter');
const HealthCheckController = require('../controllers/healthCheckController');
class HealthCheckRouter extends BaseRouter {
    constructor() {
        super(HealthCheckController);
        this.defineRoutes();
    }

    defineRoutes() {
        this.router.get('/health-check', (req, res, next) => {
            const version = this.getAcceptVersion(req);
            this.handleRequest(version, 'getHealthInfo', req, res, next);
        });

    }
}
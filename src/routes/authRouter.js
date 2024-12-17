const BaseRouter = require('./baseRouter');
const AuthController = require('../controllers/authController');
const AuthService = require('../services/authService');

class AuthRouter extends BaseRouter {
    constructor() {
        const service = new AuthService();
        super(AuthController, service);
        this.markAsSupported('v1');
        this.defineRoutes();
    }

    defineRoutes() {
        this.router.post('/login', (req, res, next) => {
            const version = this.getAcceptVersion(req);
            this.handleRequest(version, 'login', req, res, next);
        });

        this.router.post('/logout', (req, res, next) => {
            const version = this.getAcceptVersion(req);
            this.handleRequest(version, 'logout', req, res, next);
        });

        this.router.post('/register', (req, res, next) => {
            const version = this.getAcceptVersion(req);
            this.handleRequest(version, 'register', req, res, next);
        });

        this.router.post('/delete', (req, res, next) => {
            const version = this.getAcceptVersion(req);
            this.handleRequest(version, 'delete', req, res, next);
        });

        this.router.post('/users/:id', (req, res, next) => {
            const version = this.getAcceptVersion(req);
            this.handleRequest(version, 'getUserByID', req, res, next);
        });
    }
}

module.exports = AuthRouter;
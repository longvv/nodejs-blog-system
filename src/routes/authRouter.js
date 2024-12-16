const AuthControllerFactory = require('../controllers/auth/authControllerFactory');
const AuthServiceFactory = require('../services/auth/authServiceFactory');

class AuthRouter extends BaseRouter {
    constructor() {
        super();
        const serviceFactory = new AuthServiceFactory();
        const controllerFactory = new AuthControllerFactory(serviceFactory);
        this.markAsSupported('v1');
        this.registerVersion('v1', () => controllerFactory.createAuthControllerVersion1());
        this.defineRoutes();
    }

    defineRoutes() {
        this.post('/login', 'login');
        this.post('/logout', 'logout');
        this.post('/register', 'register');
        this.post('/delete', 'delete');
    }
}

module.exports = AuthRouter;
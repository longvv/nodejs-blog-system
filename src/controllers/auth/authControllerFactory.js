const AuthController = require('./authController');

class AuthControllerFactory {
    constructor(authService) {
        this.authService = authService;
    }

    createAuthControllerVersion1() {
        const service = this.authService.createServiceVersion1();
        return new AuthController(service);
    }
}
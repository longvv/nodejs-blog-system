const AuthService = require('./authService');

class AuthServiceFactory {
    createServiceVersion1() {
        return new AuthService(this.authService);
    }
}
const VersionedBase = require('../versionedBase');
class AuthController extends VersionedBase {
    constructor(authService, handlers = {}) {
        const defaultHandlers = {
            v1: {
                login: this.loginV1.bind(this),
                register: this.registerV1.bind(this),
                logout: this.logoutV1.bind(this),
                delete: this.deleteV1.bind(this),
                getUserByID: this.getUserByIDV1.bind(this)
            }
        };

        super({...defaultHandlers,...handlers });
        this.authService = authService;
    }

    async loginV1(req, res, next) {
        try {
            const result = await this.authService.execute('v1', 'login', req.body);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async logoutV1(req, res, next) {
        try {
            const result = await this.authService.execute('v1', 'logout', req.body);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async registerV1(req, res, next) {
        try {
            const result = await this.authService.execute('v1', 'register', req.body);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async deleteV1(req, res, next) {
        try {
            const result = await this.authService.execute('v1', 'delete', req.body);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async getUserByIDV1(req, res, next) {
        try {
            const result = await this.authService.execute('v1', 'getUserByID', req.body);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AuthController;
const VersionedBase = require('../versionedBase');
class AuthService extends VersionedBase {
    constructor(userRepository, handlers = {}) {
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
        this.userRepository = userRepository;
    }

    async loginV1(data) {

    }

    async registerV1(data) {

    }

    async logoutV1(data) {

    }

    async deleteV1(data) {

    }

    async getUserByIDV1(data) {

    }

    detroy() {

    }
}

module.exports = AuthService;
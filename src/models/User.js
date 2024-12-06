const userSchema = require('../schemas/userSchema');
class User extends BaseModel {

    constructor(username, email, password, role, profile) {
        super('User', userSchema);
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.profile = profile;
    }

    destroy() {
        comments = nil;
        posts = nil;
    }
}
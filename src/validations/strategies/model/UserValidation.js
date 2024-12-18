const ModelValidationStrategy = require('./ModelValidationStrategy');
class UserValidation extends ModelValidationStrategy {
    async validate(data) {
        await validateEmail(data.email);
        await validateUserName(data.username);
        await validatePassword(data.password);
    }

    async validatePassword(password) {
        ValidationHelper.validateRequired(password, 'Password');
        ValidationHelper.validatePasswordFormat(password);
    }

    async validateUserName(username) {
        ValidationHelper.validateRequired(username, 'Username');
        ValidationHelper.validateUserNameFormat(username);
    }

    async validateEmail(email) {
        ValidationHelper.validateRequired(email, 'Email');
        ValidationHelper.validateEmailFormat(email);
    }
}

module.exports = UserValidation;
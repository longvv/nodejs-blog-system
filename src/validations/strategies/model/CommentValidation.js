const ValidationStrategy = require('./ValidationStrategy');
class CommentValidation extends ValidationStrategy {
    async validate(data) {
        ValidationHelper.validateRequired(data.Content, 'Content');
        await validateContent(data.Content);
    }

    async validateContent(data) {
        ValidationHelper.validateMinLength(data, 'Content', 1);
        ValidationHelper.validateMaxLength(data, 'Content', 50);
    }
}

module.exports = CommentValidation;
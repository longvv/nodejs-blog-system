const ModelValidationStrategy = require('./ModelValidationStrategy');
class PostValidation extends ModelValidationStrategy {
    async validate(data) {
        ValidationHelper.validateRequired(data.title, 'Title');
        ValidationHelper.validateMinLength(data.title, 'Title', 5);
        ValidationHelper.validateMaxLength(data.title, 'Title', 20);

        // Validate content
        ValidationHelper.validateRequired(data.content, 'Content');
        ValidationHelper.validateRequired(data.author, 'Author');
        ValidationHelper.validateRequired(data.slug, 'Slug');
        
        // Post-specific validations
        const paragraphs = data.content.split('\n\n');
        if (paragraphs.length < 2) {
            throw new Error('Content must have at least 2 paragraphs');
        }
    }
}

module.exports = PostValidation;
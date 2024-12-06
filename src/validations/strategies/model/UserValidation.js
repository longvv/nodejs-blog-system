class UserValidation extends ValidationStrategy {
    async validate(data) {
        // Perform common validation tasks here
        ValidationHelper.validateRequired(data.title, 'Email');
        ValidationHelper.validateEmail(data.email);

        // User-specific password validation
        if (data.password) {
            if (!/[A-Z]/.test(data.password)) {
                throw new Error('Password must contain at least one uppercase letter');
            }
            if (!/[0-9]/.test(data.password)) {
                throw new Error('Password must contain at least one number');
            }
        }
    }
}
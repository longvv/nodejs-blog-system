class ValidationHelper {
    static validateRequired(value, fieldName) {
        if (!value?.toString().trim()) {
            throw new Error(`${fieldName} is required`);
        }
    }

    static validateMinLength(value, fieldName, minLength) {
        if (value.length < minLength) {
            throw new Error(`${fieldName} must be at least ${minLength} characters`);
        }
    }

    static validateMaxLength(value, fieldName, maxLength) {
        if (value.length > maxLength) {
            throw new Error(`${fieldName} must be at maximum ${maxLength} characters`);
        }
    }

    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
    }
}
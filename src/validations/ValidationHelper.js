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

    static validateEmailFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
    }

    static validatePasswordFormat(password) {
        if (password) {
            if (password.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }
            if (!/[A-Z]/.test(password)) {
                throw new Error('Password must contain at least one uppercase letter');
            }
            if (!/[a-z]/.test(password)) {
                throw new Error('Password must contain at least one lowercase letter');
            }
            if (!/[0-9]/.test(password)) {
                throw new Error('Password must contain at least one number');
            }
            if (!/[!@#$%^&*]/.test(password)) {
                throw new Error('Password must contain at least one special character');
            }
        }
    }

    static validateUserNameFormat(username) {
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        if (!usernameRegex.test(username)) {
            throw new Error('Username must be 3-20 characters and contain only letters, numbers, and underscores');
        }
    }
}
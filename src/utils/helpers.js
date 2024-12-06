const serviceUtils = {
    generateSlug(text) {
        return text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    },
    
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
};
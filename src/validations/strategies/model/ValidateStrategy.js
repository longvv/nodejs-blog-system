class ValidationStrategy {
    constructor() {
        
    }

    async validate(data) {
        throw new Error('validate method must be implemented');
    }

    destroy() {

    }
}
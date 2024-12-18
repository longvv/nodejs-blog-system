const mongoose = require('mongoose');
const ValidationFactory = require('../validations/ValidationFactory');

class BaseModel {
    #validationStrategy = null;
    constructor(modelName, schema, options = {}) {
        // Create mongoose schema with provided definition
        mongoose.Schema(schema, {timestamps: true, ...options});
        // store model name as reference
        this.modelName = modelName;
        // create model based on schema
        this.model = mongoose.model(modelName, this.schema);
    }

    getValidateStrategy() {
        if (!this.#validationStrategy) {
            try {
                const strategy = ValidationFactory.createStrategy(this.modelName)
                this.#validationStrategy = strategy;
            } catch (error) {
                throw new Error(`Error creating model "${modelName}": ${error.message}`);  
            }
        }
        return this.#validationStrategy;
    }

    async validate(data) {
        const validation = this.getValidateStrategy();
        if (!validation) {
            throw new Error('Validation strategy is not set');
        }
        validation.validate(data);
    }

    async create(data, condition) {
        try {
            await this.validate(data);
            return await this.model.create(data, condition);
        } catch (error) {
            throw new Error(`Error creating ${this.modelName}: ${error.message}`);
        }
    }

    destroy() {

    }
}

module.exports = BaseModel;
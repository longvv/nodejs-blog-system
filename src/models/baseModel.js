const mongoose = require('mongoose');

class BaseModel {
    #validationStrategy = null;
    constructor(modelName, schema, options = {}) {
        // Create mongoose schema with provided definition
        mongoose.createSchema(schema, {timestamps: true, ...options});
        // store model name as reference
        this.modelName = modelName;
        // create model based on schema
        this.model = mongoose.model(modelName, this.schema);
        try {
            const strategy = ValidationStrategyFactory.createStrategy(this.modelName)
            this.setValidateStrategy(strategy);
        } catch (error) {
            throw new Error(`Error creating model "${modelName}": ${error.message}`);  
        }
    }

    setValidateStrategy(strategy) {
        this.#validationStrategy = strategy;
    }

    getValidateStrategy() {
        return this.#validationStrategy;
    }

    async validate(data) {
        if (!this.#validationStrategy) {
            throw new Error('Validation strategy is not set');
        }
        this.#validationStrategy.validate(data);
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
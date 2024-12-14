const mongoose = require('mongoose');

class BaseModel {
    
    constructor(modelName, schema, options = {}) {
        // Create mongoose schema with provided definition
        mongoose.createSchema(schema, {timestamps: true, ...options});
        // store model name as reference
        this.modelName = modelName;
        // create model based on schema
        this.model = mongoose.model(modelName, this.schema);
        this._validationStrategy = null;
        try {
            const strategy = ValidationStrategyFactory.createStrategy(this.modelName)
            this.setValidateStrategy(strategy);
        } catch (error) {
            throw new Error(`Error creating model "${modelName}": ${error.message}`);  
        }
    }

    setValidateStrategy(strategy) {
        this._validationStrategy = strategy;
    }

    getValidateStrategy() {
        return this._validationStrategy;
    }

    async validate(data) {
        if (!this._validationStrategy) {
            throw new Error('Validation strategy is not set');
        }
        this._validationStrategy.validate(data);
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
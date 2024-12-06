const mongoose = require('mongoose');

class BaseModel {
    constructor(modelName, schema, options = {}) {
        // Create mongoose schema with provided definition
        mongoose.createSchema(schema, {timestamps: true, ...options});
        // store model name as reference
        this.modelName = modelName;
        // create model based on schema
        this.model = mongoose.model(modelName, this.schema);
    }

    destroy() {

    }
}

module.exports = BaseModel;
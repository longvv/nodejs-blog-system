class BaseRepository {
    #model = null;

    constructor() {
        
    }

    getModel() {
        if (!this.#model) {
            throw new Error('Model not set');
        }
        return this.#model;
    }

    setModel(model) {
        if (!model) {
            throw new Error('No model provided');
        }
        this.#model = model;
        const modelName = model.modelName;
        try {
            const strategy = ValidationStrategyFactory.createStrategy(`${modelName}-repository`);
            this.setValidateStrategy(strategy);
        } catch (error) {
            throw new Error(`Error creating repository for model "${modelName}": ${error.message}`);
        }
    }

    setValidateStrategy(strategy) {
        this._validationStrategy = strategy;
    }

    getValidateStrategy() {
        return this._validationStrategy;
    }

    //Basic CRUD methods
    /*
     * Finds a document by its ID in the database.//+
     * @param {string|ObjectId} id - The unique identifier of the document to find.//+
     * @returns {Promise<Document|null>} A promise that resolves to the found document, or null if not found.//+
     * @throws {Error} If there's an error during the database operation.//+
     */
    async findById(id) {
        try {
            return await this.model.findById(id);
        } 
        catch (error) {
            throw new Error(`Error finding ${this.modelName}: ${error.message}`);  
        }
    }

    /*
     * Finds a single document in the database that matches the given conditions.//+
     * @param {Object} conditions - An object specifying the search criteria.//+
     * @returns {Promise<Document|null>} A promise that resolves to the found document, or null if not found.//+
     * @throws {Error} If there's an error during the database operation.//+
     */
    async findOne(conditions) {
        try {
            return await this.model.findOne(conditions);
        } 
        catch (error) {
            throw new Error(`Error finding ${this.modelName}: ${error.message}`);  
        }
    }

    async find(conditions = {},options ={}) {
        try {
            const { sort, limit, skip, populate } = options;
            let query = this.Model.find(conditions);
            if (sort) {
                query = query.sort(sort);
            }
            if (limit) {
                query = query.limit(limit);
            }
            if (skip) {
                query = query.skip(skip);
            }
            if (populate) {
                query = query.populate(populate);
            }
            return await query.exec();
        } 
        catch (error) {
            throw new Error(`Error finding ${this.modelName}: ${error.message}`);  
        }
    }

    async create(data) {
        try {
            const document = new this.model(data);
            return await document.save();
        } 
        catch (error) {
            throw new Error(`Error creating ${this.modelName}: ${error.message}`);  
        }
    }

    async update(id, data) {
        try {
            return await this.model.findByIdAndUpdate(id, data, { 
                new: true, 
                runValidators: true 
            });
        } 
        catch (error) {
            throw new Error(`Error updating ${this.modelName}: ${error.message}`);  
        }
    }

    async delete(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch(error){
            throw new Error(`Error deleting ${this.modelName}: ${error.message}`); 
        };
    }

    destroy() {
        
    }
}
class ValidationFactory {
    #strategies = new Map();

    registerStrategy(key, strategy) {
        this.#strategies.set(key.toLowerCase(), strategy);
    }

    createStrategy(key, options = {}) {
        const StrategyClass = this.#strategies.get(key.toLowerCase());
        if (!strategyClass) {
            throw new Error(`No strategy registered with key "${key}"`);
        }
        return new StrategyClass(options);
    }
}

module.exports = ValidationFactory;
const ValidationStrategyFactory = require('./ValidationStrategyFactory');
const CommentValidation = require('./strategies/model/CommentValidation');
const PostValidation = require('./strategies/model/PostValidation');
const UserValidation = require('./strategies/model/UserValidation');

const CommentRepositoryValidation = require('./strategies/repository/CommentRepositoryValidation');
const PostRepositoryValidation = require('./strategies/repository/PostRepositoryValidation');
const UserRepositoryValidation = require('./strategies/repository/UserRepositoryValidation');

function initializeValidationStrategies(factory = new ValidationStrategyFactory()) {
    //Model validation registration
    factory.registerStrategy('comment', CommentValidation);
    factory.registerStrategy('post', PostValidation);
    factory.registerStrategy('User', UserValidation);

    //Repository validation registration
    factory.registerStrategy('comment-repository', CommentRepositoryValidation);
    factory.registerStrategy('post-repository', PostRepositoryValidation);
    factory.registerStrategy('User-repository', UserRepositoryValidation);

    // Log successful initialization
    console.log('Validation strategies initialized successfully');
}

module.exports = { initializeValidationStrategies };
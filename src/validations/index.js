const ValidationStrategyFactory = require('ValidationStrategyFactory');
const CommentValidation = require('./strategies/model/CommentValidation');
const PostValidation = require('./strategies/model/PostValidation');
const UserValidation = require('./strategies/model/UserValidation');

const CommentRepositoryValidation = require('./strategies/repository/CommentRepositoryValidation');
const PostRepositoryValidation = require('./strategies/repository/PostRepositoryValidation');
const UserRepositoryValidation = require('./strategies/repository/UserRepositoryValidation');

export function initializeValidationStrategies() {
    //Model validation registration
    ValidationStrategyFactory.registerStrategy('comment', CommentValidation);
    ValidationStrategyFactory.registerStrategy('post', PostValidation);
    ValidationStrategyFactory.registerStrategy('User', UserValidation);

    //Repository validation registration
    ValidationStrategyFactory.registerStrategy('comment-repository', CommentRepositoryValidation);
    ValidationStrategyFactory.registerStrategy('post-repository', PostRepositoryValidation);
    ValidationStrategyFactory.registerStrategy('User-repository', UserRepositoryValidation);

    // Log successful initialization
    console.log('Validation strategies initialized successfully');
}
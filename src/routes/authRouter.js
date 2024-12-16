const expres = require('express');
const Router = express.Router();

const AuthController = require('AuthController');
const authService = new AuthService();

const authController = new AuthController(authService);

Router.post('/login', authController.login.bind(authController));
Router.post('/logout', authController.logout.bind(authController));
Router.post('/register', authController.register.bind(authController));
Router.post('/delete', authController.delete.bind(authController));
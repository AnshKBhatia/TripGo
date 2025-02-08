const userService = require('../services/userService');
const logger = require('../utils/logger');

class UserController {
    // Register user
    async register(req, res) {
        try {
            const user = await userService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            logger.error('Registration error:', error);
            res.status(400).json({ message: error.message });
        }
    }

    // Login user
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userService.login(email, password);
            res.json(user);
        } catch (error) {
            logger.error('Login error:', error);
            res.status(401).json({ message: error.message });
        }
    }

    // Get user profile
    async getProfile(req, res) {
        try {
            const user = await userService.getProfile(req.user._id);
            res.json(user);
        } catch (error) {
            logger.error('Profile fetch error:', error);
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new UserController();
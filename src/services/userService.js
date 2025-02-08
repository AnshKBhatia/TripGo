const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('../utils/logger');

class UserService {
    // Create JWT Token
    generateToken(id) {
        return jwt.sign({ id }, config.jwtSecret, {
            expiresIn: config.jwtExpiresIn
        });
    }

    // Register user
    async register(userData) {
        try {
            const user = await User.create(userData);
            return {
                _id: user._id,
                username: user.username,
                email: user.email,
                token: this.generateToken(user._id)
            };
        } catch (error) {
            logger.error('Error in user registration:', error);
            throw error;
        }
    }

    // Login user
    async login(email, password) {
        try {
            const user = await User.findOne({ email }).select('+password');
            if (!user || !(await user.matchPassword(password))) {
                throw new Error('Invalid credentials');
            }
            return {
                _id: user._id,
                username: user.username,
                email: user.email,
                token: this.generateToken(user._id)
            };
        } catch (error) {
            logger.error('Error in user login:', error);
            throw error;
        }
    }

    // Get user profile
    async getProfile(userId) {
        try {
            const user = await User.findById(userId).select('-password');
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            logger.error('Error fetching user profile:', error);
            throw error;
        }
    }
}

module.exports = new UserService();
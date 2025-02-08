const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');
const logger = require('../utils/logger');

const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized to access this route' });
        }

        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            logger.error('Error verifying token:', error);
            return res.status(401).json({ message: 'Not authorized to access this route' });
        }
    } catch (error) {
        logger.error('Auth middleware error:', error);
        next(error);
    }
};

module.exports = { protect };
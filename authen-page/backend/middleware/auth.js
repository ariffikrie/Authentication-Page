const jwt = require('jsonwebtoken');
const db = require('../config/db');

const auth = {
    // General authentication check
    verifyToken: (req, res, next) => {
        const token = req.header('x-auth-token');

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Token is not valid' });
        }
    },

    // Admin-only authentication
    adminRequired: async (req, res, next) => {
        const token = req.header('x-auth-token');

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user;

            // Check if user is admin
            const [users] = await db.query(
                'SELECT role FROM users WHERE id = ?',
                [req.user.id]
            );

            if (users.length === 0 || users[0].role !== 'admin') {
                return res.status(403).json({ message: 'Admin access required' });
            }

            next();
        } catch (err) {
            res.status(401).json({ message: 'Token is not valid' });
        }
    }
};

module.exports = auth;
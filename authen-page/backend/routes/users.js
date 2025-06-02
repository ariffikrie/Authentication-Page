const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Your database connection
const auth = require('../middleware/auth'); // Authentication middleware

// Route to get all users (protected with admin authentication)
router.get('/api/users', auth.adminRequired, async (req, res) => {
    try {
        // Query to select all users
        const [users] = await db.query(
            'SELECT id, email, created_at FROM users'
        );

        res.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// IMPORTANT: This endpoint should only be used for development/admin purposes
// It returns password hashes which is generally not recommended
router.get('/api/users/all', auth.adminRequired, async (req, res) => {
    try {
        // Query to select all user data including password hashes
        const [users] = await db.query(
            'SELECT * FROM users'
        );

        res.json({ users });
    } catch (error) {
        console.error('Error fetching users with credentials:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
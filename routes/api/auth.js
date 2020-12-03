const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// Item Model
const UserModel = require('../../models/Users');

// @route:  POST api/auth
// @desc:   Authenticate user
// @access: Public
router.post('/', async (req, res) => {
	const { email, password } = req.body;

	// Simple validation
	if (!email || !password) {
		return res.status(400).json({ message: 'Please enter all fields.' });
	}

	// Check for existing user
	UserModel.findOne({ email }).then((user) => {
		if (!user) return res.status(400).json({ message: 'User does not exist.' });

		// Validate password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch)
				return res.status(400).json({ message: 'Invalid credentials.' });

			jwt.sign(
				{ id: user.id },
				config.get('jwtSecret'),
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;
					res.json({
						token,
						user: {
							id: user.id,
							name: user.name,
							email: user.email,
						},
					});
				}
			);
		});
	});
});

module.exports = router;

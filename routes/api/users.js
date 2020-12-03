const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// Item Model
const UserModel = require('../../models/Users');

// @route:  POST api/users
// @desc:   Register new user
// @access: Public
router.post('/', async (req, res) => {
	const { name, email, password } = req.body;

	// Simple validation
	if (!name || !email || !password) {
		return res.status(400).json({ message: 'Please enter all fields.' });
	}

	// Check for existing user
	UserModel.findOne({ email }).then((user) => {
		if (user) return res.status(400).json({ message: 'User already exists.' });

		const newUser = new UserModel({
			name,
			email,
			password,
		});

		bcrypt.genSalt(10, (error, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (error) throw err;

				newUser.password = hash;
				newUser.save().then((user) => {
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
	});
});

module.exports = router;

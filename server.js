const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const recipes = require('./routes/api/recipes');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const config = require('config');

const app = express();

// JSON Middleware
app.use(express.json());

// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch((err) => console.log(err));

// Use Routes
app.use('/api/recipes', recipes);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Serve static assets if it is in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));

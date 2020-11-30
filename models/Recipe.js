const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RecipeSchema = new Schema({
	recipeName: {
		type: String,
		required: true,
	},
	recipeURL: {
		type: String,
		required: true,
	},
	recipeDescription: {
		type: String,
		required: true,
	},
});

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);

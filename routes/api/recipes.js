const express = require('express');
const router = express.Router();

// Item Model
const RecipeModel = require('../../models/Recipe');

// @route:  GET api/recipes
// @desc:   Get All Recipes
// @access: Public
router.get('/', async (req, res) => {
	try {
		const result = await RecipeModel.find().exec();
		if (!result) throw Error('No recipes.');
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

// @route:  GET api/recipes/:id
// @desc:   Get Recipe By ID
// @access: Public
router.get('/:id', async (req, res) => {
	try {
		const recipe = await RecipeModel.findById(req.params.id).exec();
		res.send(recipe);
	} catch (error) {
		res.status(500).send(error);
	}
});

// @route:  POST api/recipes
// @desc:   Create A Recipe
// @access: Public
router.post('/', async (req, res) => {
	try {
		const recipe = new RecipeModel(req.body);
		if (!recipe) throw Error('Something went wrong saving the recipe.');
		const result = await recipe.save();
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

// @route:  PUT api/recipes/:id
// @desc:   Update A Recipe By ID
// @access: Public
router.put('/:id', async (req, res) => {
	try {
		const recipe = await RecipeModel.findById(req.params.id).exec();
		recipe.set(req.body);
		const result = await recipe.save();
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

// @route:  DELETE api/recipes/:id
// @desc:   Delete A Recipe By ID
// @access: Public
router.delete('/:id', async (req, res) => {
	try {
		const recipe = await RecipeModel.findById(req.params.id);
		if (!recipe) throw Error('No recipe found');

		const removed = await RecipeModel.deleteOne();
		if (!removed)
			throw Error('Something went wrong while trying to delete the recipe.');

		res.status(200).json({ success: true });
	} catch (e) {
		res.status(400).json({ msg: e.message, success: false });
	}
});
module.exports = router;

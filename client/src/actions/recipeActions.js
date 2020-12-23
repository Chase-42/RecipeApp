import axios from 'axios';
import {
	GET_RECIPES,
	ADD_RECIPE,
	DELETE_RECIPE,
	RECIPES_LOADING,
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getRecipes = () => (dispatch) => {
	dispatch(setRecipesLoading());
	axios
		.get('/api/recipes')
		.then((res) =>
			dispatch({
				type: GET_RECIPES,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const addRecipe = (recipe) => (dispatch, getState) => {
	axios
		.post('/api/recipes', recipe, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: ADD_RECIPE,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const deleteRecipe = (id) => (dispatch, getState) => {
	axios
		.delete(`/api/recipes/${id}`, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: DELETE_RECIPE,
				payload: id,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const setRecipesLoading = () => {
	return {
		type: RECIPES_LOADING,
	};
};

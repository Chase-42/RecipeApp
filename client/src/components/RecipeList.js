import React, { Component } from 'react';
import {
	Container,
	Button,
	Card,
	CardBody,
	CardHeader,
	CardText,
	CardLink,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../App.css';
import { connect } from 'react-redux';
import { getRecipes, deleteRecipe } from '../actions/recipeActions';
import PropTypes from 'prop-types';

class RecipeList extends Component {
	componentDidMount() {
		this.props.getRecipes();
	}

	onDeleteClick = (id) => {
		this.props.deleteRecipe(id);
	};

	static propTypes = {
		getRecipes: PropTypes.func.isRequired,
		recipe: PropTypes.object.isRequired,
		isAuthenticated: PropTypes.bool,
	};

	render() {
		const { recipes } = this.props.recipe;
		return (
			<Container>
				<TransitionGroup>
					{recipes.map(({ _id, recipeName, recipeURL, recipeDescription }) => (
						<CSSTransition key={_id} timeout={500} classNames='fade' id='recipe-list'>
							<Card className='mt-2'>
								<CardHeader tag='h5'>{recipeName}</CardHeader>
								<CardBody>
									<CardText>{recipeDescription}</CardText>
									<div id='recipe-list'>
										<CardLink href={recipeURL} target='_blank'>
											Recipe Link
										</CardLink>
										{this.props.isAuthenticated ? (
											<Button
												className='remove-btn'
												color='danger'
												size='sm'
												onClick={this.onDeleteClick.bind(this, _id)}
											>
												Delete Recipe
											</Button>
										) : null}
									</div>
								</CardBody>
							</Card>
						</CSSTransition>
					))}
				</TransitionGroup>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	recipe: state.recipe,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getRecipes, deleteRecipe })(
	RecipeList
);

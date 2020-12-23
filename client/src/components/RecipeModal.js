import React, { Component } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { addRecipe } from '../actions/recipeActions';
import PropTypes from 'prop-types';

class RecipeModal extends Component {
	state = {
		modal: false,
		recipeName: '',
		recipeURL: '',
		recipeDescription: '',
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	onSubmit = (e) => {
		e.preventDefault();

		// Create new recipe
		const newRecipe = {
			recipeName: this.state.recipeName,
			recipeURL: this.state.recipeURL,
			recipeDescription: this.state.recipeDescription,
		};

		// Add recipe via addRecipe action
		this.props.addRecipe(newRecipe);

		// Close modal
		this.toggle();
	};

	render() {
		return (
			<div>
				{this.props.isAuthenticated ? (
					<Button
						color='dark'
						style={{ marginBottom: '2rem' }}
						onClick={this.toggle}
					>
						Add Recipe
					</Button>
				) : (
					<h4 className='mb-3 ml-4'>Please log in to add recipes</h4>
				)}

				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Add To Recipe List</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for='recipeName'>Recipe Name</Label>
								<Input
									type='text'
									name='recipeName'
									id='recipeName'
									placeholder='Add recipe name'
									onChange={this.onChange}
								/>
							</FormGroup>
							<FormGroup>
								<Label for='recipeDescription'>Recipe Description</Label>
								<Input
									type='textarea'
									name='recipeDescription'
									id='recipeDescription'
									placeholder='Add a quick recipe description'
									onChange={this.onChange}
								/>
							</FormGroup>
							<FormGroup>
								<Label for='recipeURL'>Recipe Link</Label>
								<Input
									type='url'
									name='recipeURL'
									id='recipeURL'
									placeholder='Add recipe url'
									onChange={this.onChange}
								/>
								<Button color='dark' style={{ marginTop: '2rem' }} block>
									Add Recipe
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	recipe: state.recipe,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addRecipe })(RecipeModal);

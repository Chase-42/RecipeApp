import React, { useEffect } from 'react';
// Components
import RecipeList from './components/RecipeList';
import AppNavbar from './components/AppNavbar';
import RecipeModal from './components/RecipeModal';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<div className='App'>
				<AppNavbar />
				<Container fluid='sm'>
					<Row>
						<Col sm='12' md={{ size: 6, offset: 3 }}>
							<RecipeModal />
							<RecipeList />
						</Col>
					</Row>
				</Container>
			</div>
		</Provider>
	);
}

export default App;

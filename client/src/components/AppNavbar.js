import React, { useState, Fragment } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Container,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

const AppNavbar = ({ auth }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => setIsOpen(!isOpen);

	AppNavbar.propTypes = {
		auth: PropTypes.object.isRequired,
	};

	const { isAuthenticated, user } = auth;

	const authLinks = (
		<Fragment>
			<NavItem>
				<span className='navbar-text mr-3'>
					<strong>{user ? `Welcome ${user.name}` : ''}</strong>
				</span>
			</NavItem>
			<NavItem>
				<Logout />
			</NavItem>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<NavItem>
				<RegisterModal />
			</NavItem>
			<NavItem>
				<LoginModal />
			</NavItem>
		</Fragment>
	);

	return (
		<div>
			<Navbar color='dark' dark expand='sm' className='mb-5'>
				<Container>
					<NavbarBrand href='/'>RecipeSavr</NavbarBrand>
					<NavbarToggler onClick={handleToggle} />
					<Collapse isOpen={isOpen} navbar>
						<Nav className='ml-auto' navbar>
							{isAuthenticated ? authLinks : guestLinks}
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);

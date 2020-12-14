import React, { useState } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Container,
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

const AppNavbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color='dark' dark expand='sm' className='mb-5'>
				<Container>
					<NavbarBrand href='/'>RecipeSavr</NavbarBrand>
					<NavbarToggler onClick={handleToggle} />
					<Collapse isOpen={isOpen} navbar>
						<Nav className='ml-auto' navbar>
							<NavItem>
								<RegisterModal />
							</NavItem>
							<NavItem>
								<LoginModal />
							</NavItem>
							<NavItem>
								<Logout />
							</NavItem>
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default AppNavbar;

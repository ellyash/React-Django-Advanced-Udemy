import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo_frame.png';

function Header() {
	return (
		<div className="header">
			<Link to="/">
				<img src={logo} alt="BWF logo" height="150" />
			</Link>
		</div>
	);
}

export default Header;

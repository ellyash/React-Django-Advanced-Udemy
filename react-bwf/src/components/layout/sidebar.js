import React, { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { auth } from '../../services/user-service';
import { useAuth } from '../../hooks/useAuth';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import User from '../user/user';

function Sidebar() {
	const classes = useStyles();
	const history = useHistory();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { authData, setAuth } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await auth({ username, password });
		setAuth(data);
	};

	const logout = () => {
		history.push('/');
		setAuth(null);
	};

	return (
		<div className="sidebar">
			{!authData ? (
				<React.Fragment>
					<form onSubmit={handleSubmit}>
						<Grid
							container
							spacing={1}
							alignItems="flex-end"
						>
							<Grid item>
								<AccountCircleIcon />
							</Grid>
							<Grid item>
								<TextField
									id="input-with-icon-grid"
									label="Username"
									onChange={(e) =>
										setUsername(e.target.value)
									}
								/>
							</Grid>
						</Grid>
						<Grid
							container
							spacing={1}
							alignItems="flex-end"
						>
							<Grid item>
								<VpnKeyIcon />
							</Grid>
							<Grid item>
								<TextField
									id="input-with-icon"
									label="Password"
									type="password"
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</Grid>
						</Grid>
						<div className={classes.buttonContainer}>
							<Button
								variant="contained"
								color="primary"
								type="submit"
							>
								Sign In
							</Button>
						</div>
					</form>
					<div className={classes.switchText}>
						<span>Don't have an account yet?</span>
						<Link
							to={'/register'}
							className={classes.linkText}
						>
							{' '}
							Register here
						</Link>
					</div>
				</React.Fragment>
			) : (
				<React.Fragment>
					<p>
						<User
							onClick={() => history.push('/account')}
							className={classes.accountLink}
							user={authData.user}
						/>
					</p>
					<div className={classes.buttonContainer}>
						<Button
							variant="outlined"
							color="primary"
							onClick={() => logout()}
						>
							Sign out
						</Button>
					</div>
				</React.Fragment>
			)}
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	buttonContainer: {
		textAlign: 'center',
		marginTop: '15px',
	},
	switchText: {
		textAlign: 'center',
	},
	linkText: {
		color: theme.colors.mainAccentColor,
		'&:hover': {
			color: theme.colors.mainAccentHover,
		},
	},
	accountLink: {},
}));

export default Sidebar;

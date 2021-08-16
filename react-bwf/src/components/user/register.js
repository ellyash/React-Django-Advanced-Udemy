import { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import EmailIcon from '@material-ui/icons/Email';
import { useAuth } from '../../hooks/useAuth';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../../services/user-service';
import { auth } from '../../services/user-service';
import { NotificationManager } from 'react-notifications';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

function Register() {
	const classes = useStyles();
	const { setAuth } = useAuth();
	const history = useHistory();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');

	const passMatch = () => {
		return password === password2;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (passMatch()) {
			const regData = await register({
				username,
				email,
				password,
				profile: { is_premium: false },
			});
			if (regData) {
				const data = await auth({ username, password });
				setAuth(data);
				history.push('/account');
			}
		} else {
			NotificationManager.error("Passwords don't match");
		}
	};

	return (
		<div>
			<Link to={'/'}>
				<Button
					size="small"
					variant="outlined"
					color="primary"
				>
					<KeyboardReturnIcon />
				</Button>
			</Link>

			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={1} alignItems="flex-end">
					<Grid item>
						<AccountCircleIcon />
					</Grid>
					<Grid item>
						<TextField
							label="Username"
							onChange={(e) =>
								setUsername(e.target.value)
							}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={1} alignItems="flex-end">
					<Grid item>
						<EmailIcon />
					</Grid>
					<Grid item>
						<TextField
							label="Email"
							type="text"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={1} alignItems="flex-end">
					<Grid item>
						<VpnKeyIcon />
					</Grid>
					<Grid item>
						<TextField
							label="Password"
							inputProps={{
								autoComplete: 'new-password',
							}}
							type="password"
							onChange={(e) =>
								setPassword(e.target.value)
							}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={1} alignItems="flex-end">
					<Grid item>
						<VpnKeyIcon />
					</Grid>
					<Grid item>
						<TextField
							label="Repeat Password"
							type="password"
							onChange={(e) =>
								setPassword2(e.target.value)
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
						Create Account
					</Button>
				</div>
			</form>
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
			cursor: 'pointer',
			color: theme.colors.mainAccentHover,
		},
	},
}));

export default Register;

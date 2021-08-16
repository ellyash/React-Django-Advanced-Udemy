import { useState } from 'react';
import {
	Button,
	Grid,
	TextField,
	/* IconButton, */
} from '@material-ui/core';
/* import AccountCircleIcon from '@material-ui/icons/AccountCircle';
 */ import VpnKeyIcon from '@material-ui/icons/VpnKey';
/* import EmailIcon from '@material-ui/icons/Email'; */
import { useAuth } from '../../hooks/useAuth';
/* import { makeStyles } from '@material-ui/core/styles';
 */ import { Link, useHistory } from 'react-router-dom';
/* import { register } from '../../services/user-service'; */
import { uploadPicture } from '../../services/user-service';
import { changePass } from '../../services/user-service';
import { NotificationManager } from 'react-notifications';
import { CssTextField } from '../layout/elements';
/* import PhotoCamera from '@material-ui/icons/PhotoCamera'; */
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

function Account() {
	const { authData, setAuth } = useAuth();
	const [image, setImage] = useState();
	const history = useHistory();
	/* 	const classes = useStyles(); */
	/* 	const [username, setUsername] = useState('');
	const [email, setEmail] = useState(''); */
	const [oldPassword, setOldPassword] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');

	const passMatch = () => {
		return password === password2;
	};

	const uploadPhoto = async (e) => {
		e.preventDefault();
		const uploadData = new FormData();
		uploadData.append('image', image, image.name);

		const uploaded = await uploadPicture(
			authData.token,
			authData.user.profile.id,
			uploadData
		);
		if (uploaded) {
			NotificationManager.success(
				'Image uploaded successfully'
			);
		} else {
			NotificationManager.error('Error, image was not correct');
		}
	};
	const submitChangePass = async (e) => {
		e.preventDefault();

		if (passMatch()) {
			const passData = await changePass(
				{
					old_password: oldPassword,
					new_password: password,
				},
				authData.user.id,
				authData.token
			);
			if (passData) {
				NotificationManager.success(
					'Password have been changed'
				);
				setAuth(null);
				history.push('/');
			}
		} else {
			NotificationManager.error("Passwords don't match!");
		}
	};

	if (!localStorage.getItem('user-token')) {
		history.push('/');
		return '';
	} else {
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

				<h1>Account info</h1>
				<form onSubmit={uploadPhoto}>
					{/* <input
						accept="image/*"
						id="icon-button-file"
						type="file"
						onChange={(e) => setImage(e.target.files[0])}
					/>
					<label htmlFor="icon-button-file">
						<IconButton color="primary" component="span">
							<PhotoCamera />
						</IconButton>
					</label> */}
					<label>
						<p>Change your profile picture</p>
						<CssTextField
							type="file"
							onChange={(e) =>
								setImage(e.target.files[0])
							}
						/>
					</label>
					<Button
						type="submit"
						color="primary"
						variant="contained"
					>
						Upload Image
					</Button>
				</form>
				<br />
				<form onSubmit={submitChangePass}>
					{' '}
					<label>
						<p>Change your password</p>
					</label>
					<Grid container spacing={1} alignItems="flex-end">
						<Grid item>
							<VpnKeyIcon />
						</Grid>
						<Grid item>
							<CssTextField
								label=" Old Password"
								type="password"
								onChange={(e) =>
									setOldPassword(e.target.value)
								}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={1} alignItems="flex-end">
						<Grid item>
							<VpnKeyIcon />
						</Grid>
						<Grid item>
							<CssTextField
								label="New password"
								type="password"
								inputProps={{
									autoComplete: 'new-password',
								}}
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
							<CssTextField
								label="Repeat password"
								type="password"
								onChange={(e) =>
									setPassword2(e.target.value)
								}
							/>
						</Grid>
					</Grid>
					<br />
					<Button
						type="submit"
						color="primary"
						variant="contained"
					>
						Change password
					</Button>
				</form>
			</div>
		);
	}
}

export default Account;

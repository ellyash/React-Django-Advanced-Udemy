import React /* , { useState }  */ from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function User({ user }) {
	const classes = useStyles();
	const history = useHistory();

	const nameClicked = () => {
		if (window.location.pathname === '/')
			history.push('/account');
	};

	return (
		<div
			className={classes.container}
			onClick={() => nameClicked()}
		>
			<Avatar
				src={'http://127.0.0.1:8000' + user.profile.image}
				alt=""
				className={classes.avatar}
			/>
			<h4 className={classes.username}>{user.username}</h4>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		cursor: 'pointer',
		width: '80px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'relative',
		'&:hover': {
			opacity: 0.6,
		},
	},
	username: {
		padding: 0,
		margin: 0,
		fontSize: 16,
		fontFamily: 'Roboto',
	},
	avatar: {
		marginLeft: 5,
	},
}));

User.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string.isRequired,
		profile: PropTypes.shape({
			image: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

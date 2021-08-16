import React from 'react';
import User from '../user/user';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

function Messages({ message, user }) {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<User user={user} />
			<div className={classes.dialogBox}>
				<div className={classes.dialogBody}>
					<span className={classes.tip}>&nbsp;</span>
					<div className={classes.bodyMessage}>
						<span>{message.text_message}</span>
					</div>
				</div>
				<Typography className={classes.time}>
					{message.time.split('T')[0]} &nbsp;
					{message.time.split('T')[1].substring(0, 5)}
				</Typography>
			</div>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'grid',
		gridTemplateColumns: '1fr 5fr',
	},
	dialogBox: {
		marginBottom: '10px',
		wordBreak: 'break-all',
	},
	dialogBody: {
		position: 'relative',

		padding: '5px',
		backgroundColor: theme.colors.bgLighterColor,
		borderRadius: '10px',
		border: `5px solid ${theme.colors.bgLighterColor}`,
	},
	tip: {
		width: '0',
		height: '0',
		position: 'absolute',
		background: 'transparent',
		border: `10px solid ${theme.colors.bgLighterColor}`,
		top: '5px',
		left: '-25px',
		borderTopColor: 'transparent',
		borderLeftColor: 'transparent',
		borderBottomColor: 'transparent',
	},
	bodyMessage: {
		color: theme.colors.bgColor,
	},
	time: {
		float: 'right',
	},
}));

export default Messages;

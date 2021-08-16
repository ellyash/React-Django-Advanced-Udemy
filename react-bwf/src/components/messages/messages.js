import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import Message from './message';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../hooks/useAuth';
import { postMessage } from '../../services/group-service';
import { CssTextField } from '../layout/elements';

function Messages({ group }) {
	const classes = useStyles();

	const { authData } = useAuth();
	const [newMessage, setNewMessage] = useState('');

	const getUser = (userId) => {
		return group.members.find(
			(member) => member.user.id === userId
		).user;
	};

	const sendMessage = () => {
		postMessage(
			authData.token,
			newMessage,
			group.id,
			authData.user.id
		).then((response) => {
			setNewMessage('');
			group.messages.unshift(response);
		});
	};

	return (
		<div>
			<div className={classes.chatBox}>
				<h1>Chat with other group members</h1>

				<CssTextField
					label="New message"
					multiline
					fullWidth
					rows={4}
					variant="outlined"
					value={newMessage}
					onChange={(evt) =>
						setNewMessage(evt.target.value)
					}
				/>
				<Button
					onClick={() => sendMessage()}
					disabled={!newMessage}
					variant="contained"
					color="primary"
				>
					Post
				</Button>
			</div>
			<br />

			{group.messages.map((message) => {
				return (
					<Message
						message={message}
						user={getUser(message.user)}
					/>
				);
			})}
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	chatBox: {
		textAlign: 'center',
	},
}));

export default Messages;

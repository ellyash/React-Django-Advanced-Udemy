import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { createEvent } from '../../services/event-service';
import { useHistory, useLocation } from 'react-router-dom';
import { CssTextField } from '../layout/elements';
import { useAuth } from '../../hooks/useAuth';
import { NotificationManager } from 'react-notifications';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

export default function EventForm() {
	const history = useHistory();
	const { state } = useLocation();
	const { group } = state;
	const [team1, setTeam1] = useState();
	const [team2, setTeam2] = useState();
	const [time, setTime] = useState();
	const format = "yyyy-MM-dd'T'HH:mm";
	const { authData, setAuth } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const utcTime = DateTime.fromFormat(time, format)
			.toUTC()
			.toFormat(format);

		const dataToSend = {
			team1,
			team2,
			time: utcTime,
			group: group.id,
		};
		const eventData = await createEvent(
			authData.token,
			dataToSend
		);
		if (eventData) {
			NotificationManager.success(
				'Event has been created successfully'
			);
			history.push('/group/' + group.id);
		} else {
			NotificationManager.error(
				'Error occurred while creating event.'
			);
		}
	};

	return (
		<React.Fragment>
			<Button
				size="small"
				variant="outlined"
				color="primary"
				onClick={() => history.goBack()}
			>
				<KeyboardReturnIcon />
			</Button>

			<div>
				<h1>New event for {group.name}</h1>
				<form onSubmit={handleSubmit}>
					<CssTextField
						label="First Team"
						onChange={(e) => setTeam1(e.target.value)}
					/>
					<br />
					<CssTextField
						label="Second Team"
						onChange={(e) => setTeam2(e.target.value)}
					/>
					<br />
					<br />
					<CssTextField
						id="datetime-local"
						label="Date and Time"
						type="datetime-local"
						//defaultValue={DateTime.now().toFormat(format)}
						InputLabelProps={{
							shrink: true,
							readOnly: true,
						}}
						onChange={(e) => setTime(e.target.value)}
					/>
					<br />
					<br />
					<Button
						variant="contained"
						color="primary"
						type="submit"
						disabled={!team1 || !team2 || !time}
					>
						Create event
					</Button>
				</form>
			</div>
		</React.Fragment>
	);
}

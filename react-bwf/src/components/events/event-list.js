import React from 'react';
import { DateTime } from 'luxon';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

export default function EventList({ events }) {
	const classes = useStyles();
	const history = useHistory();

	const eventDetails = (eventId) => {
		history.push(`/event/${eventId}`);
	};
	return (
		<React.Fragment>
			{events && events.length > 0 ? (
				<h3>Events: </h3>
			) : (
				<h3>This group doesn't have any active events</h3>
			)}
			{events.map((event) => {
				const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
				const evtTime = DateTime.fromFormat(
					event.time,
					format
				);
				return (
					<div
						key={event.id}
						onClick={() => eventDetails(event.id)}
					>
						<p className={classes.evtLink}>
							<h4>
								{event.team1} vs {event.team2}
							</h4>
							<p className={classes.dateTime}>
								<CalendarTodayIcon
									className={classes.dateIcon}
								/>
								{evtTime.toSQLDate()}
								&nbsp; &nbsp;
								{/* 	</p>
						<p className={classes.dateTime}> */}
								<QueryBuilderIcon
									className={classes.dateIcon}
								/>
								{evtTime.toFormat('HH:mm')}
							</p>
						</p>
					</div>
				);
			})}
		</React.Fragment>
	);
}
const useStyles = makeStyles((theme) => ({
	dateTime: {
		fontSize: '18px',
		marginTop: '10px',
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	dateIcon: {
		fontSize: '23px',
		color: theme.colors.mainAccentColor,
		marginRight: '5px',
	},
	evtLink: {
		'&:hover': {
			opacity: 0.6,
			cursor: 'pointer',
		},
	},
}));

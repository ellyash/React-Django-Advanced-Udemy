import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';

function GroupListItem({ group }) {
	const history = useHistory();
	const classes = useStyles();
	return (
		<div>
			{group && (
				<div
					className={classes.container}
					onClick={() => history.push(`/group/${group.id}`)}
				>
					<h3>
						<span className={classes.name}>
							{group.name}
						</span>
						&nbsp;&nbsp;&nbsp;
						<LocationOnIcon
							style={{
								fontSize: '20px',
							}}
						/>
						<span className={classes.location}>
							{group.location}
						</span>
					</h3>
					<h3>
						<PeopleIcon /> {group.members_count}
					</h3>
					<p>{group.description}</p>
				</div>
			)}
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		cursor: 'pointer',
		textAlign: 'left',
		border: '2px solid #FFF',
		borderRadius: '1rem',
		padding: '0 1rem',
		display: 'grid',
		gridTemplateColumns: '5fr auto',
		marginBottom: '1rem',
		'&:hover': {
			opacity: 0.6,
		},
	},
	name: {
		color: theme.palette.primary.main,
	},
	location: {
		color: theme.palette.secondary.main,
	},
}));

export default GroupListItem;

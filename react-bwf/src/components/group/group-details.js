import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
//import { getGroup } from '../../services/group-service';
import { useFetchGroup } from '../../hooks/fetch-group';
import { Button, Tooltip } from '@material-ui/core';
/* import { DateTime } from 'luxon';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'; */
import { makeStyles } from '@material-ui/core/styles';
import User from '../user/user';
import {
	/* getGroup, */ joinGroup,
} from '../../services/group-service';
import { leaveGroup } from '../../services/group-service';
import { useAuth } from '../../hooks/useAuth';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Messages from '../messages/messages';
import EventList from '../events/event-list';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { AdminToolTip } from '../layout/elements';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

function GroupDetails() {
	const classes = useStyles();
	const history = useHistory();

	const { authData } = useAuth();
	const { id } = useParams();

	const [group, setGroup] = useState(null);

	const [data, loading, error] = useFetchGroup(id);
	const [inGroup, setInGroup] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		if (data?.members) {
			data.members.sort((a, b) => b.points - a.points);

			const availableTrophies = ['gold', 'silver', 'bronze'];
			let currentTrophy = 0;
			data.members.map((m, indx) => {
				if (indx === 0) {
					m.trophy = availableTrophies[currentTrophy];
				} else {
					if (m.points !== data.members[indx - 1].points) {
						currentTrophy++;
					}
					if (currentTrophy < availableTrophies.length) {
						m.trophy = availableTrophies[currentTrophy];
					}
				}
			});

			if (authData?.user) {
				setInGroup(
					!!data.members.find(
						(member) =>
							member.user.id === authData.user.id
					)
				);
				setIsAdmin(
					!!data.members.find(
						(member) =>
							member.user.id === authData.user.id
					)?.admin
				);
			}
		}
		setGroup(data);
		// eslint-disable-next-line
	}, [data]);

	const joinHere = () => {
		joinGroup({ user: authData.user.id, group: group.id }).then(
			(res) => {
				console.log(res);
			}
		);
	};
	const leaveHere = () => {
		leaveGroup({ user: authData.user.id, group: group.id }).then(
			(res) => {
				console.log(res);
			}
		);
	};
	const addEvent = () => {
		history.push('/event-form', { group });
	};

	if (error) return <h1>Error occurred</h1>;
	if (loading) return <h1>Loading...</h1>;

	return (
		<div className={classes.main}>
			<Button
				size="small"
				variant="outlined"
				color="primary"
				onClick={() => history.goBack()}
			>
				<KeyboardReturnIcon />
			</Button>
			<br />
			<br />
			{inGroup ? (
				<React.Fragment>
					<Button
						variant="contained"
						color="primary"
						onClick={() => leaveHere()}
					>
						Leave Group
					</Button>
					{isAdmin && (
						<Button
							variant="contained"
							color="primary"
							onClick={() => addEvent()}
						>
							add new event
						</Button>
					)}
				</React.Fragment>
			) : (
				<Button
					variant="contained"
					color="primary"
					onClick={() => joinHere()}
				>
					Join This Group
				</Button>
			)}

			{group && (
				<React.Fragment>
					<h1>
						{group.name} {' is from '} {group.location}
					</h1>
					<h2>{group.description}</h2>

					<EventList events={group.events} />

					<br />
					{group.members.length > 0 ? (
						<h3>Members: </h3>
					) : (
						<h3>This group doesn't have any members</h3>
					)}
					{group.members.map((member) => {
						return (
							<div
								key={member.id}
								className={classes.memberContainer}
							>
								{member.admin ? (
									<AdminToolTip
										title="Room Admin"
										placement="left"
									>
										<div>
											<User
												user={member.user}
											/>
										</div>
									</AdminToolTip>
								) : (
									<Tooltip
										title="Room Member"
										placement="left"
									>
										<div className={classes.test}>
											<User
												user={member.user}
											/>
										</div>
									</Tooltip>
								)}
								<p>
									<EmojiEventsIcon
										className={`${
											classes[member.trophy]
										}`}
									/>
								</p>
								<p className={classes.points}>
									<span
										className={
											classes.pointNumber
										}
									>
										{member.points}
									</span>{' '}
									Points
								</p>
							</div>
						);
					})}
					{inGroup ? (
						<Messages group={group} />
					) : (
						<div>
							<hr />
							<h1>
								You need to join this group to view
								chat
							</h1>
						</div>
					)}
				</React.Fragment>
			)}
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	main: {},
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
	memberContainer: {
		display: 'grid',
		width: '250px',
		gridTemplateColumns: 'auto 2fr 2fr',
		alignItems: 'center',
		borderBottom: '2px gold solid',
		borderRadius: '1px',
		margin: 20,
		fontSize: '20px',
	},
	points: {
		fontSize: '20px',
	},
	pointNumber: {
		color: theme.palette.primary.main,
		fontSize: '25px',
	},
	gold: {
		color: 'gold',
		fontSize: '50px',
	},
	silver: {
		color: 'silver',
		fontSize: '45px',
	},
	bronze: {
		color: '#835220',
		fontSize: '40px',
	},
}));

export default GroupDetails;

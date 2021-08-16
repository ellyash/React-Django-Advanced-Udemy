import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getGroups } from '../../services/group-service';
import { makeStyles } from '@material-ui/core/styles';
import GroupListItem from './group-list-item';

function GroupList() {
	const [groups, setGroups] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const history = useHistory();
	const classes = useStyles();

	useEffect(() => {
		setLoading(true);
		const getData = async () => {
			await getGroups()
				.then((data) => {
					setLoading(false);
					setGroups(data);
				})
				.catch((err) => {
					setLoading(false);
					setError(true);
					console.log(err);
				});
		};
		getData();
	}, []);

	if (error) return <h1>Error occurred</h1>;
	if (loading) return <h1>Loading...</h1>;

	return (
		<div>
			{groups &&
				groups.map((group) => {
					return (
						<GroupListItem group={group} key={group.id} />
					);
				})}
		</div>
	);
}

const useStyles = makeStyles((theme) => ({}));

export default GroupList;

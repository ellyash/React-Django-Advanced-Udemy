import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import GroupList from '../group/group-list';
import GroupDetails from '../group/group-details';
import Register from '../user/register';
import Account from '../user/account';
/* import { useAuth } from '../../hooks/useAuth'; */
import Event from '../events/event';
import EventForm from '../events/event-form';

function Main() {
	/* 	const { authData } = useAuth(); */

	return (
		<div className="main">
			<Switch>
				<Route exact path="/">
					<GroupList />
				</Route>
				<Route path="/group/:id">
					<GroupDetails />
				</Route>
				<Route path="/event/:id">
					<Event />
				</Route>
				<Route path="/event-form">
					<EventForm />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/account">
					<Account />
				</Route>
			</Switch>
		</div>
	);
}

export default Main;

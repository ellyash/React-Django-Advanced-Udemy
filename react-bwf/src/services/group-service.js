import { status } from '../utils';

export function getGroup(id) {
	return fetch(`http://127.0.0.1:8000/api/groups/${id}`)
		.then(status)
		.catch((err) => {
			console.log(err);
		});
}

export function getGroups() {
	return fetch(`http://127.0.0.1:8000/api/groups/`)
		.then(status)
		.catch((err) => {
			console.log(err);
		});
}
export function joinGroup(data) {
	return fetch(`http://127.0.0.1:8000/api/members/join/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then(status)
		.catch((err) => {
			console.log(err);
		});
}
export function leaveGroup(data) {
	return fetch(`http://127.0.0.1:8000/api/members/leave/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then(status)
		.catch((err) => {
			console.log(err);
		});
}
export function postMessage(token, text_message, group, user) {
	return fetch(`http://127.0.0.1:8000/api/messages/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify({ text_message, group, user }),
	})
		.then(status)
		.catch((err) => {
			console.log(err);
		});
}

import { status } from '../utils';

export function auth(credentials) {
	return fetch('http://127.0.0.1:8000/api/auth/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	})
		.then(status)
		.catch((err) => {
			console.log(err);
		});
}
export function register(userData) {
	return fetch('http://127.0.0.1:8000/api/users/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	})
		.then(status)
		.catch((err) => {
			console.log(err);
		});
}
export function changePass(userData, userId, token) {
	return fetch(
		`http://127.0.0.1:8000/api/users/${userId}/change_password/`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify(userData),
		}
	)
		.then(status)
		.catch((err) => {
			console.log(err);
		});
}
export function uploadPicture(token, profileId, data) {
	return fetch(`http://127.0.0.1:8000/api/profile/${profileId}/`, {
		method: 'PUT',
		headers: {
			Authorization: `Token ${token}`,
		},
		body: data,
	})
		.then(status)
		.catch((err) => {
			console.log(err);
		});
}

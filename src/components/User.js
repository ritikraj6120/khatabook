import React, { useContext, useEffect } from 'react'
import UserContext from '../context/notes/userContext';
import { useHistory } from 'react-router-dom'
const User = () => {
	let history = useHistory();
	const { UserDetail , getUser } = useContext(UserContext);
	useEffect(() => {
		if (localStorage.getItem('token'))
			getUser()
		else {
			history.push('/login');
		}
		// eslint-disable-next-line
	}, [])
		// console.log(UserDetail);
	return (
		
		<div>
		
			<p>😎 {UserDetail.fname} {UserDetail.lname}</p>
			<p>📧 { UserDetail.email}</p>
			<p> {UserDetail.name} created account on {new Date(UserDetail.date).toLocaleString()} I.S.T</p>
		</div>
	)
}
export default User;


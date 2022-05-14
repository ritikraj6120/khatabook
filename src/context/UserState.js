import UserContext from "./UserContext";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { notifyError, notifySuccess } from '../alert';
const UserState = (props) => {
	let history = useHistory();
	const host = "http://localhost:5000"
	const UserInitial = {};
	const [UserDetail, setUserDetail] = useState(UserInitial)

	const signup = async (user) => {
		const response = await fetch("http://localhost:5000/api/auth/signup", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});
		const json = await response.json()
		// console.log(json);
		if (json.isAuthenticated) {
			// Save the auth token and redirect
			notifySuccess("Account Created Successfully")
			history.push("/login");
		}
		else {
			let x = json.error;
			x = x[0];
			notifyError(x.msg);
		}
	}

	const login = async (user) => {
		const response = await fetch("http://localhost:5000/api/auth/login", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});
		const json = await response.json()
		if (json.success) {
			// Save the auth token and redirect
			localStorage.setItem('token', json.authtoken);
			notifySuccess("Successfully logged in")
			history.push('/')
		}
		else {
			notifyError(json.error);
		}
	}

	// Get User details
	const getUser = async () => {
		// API Call 
		const response = await fetch(`${host}/api/user/fetchspecificeuser`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		const json = await response.json()
		setUserDetail(json[0])
	}

	return (
		<UserContext.Provider value={{ UserDetail, getUser, signup, login }}>
			{props.children}
		</UserContext.Provider>
	)

}
export default UserState;
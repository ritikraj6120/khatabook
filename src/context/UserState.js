import UserContext from "./userContext";
import { useState } from "react";

const UserState = (props) => {
	
	const host = "http://localhost:5000"
	const UserInitial = {};
	const [UserDetail, setUserDetail] = useState(UserInitial)

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
		<UserContext.Provider value={{ UserDetail , getUser }}>
			{props.children}
		</UserContext.Provider>
	)
	
}
export default UserState;
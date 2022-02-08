import AdminContext from "./AdminContext";
import { useState } from "react";


const AdminState = (props) => {

	const host = "http://localhost:5000"
	const UserInitial = [];
	const [Users, setUsers] = useState(UserInitial)

	// Get Users details
	const fetchUserList = async () => {
		// API Call 

		const response = await fetch(`${host}/api/user/fetchUserList`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		const json = await response.json()
		// console.log(json[0]);
		setUsers(json)
	}

	const deleteuser = async (id)=> {
		const response = await fetch(`${host}/api/user/deleteuser/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		const json = await response.json()
		// console.log(json[0]);
		setUsers(json)
	}
	return (
		<AdminContext.Provider value={{ Users , fetchUserList,deleteuser }}>
			{props.children}
		</AdminContext.Provider>
	)
	
}
export default AdminState;





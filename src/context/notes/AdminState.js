import AdminContext from "./AdminContext";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
const AdminState = (props) => {
	const history = useHistory();
	const host = "http://localhost:5000"
	const UserInitial = [];
	const [users, setUsers] = useState(UserInitial)

	// Get Users details
	const fetchUserList = async () => {
		// API Call 

		const response = await fetch(`${host}/api/user/fetchUserList`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token'),
				"admin-token": localStorage.getItem('admin')
			}
		});
		if (response.status !== 200) {
			localStorage.removeItem('token');
			localStorage.removeItem('admin');
			history.push("/login");
		}
		const json = await response.json()
		// console.log("printing json")
		// console.log(json);
		const simpleUsers = json.filter(user => !user.isadmin);
		// console.log(simpleUsers);
		setUsers(simpleUsers)

	}

	const deleteuser = async (id) => {
		const response = await fetch(`${host}/api/user/deleteuser/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token'),
				"admin-token": localStorage.getItem('admin')
			}
		});
		if (response.status !== 200) {
			localStorage.removeItem('token');
			localStorage.removeItem('admin');
			history.push("/login");
		}
		const newUsers = users.filter((user) => { return user._id !== id })
		setUsers(newUsers)
	}
	return (
		<AdminContext.Provider value={{ users, fetchUserList, deleteuser }}>
			{props.children}
		</AdminContext.Provider>
	)

}
export default AdminState;






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
		console.log(json[0]);
		setUserDetail(json[0])
	}

	// // Add a Note
	// const addNote = async (title, description, tag) => {
	// 	// TODO: API Call
	// 	// API Call 
	// 	const response = await fetch(`${host}/api/notes/addnote`, {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			"auth-token": localStorage.getItem('token')
	// 		},
	// 		body: JSON.stringify({ title, description, tag })
	// 	});

	// 	const note = await response.json();
	// 	setNotes(notes.concat(note))
	// }

	// // Delete a Note
	// const deleteNote = async (id) => {
	// 	// API Call
	// 	const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
	// 		method: 'DELETE',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			"auth-token": localStorage.getItem('token')
	// 		}
	// 	});
	// 	const json = await response.json();
	// 	const newNotes = notes.filter((note) => { return note._id !== id })
	// 	setNotes(newNotes)
	// }

	// // Edit a Note
	// const editNote = async (id, title, description, tag) => {
	// 	// API Call 
	// 	console.log("got my boy");
	// 	const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
	// 		method: 'PUT',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			"auth-token": localStorage.getItem('token')
	// 		},
	// 		body: JSON.stringify({ title, description, tag })
	// 	});
	// 	const json = await response.json();

	// 	let newNotes = JSON.parse(JSON.stringify(notes))
	// 	// Logic to edit in client
	// 	for (let index = 0; index < newNotes.length; index++) {
	// 		const element = newNotes[index];
	// 		if (element._id === id) {
	// 			newNotes[index].title = title;
	// 			newNotes[index].description = description;
	// 			newNotes[index].tag = tag;
	// 			break;
	// 		}
	// 	}
	// 	setNotes(newNotes);
	// }

	return (
		<UserContext.Provider value={{ UserDetail , getUser }}>
			{props.children}
		</UserContext.Provider>
	)
	
}
export default UserState;
import NoteContext from "./noteContext";
import { useState } from "react";
import { useHistory } from "react-router-dom";
const NoteState = (props) => {
	let history = useHistory();
	const host = "http://localhost:5000"
	const notesInitial = []
	const [notes, setNotes] = useState(notesInitial)
	const [alert, setAlert] = useState(null);

	// shows alert 
	const showAlert = (message, type) => {
		setAlert({
			msg: message,
			type: type
		})
		setTimeout(() => {
			setAlert(null);
		}, 1500);
	}

	// Get all Notes
	const getNotes = async () => {
		// API Call 
		const response = await fetch(`${host}/api/notes/fetchallnotes`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		const json = await response.json()
		console.log(json);
		setNotes(json)
	}

	// Add a Note
	const addNote = async (title, description, tag) => {
		// TODO: API Call
		// API Call 
		const response = await fetch(`${host}/api/notes/addnote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, description, tag })
		});
		if (response.status !== 200) {

			history.push("/login");
		}
		else {
			showAlert("Added Succcessfully", "success")
			const note = await response.json();
			setNotes(notes.concat(note))
		}
	}

	// Delete a Note
	const deleteNote = async (id) => {
		// API Call
		const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		// const json = await response.json();
		const newNotes = notes.filter((note) => { return note._id !== id })
		setNotes(newNotes)
	}

	// Edit a Note
	const editNote = async (id, title, description, tag) => {
		// API Call 
		console.log("got my boy");
		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, description, tag })
		});
		// const json = await response.json();

		let newNotes = JSON.parse(JSON.stringify(notes))
		// Logic to edit in client
		for (let index = 0; index < newNotes.length; index++) {
			const element = newNotes[index];
			if (element._id === id) {
				newNotes[index].title = title;
				newNotes[index].description = description;
				newNotes[index].tag = tag;
				break;
			}
		}
		setNotes(newNotes);
	}

	return (
		<NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, showAlert, alert }}>
			{props.children}
		</NoteContext.Provider>
	)

}
export default NoteState;
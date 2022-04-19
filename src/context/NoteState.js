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
		}, 2000);
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

			showAlert("Invalid Details for Notes", "danger")
		}
		else {
			showAlert("Note Added Succcessfully", "success")
			const note = await response.json();
			setNotes(notes.concat(note));
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
		if(response.status===400 || response.status===401)
		{
			showAlert("Invalid User","danger");
			history.push('/login');
		}
		else{
			const newNotes = notes.filter((note) => { return note._id !== id })
			setNotes(newNotes)
			showAlert("Deleted successfully", "success");
		}
		
	}

	// Edit a Note
	const editNote = async (id, title, description, tag, important, completed) => {
		// API Call 
		console.log("got my boy");
		console.log(id, title, description, tag, important, completed);
		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, description, tag, important, completed })
		});
		// const json = await response.json();
		if (response.status === 404) {
			showAlert(" Note Not Found", "danger");
		}
		else if (response.status === (401)) {
			showAlert(" Note Allowed", "danger");
			history.push('/login');

		}
		else {
			let newNotes = JSON.parse(JSON.stringify(notes))
			// Logic to edit in client
			for (let index = 0; index < newNotes.length; index++) {
				const element = newNotes[index];
				if (element._id === id) {
					if (title)
						newNotes[index].title = title;
					if (description)
						newNotes[index].description = description;
					if (tag)
						newNotes[index].tag = tag;
					if (important === true || important === false)
						newNotes[index].important = important;
					if (completed === true || completed === false)
						newNotes[index].completed = completed;
					break;
				}
			}
			setNotes(newNotes);
			showAlert("Updated Succcessfully", "success")
		}
	}

	return (
		<NoteContext.Provider value= {{ notes, addNote, deleteNote, editNote, getNotes, showAlert, alert }}>
			{props.children}
		</NoteContext.Provider>
	)

}
export default NoteState;
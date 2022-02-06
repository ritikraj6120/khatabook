import React, { useContext,useState } from 'react'
import noteContext from "../context/notes/noteContext"
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
const Noteitem = (props) => {
	
	const { note, updateNote } = props;
	const context = useContext(noteContext);
	const { deleteNote, showAlert,editNote } = context;
	
	const handleimportant = () => {
		console.log(!note.important);
		editNote(note._id,null,null,null,!note.important);
	}
	console.log("inside noteitem");
	return (
		<div className="col-md-3">
			<div className="card my-3">
				<div className="card-body">
					<div className="d-flex align-items-center">
						<h5 className="card-title">{note.title}</h5>
						{/* <i className="far fa-trash-alt mx-2" onClick={() => { deleteNote(note._id); showAlert("Deleted successfully", "success"); }} ></i> */}
						<Tooltip className="mx-2" title="Delete note" placement="top" arrow style={{ cursor: " pointer" }}>
							<DeleteIcon onClick={() => { deleteNote(note._id); showAlert("Deleted successfully", "success"); }} />
						</Tooltip>
						<i className="far fa-edit mx-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" onClick={() => { updateNote(note); }} ></i>
						{/* <i className="far fa-calendar-alt mx-2"></i> */}
						{
							note.important ? <Tooltip title="Favourite" placement="top" arrow><StarPurple500OutlinedIcon style={{ cursor: " 		pointer", color: "#3e69e4" }} onClick={handleimportant} />
							</Tooltip>
								:
								<Tooltip title="Favourite" placement="top" arrow><StarOutlineOutlinedIcon style={{ cursor: " pointer" }} onClick=	{handleimportant} />
								</Tooltip>
						}
					</div>
					<p className="card-text">{note.description}</p>

				</div>
			</div>
		</div>
	)
}

export default Noteitem

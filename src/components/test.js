// import React, { useReducer, useEffect } from 'react';
// import axios from 'axios';
// const initialState = {
// 	loading: true,
// 	error: '',
// 	post: {}
// }
// const reducer = (state, action) => {
// 	switch (action.type) {
// 		case 'FETCH_SUCCESS':
// 			return {
// 				loading: false,
// 				error: '',
// 				post: action.payload
// 			}
// 		case 'FETCH_ERROR':
// 			return {
// 				loading: false,
// 				error: 'Something Went wrong!',
// 				post: {}
// 			}
// 		default:
// 			return state
// 	}
// }

// function Datafetch() {
// 	const [state, dispatch] = useReducer(reducer, initialState);

// 	useEffect(() => {
// 		axios
// 			.get('https://jsonplaceholder.typicode.com/posts/1')
// 			.then(response => {
// 				dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
// 			})
// 			.catch(error => {
// 				dispatch({ type: 'FETCH_ERROR' })
// 			})
// 	}, [])

// 	return (
// 		<div>
// 			{state.loading ? 'Loading' : state.post.title}
// 			{state.error?state.error:null}
// 		</div>
// 	)
// }


// import Box from '@mui/material/Box';
// <Box sx={{ minWidth: 275 }}>
// <Card variant="outlined">
// 	<>
// 		<CardContent>
// 			<Typography color="text.secondary">
// 				Name
// 			</Typography>
// 			<Typography variant="h5" component="div">
// 				{UserDetail.fname + " " + UserDetail.lname}
// 			</Typography>
// 			<Typography color="text.secondary">
// 				Email
// 			</Typography>
// 			<Typography variant="body2">
// 				{UserDetail.email}
// 			</Typography>
// 			<Typography color="text.secondary">
// 				Created account on
// 			</Typography>
// 			<Typography variant="body2">
// 				{new Date(UserDetail.date).toLocaleString()} I.S.T
// 			</Typography>
// 		</CardContent>
// 		{/* <CardActions>
// 			<Button size="small" value={props._id} onClick={handleSubmit}>
// 				Delete User
// 			</Button>
// 		</CardActions> */}
// 	</>
// </Card>
// </Box>


// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";

// function App() {
//   const [open, setOpen] = useState(false);

//   return (
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//       <button onClick={() => setOpen(isOpen => !isOpen)}>Open Picker</button>
//       <DatePicker open={open} />
//     </MuiPickersUtilsProvider>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
const { jsPDF } = require("jspdf");
const doc = new jsPDF();
console.log(doc.getFontList())